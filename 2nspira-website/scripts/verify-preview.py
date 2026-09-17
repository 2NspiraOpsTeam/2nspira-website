"""Check live preview routes and legal-copy parity against the published Wix site."""
import json
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

BASE = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'https://2nspira-website-preview.jcortez-36a.workers.dev'
ROOT = Path(__file__).resolve().parents[1]

class MainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.parts = []
        self.h1 = 0
        self.canonical = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.active = True
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
    def handle_endtag(self, tag):
        if tag == 'main':
            self.active = False
    def handle_data(self, data):
        if self.active:
            self.parts.append(data)

def normalize(text):
    return re.sub(r'[\s\u200b]+', '', text)

def fetch(url):
    with tempfile.TemporaryDirectory() as folder:
        headers = Path(folder) / 'headers'
        body = Path(folder) / 'body'
        status = subprocess.check_output(['curl', '-sS', '--max-time', '30', '-D', str(headers), '-o', str(body), '-w', '%{http_code}', url], text=True)
        return int(status), headers.read_text(), body.read_text()

routes = ['', '/services', '/about', '/insights', '/contact', '/resources', '/resources/strength-profile', '/resources/ai-readiness-scorecard', '/ai-enablement', '/fractional-cio', '/privacy-policy', '/terms-conditions', '/refund-cancellation', '/copyright', '/books', '/blog/categories/trust-is-the-operating-system']
posts = json.loads((ROOT / 'src/content/posts/index.json').read_text())
routes += ['/post/' + post['slug'] for post in posts]
for route in routes:
    status, headers, body = fetch(BASE + (route or '/'))
    parsed = MainText()
    parsed.feed(body)
    assert status == 200, (route, status)
    assert 'x-robots-tag: noindex, nofollow' in headers.lower(), route
    assert parsed.h1 == 1, (route, 'H1 count', parsed.h1)
    assert parsed.canonical.rstrip('/') == 'https://www.2nspira.com' + route, (route, parsed.canonical)
    print('PASS route', route or '/')
for slug in ['privacy-policy', 'terms-conditions', 'refund-cancellation', 'copyright']:
    content = json.loads((ROOT / 'src/content/legal' / (slug + '.json')).read_text())
    source_status, _, source_body = fetch(content['source'])
    assert source_status == 200
    source = MainText()
    source.feed(source_body)
    captured = normalize(''.join(block['text'] for block in content['blocks']))
    assert normalize(''.join(source.parts)) == captured, (slug, 'source text changed or capture incomplete')
    _, _, preview_body = fetch(BASE + '/' + slug)
    preview = MainText()
    preview.feed(preview_body)
    assert normalize(''.join(preview.parts)) == captured + 'Contact2Nspira', (slug, 'rendered text differs')
    print('PASS published/source/rendered legal text', slug)
status, _, robots = fetch(BASE + '/robots.txt')
assert status == 200 and 'Disallow: /' in robots
status, _, sitemap = fetch(BASE + '/sitemap.xml')
assert status == 200
for route in routes:
    assert 'https://www.2nspira.com' + route in sitemap
assert fetch(BASE + '/missing-migration-qa-page')[0] == 404
print('PASS robots, sitemap and 404')

for old, new in [('/blog', '/insights'), ('/our-story', '/about')]:
    status, headers, _ = fetch(BASE + old)
    assert status == 308 and ('location: ' + new) in headers.lower(), (old, status, headers)
    print('PASS permanent redirect', old, new)
assert fetch(BASE + '/post/missing-article')[0] == 404
print('PASS unknown article 404')
