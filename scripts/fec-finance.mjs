// Pulls 2025-26 cycle totals from the FEC API for every federal candidate in
// src/data/fec-ids.json and writes them into the candidate files.
//   FEC_API_KEY=... node scripts/fec-finance.mjs   (DEMO_KEY works for a single run)
import { readFileSync, writeFileSync } from 'node:fs';

const key = process.env.FEC_API_KEY ?? 'DEMO_KEY';
const data = new URL('../src/data/', import.meta.url).pathname;
const ids = JSON.parse(readFileSync(`${data}fec-ids.json`, 'utf8'));
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
const byFec = new Map();
for (const office of ['H', 'S']) {
  const url = `https://api.open.fec.gov/v1/candidates/totals/?api_key=${key}&election_year=2026&state=CO&office=${office}&per_page=100`;
  // DEMO_KEY is rate-limited; wait and retry on 429 rather than fail.
  let r;
  for (let attempt = 1; attempt <= 4; attempt++) {
    r = await fetch(url);
    if (r.status !== 429) break;
    console.error(`FEC ${office}: HTTP 429, waiting before retry ${attempt}`);
    await new Promise((res) => setTimeout(res, 30000 * attempt));
  }
  if (!r.ok) throw new Error(`FEC ${office}: HTTP ${r.status}`);
  for (const row of (await r.json()).results) byFec.set(row.candidate_id, row);
}
for (const [id, fecId] of Object.entries(ids)) {
  if (id.startsWith('_')) continue;
  const row = byFec.get(fecId);
  const path = `${data}candidates/${id}.json`;
  const c = JSON.parse(readFileSync(path, 'utf8'));
  const page = `https://www.fec.gov/data/candidate/${fecId}/?cycle=2026&election_full=true`;
  if (!row) continue;
  const filed = row.coverage_end_date ? row.coverage_end_date.slice(0, 10) : null;
  c.finance = {
    raised: Math.round(row.receipts ?? 0),
    spent: Math.round(row.disbursements ?? 0),
    cash_on_hand: filed ? Math.round(row.cash_on_hand_end_period ?? 0) : null,
    as_of: filed ?? TODAY,
    source_url: page,
    source_name: 'Federal Election Commission',
    note: filed
      ? `Totals for the 2025-26 election cycle through the latest report the FEC had processed (period ending ${filed}).`
      : `No financial report on file with the FEC as of ${TODAY}. Candidates must file once they raise or spend more than $5,000.`,
  };
  if (!c.sources.some((s) => s.url === page)) c.sources.push({ title: 'FEC candidate financial summary', url: page, accessed: TODAY });
  writeFileSync(path, `${JSON.stringify(c, null, 2)}\n`);
  console.log(`${id}: raised ${c.finance.raised} through ${c.finance.as_of}`);
}
