// Builds research files for scripts/ingest-research.mjs from an additions file:
// each entry names a candidate and the positions (and any sources or notes) to
// add on top of the candidate's current data file. Existing positions on the
// same statement are kept unless the addition's source type ranks higher
// (ingest keeps the stronger source). Nothing here invents data; every
// position must already carry a fetched source, a verbatim quote and a date.
//
//   node scripts/merge-positions.mjs <additions.json> <research-dir>
//   node scripts/ingest-research.mjs <research-dir>
//   node scripts/apply-review.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [file, outDir] = process.argv.slice(2);
if (!file || !outDir) {
  console.error('usage: node scripts/merge-positions.mjs <additions.json> <research-dir>');
  process.exit(1);
}
const data = new URL('../src/data/candidates/', import.meta.url).pathname;
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
mkdirSync(outDir, { recursive: true });
const additions = JSON.parse(readFileSync(file, 'utf8'));
for (const a of additions) {
  const path = join(data, `${a.id}.json`);
  if (!existsSync(path)) {
    console.error(`${a.id}: no such candidate`);
    continue;
  }
  const target = join(outDir, `${a.id}.json`);
  const c = JSON.parse(readFileSync(existsSync(target) ? target : path, 'utf8'));
  for (const p of a.positions ?? []) {
    for (const k of ['statement', 'value', 'source_type', 'source_url', 'source_title', 'date', 'quote'])
      if (p[k] == null) throw new Error(`${a.id}/${p.statement}: missing ${k}`);
    c.positions.push(p);
    if (!c.sources.some((s) => s.url === p.source_url)) c.sources.push({ title: p.source_title, url: p.source_url, accessed: p.accessed ?? TODAY });
  }
  for (const r of a.record ?? []) {
    c.record.push(r);
    if (!c.sources.some((s) => s.url === r.source_url)) c.sources.push({ title: r.title, url: r.source_url, accessed: TODAY });
  }
  for (const e of a.endorsements ?? []) if (!c.endorsements.some((x) => x.name === e.name)) c.endorsements.push(e);
  if (a.note) c.research_notes = `${c.research_notes ? `${c.research_notes} ` : ''}Gap fill ${TODAY}: ${a.note}`;
  c.last_checked = TODAY;
  writeFileSync(target, `${JSON.stringify(c, null, 2)}\n`);
  console.log(`${a.id}: +${(a.positions ?? []).length} positions -> ${target}`);
}
