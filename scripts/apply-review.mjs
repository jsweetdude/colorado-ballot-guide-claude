// Corrections made in the build review and the blind-recode resolution, applied after every research ingest so
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
  // Blind-recode resolutions (2026-10-16). A second model coded all 325 positions without seeing the
  // first-pass values (research/codes-blind-codex.json); every disagreement was resolved from the coding
  // guide, quote, note and source type. The full comparison is research/blind-recode-comparison.md and the
  // rules are DECISIONS.md items 68 to 74. Entries: codes taken from the second coder, strength or source-type
  // corrections that keep the direction, and positions removed because the quote supports none.
  { id: 'blake-huber', why: "DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher", set: { 'deportation-priority': { value: 2, note: "Supports border enforcement focused on genuine threats while opposing enforcement against workers and families; coded disagree, the same as other candidates who take this position." } } },
  { id: 'bob-chew', why: "DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher", set: { 'deportation-priority': { value: 2, note: "Supports deporting people who threaten public safety while opposing deportation of peaceful, working immigrants; coded disagree, the same as other candidates who take this position." } } },
  { id: 'brittany-pettersen', why: "The quote meets only the guide's weakest agree indicator (a limit on new drilling) and carries a qualifier (\"especially when\"); the scale's 5 needs an unqualified statement or a signature issue", set: { 'clean-energy-shift': { value: 4 } } },
  { id: 'celeste-landry', why: "\"In general, we can be proud\" is qualified praise, and the note records that she also proposes limiting electronic ballot return", set: { 'keep-mail-voting': { value: 4 } } },
  { id: 'dwayne-romero', why: "He pledges to \"immediately\" restore the ACA premium tax credits, the guide's first agree example, without qualification", set: { 'health-coverage': { value: 5 } } },
  { id: 'gabe-evans', why: "The quote criticizes Colorado's limits on cooperation without calling for their repeal or for Amendment 81; agree with qualification", set: { 'immigration-notify-ice': { value: 4 } } },
  { id: 'gaylon-kent', why: "\"Doctors and health insurers must be returned to the free market\" is the guide's market-based alternative, stated without qualification", set: { 'health-coverage': { value: 1 } } },
  { id: 'gaylon-kent', why: "\"Let's legalize them\" is unqualified opposition to deporting people already here; the border and citizenship clauses qualify legalization, not deportation, so this is not a mixed record under item 45", set: { 'deportation-priority': { value: 1, note: "Wants secure borders and no citizenship for people here illegally, but says they should be legalized to work rather than treated as criminals; on deportation itself the position is unqualified opposition." } } },
  { id: 'lauren-boebert', why: "\"Never ok\" is categorical; the scale's 5 is a position stated without qualification, and not naming the measure is not a qualification", set: { 'minor-gender-surgery-ban': { value: 5, note: "Calls surgery that alters children's bodies \"never ok\" without qualification; the page does not mention Proposition 135, but the position it states is the one the measure enacts." } } },
  { id: 'manny-rutinel', why: "The sourced bill protects abortion-medication prescribers, a related protection rather than a bill \"doing exactly this\", and he was a cosponsor", set: { 'abortion-legal': { value: 4 } } },
  { id: 'manny-rutinel', why: "The quote opposes Medicaid and ACA cuts (the guide's \"protecting Medicaid\"), but does not itself call for doing more at taxpayer cost", set: { 'health-coverage': { value: 4 } } },
  { id: 'michael-allen', why: "\"Probably fine the way it is now\" defends the current limits, the guide's disagree branch; declining to campaign on the measure is a qualification, not a second direction", set: { 'immigration-notify-ice': { value: 2, note: "Says current law already allows working with federal agencies in criminal cases and is \"probably fine the way it is now\", while leaving the ballot measure to the voters; coded as a qualified defense of the current limits." } } },
  { id: 'phil-weiser', why: "\"Sign, support, and defend responsible gun safety laws\" supports new laws in general terms without naming a restriction; Hickenlooper's 5 names three", set: { 'stricter-gun-laws': { value: 4 } } },
  { id: 'shimon-blau', why: "DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher", set: { 'deportation-priority': { value: 2, note: "Supports deporting people who threaten public safety while opposing broader enforcement and backing legal status for long-term residents; coded disagree, the same as other candidates who take this position." } } },
  { id: 'steve-barton', why: "\"I oppose NN and 87 because both trick voters into killing TABOR\" is unqualified opposition; proposing a different school-funding mechanism does not qualify it, as with Espinoza", set: { 'graduated-income-tax': { value: 1, note: "Opposes Amendment 87 and Proposition NN by name, without qualification; he proposes a minimum education share of the state budget instead." } } },
  { id: 'steve-barton', why: "Take Codex's 1, for the same reason", set: { 'keep-tabor-surplus': { value: 1, note: "Same answer, opposing Proposition NN and Amendment 87 together without qualification." } } },
  { id: 'victor-marx', why: "\"Opening up all forms of energy\" includes renewables; he opposes shutting down fossil production rather than opposing the shift as such, so disagree with qualification", set: { 'clean-energy-shift': { value: 2 } } },
  { id: 'victor-marx', why: "Tougher penalties above a threshold (agree) and treatment diversion (the guide's disagree branch) point both ways, like Pettersen's 2022 law (item 56)", set: { 'fentanyl-penalties': { value: 3, note: "Supports tougher penalties for trafficking above statutory thresholds while expanding treatment diversion for non-violent addiction cases, short of Proposition 132's mandatory prison for any amount; the record points both ways." } } },
  { id: 'victor-marx', why: "The one direction reversal (ours 2, Codex 4)", set: { 'health-coverage': { value: 3, note: "Answering a question about the state's Medicaid funding shortfall, he would pursue an audit and fraud and waste savings rather than new funding, while protecting access for children, pregnant women, seniors and people with disabilities and ruling out across-the-board cuts; the record points both ways." } } },
  { id: 'gabe-evans', why: "The bill adds penalties for counterfeit pills (the fentanyl-pill problem) but is not a bill \"doing exactly this\" (mandatory prison for any amount), so the scale gives 4", set: { 'fentanyl-penalties': { value: 4, note: "Sponsored a federal bill adding penalties for counterfeit pill production, which supports tougher fentanyl penalties without reaching Proposition 132's mandatory prison for selling any amount. The release says combating fentanyl is a top legislative priority for him." } } },
  { id: 'victor-marx', why: "Keep 5, and give it the same question-plus-answer quote the build review gave his sports and surgery positions (item 38): the \"yes\" answered one three-part question covering all three measures", set: { 'child-trafficking-life': { quote: MARX_Q } } },
  { id: 'adam-withrow', why: "The transition call supports the statement, but \"we will continue to use them\" and \"smooth\" are qualifications; 5 needs none", set: { 'clean-energy-shift': { value: 4, note: "Calls fossil fuels obsolete and asks for \"a smooth transition starting today\" to future energy sources, while saying they will continue to be used; agree with qualification." } } },
  { id: 'chad-humphrey', why: "Moving decisions out of Washington supports transfer of control (the disagree branch) but does not say sell or transfer ownership, so it is qualified", set: { 'public-lands': { value: 2, note: "Says decisions about Colorado's public lands should not be made in Washington, which for federal land means moving control to the state; coded disagree with qualification because selling or transferring ownership is not stated." } } },
  { id: 'eric-mulder', why: "A general limit on cooperation defends the current limits, but the serious-crime notification the statement asks about is not addressed, so it is qualified", set: { 'immigration-notify-ice': { value: 2, note: "Supports limiting state cooperation with federal agencies on privacy and due-process grounds, answering Vote411's immigration question, and calls ICE's wrongful arrests inexcusable; coded disagree with qualification because notification in serious-crime cases is not addressed." } } },
  { id: 'jeff-crank', why: "He criticized one lawsuit as wasteful (the guide's disagree branch); the statement is about the state's lawsuits generally, so the scale gives 2", set: { 'challenge-federal-policies': { value: 2, note: "Called the state's lawsuit over the relocation of Space Command \"constitutionally laughable\" and said the money should go to more productive uses, while disagreeing with the relocation itself; one lawsuit rather than the state's litigation in general, so disagree with qualification." } } },
  { id: 'christy-peterson', why: "Opposing the ACA mandate names the policy area but implies rather than states a position on expanding coverage; the note had stacked her general limited-government philosophy on top, which item 48 does not allow", set: { 'health-coverage': { source_type: "inferred", note: "Opposed the Affordable Care Act's individual mandate as unconstitutional; opposition to expanded government coverage is inferred from that." } } },
  { id: 'christy-peterson', why: "\"Yes to ..", set: { 'stricter-gun-laws': { source_type: "inferred", note: "A platform bullet backing the right to bear arms; opposition to stricter gun laws is inferred from it." } } },
  { id: 'jeff-crank', why: "Being a Second Amendment supporter implies opposition to new restrictions but does not state it, and an inference cannot be 1", set: { 'stricter-gun-laws': { value: 2, source_type: "inferred", note: "Describes himself as a lifelong Second Amendment supporter and gun owner; opposition to stricter gun laws is inferred from that." } } },
  { id: 'greg-lopez', why: "\"Policies that protect life\" with adoption and mothers names the policy area without saying abortion, so the position is implied", set: { 'abortion-legal': { source_type: "inferred", note: "Pledges to \"support policies that protect life\" alongside support for mothers, adoption and families; opposition to abortion rights is inferred from that. In a 2022 interview as a candidate for governor he said of a legislative abortion ban, \"Odds are I would sign it\" (news.yahoo.com, 2022-05-04)." } } },
  { id: 'greg-lopez', why: "Reducing state mandates on municipalities is the mechanism the statement asks about, but zoning and housing are not named, so the position is inferred and cannot be 1", set: { 'housing-state-zoning': { value: 2, source_type: "inferred", note: "Pledges to restore local control by reducing state mandates on counties and municipalities; opposition to state zoning preemption is inferred from that. In the August 27, 2026 debate he said he would never take local control away from a jurisdiction (montrosepress.com)." } } },
  { id: 'dwayne-romero', why: "\"Reproductive healthcare\" names the policy area but is not a statement on abortion; Pettersen's \"pro-choice\" is", set: { 'abortion-legal': { source_type: "inferred", note: "Lists protecting women's access to reproductive health care among his priorities; support for abortion rights is inferred from that." } } },
  { id: 'jason-crow', why: "Climate is the policy area, but none of the guide's indicators (renewables, mandates, credits, drilling limits) is stated", set: { 'clean-energy-shift': { value: 4, source_type: "inferred", note: "Calls climate change the defining issue of our age; support for speeding the shift to renewable energy is inferred from that." } } },
  { id: 'jena-griswold', why: "Keep the direction, direct 5 to inferred 4, for the same reason as Crow", set: { 'clean-energy-shift': { value: 4, source_type: "inferred", note: "Says addressing corporate polluters and protecting the climate will be her top priority as attorney general; support for speeding the shift to renewable energy is inferred from that." } } },
  { id: 'michael-allen', why: "The survey item is about climate urgency, not energy policy; the mirror of Crow and Griswold", set: { 'clean-energy-shift': { source_type: "inferred", note: "Disagreed with a survey statement that man-made climate change requires urgent political action; opposition to speeding the shift to renewable energy is inferred from that." } } },
  { id: 'gabe-evans', why: "A market-based stance on drug prices is in the health policy area but is not a statement about coverage", set: { 'health-coverage': { source_type: "inferred", note: "Supports free-market policies to bring down prescription drug costs; opposition to expanded government coverage is inferred from that, and matches his vote for H.R. 1, which added Medicaid work requirements." } } },
  { id: 'samir-witta', why: "Deductible caps and price rules are government doing more on health insurance, but none of the guide's coverage-expansion examples is stated", set: { 'health-coverage': { source_type: "inferred", note: "Proposes capping out-of-pocket deductibles and regulating drug prices so no family has to choose between health and rent; support for more government action on coverage is inferred from that." } } },
  { id: 'jeff-crank', why: "The guide itself says general voter-ID support without mention of mail ballots is inferred and no stronger than 4", set: { 'mail-ballot-id': { source_type: "inferred", note: "Voted twice for the SAVE Act, which requires documentary proof of citizenship to register; support for an ID number on mail ballots is inferred from that, as the coding guide directs for voter-ID positions that do not mention mail ballots." } } },
  { id: 'lauren-boebert', why: "Keep 4, retyped to inferred, for the same reason", set: { 'mail-ballot-id': { source_type: "inferred", note: "Voted for the SAVE Act, which requires documentary proof of citizenship to register; support for an ID number on mail ballots is inferred from that, as the coding guide directs for voter-ID positions that do not mention mail ballots." } } },
  { id: 'kevin-grantham', why: "The quote praises TABOR's revenue and spending limits, the statement's own policy area, but does not address Proposition NN or refunds; the remark on Bridges is in a different source", set: { 'keep-tabor-surplus': { value: 2, source_type: "inferred", note: "Views TABOR \"entirely positively\" as taxpayers' protection on taxation and spending; opposition to keeping revenue above the limit is inferred from that. In an October 2, 2026 Colorado Politics questionnaire he said Jeff Bridges \"is also leading the charge to increase taxes again on Coloradans\", referring to Bridges's sponsorship of Proposition NN." } } },
  { id: 'amanda-gonzalez', why: "Saying the president has no role in Colorado's elections, answering how the state should respond to federal limits on mail voting, implies resistance in the statement's policy area (the state against federal action) without mentioning lawsuits, so it is inferred, as with the regents", set: { 'challenge-federal-policies': { source_type: "inferred", note: "Answering how Colorado should respond to possible federal attempts to limit mail voting, she said it is not the president's role to regulate the state's elections; support for challenging such actions is inferred from that." } } },
  { id: 'bob-chew', why: "The quote describes trade-offs between public and private systems and the note says he declines to back either; that is undecided, which item 36 makes unknown rather than 3", drop: ['health-coverage'] },
  { id: 'christopher-mitchell', why: "\"Sealed U.S", drop: ['deportation-priority'] },
  { id: 'christy-peterson', why: "The quote names surgery on children's bodies, the statement's policy area, but not gender transition or the measure, so the position is implied rather than stated", set: { 'minor-gender-surgery-ban': { value: 4, source_type: "inferred", note: "Listed among her core \"no to\" positions in her candidate survey; opposition to gender-transition surgery for minors is inferred from it, since the survey text does not name the procedure or Proposition 135. Typos are in the original survey text." } } },
  { id: 'dan-sallis', why: "Securing the border and expanding legal pathways for people to come says nothing about deporting people already here", drop: ['deportation-priority'] },
  { id: 'kelley-dennison', why: "Border security plus a path to citizenship for future entrants, with nothing on deporting people already here; the same reasoning as Sallis", drop: ['deportation-priority'] },
  { id: 'eileen-laubacher', why: "\"A healthcare system that works for everyone and is affordable\" names none of the guide's coverage policies and is compatible with either side", drop: ['health-coverage'] },
  { id: 'eric-mulder', why: "Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference", drop: ['natural-gas-right'] },
  { id: 'erik-underwood', why: "Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference", drop: ['natural-gas-right'] },
  { id: 'greg-lopez', why: "Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference", drop: ['natural-gas-right'] },
  { id: 'victor-marx', why: "Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference", drop: ['natural-gas-right'] },
  { id: 'eric-mulder', why: "He wants the state to encourage home-rule districts to allow denser housing: the agree side's outcome by the disagree side's mechanism", drop: ['housing-state-zoning'] },
  { id: 'melat-kiros', why: "A general public-safety philosophy that does not mention drugs; item 48 removed the same kind of fentanyl inference in the build review", drop: ['fentanyl-penalties'] },
  { id: 'melat-kiros', why: "The Equality Act is anti-discrimination law, not gender-affirming care; the guide's inferred path needs a statement on care restrictions", drop: ['minor-gender-surgery-ban'] },
  { id: 'greg-lopez', why: "Transparency, accountability and protection from government growth is a general principle that does not name the income tax (item 48)", drop: ['graduated-income-tax'] },
  { id: 'greg-lopez', why: "TABOR support is a different mechanism from a statutory income-tax rate cap; the guide's agree branch needs a pledge against rate increases, which general TABOR praise is not", drop: ['income-tax-cap'] },
  { id: 'greg-lopez', why: "An agency-reorganization plan assigning hunting and fishing to a Game and Fish department says nothing about a constitutional right", drop: ['hunting-right'] },
  { id: 'michael-allen', why: "The NRA's form letter about a gun-rights rating mentions hunting in passing; it is not a position on a constitutional hunting right", drop: ['hunting-right'] },
  { id: 'joe-krzeczkowski', why: "A general voting-access statement tied to a federal bill does not name Colorado's mail-ballot system", drop: ['keep-mail-voting'] },
  { id: 'joe-krzeczkowski', why: "A general privacy principle (\"your bedroom or doctor's office\"); item 48 removed the same kind of abortion inference in the build review", drop: ['abortion-legal'] },
  { id: 'joe-krzeczkowski', why: "Criticism of trickle-down economics does not name the law", drop: ['federal-budget-law'] },
  { id: 'tim-bennett', why: "\"Sensible trade policy\" against unfair practices does not name tariffs, and the wording could as easily be a criticism of broad tariffs as support for them", drop: ['keep-tariffs'] },
  { id: 'victor-marx', why: "He was asked about Amendment 87 directly and gave no yes or no (per the note); inferring an answer from a general no-new-taxes line when the direct question went unanswered reaches too far", drop: ['graduated-income-tax'] },
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
