#!/usr/bin/env python3
"""Contract/security checks against seeded service; never prints credentials.
Does not create fake opportunities or modify existing research.
"""
import datetime,hashlib,importlib.util,json,urllib.request,urllib.error
from pathlib import Path
spec=importlib.util.spec_from_file_location('client',Path(__file__).with_name('client.py'));client=importlib.util.module_from_spec(spec);spec.loader.exec_module(client)
credentials=Path.home()/'.config/2nspira-market-intelligence'
configs={actor:json.loads((credentials/(actor+'.json')).read_text()) for actor in ['brian','adam','maya','cleo','dax','jeffrey']}
checks=[]
def expect(label,condition):
    if not condition: raise AssertionError(label)
    checks.append({'check':label,'passed':True})
def raw(path,actor=None,body=None,method=None):
    headers={'User-Agent':'2Nspira-MarketIntelligence/1.0','Content-Type':'application/json'}
    if actor:headers['Authorization']='Bearer '+configs[actor]['token']
    req=urllib.request.Request(configs['brian']['endpoint']+path,headers=headers,data=None if body is None else json.dumps(body).encode(),method=method)
    try:
        with urllib.request.urlopen(req,timeout=45) as r:return r.status,json.load(r)
    except urllib.error.HTTPError as err:
        data=err.read().decode()
        try:data=json.loads(data)
        except json.JSONDecodeError:pass
        return err.code,data
expect('anonymous research denied',raw('/v1/opportunities')[0]==401)
for actor in configs:
    status,data=raw('/v1/opportunities',actor)
    expect(actor+' authenticated read',status==200 and {'MI-001','MI-002','MI-003','MI-004'}.issubset({r['candidate_id'] for r in data['results']}))
    if actor!='brian': expect(actor+' import denied',raw('/v1/import',actor,{})[0]==403)
expect('unknown opportunity 404',raw('/v1/opportunities/MI-999999','brian')[0]==404)
expect('unknown route 404',raw('/v1/no-such-route','brian')[0]==404)
expect('unsupported method denied',raw('/v1/opportunities','brian',method='DELETE')[0]==405)
expect('malformed import rejected',raw('/v1/import','brian',{})[0]==400)
status,current=raw('/v1/opportunities/MI-001','brian')
expect('corrected current score 68',status==200 and current['record']['score']==68)
status,history=raw('/v1/opportunities/MI-001/history','brian')
expect('original and corrected history retained',status==200 and len(history['results'])>=3 and {68,71}.issubset({json.loads(v['record_json'])['score'] for v in history['results']}))
status,runs=raw('/v1/runs','brian')
expect('original source revisions retained as research grows',status==200 and {'mi-723d298b4a882ce90e8928bf96dbb00e','mi-1adccff6192e51aaebe19b3f570d8a62','mi-df841ec413ebf878df897b2bedaa4d4e'}.issubset({r['run_id'] for r in runs['results']}))
latest=current['run_id'];run=next(r for r in runs['results'] if r['run_id']==latest)
# Reconstruct exact canonical payload from immutable stored documents and versions.
status,documents=raw('/v1/runs/'+latest+'/documents','brian')
docs=[]
for d in documents['results']:
    status,stored=raw('/v1/runs/'+latest+'/documents/'+d['name'],'brian')
    expect('document integrity '+d['name'],status==200 and hashlib.sha256(stored['content'].encode()).hexdigest()==d['sha256'])
    docs.append({'name':d['name'],'content':stored['content']})
register=json.loads(next(d['content'] for d in docs if d['name']=='opportunity-register.json'))
payload={'observed_at':run['observed_at'],'issue_url':run['issue_url'],'record_version':run['record_version'],'opportunities':register['opportunities'],'documents':docs,'run_id':latest}
status,repeat=raw('/v1/import','brian',payload)
expect('retry is idempotent',status==200 and repeat['status']=='already_imported')
reordered=dict(payload)
reordered['opportunities']=[dict(reversed(list(row.items()))) for row in payload['opportunities']]
expect('key-order independent replay',raw('/v1/import','brian',reordered)[0]==200)
equal_time=dict(payload);equal_time['run_id']=latest+'-equal-time-check'
expect('same-time new revision explicitly rejected',raw('/v1/import','brian',equal_time)[0]==409)
status,page=raw('/v1/sources?candidate_id=MI-001&limit=1','brian')
expect('source pagination first page',status==200 and len(page['results'])==1 and page['next_offset']==1)
status,page=raw('/v1/sources?candidate_id=MI-001&limit=1&offset=1','brian')
expect('source pagination next page',status==200 and len(page['results'])==1)
payload['record_version']+='-altered'
expect('immutable run conflict denied',raw('/v1/import','brian',payload)[0]==409)
status,audit=raw('/v1/audit','brian')
expect('audit attributes authenticated identities',status==200 and all(any(r['actor']==actor for r in audit['results']) for actor in configs))
expect('audit records denied writes',any(r['action']=='import' and r['outcome']=='denied' and r['actor']=='maya' for r in audit['results']))
result={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'endpoint':configs['brian']['endpoint'],
 'checks_passed':len(checks),'checks':checks,'limitations':['Role credentials exercised from Brian host, not independently from each team member machine.','Future scheduled clock trigger not yet observed.']}
out=Path(__file__).parent.parent/'evidence';out.mkdir(exist_ok=True);(out/'live-verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
