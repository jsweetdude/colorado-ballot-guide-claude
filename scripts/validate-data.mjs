// Validates every data file against scripts/schema.mjs plus cross-file rules.
// Runs before every build (npm "prebuild"); any error fails the build.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { candidateSchema, measureSchema, racesSchema, statementSchema } from './schema.mjs';

const root = new URL('../src/data/', import.meta.url).pathname;
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const load = (rel) => {
  try {
    return JSON.parse(readFileSync(join(root, rel), 'utf8'));
  } catch (e) {
    fail(rel, `cannot parse: ${e.message}`);
    return null;
  }
};
const check = (schema, data, file) => {
  const r = schema.safeParse(data);
  if (!r.success) for (const i of r.error.issues) fail(file, `${i.path.join('.') || '(root)'}: ${i.message}`);
  return r.success;
};

const statements = load('statements.json') ?? [];
statements.forEach((s, i) => check(statementSchema, s, `statements.json[${i}]`));
const statementIds = new Set(statements.map((s) => s.id));
if (statementIds.size !== statements.length) fail('statements.json', 'duplicate statement ids');
if (statements.length < 20 || statements.length > 25) fail('statements.json', `expected 20 to 25 statements, found ${statements.length}`);

const races = load('races.json');
check(racesSchema, races, 'races.json');
const roster = new Map();
for (const race of races?.races ?? []) {
  if (race.scope === 'congressional' && !race.district) fail('races.json', `${race.id} needs a district`);
  for (const id of race.statements ?? []) if (!statementIds.has(id)) fail('races.json', `${race.id} lists unknown statement ${id}`);
  for (const c of race.candidates) {
    if (roster.has(c.id)) fail('races.json', `candidate ${c.id} listed twice`);
    roster.set(c.id, { race: race.id, ...c });
  }
}

const measureFiles = readdirSync(join(root, 'measures')).filter((f) => f.endsWith('.json'));
const measureIds = new Set();
for (const f of measureFiles) {
  const m = load(`measures/${f}`);
  if (!m) continue;
  check(measureSchema, m, `measures/${f}`);
  if (`${m.id}.json` !== f) fail(`measures/${f}`, `id ${m.id} does not match file name`);
  measureIds.add(m.id);
}
// Every tied measure must exist once the statewide set is complete (14 files plus local issues).
const statewide = [...measureIds].filter((id) => !id.startsWith('issue-')).length;
for (const s of statements)
  for (const link of s.measures)
    if (!measureIds.has(link.id)) {
      if (statewide >= 14) fail('statements.json', `${s.id} links to unknown measure ${link.id}`);
      else console.warn(`warning: ${s.id} links to ${link.id}, which has no file yet`);
    }

const candidateFiles = readdirSync(join(root, 'candidates')).filter((f) => f.endsWith('.json'));
const seen = new Set();
let positions = 0;
for (const f of candidateFiles) {
  const file = `candidates/${f}`;
  const c = load(file);
  if (!c) continue;
  check(candidateSchema, c, file);
  if (`${c.id}.json` !== f) fail(file, `id ${c.id} does not match file name`);
  const r = roster.get(c.id);
  if (!r) fail(file, 'candidate is not in races.json');
  else {
    if (r.race !== c.race) fail(file, `race ${c.race} does not match races.json (${r.race})`);
    if (r.party !== c.party) fail(file, `party ${c.party} does not match races.json (${r.party})`);
  }
  seen.add(c.id);
  const urls = new Set((c.sources ?? []).map((s) => s.url));
  const stmts = new Set();
  for (const p of c.positions ?? []) {
    positions++;
    if (!statementIds.has(p.statement)) fail(file, `position on unknown statement ${p.statement}`);
    if (stmts.has(p.statement)) fail(file, `two positions on ${p.statement}`);
    stmts.add(p.statement);
    if (!urls.has(p.source_url)) fail(file, `position source ${p.source_url} missing from sources list`);
  }
}
for (const id of roster.keys()) if (!seen.has(id)) fail('candidates/', `no file for rostered candidate ${id}`);

if (errors.length) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 200)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `Data OK: ${statements.length} statements, ${races.races.length} races, ${candidateFiles.length} candidates, ${positions} sourced positions, ${measureFiles.length} measures.`,
);
