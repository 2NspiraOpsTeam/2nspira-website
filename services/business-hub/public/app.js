const $ = id => document.getElementById(id);
const node = (tag, text) => { const n = document.createElement(tag); n.textContent = text; return n; };
async function get(path) {
 const res = await fetch(path, { cache: 'no-store' });
 if (!res.ok) throw new Error(res.status === 403 ? 'Permission denied.' : res.status === 401 ? 'Authentication required.' : 'Data unavailable. Retry by reloading; no zero values inferred.');
 return res.json();
}
const names = { qualified_leads: 'Qualified leads', proposals_awaiting_approval: 'Proposals awaiting approval', contracts_won: 'Contracts won', monthly_recurring_revenue: 'Monthly recurring revenue', projects_delivered: 'Projects delivered' };
try {
 const metrics = await get('/v1/metrics'); $('metrics').replaceChildren();
 for (const [key, label] of Object.entries(names)) {
  const button = node('button', ''); button.className = 'metric';
  button.append(node('strong', label), node('span', metrics[key].value === null ? 'Not connected' : String(metrics[key].value)));
  button.addEventListener('click', () => { $('metric-detail').textContent = `${label}: no verified source is connected, so there is no filtered live record list. Synthetic customer data is available below.`; });
  $('metrics').append(button);
 }
} catch (e) { $('metrics').textContent = e.message; }
let searchVersion = 0, detailVersion = 0;
async function customers() {
 const version = ++searchVersion; ++detailVersion;
 $('customer-status').textContent = 'Loading customers…'; $('customer-list').replaceChildren();
 $('detail').replaceChildren(node('h3', 'Select a customer'));
 try {
  const data = await get(`/v1/customers?q=${encodeURIComponent($('query').value)}`);
  if (version !== searchVersion) return;
  $('customer-status').textContent = data.results.length ? `${data.results.length} synthetic customer result(s).` : 'No matching customers. Try another search.';
  for (const customer of data.results) {
   const li = node('li', ''), button = node('button', customer.name);
   button.addEventListener('click', () => detail(customer.customer_id)); li.append(button); $('customer-list').append(li);
  }
 } catch (e) { if (version === searchVersion) $('customer-status').textContent = e.message; }
}
async function detail(id) {
 const version = ++detailVersion; $('detail').textContent = 'Loading customer details…';
 try {
  const data = await get(`/v1/customers/${encodeURIComponent(id)}`);
  if (version !== detailVersion) return;
  const container = $('detail'); container.replaceChildren(node('h3', data.customer.name), node('p', `Synthetic fixture · observed ${data.customer.observed_at}`), node('h4', 'Active projects'));
  if (!data.projects.length) container.append(node('p', 'No projects recorded.'));
  for (const p of data.projects) {
   const line = node('p', `${p.name} · ${p.status.replaceAll('_',' ')} · ${p.owner} `);
   const link = node('a', 'GitHub task');
   // Only canonical GitHub links; never turn untrusted URL schemes into active content.
   try { const url = new URL(p.issue_url); if (url.origin === 'https://github.com' && url.pathname.startsWith('/2NspiraOpsTeam/')) { link.href = url.href; line.append(link); } } catch {}
   container.append(line);
  }
  container.append(node('h4', 'Dated notes'));
  for (const n of data.notes) container.append(node('p', `${n.occurred_at} · ${n.actor}: ${n.body}`));
  if (!data.notes.length) container.append(node('p', 'No notes recorded.'));
  container.append(node('p', 'Contacts and financial records are not included in this prototype. QA, approvals and last-night agent execution are not connected.'));
 } catch (e) { if (version === detailVersion) $('detail').textContent = e.message; }
}
$('search').addEventListener('submit', e => { e.preventDefault(); customers(); }); await customers();
try {
 const snapshot = await get('/research-snapshot.json');
 const date = new Date(snapshot.source_observed_at);
 const stale = !Number.isFinite(date.getTime()) || Date.now() - date.getTime() > 24 * 3600 * 1000;
 $('research-status').textContent = `${stale ? 'Stale snapshot' : 'Dated snapshot'} · source observation: ${snapshot.source_observed_at}. ${snapshot.emerging_trends.note} Not live.`;
 function render() {
  $('opportunities').replaceChildren();
  const matches = snapshot.top_opportunities.filter(o => o.title.toLowerCase().includes($('research-query').value.toLowerCase()));
  for (const o of matches) {
   const card = node('article',''); card.className = 'card';
   card.append(node('small', o.candidate_id),node('h3', o.title),node('p', `Research score ${o.score}/100 — not revenue`),node('p', o.confidence),node('small', `Observed ${o.observed_at} · ${o.run_id}`));
   $('opportunities').append(card);
  }
  if (!matches.length) $('opportunities').append(node('p', 'No matching archived opportunities.'));
 }
 $('research-query').addEventListener('input',render); render();
} catch (e) { $('research-status').textContent = e.message; }
