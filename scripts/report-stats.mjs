// Coverage numbers for REPORT.md. "Full" means known on at least a third of the
// statements used for the candidate's race (so they rank for a visitor who
// answers everything); "partial" is at least one known position but fewer;
// "unknown" is none.
import { readFileSync } from 'node:fs';

const data = new URL('../src/data/', import.meta.url).pathname;
const races = JSON.parse(readFileSync(`${data}races.json`, 'utf8')).races;
const statements = JSON.parse(readFileSync(`${data}statements.json`, 'utf8'));
const rows = [];
const bySource = {};
let verified = 0, unverifiable = 0, totalPositions = 0;
for (const r of races) {
  const base = r.statements ?? statements.map((s) => s.id);
  for (const rc of r.candidates) {
    const c = JSON.parse(readFileSync(`${data}candidates/${rc.id}.json`, 'utf8'));
    const known = c.positions.filter((p) => base.includes(p.statement)).length;
    const level = known === 0 ? 'unknown' : known >= base.length / 3 ? 'full' : 'partial';
    const major = ['Democratic Party', 'Republican Party'].includes(c.party);
    rows.push({ race: r.id, tier: r.tier, id: c.id, name: c.name, party: c.party, major, profile: c.profile, known, base: base.length, all: c.positions.length, level });
    for (const p of c.positions) {
      totalPositions++;
      bySource[p.source_type] = (bySource[p.source_type] ?? 0) + 1;
      const v = c.verification?.detail?.[p.statement];
      if (v === 'found') verified++;
      else unverifiable++;
    }
  }
}
const group = (pred) => {
  const g = rows.filter(pred);
  const n = (l) => g.filter((x) => x.level === l).length;
  return `${g.length} | ${n('full')} | ${n('partial')} | ${n('unknown')}`;
};
console.log('| Group | Candidates | Full | Partial | Unknown |\n|---|---|---|---|---|');
console.log(`| Tier A, major party | ${group((x) => x.tier === 'A' && x.major)} |`);
console.log(`| Tier A, unaffiliated with full profile (Lopez) | ${group((x) => x.tier === 'A' && !x.major && x.profile === 'full')} |`);
console.log(`| Tier A, minor party and other unaffiliated | ${group((x) => x.tier === 'A' && x.profile === 'short')} |`);
console.log(`| Tier B (regents, State Board) | ${group((x) => x.tier === 'B')} |`);
console.log(`| All | ${group(() => true)} |`);
console.log(`\nPositions: ${totalPositions}; quote confirmed on the source page: ${verified}; not confirmed automatically: ${unverifiable}.`);
console.log('Source types:', Object.entries(bySource).map(([k, v]) => `${k} ${v}`).join(', '));
console.log('\n| Race | Candidate | Party | Known / used for race | Level |\n|---|---|---|---|---|');
for (const x of rows) console.log(`| ${x.race} | ${x.name} | ${x.party.replace(' Party', '')} | ${x.known} / ${x.base}${x.base !== 25 ? ` (${x.all} of 25 overall)` : ''} | ${x.level} |`);
