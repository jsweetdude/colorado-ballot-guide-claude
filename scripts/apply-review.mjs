// Corrections made in the build review, applied after every research ingest so
// a later research pass cannot quietly undo them. Each entry says why. Safe to
// run more than once.
//   node scripts/apply-review.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../src/data/candidates/', import.meta.url).pathname;
const TODAY = '2026-10-14';
const MARX_Q =
  'How do you plan to vote on Initiatives 108, 109 and 110, which would, respectively, make child sex trafficking punishable by life in prison without the possibility of parole; prohibit transgender kids and college students from participating in gendered sports that do not align with their biological sex; and prohibit surgery on a child for the purpose of altering their biological sex characteristics. [Victor Marx:] Yes.';
const DP3 = 'https://www.denverpost.com/2026/10/03/colorado-u-s-house-district-3-candidate-qa/';

const edits = [
  // Website and source fixes
  { id: 'christy-peterson', why: 'Listed site is a hacked page serving gambling spam', website: null, dropSources: /christyforamerica/ },
  { id: 'lauren-boebert', why: 'www host does not resolve; bare domain is the live campaign site', website: 'https://laurenforcolorado.com', replaceUrl: ['https://www.laurenforcolorado.com', 'https://laurenforcolorado.com'] },
  // Quote fixes: no joining across attributions; show the question for a bare "Yes"
  { id: 'victor-marx', why: 'Single "Yes" to a three-part question', set: { 'sports-biological-sex': { quote: MARX_Q }, 'minor-gender-surgery-ban': { quote: MARX_Q } } },
  { id: 'victor-marx', why: 'Quote had been joined across "said Marx"', set: { 'abortion-legal': { quote: 'I’m a child advocate, always have been ... It’d be hypocritical for me not to protect children in the womb who are humans. So there’s only two choices — life or death — and I am for life.' } } },
  { id: 'jason-crow', why: 'Ballotpedia table cell text', set: { 'fentanyl-penalties': { quote: 'Colorado Proposition 132, Penalties for Fentanyl Sale and Possession Initiative (2026) [source] Oppose' } } },
  // Coding corrections
  { id: 'phil-weiser', why: 'Said in June he would listen to both sides before deciding: undecided is unknown', drop: ['hunting-right'] },
  { id: 'phil-weiser', why: 'General defense of gender-affirming care; surgery not addressed (coding guide)', set: { 'minor-gender-surgery-ban': { source_type: 'inferred' } } },
  { id: 'jena-griswold', why: 'Backed emergency mid-decade redistricting, the opposite side of Amendment 86', set: { 'redistricting-commission': { value: 2, note: 'The article reports she supported a proposed initiative to allow emergency mid-decade redistricting, which is the opposite of the statement (Amendment 86 makes off-cycle redistricting harder). Coded disagree. Corrected in build review on 2026-10-14; the first pass had coded it as agree.' } } },
  { id: 'brittany-pettersen', why: 'Immigration consistency rule', set: { 'deportation-priority': { value: 2, note: 'Supports deporting convicted, dangerous criminals while opposing current broad enforcement; coded disagree, the same as other candidates who take this position.' } } },
  { id: 'manny-rutinel', why: 'Immigration consistency rule', set: { 'deportation-priority': { value: 2, note: 'Supports deporting people convicted of serious crimes while opposing broader deportation; coded disagree, the same as other candidates who take this position.' } } },
  { id: 'jeff-hurd', why: 'Record points both ways', set: { 'health-coverage': { value: 3, source_type: 'questionnaire', source_url: DP3, source_title: 'Colorado U.S. House District 3 candidate Q&A (The Denver Post)', date: '2026-10-03', date_basis: undefined, quote: 'Rural Coloradans often have fewer health care options and higher costs. I worked across the aisle and voted to extend enhanced premium tax credits while Congress pursues lasting reforms.', note: 'Coded as mixed: he also supports Medicaid work requirements for able-bodied adults (Aspen Times Q&A, October 7, 2026) and voted for H.R. 1, which reduced Medicaid spending.' } }, addSource: { title: 'Colorado U.S. House District 3 candidate Q&A (The Denver Post)', url: DP3 } },
  // Inferences that do not name the policy area
  { id: 'jeff-crank', why: 'Border-security quote does not address sentencing', drop: ['fentanyl-penalties'] },
  { id: 'clifton-brown', why: 'Forest protection does not address land ownership', drop: ['public-lands'] },
  { id: 'susan-hall', why: 'Defense spending does not address fentanyl sentencing', drop: ['fentanyl-penalties'] },
  { id: 'joe-krzeczkowski', why: 'Policing roles do not address fentanyl sentencing', drop: ['fentanyl-penalties'] },
  { id: 'chad-humphrey', why: 'Marijuana liberty statement does not address fentanyl sentencing', drop: ['fentanyl-penalties'] },
  { id: 'dan-sallis', why: 'General principles do not name these policy areas', drop: ['fentanyl-penalties', 'abortion-legal'] },
  { id: 'stephen-hamilton', why: 'Neutral wording', set: { 'keep-tariffs': { note: 'His survey response covers many topics; most of it does not map onto the 25 statements, so only a few positions are coded.' } } },
  // The Denver Post asked whether more federal land should be opened to oil and gas drilling. That is about drilling
  // (see clean-energy-shift), not about keeping land in federal ownership, which is what public-lands asks.
  ...['christy-peterson', 'dave-wood', 'gabe-evans', 'manny-rutinel', 'melat-kiros', 'samir-witta', 'shimon-blau'].map((id) => ({ id, why: 'Drilling answer is not an ownership position', drop: ['public-lands'] })),
  { id: 'jason-clark', why: 'Record points both ways', set: { 'deportation-priority': { value: 3, note: 'In the same interview he said immigration enforcement "has been reckless" and that he supports the agents and the detention facility; coded as mixed.' } } },
  // Record items: votes, bills and official decisions only, in neutral words
  { id: 'gabe-evans', why: 'A roundtable is an event, not a decision', dropRecord: /^Hosted CMS/ },
  { id: 'jena-griswold', why: 'Neutral wording', renameRecord: [/^Championed election-security legislation as Secretary of State$/, 'Election-security legislation backed as Secretary of State'] },
];

