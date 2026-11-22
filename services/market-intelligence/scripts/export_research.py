#!/usr/bin/env python3
"""Export authenticated research to a secret-free, version-controlled recovery archive."""
import argparse
import hashlib
import json
from pathlib import Path
from client import request


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')


def export(config, target):
    runs = request(config, '/v1/runs')['results']
    # /runs is bounded to 100; fail rather than publish a silently partial archive.
    if len(runs) >= 100:
        raise RuntimeError('Run pagination required before exporting 100+ revisions')
    current = request(config, '/v1/opportunities?limit=100')['results']
    if len(current) >= 100:
        raise RuntimeError('Opportunity pagination required before exporting 100+ records')
    records = []
    for row in current:
        records.append(request(config, '/v1/opportunities/' + row['candidate_id']))
    save(target / 'current.json', {'source': config['endpoint'], 'opportunities': records})
    for run in runs:
        run_id = run['run_id']
        versions = []
        # Historical IDs are discovered from the original register documents below,
        # not solely from the current opportunity list.
        docs = request(config, '/v1/runs/' + run_id + '/documents')['results']
        names = []
        candidates = set()
        for meta in docs:
            doc = request(config, '/v1/runs/' + run_id + '/documents/' + meta['name'])
            content = doc['content']
            if hashlib.sha256(content.encode()).hexdigest() != meta['sha256']:
                raise RuntimeError('Document integrity failure')
            dest = target / 'runs' / run_id / meta['name']
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(content)
            names.append({'name': meta['name'], 'sha256': meta['sha256']})
            if meta['name'].startswith('opportunity-register') and meta['name'].endswith('.json'):
                candidates.update(r['candidate_id'] for r in json.loads(content)['opportunities'])
        for candidate_id in sorted(candidates):
            history = request(config, '/v1/opportunities/' + candidate_id + '/history')['results']
            versions.extend({'candidate_id': candidate_id, 'observed_at': v['observed_at'],
                             'record': json.loads(v['record_json'])}
                            for v in history if v['run_id'] == run_id)
        save(target / 'runs' / run_id / 'revision.json', {'run': run, 'versions': versions, 'documents': names})
    top = sorted(records, key=lambda x: (-x['record']['score'], x['record']['candidate_id']))
    dashboard = {
        'schema_version': '1.0', 'source': config['endpoint'],
        'source_observed_at': max((r['observed_at'] for r in records), default=None),
        'integration_status': 'snapshot_only_dashboard_not_connected',
        'counts': {'current_opportunities': len(records), 'research_revisions': len(runs)},
        'top_opportunities': [{'candidate_id': r['record']['candidate_id'],
            'title': r['record']['title'], 'score': r['record']['score'],
            'confidence': r['record']['confidence'], 'observed_at': r['observed_at'],
            'run_id': r['run_id']} for r in top[:10]],
        'emerging_trends': {'status': 'insufficient_longitudinal_evidence',
            'note': 'Metadata revisions and score recalibration are not market trends.'},
        'research_activity': [{'run_id': r['run_id'], 'record_version': r['record_version'],
            'observed_at': r['observed_at'], 'imported_at': r['imported_at']} for r in runs],
        'recommendations_requiring_approval': [{'candidate_id': r['record']['candidate_id'],
            'experiment': r['record'].get('experiment'),
            'approval': r['record'].get('research_details', {}).get('approval_reference'),
            'owner_proposal': r['record'].get('owner_proposal')} for r in top],
        'commercial_validation': 'No verified buyer intent or revenue; scores are research prioritization.'
    }
    save(target / 'executive-summary.json', dashboard)
    # Hash only maintained research files, never credential configs or local environment.
    manifest = {}
    for path in sorted(target.rglob('*')):
        if path.is_file() and path.name != 'manifest.json' and path.suffix in {'.json', '.md'}:
            manifest[str(path.relative_to(target))] = hashlib.sha256(path.read_bytes()).hexdigest()
    save(target / 'manifest.json', manifest)
    return {'runs_exported': len(runs), 'current_opportunities': len(records), 'files_hashed': len(manifest)}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('target', type=Path)
    args = p.parse_args()
    config_path = Path.home() / '.config/2nspira-market-intelligence/brian.json'
    if config_path.stat().st_mode & 0o077:
        raise ValueError('Credential config must be private')
    print(json.dumps(export(json.loads(config_path.read_text()), args.target)))


if __name__ == '__main__':
    main()
