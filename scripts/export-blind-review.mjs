// Exports every sourced position WITHOUT its 1 to 5 code, so a second coder
// (a person or another model) can code each one blind. The two sets of codes
// are then compared. Statement text and coding guide are included so the
// coder works from the same rule the first pass used.
//   node scripts/export-blind-review.mjs > research/codes-for-blind-review.json
import { readFileSync, readdirSync } from 'node:fs';

const data = new URL('../src/data/', import.meta.url).pathname;
const statements = JSON.parse(readFileSync(`${data}statements.json`, 'utf8'));
const byId = new Map(statements.map((s) => [s.id, s]));
const races = JSON.parse(readFileSync(`${data}races.json`, 'utf8')).races;
const raceOf = new Map();
for (const r of races) for (const c of r.candidates) raceOf.set(c.id, r.id);
const items = [];
for (const f of readdirSync(`${data}candidates`).filter((x) => x.endsWith('.json')).sort()) {
  const c = JSON.parse(readFileSync(`${data}candidates/${f}`, 'utf8'));
  for (const p of c.positions) {
    const s = byId.get(p.statement);
    items.push({
      id: `${c.id}/${p.statement}`,
      candidate: c.name,
      candidate_id: c.id,
      party: c.party,
      race: raceOf.get(c.id),
      statement_id: p.statement,
      statement: s.text,
      coding_guide: s.coding_guide,
      quote: p.quote,
      note: p.note ?? null,
      source_url: p.source_url,
      source_title: p.source_title,
      source_type: p.source_type,
      date: p.date,
      date_basis: p.date_basis ?? 'exact',
      ...(p.via ? { via: p.via } : {}),
    });
  }
}
const out = {
  generated: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' }),
  instructions:
    'Code each item on the 5-point scale: 5 strongly agree, 4 agree, 3 explicitly mixed or middle, 2 disagree, 1 strongly disagree, using the coding_guide for the statement. Inferred and interest_group_rating sources may only be coded 2 to 4. Use only the quote, note, source type and date given here; do not look anything up and do not use party. Return a JSON array of {id, code, reason}. The first pass\'s codes are deliberately left out of this file.',
  scale: { 5: 'Strongly agree', 4: 'Agree', 3: 'Mixed or explicitly middle', 2: 'Disagree', 1: 'Strongly disagree' },
  count: items.length,
  items,
};
console.log(JSON.stringify(out, null, 2));