const touched = new Map();
const load = (id) => touched.get(id) ?? JSON.parse(readFileSync(`${dir}${id}.json`, 'utf8'));
for (const e of edits) {
  const c = load(e.id);
  if ('website' in e) c.website = e.website;
  if (e.dropSources) c.sources = c.sources.filter((s) => !e.dropSources.test(s.url));
  if (e.replaceUrl) {
    const [from, to] = e.replaceUrl;
    c.sources = c.sources.map((s) => (s.url === from ? { ...s, url: to } : s));
  }
  if (e.drop) c.positions = c.positions.filter((p) => !e.drop.includes(p.statement));
  for (const [st, patch] of Object.entries(e.set ?? {})) {
    const p = c.positions.find((x) => x.statement === st);
    if (!p) continue;
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined) delete p[k];
      else p[k] = v;
    }
  }
  if (e.addSource && !c.sources.some((s) => s.url === e.addSource.url)) c.sources.push({ ...e.addSource, accessed: TODAY });
  if (e.dropRecord) c.record = c.record.filter((r) => !e.dropRecord.test(r.title));
  if (e.renameRecord) for (const r of c.record) if (e.renameRecord[0].test(r.title)) r.title = e.renameRecord[1];
  if (e.id === 'gabe-evans') for (const r of c.record) if (r.title.startsWith('STOP') && r.detail.includes(', to curb fraud')) r.detail = `${r.detail.replace(', to curb fraud', '').replace(/\.$/, '')}. Its stated aim is reducing Medicaid fraud.`;
  touched.set(e.id, c);
}
// Public notes: drop research shorthand about dates (the date label already says
// when a date is approximate) and put the rest in plain words.
const DATE_MECHANICS = /placeholder|access(ed)? date|accessed for this research|date reflects|first of the (year|month) is used|date shown is the|month\/year estimated|year only is known|only year known|submission date not shown|exact date not given|dated to (the )?(page )?access/i;
function cleanNote(note) {
  // Split only where sentence punctuation is followed by a space and a capital or quote, so "4.4%" and "U.S." stay whole.
  const sentences = note.split(/(?<=[.!?])\s+(?=[A-Z"'“‘(])/);
  return sentences
    .filter((x) => !DATE_MECHANICS.test(x))
    .join(' ')
    .replace(/[;,]?\s*flagged for review\.?/gi, '.')
    .replace(/\bper protocol\b/gi, 'under this guide’s rules')
    .replace(/\bcapped at 4\b/gi, 'coded no stronger than agree')
    .replace(/\bcapped at 2\b/gi, 'coded no stronger than disagree')
    .replace(/\bper (the )?interest-group-rating rule\b/gi, 'as for all interest-group ratings')
    .replace(/[;,]\./g, '.')
    .replace(/\.\s*\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();
}
const { readdirSync } = await import('node:fs');
let cleaned = 0;
for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const id = f.replace(/\.json$/, '');
  const c = load(id);
  let changed = false;
  for (const p of c.positions) {
    if (!p.note) continue;
    const n = cleanNote(p.note);
    if (n !== p.note) {
      changed = true;
      cleaned++;
      if (n) p.note = n;
      else delete p.note;
    }
  }
  if (changed) touched.set(id, c);
}
console.log(`Cleaned ${cleaned} public notes.`);
for (const [id, c] of touched) writeFileSync(`${dir}${id}.json`, `${JSON.stringify(c, null, 2)}\n`);
console.log(`Applied ${edits.length} review corrections to ${touched.size} candidates.`);
