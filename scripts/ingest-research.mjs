// Merges research files (one JSON per candidate, written to the protocol in
// scripts/research-protocol.md) into src/data/candidates/.
//
//   node scripts/ingest-research.mjs <research-dir> [candidate-id ...]
//
// It never invents data. It only normalizes: takes race and party from the
// official roster, adds any cited URL missing from `sources`, drops positions
// on unknown statements or duplicates, caps inferred and interest-group
// positions at 2 to 4 (noting it), and keeps FEC finance already in place.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [dir, ...only] = process.argv.slice(2);
if (!dir) {
  console.error('usage: node scripts/ingest-research.mjs <research-dir> [id ...]');
  process.exit(1);
}
const data = new URL('../src/data/', import.meta.url).pathname;
const races = JSON.parse(readFileSync(join(data, 'races.json'), 'utf8'));
const statements = new Set(JSON.parse(readFileSync(join(data, 'statements.json'), 'utf8')).map((s) => s.id));
const roster = new Map();
for (const r of races.races) for (const c of r.candidates) roster.set(c.id, { ...c, race: r.id });

const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
const RANK = { recorded_vote: 0, sponsored_bill: 1, questionnaire: 2, direct_statement: 2, interest_group_rating: 3, inferred: 4 };
const ALLOWED = new Set(['id', 'name', 'race', 'party', 'incumbent', 'profile', 'website', 'running_mate', 'summary', 'experience', 'education_focus', 'record', 'positions', 'endorsements', 'finance', 'sources', 'last_checked', 'research_notes', 'verification']);
const isUrl = (u) => typeof u === 'string' && /^https?:\/\/\S+$/.test(u);
const isDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
const host = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
};

// Research notes say when a date is approximate; record that so pages never show a placeholder as a real date.
function dateBasis(note) {
  const n = (note ?? '').toLowerCase();
  if (/access(ed)? date|date (shown|given) is the (page|research)|dated to (the )?(page )?access|research access|page access/.test(n)) return 'accessed';
  if (/only (the )?year|year only|year is known|placeholder|month\/day unknown|month and day|month\/year estimated|year-only|cycle on ballotpedia/.test(n)) return 'year';
  if (/approximate date|date is approximate|approximately dated|estimated|first of the month/.test(n)) return 'month';
  return null;
}

