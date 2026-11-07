#!/usr/bin/env python3
"""Read authenticated shared research, or idempotently sync one approved local run.
Credentials default to ~/.config/2nspira-market-intelligence/<identity>.json (0600).
Never supply a token on the command line or in a URL.
"""
import argparse, datetime, hashlib, json, os, sys, urllib.request, urllib.error
from pathlib import Path

DOCUMENTS = {'opportunity-register.json','opportunity-register-reviewed.json','nightly-brief.md',
 'recommended-experiment.md','scoring-rubric-v1-inherited.md','scoring-rubric.md','watchlist.md',
 'source-snapshots.json','parent-review.md','rotation-state.json','decision-memo.md','weekly-decision-memo.md',
 'initial-brief.md','deduplication-log.md','open-issue-overlap-scan.md','brief-MI-001.md','brief-MI-002.md','brief-MI-003.md','brief-MI-004.md'}

def payload_for(directory, register_name='opportunity-register.json'):
    path=directory/register_name
    register=json.loads(path.read_text())
    docs=[]
    for p in sorted(directory.iterdir()):
        if p.name in DOCUMENTS and p.is_file():
            docs.append({'name':p.name,'content':p.read_text()})
    # Register controls freshness. Retries must not use wall-clock time.
    checked=register.get('checked_at')
    observed=datetime.datetime.fromisoformat(checked) if checked else datetime.datetime.fromtimestamp(path.stat().st_mtime,datetime.timezone.utc)
    if observed.tzinfo is None: raise ValueError('Source checked_at must have a timezone')
    body={'observed_at':observed.astimezone(datetime.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00','Z'),
          'issue_url':'https://github.com/2NspiraOpsTeam/2nspira-website/issues/188',
          'record_version':register.get('record_version',register.get('schema_version','legacy')),
          'opportunities':register['opportunities'],'documents':docs}
    digest=hashlib.sha256(json.dumps(body,sort_keys=True,ensure_ascii=False).encode()).hexdigest()
    body['run_id']='mi-'+digest[:32]
    return body

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        raise RuntimeError('Authenticated API redirects are forbidden')

def request(config, path, body=None):
    if not config['endpoint'].startswith('https://'): raise ValueError('HTTPS endpoint required')
    req=urllib.request.Request(config['endpoint'].rstrip('/')+path,
        data=None if body is None else json.dumps(body,ensure_ascii=False).encode(),
        headers={'Authorization':'Bearer '+config['token'],'Content-Type':'application/json','User-Agent':'2Nspira-MarketIntelligence/1.0'})
    for attempt in range(3):
        try:
            with urllib.request.build_opener(NoRedirect()).open(req,timeout=45) as res: return json.load(res)
        except urllib.error.HTTPError as err:
            if err.code not in (429,500,502,503,504) or attempt==2:
                raise RuntimeError('API HTTP '+str(err.code)+': '+err.read(500).decode()) from None
        except urllib.error.URLError:
            if attempt==2: raise RuntimeError('API connection failed after three attempts') from None
        import time
        time.sleep(2**attempt)

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--identity',choices=['brian','adam','maya','cleo','dax','jeffrey'],default='brian')
    p.add_argument('--credentials',type=Path)
    s=p.add_subparsers(dest='command',required=True)
    read=s.add_parser('get');read.add_argument('path',nargs='?',default='/v1/opportunities')
    sync=s.add_parser('sync');sync.add_argument('directory',type=Path);sync.add_argument('--register',default='opportunity-register.json');sync.add_argument('--receipt',type=Path)
    args=p.parse_args()
    config_path=args.credentials or Path.home()/'.config/2nspira-market-intelligence'/f'{args.identity}.json'
    if config_path.stat().st_mode & 0o077: raise ValueError('Credential file must be private (chmod 600)')
    config=json.loads(config_path.read_text())
    if args.command=='get':
        if not args.path.startswith('/v1/') or '?' in args.path and '#' in args.path: raise ValueError('Expected /v1/ API path')
        result=request(config,args.path)
    else:
        payload=payload_for(args.directory,args.register)
        result=request(config,'/v1/import',payload)
        if args.receipt:
            args.receipt.write_text(json.dumps({'endpoint':config['endpoint'],'result':result,'source':str(args.directory)},indent=2)+'\n')
    print(json.dumps(result,indent=2))
if __name__=='__main__':
    try: main()
    except Exception as exc: print('Research API error: '+str(exc),file=sys.stderr);sys.exit(1)
