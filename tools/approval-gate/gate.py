"""Read-only approval readiness verifier. It NEVER merges or deploys.

A candidate integration for #175; require independent human reviews, exact
PR/SHA/environment/action, current trusted CI, and one-time receipt consumption.
"""
import argparse
import datetime as dt
import json
import pathlib
import re
import sqlite3
import subprocess

class Rejected(ValueError):
    pass

def validate(packet, pr, reviews, runs, *, owner_login, owner_id, workflow_path, now):
    required = {'repository', 'pr', 'sha', 'environment', 'action', 'nonce'}
    if set(packet) != required:
        raise Rejected('Invalid review packet fields')
    if not re.fullmatch(r'2NspiraOpsTeam/[A-Za-z0-9_.-]+', packet['repository']):
        raise Rejected('Repository outside approved organization')
    if not re.fullmatch(r'[a-f0-9]{40}', packet['sha']):
        raise Rejected('Full immutable SHA required')
    if not re.fullmatch(r'[A-Za-z0-9_-]{16,80}', packet['nonce']):
        raise Rejected('Invalid single-use nonce')
    if packet['environment'] != 'production' or packet['action'] != 'deploy':
        raise Rejected('Unknown environment/action')
    if pr['number'] != packet['pr'] or pr['base']['repo']['full_name'] != packet['repository']:
        raise Rejected('PR/repository mismatch')
    if pr['state'] != 'open' or pr['draft'] or pr['head']['sha'] != packet['sha']:
        raise Rejected('PR must be ready/open at the exact approved head')
    if pr['base']['ref'] != 'main' or pr['head']['repo']['full_name'] != packet['repository']:
        raise Rejected('Only same-repository main-target PRs are eligible')
    if pr['user']['id'] == owner_id:
        raise Rejected('Shared author/approver identity cannot prove independent approval')
    owner_reviews = sorted((r for r in reviews if r['user']['id'] == owner_id and r['user']['login'] == owner_login), key=lambda r:r['id'])
    # COMMENT is never approval. The latest decision supersedes prior approval.
    decisions = [r for r in owner_reviews if r['state'] in {'APPROVED','CHANGES_REQUESTED','DISMISSED'}]
    if not decisions or decisions[-1]['state'] != 'APPROVED':
        raise Rejected('No current authenticated owner APPROVED review')
    approval = decisions[-1]
    if approval['commit_id'] != packet['sha']:
        raise Rejected('Approval is stale')
    try:
        payload = json.loads(approval['body'])
    except (TypeError, json.JSONDecodeError) as exc:
        raise Rejected('Approval review must contain the exact JSON packet') from exc
    if payload != packet:
        raise Rejected('Approval packet mismatch')
    approved_at = dt.datetime.fromisoformat(approval['submitted_at'].replace('Z','+00:00'))
    if not dt.timedelta(0) <= now-approved_at <= dt.timedelta(hours=24):
        raise Rejected('Approval expired or is future-dated')
    eligible = [r for r in runs if r['head_sha'] == packet['sha'] and r['path'] == workflow_path and r['repository']['full_name'] == packet['repository'] and r['event'] in {'pull_request','push'}]
    if not eligible:
        raise Rejected('No trusted verification workflow at exact SHA')
    latest = max(eligible, key=lambda r:(r['run_number'],r.get('run_attempt',1)))
    if latest['status'] != 'completed' or latest['conclusion'] != 'success':
        raise Rejected('Latest verification workflow did not pass')
    return {'review_id': approval['id'], 'run_id': latest['id'], **packet}

def consume(db, receipt):
    """Private dry-run ledger only; never Git-tracked, never a deploy token."""
    with sqlite3.connect(db) as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS receipts (nonce TEXT PRIMARY KEY, review_id INTEGER UNIQUE, receipt TEXT NOT NULL)')
        try:
            conn.execute('INSERT INTO receipts VALUES (?,?,?)', (receipt['nonce'],receipt['review_id'],json.dumps(receipt)))
        except sqlite3.IntegrityError as exc:
            raise Rejected('Approval already consumed') from exc

def api(path):
    return json.loads(subprocess.check_output(['gh','api',path],text=True))

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('packet',type=pathlib.Path)
    p.add_argument('--owner-login',required=True)
    p.add_argument('--owner-id',type=int,required=True)
    p.add_argument('--workflow-path',required=True)
    p.add_argument('--consume-dry-run',type=pathlib.Path)
    a=p.parse_args()
    packet=json.loads(a.packet.read_text())
    repo=packet['repository']; number=packet['pr']
    # Validate URL components before any authenticated API request.
    if not re.fullmatch(r'2NspiraOpsTeam/[A-Za-z0-9_.-]+',repo) or type(number) is not int or number<1 or not re.fullmatch(r'[a-f0-9]{40}',packet['sha']):
        raise Rejected('Invalid repository/PR')
    pr=api(f'repos/{repo}/pulls/{number}')
    reviews=[];page=1
    while True:
        batch=api(f'repos/{repo}/pulls/{number}/reviews?per_page=100&page={page}');reviews+=batch
        if len(batch)<100:break
        page+=1
    runs=api(f'repos/{repo}/actions/runs?head_sha={packet["sha"]}&per_page=100')['workflow_runs']
    receipt=validate(packet,pr,reviews,runs,owner_login=a.owner_login,owner_id=a.owner_id,workflow_path=a.workflow_path,now=dt.datetime.now(dt.timezone.utc))
    # Re-read head to catch changes during evidence collection. No write follows.
    if api(f'repos/{repo}/pulls/{number}')['head']['sha'] != packet['sha']:
        raise Rejected('Head changed during verification')
    if a.consume_dry_run: consume(a.consume_dry_run,receipt)
    print(json.dumps({'dry_run_only':True,'deploy_authorized':False,'receipt':receipt}))

if __name__=='__main__':
    main()