const files = readdirSync(dir).filter((f) => f.endsWith('.json') && (!only.length || only.includes(f.replace(/\.json$/, ''))));
const report = [];
for (const f of files) {
  const id = f.replace(/\.json$/, '');
  const notes = [];
  let c;
  try {
    c = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  } catch (e) {
    report.push(`${id}: SKIPPED, invalid JSON (${e.message})`);
    continue;
  }
  const r = roster.get(id);
  if (!r) {
    report.push(`${id}: SKIPPED, not on the roster`);
    continue;
  }
  for (const k of Object.keys(c)) if (!ALLOWED.has(k)) {
    notes.push(`dropped field ${k}`);
    delete c[k];
  }
  c.id = id;
  c.race = r.race;
  c.party = r.party;
  c.profile = r.profile;
  c.name = c.name || r.name;
  c.incumbent = typeof c.incumbent === 'boolean' ? c.incumbent : r.incumbent;
  c.website = isUrl(c.website) ? c.website : null;
  c.summary = (c.summary ?? []).filter((s) => s?.text && isUrl(s.source_url));
  c.experience = (c.experience ?? []).filter((s) => s?.text && isUrl(s.source_url));
  if (c.education_focus) c.education_focus = c.education_focus.filter((s) => s?.text && isUrl(s.source_url));
  if (r.running_mate) {
    const rm = c.running_mate ?? {};
    c.running_mate = { name: rm.name || r.running_mate, summary: (rm.summary ?? []).filter((s) => s?.text && isUrl(s.source_url)) };
  } else delete c.running_mate;
  c.record = (c.record ?? [])
    .filter((x) => x?.title && isUrl(x.source_url))
    .map((x) => ({
      kind: ['recorded_vote', 'sponsored_bill', 'decision'].includes(x.kind) ? x.kind : 'decision',
      title: x.title,
      date: isDate(x.date) ? x.date : null,
      detail: x.detail ?? '',
      source_url: x.source_url,
      ...(x.via ? { via: x.via } : {}),
    }));
  c.endorsements = (c.endorsements ?? []).filter((e) => e?.name && isUrl(e.source_url)).map((e) => ({ name: e.name, source_url: e.source_url }));

  // Positions: one per statement, strongest source type first.
  const byStatement = new Map();
  for (const p of c.positions ?? []) {
    if (!statements.has(p.statement)) {
      notes.push(`dropped position on unknown statement ${p.statement}`);
      continue;
    }
    if (!isUrl(p.source_url) || !p.quote || !Number.isInteger(p.value) || p.value < 1 || p.value > 5) {
      notes.push(`dropped malformed position on ${p.statement}`);
      continue;
    }
    if (!isDate(p.date)) {
      notes.push(`dropped undated position on ${p.statement}`);
      continue;
    }
    const pos = {
      statement: p.statement,
      value: p.value,
      source_type: RANK[p.source_type] == null ? 'inferred' : p.source_type,
      source_url: p.source_url,
      source_title: p.source_title || host(p.source_url),
      date: p.date,
      quote: String(p.quote).trim(),
      ...(p.note ? { note: p.note } : {}),
      ...(p.via ? { via: p.via } : {}),
    };
    const basis = p.date_basis ?? dateBasis(p.note);
    if (basis && basis !== 'exact') pos.date_basis = basis;
    if (['inferred', 'interest_group_rating'].includes(pos.source_type) && (pos.value === 1 || pos.value === 5)) {
      pos.value = pos.value === 5 ? 4 : 2;
      pos.note = `${pos.note ? `${pos.note} ` : ''}(Coded no stronger than ${pos.value === 4 ? 'agree' : 'disagree'} because the source is ${pos.source_type === 'inferred' ? 'an inference' : 'an interest-group rating'}.)`;
      notes.push(`capped ${pos.statement} to ${pos.value}`);
    }
    const prev = byStatement.get(p.statement);
    if (!prev || RANK[pos.source_type] < RANK[prev.source_type] || (RANK[pos.source_type] === RANK[prev.source_type] && pos.date > prev.date)) {
      if (prev) notes.push(`kept one of two positions on ${p.statement}`);
      byStatement.set(p.statement, pos);
    }
  }
  c.positions = [...byStatement.values()];

  // Finance: keep FEC numbers already merged for federal candidates.
  const target = join(data, 'candidates', f);
  const existing = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')) : null;
  if (existing?.finance?.source_name === 'Federal Election Commission') c.finance = existing.finance;
  else if (c.finance && !(isUrl(c.finance.source_url) && isDate(c.finance.as_of))) {
    notes.push('dropped finance without source or date');
    c.finance = null;
  } else if (c.finance) {
    c.finance = {
      raised: Number.isFinite(c.finance.raised) ? Math.round(c.finance.raised) : null,
      spent: Number.isFinite(c.finance.spent) ? Math.round(c.finance.spent) : null,
      cash_on_hand: Number.isFinite(c.finance.cash_on_hand) ? Math.round(c.finance.cash_on_hand) : null,
      as_of: c.finance.as_of,
      source_url: c.finance.source_url,
      source_name: c.finance.source_name || host(c.finance.source_url),
      ...(c.finance.note ? { note: c.finance.note } : {}),
    };
  } else c.finance = null;

  // Sources: every cited URL listed once.
  const sources = new Map();
  for (const s of c.sources ?? []) if (isUrl(s?.url)) sources.set(s.url, { title: s.title || host(s.url), url: s.url, accessed: isDate(s.accessed) ? s.accessed : TODAY });
  const cited = [
    c.website,
    ...c.summary.map((s) => s.source_url),
    ...c.experience.map((s) => s.source_url),
    ...(c.education_focus ?? []).map((s) => s.source_url),
    ...(c.running_mate?.summary ?? []).map((s) => s.source_url),
    ...c.record.map((s) => s.source_url),
    ...c.positions.map((s) => s.source_url),
    ...c.endorsements.map((s) => s.source_url),
    c.finance?.source_url,
  ].filter(isUrl);
  for (const u of cited) if (!sources.has(u)) sources.set(u, { title: host(u), url: u, accessed: TODAY });
  c.sources = [...sources.values()];
  if (!c.summary.length) {
    c.summary = [{ text: `${r.name} is on the ballot for this race as the ${r.party === 'Unaffiliated' ? 'unaffiliated' : r.party} candidate.`, source_url: races.source }];
    if (!sources.has(races.source)) c.sources.push({ title: 'Colorado Secretary of State, 2026 General Election Official Candidate List', url: races.source, accessed: TODAY });
    notes.push('no sourced summary; used the SoS listing');
  }
  c.last_checked = isDate(c.last_checked) ? c.last_checked : TODAY;
  delete c.verification;

  const ordered = {};
  for (const k of ['id', 'name', 'race', 'party', 'incumbent', 'profile', 'website', 'running_mate', 'summary', 'experience', 'education_focus', 'record', 'positions', 'endorsements', 'finance', 'sources', 'last_checked', 'research_notes'])
    if (c[k] !== undefined) ordered[k] = c[k];
  writeFileSync(target, `${JSON.stringify(ordered, null, 2)}\n`);
  report.push(`${id}: ${c.positions.length} positions, ${c.record.length} record items, ${c.sources.length} sources${notes.length ? ` | ${notes.join('; ')}` : ''}`);
}
console.log(report.join('\n'));
