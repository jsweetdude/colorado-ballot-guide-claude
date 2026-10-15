// Prints, for every candidate, the statements with no known position, how many
// more positions would carry them over the ranking threshold, and a research
// priority. Markdown on stdout; `--json` prints the same as JSON.
//
//   node scripts/gap-list.mjs > research/gap-list-2026-10-16.md
//
// The ranking rule (src/lib/match.ts): a candidate is ranked when known on at
// least a third of the statements the visitor answered, and at least 2. For a
// visitor who answers everything in the race's statement set of size B, that is
// max(ceil(B / 3), 2) known positions.
//
// Priority, from the gap-fill brief:
//   1  major-party challengers in CD2, CD3, CD4, CD6, CD7 and CD8, and both
//      major-party treasurer candidates
//   2  every other major-party candidate below the threshold (incumbents below
//      the bar in the priority-1 districts land here, sorted by shortfall)
//   3  CU Regent and State Board of Education candidates
//   4  minor-party and unaffiliated candidates
//   -  already over the threshold (listed last, for completeness)
import { readFileSync } from 'node:fs';
import { CONFIDENCE_RULES } from '../src/lib/match.ts';

const data = new URL('../src/data/', import.meta.url).pathname;
const races = JSON.parse(readFileSync(`${data}races.json`, 'utf8')).races;
const statements = JSON.parse(readFileSync(`${data}statements.json`, 'utf8'));
const byId = new Map(statements.map((s) => [s.id, s]));
const MAJOR = new Set(['Democratic Party', 'Republican Party']);
const PRIORITY_RACES = new Set(['us-house-2', 'us-house-3', 'us-house-4', 'us-house-6', 'us-house-7', 'us-house-8']);

export function threshold(base) {
  return Math.max(Math.ceil(base * CONFIDENCE_RULES.rankableShare - 1e-9), CONFIDENCE_RULES.rankableMinimum);
}

export function gapList() {
  const rows = [];
  for (const r of races) {
    const base = r.statements ?? statements.map((s) => s.id);
    const need = threshold(base.length);
    for (const rc of r.candidates) {
      const c = JSON.parse(readFileSync(`${data}candidates/${rc.id}.json`, 'utf8'));
      const known = new Set(c.positions.map((p) => p.statement));
      const knownInRace = base.filter((id) => known.has(id)).length;
      const missing = base.filter((id) => !known.has(id));
      const shortfall = Math.max(need - knownInRace, 0);
      const major = MAJOR.has(c.party);
      let priority;
      if (shortfall === 0) priority = null;
      else if (r.tier === 'B') priority = 3;
      else if (!major) priority = 4;
      else if ((PRIORITY_RACES.has(r.id) && !c.incumbent) || r.id === 'treasurer') priority = 1;
      else priority = 2;
      rows.push({ race: r.id, office: r.short ?? r.office, id: c.id, name: c.name, party: c.party, incumbent: c.incumbent, base: base.length, known: knownInRace, need, shortfall, priority, missing });
    }
  }
  rows.sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9) || a.shortfall - b.shortfall || a.race.localeCompare(b.race));
  return rows;
}

const rows = gapList();
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
  const racesBelow = {};
  for (const r of races) racesBelow[r.id] = rows.filter((x) => x.race === r.id);
  console.log(`# Gap list\n\nGenerated ${today} by \`scripts/gap-list.mjs\`. A candidate ranks for a visitor who answers every statement when known on at least a third of the race's statements (and at least 2). "Need" is that bar; "short" is how many more sourced positions would clear it.\n`);
  console.log('## Per-race ranking status\n\n| Race | Candidates over the bar | Below |\n|---|---|---|');
  for (const [race, xs] of Object.entries(racesBelow)) {
    const over = xs.filter((x) => x.shortfall === 0).map((x) => `${x.name} (${x.known}/${x.base})`);
    const under = xs.filter((x) => x.shortfall > 0).map((x) => `${x.name} (${x.known}/${x.base}, short ${x.shortfall})`);
    console.log(`| ${race} | ${over.join(', ') || 'none'} | ${under.join(', ') || 'none'} |`);
  }
  let last = null;
  for (const x of rows) {
    const label = x.priority == null ? 'Already over the threshold' : `Priority ${x.priority}`;
    if (label !== last) {
      console.log(`\n## ${label}\n`);
      last = label;
    }
    console.log(`### ${x.name} (${x.party.replace(' Party', '')}, ${x.race}${x.incumbent ? ', incumbent' : ''})\n`);
    console.log(`Known ${x.known} of ${x.base}; needs ${x.need}; short ${x.shortfall}.\n`);
    if (x.missing.length) {
      console.log('Unknown statements:\n');
      for (const id of x.missing) console.log(`- \`${id}\`: ${byId.get(id).text}`);
      console.log('');
    }
  }
}
