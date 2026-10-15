# Blind recode: comparison and resolution

Generated 2026-10-16 from `research/codes-for-blind-review.json` (325 positions, exported 2026-10-15 without the first-pass codes), `research/codes-blind-codex.json` (Codex's blind codes, copied in on 2026-10-16; DECISIONS.md item 67) and `src/data/candidates/*.json` (the first-pass codes, as they stood at commit `7df5f6d`). Codex saw the statement, coding guide, quote, note, source type, title and date, and was told to use only those and never party. Every disagreement below was resolved from the same material plus `scripts/research-protocol.md` and DECISIONS.md items 45 to 49; the resolutions are logged as DECISIONS.md items 68 to 74 and applied by `scripts/apply-review.mjs`.

## Agreement

| Measure | Count | Rate |
|---|---|---|
| Exact agreement (same code), all 325 | 141 of 325 | 43.4% |
| Exact agreement among the 196 Codex coded | 141 of 196 | 71.9% |
| Within one step among the 196 Codex coded | 194 of 196 | 99.0% |
| Codex "unknown" (read the quote as supporting no position) | 129 of 325 | 39.7% |

Direction reversals (one side above 3, the other below): 1 (Victor Marx, health coverage; resolved to 3).

## Resolutions in numbers

| Outcome | Coded disagreements (55) | Codex unknown (129) | All (184) |
|---|---|---|---|
| Keep ours | 36 | 86 | 122 |
| Take Codex's code | 18 | 0 | 18 |
| Keep the direction, change strength or source type | 1 | 22 | 23 |
| Remove (unknown) | 0 | 21 | 21 |

Codes changed (a different 1 to 5 value): 30. Source type changed to inferred without a value change: 10. Quote extended: 1. Positions removed: 21.

Why so many Codex unknowns were kept: 86 of the 129 are roll-call votes, sponsored bills, or answers to a question that the note or source title identifies (for example "Representative Neguse of Democratic from Colorado Voted Nay" under the title "Roll Call 23, S. 5 (Laken Riley Act)"). The protocol quotes votes that way on purpose, and Codex's reasons show it coded from the quote text alone. The rest of the unknowns were weighed one by one; where the quote and note honestly support no position on the statement, the position is removed, whatever that does to coverage.

A consistent rule was applied to the within-one-step disagreements: 5 or 1 only where the quote (with its note) states the position without qualification, makes it a signature issue, or is a bill the candidate sponsored that does what the statement says; 4 or 2 where there is a qualification, where only a vote shows it, or where the quote meets only one of the guide's weaker indicators. Item 46 (deporting people who threaten public safety while opposing broader deportation is 2) was applied to three more candidates.

Flagged for the next source pass, not changed here: six quotes are answers whose question lives only in the note (Escarcega and Wright on the combined NN and 87 question, Baisley on H.R. 1 and on deportation, Marx on Amendment 83, Crow's "I'm a hard no"), and one quote (Kiros on the budget law) starts mid-sentence. Item 38 says a bare answer is quoted with its question; extending those quotes needs the source pages fetched again.

## Codex coded, we disagree on strength or direction

All but one are within one step. Sorted by candidate.

### Amanda Gonzalez, `keep-mail-voting`

- Source: questionnaire, 2026-10-07
- Quote: "Every ballot that we count is a paper ballot and you can't hack paper."
- Ours: **5**. Answering 'Yes' to The Colorado Sun's question of whether she supports continuing Colorado's practice of automatically mailing ballots to registered voters and counting them with machines.
- Codex: **4**. The quote defends the security of Colorado's existing paper-ballot system.
- Resolution: **5 (kept)**. Keep 5. The note records an unqualified "yes" to continuing automatic mail ballots and machine counting; the scale's 5 is a position stated without qualification.

### Barb Clementi, `graduated-income-tax`

- Source: direct_statement, 2026-10-07
- Quote: "I support Prop NN and Amendment 87; both will bring much needed resources to schools, especially rural schools."
- Ours: **5**. Unqualified support for both measures.
- Codex: **4**. The quote explicitly supports Amendment 87.
- Resolution: **5 (kept)**. Keep 5. "I support Prop NN and Amendment 87" is unqualified support for the measure the guide names.

### Barb Clementi, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "I support Prop NN and Amendment 87; both will bring much needed resources to schools, especially rural schools."
- Ours: **5**. Same answer, addressing Proposition NN and Amendment 87 together.
- Codex: **4**. The quote explicitly supports Proposition NN.
- Resolution: **5 (kept)**. Keep 5. Same unqualified sentence names Proposition NN.

### Blake Huber, `deportation-priority`

- Source: questionnaire, 2026-10-01
- Quote: "rational immigration reform that secures our borders while providing realistic legal pathways for people who want to work and contribute. Enforcement should focus on genuine threats, not workers and families trying to build better lives."
- Ours: **3**. Explicitly supports border enforcement against 'genuine threats' while opposing enforcement against working immigrants and families; coded as an explicit middle/mixed position.
- Codex: **2**. The quote favors legal pathways and enforcement focused on genuine threats rather than workers and families.
- Resolution: **2**. Take Codex's 2. DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher.

### Bob Chew, `deportation-priority`

- Source: direct_statement, 2026-10-14 (accessed)
- Quote: "Deporting a drug kingpin makes us safer; deporting a local farm hand makes us poorer."
- Ours: **3**. He supports removing violent criminals and traffickers but opposes spending resources deporting peaceful, economically-contributing immigrants; coded as an explicit middle/mixed position.
- Codex: **2**. The quote supports deporting dangerous criminals while opposing deportation of ordinary workers.
- Resolution: **2**. Take Codex's 2. DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher.

### Brittany Pettersen, `abortion-legal`

- Source: direct_statement, 2022-06-01
- Quote: "Brittany is pro-choice, supported by Planned Parenthood and NARAL, and has been recognized as a champion for reproductive health care nationally."
- Ours: **5**. Page is undated; same campaign issues page as the clean-energy citation, still live on her current site.
- Codex: **4**. The quote identifies a pro-choice position and abortion-rights endorsements, supporting agreement within the endorsement cap.
- Resolution: **5 (kept)**. Keep 5. Her own campaign page calls her pro-choice and a national champion for reproductive health care, a signature issue stated without qualification. Codex read the endorsements in the sentence as an interest-group rating; the source is her site.

### Brittany Pettersen, `clean-energy-shift`

- Source: direct_statement, 2026-10-03
- Quote: "I oppose expanding oil and gas leasing on federal lands, especially when it threatens the health of our landscapes or the communities that depend on them."
- Ours: **5**. From the Denver Post's 2026 candidate questionnaire, answering a question about opening more federal land in Colorado to oil and gas extraction.
- Codex: **4**. The quote explicitly opposes expanding oil and gas leasing on federal lands.
- Resolution: **4**. Take Codex's 4. The quote meets only the guide's weakest agree indicator (a limit on new drilling) and carries a qualifier ("especially when"); the scale's 5 needs an unqualified statement or a signature issue.

### Celeste Landry, `keep-mail-voting`

- Source: questionnaire, 2026-10-03
- Quote: "In general, we can be proud of Colorado's system; it is excellent at balancing access to voting with election security."
- Ours: **5**. A separate questionnaire has her calling Colorado's system 'gold-standard' while also proposing to further limit electronic ballot return, a narrower issue distinct from mail ballots themselves.
- Codex: **4**. The quote praises Colorado's current election system for balancing access and security.
- Resolution: **4**. Take Codex's 4. "In general, we can be proud" is qualified praise, and the note records that she also proposes limiting electronic ballot return.

### Christy Peterson, `deportation-priority`

- Source: questionnaire, 2026-10-03
- Quote: "I support the President and his efforts. Our local jurisdictions should be fully cooperative with immigration enforcement."
- Ours: **5**. Answering what Congress should do as the Trump administration pursues an immigration crackdown.
- Codex: **4**. The quote supports presidential immigration-enforcement efforts and full local cooperation.
- Resolution: **5 (kept)**. Keep 5. "I support the President and his efforts" and full local cooperation, answering a question about the immigration crackdown, is unqualified.

### Dan "Kilo" Sallis, `health-coverage`

- Source: direct_statement, 2026-10-03
- Quote: "Healthcare Freedom with reduced costs through deregulation & tort reform"
- Ours: **1**. Listed as one of his top three priorities; his campaign site elaborates that he supports repealing ACA mandates and relying on free-market competition instead of expanded government coverage.
- Codex: **2**. The quote favors deregulation and tort reform as a market-oriented approach to healthcare costs.
- Resolution: **1 (kept)**. Keep 1. The quote is one of his three stated top priorities, and the note records that his site rejects expanded government coverage for free-market competition: opposition made a signature issue.

### Dwayne L. Romero, `clean-energy-shift`

- Source: questionnaire, 2026-10-08
- Quote: "He said, at the same time, the country should be “running hard — running very hard — towards a renewable energy policy and practice across the nation.”"
- Ours: **4**. Said while also opposing additional sales or leasing of public lands for oil and gas extraction, and separately calling for a practical transition that avoids destroying communities reliant on older energy sources; coded as a qualified agree.
- Codex: **5**. The quote emphatically calls for an accelerated nationwide renewable-energy transition.
- Resolution: **4 (kept)**. Keep 4. The note records that in the same answer he calls for a transition that does not destroy energy-dependent communities, a qualification.

### Dwayne L. Romero, `health-coverage`

- Source: direct_statement, 2026-10-07
- Quote: "I will immediately work to overturn the disastrous healthcare cuts from the One Big Beautiful Bill, and I will work with anyone, from any party, to bring back our Affordable Care Act tax credits."
- Ours: **4**. Supports restoring ACA premium tax credits and reversing Medicaid cuts.
- Codex: **5**. The quote pledges immediate reversal of healthcare cuts and restoration of Affordable Care Act tax credits.
- Resolution: **5**. Take Codex's 5. He pledges to "immediately" restore the ACA premium tax credits, the guide's first agree example, without qualification.

### Edie Hooton, `challenge-federal-policies`

- Source: direct_statement, 2026-10-07
- Quote: "Using my legislative experience, I will partner with state allies — leveraging successful strategies like Attorney General Weiser’s multi-state lawsuits and Denver federal court rulings that halted attacks on Boulder’s NCAR — to aggressively protect CU."
- Ours: **4**. Hooton names the state attorney general's multi-state lawsuits against federal actions as a strategy she would use to protect CU, rather than making a general statement about all state litigation against the administration.
- Codex: **5**. The quote endorses using successful multistate lawsuits to aggressively resist federal actions.
- Resolution: **4 (kept)**. Keep 4. She names the attorney general's multi-state lawsuits as one strategy among several for protecting CU, not a general position on state litigation.

### Erik Underwood, `clean-energy-shift`

- Source: direct_statement, 2026-01-01
- Quote: "Accelerate transition to renewables paired with union labor standards and a Just Transition fund for displaced fossil fuel workers in Weld, Garfield, Moffat, and Rio Blanco counties."
- Ours: **5**. No note.
- Codex: **4**. The quote explicitly supports accelerating the renewable-energy transition and helping displaced fossil-fuel workers.
- Resolution: **5 (kept)**. Keep 5. "Accelerate transition to renewables" is the statement itself, unqualified; the labor standards and transition fund are additions, not qualifications of the pace.

### Frederick Espinoza, `graduated-income-tax`

- Source: direct_statement, 2026-10-07
- Quote: "Amendment 87 is another tax-rule change sold as classroom funding. Keep officials accountable. Vote no."
- Ours: **1**. Part of his answer opposing both Proposition NN and Amendment 87.
- Codex: **2**. The quote explicitly urges a no vote on Amendment 87.
- Resolution: **1 (kept)**. Keep 1. "Vote no" on Amendment 87, unqualified.

### Frederick Espinoza, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "DPS used the Denver School Facilities Leasing Corporation to carry huge off-the-books debt and bypass a TABOR vote. NN permanently keeps TABOR refunds; after ten years the K-12 mandate can expire."
- Ours: **1**. Part of the same answer opposing both Proposition NN and Amendment 87; begins 'No.'
- Codex: **2**. The quote criticizes Proposition NN for permanently retaining refunds while its school-funding mandate can expire.
- Resolution: **1 (kept)**. Keep 1. The same answer begins "No." on Proposition NN and criticizes the measure by name.

### Gabe Evans, `immigration-notify-ice`

- Source: direct_statement, 2026-10-14
- Quote: "It is an issue that hits close to home because Colorado’s sanctuary state policies have led to the presence of cartels and illegal criminals gangs like Tren de Aragua."
- Ours: **5**. Criticizes Colorado's sanctuary-state policies limiting cooperation with federal immigration enforcement; typo ("criminals gangs") preserved verbatim from source.
- Codex: **4**. The quote criticizes Colorado's sanctuary policies as enabling criminal gangs, indicating opposition to cooperation limits.
- Resolution: **4**. Take Codex's 4. The quote criticizes Colorado's limits on cooperation without calling for their repeal or for Amendment 81; agree with qualification.

### Gaylon Kent, `deportation-priority`

- Source: direct_statement, 2024-10-22
- Quote: "We're entitled to secure borders and those here illegally are not entitled to citizenship. But they're entitled to be more than criminals, so let's legalize them and let them do the work they came here to do."
- Ours: **3**. Explicitly mixed: wants secure borders but opposes treating undocumented immigrants as criminals and favors legalizing their work status.
- Codex: **1**. The quote calls for legalizing people already present without status rather than treating them as criminals.
- Resolution: **1**. Take Codex's 1. "Let's legalize them" is unqualified opposition to deporting people already here; the border and citizenship clauses qualify legalization, not deportation, so this is not a mixed record under item 45.

### Gaylon Kent, `health-coverage`

- Source: direct_statement, 2024-10-22
- Quote: "Doctors and health insurers must be returned to the free market. They must be financially answerable to their patients and customers."
- Ours: **2**. Reproduced by Ballotpedia from Kent's 2024 campaign website.
- Codex: **1**. The quote insists that doctors and insurers return to the free market rather than expanded government coverage.
- Resolution: **1**. Take Codex's 1. "Doctors and health insurers must be returned to the free market" is the guide's market-based alternative, stated without qualification.

### Jason Crow, `stricter-gun-laws`

- Source: sponsored_bill, 2026-10-14
- Quote: "I introduced legislation to close the “Colorado Loophole,” which would prohibit the sale of long guns to residents from other states who could not buy them in their own home state, am vice chair of the Gun Violence Prevention Task Force, and was a proud supporter of H.R. 8 to expand background checks for all gun sales."
- Ours: **5**. Campaign site description of his own sponsored bill and support for background-check expansion; no publish date given.
- Codex: **4**. The quote supports new firearm-sale restrictions and expanded background checks for all sales.
- Resolution: **5 (kept)**. Keep 5. He introduced a bill, chairs a gun-violence task force and backed universal background checks: a signature issue.

### Jeff Bridges, `keep-tabor-surplus`

- Source: sponsored_bill, 2026-03-05
- Quote: "allowing the state to retain an amount of state revenue in excess of the limitation on state fiscal year spending equal to state public K-12 education funding"
- Ours: **5**. Bridges is prime sponsor of this bill, which placed Proposition NN on the November 2026 ballot. In an Oct. 5, 2026 Colorado Sun interview he said: 'If that measure does not pass, that is a fight that I will continue through the Office of the Treasury using the bully pulpit.'
- Codex: **4**. The sponsored-bill quote permits retaining revenue above the TABOR limit for public K-12 funding.
- Resolution: **5 (kept)**. Keep 5. Prime sponsor of the bill that put Proposition NN on the ballot: the scale's "authored a bill doing exactly this".

### Jeff Bridges, `stricter-gun-laws`

- Source: sponsored_bill, 2025-01-08
- Quote: "Concerning prohibited activity involving semiautomatic firearms, and, in connection therewith, prohibiting the manufacture, distribution, transfer, sale, and purchase of specified semiautomatic firearms"
- Ours: **5**. Listed sponsor; also voted Yes on final Senate passage (19-15) on 2025-02-18 per the official Senate roll call.
- Codex: **4**. The sponsored-bill quote establishes new prohibitions on specified semiautomatic firearms.
- Resolution: **5 (kept)**. Keep 5. Sponsor of SB25-003, the bill the coding guide itself names, and voted for it.

### Jeff Crank, `abortion-legal`

- Source: direct_statement, 2024-01-01 (year)
- Quote: "As a lifelong Second Amendment supporter and gun owner and a proud pro-life advocate, I know the importance of a strong conservative voice on these issues."
- Ours: **1**. Date is approximate (text dated to the 2024 campaign cycle on Ballotpedia); month/day unknown.
- Codex: **2**. The quote identifies an anti-abortion position through explicit pro-life advocacy.
- Resolution: **1 (kept)**. Keep 1. "Proud pro-life advocate" is self-described, unqualified and presented as part of his identity.

### Jeff Crank, `clean-energy-shift`

- Source: questionnaire, 2026-10-07
- Quote: "Closing coal-fired plants and pursuing renewable energy is putting Colorado at an economic disadvantage that we shouldn’t allow, Crank said."
- Ours: **2**. He added he would be amenable to a slower shift if the whole world agreed to it, so coded as a qualified disagree rather than unconditional.
- Codex: **1**. The quote explicitly rejects closing coal plants and pursuing renewable energy as unacceptable economic disadvantages.
- Resolution: **2 (kept)**. Keep 2. The note records that he would accept a slower shift if the whole world agreed, a qualification.

### Jeff Hurd, `clean-energy-shift`

- Source: questionnaire, 2026-10-08
- Quote: "He is a proponent of multiple energy sources such as carbon-based, renewable, geothermal, and nuclear energy. He said he would not like to see any energy sources taken off the table."
- Ours: **2**. Answering a Colorado Sun question on whether the U.S. should stop using carbon-emitting energy sources; he favors an all-of-the-above mix rather than speeding a shift off fossil fuels, and separately supports 'responsible' oil and gas development on federal lands in the same article.
- Codex: **3**. The quote supports carbon-based and renewable energy together and rejects excluding any source.
- Resolution: **2 (kept)**. Keep 2. All-of-the-above with no source taken off the table, answering whether the U.S. should stop using carbon-emitting sources, plus support for more drilling on federal land in the same article, points one way: against speeding the shift. Supporting renewables alongside fossil fuels is not a mixed position on pace.

### Jeff Hurd, `health-coverage`

- Source: questionnaire, 2026-10-03
- Quote: "Rural Coloradans often have fewer health care options and higher costs. I worked across the aisle and voted to extend enhanced premium tax credits while Congress pursues lasting reforms."
- Ours: **3**. Coded as mixed: he also supports Medicaid work requirements for able-bodied adults (Aspen Times Q&A, October 7, 2026) and voted for H.R. 1, which reduced Medicaid spending.
- Codex: **4**. The quote explicitly supports extending enhanced health-insurance premium tax credits.
- Resolution: **3 (kept)**. Keep 3. DECISIONS.md item 45: he voted to extend the premium credits and supports Medicaid work requirements, a record that points both ways.

### Jessica Killin, `public-lands`

- Source: direct_statement, 2026-01-01 (year)
- Quote: "Preserve federal lands used by Coloradans and oppose efforts to sell them off"
- Ours: **5**. No note.
- Codex: **4**. The quote explicitly opposes selling federal lands and supports preserving them.
- Resolution: **5 (kept)**. Keep 5. "Oppose efforts to sell them off" is the statement, unqualified.

### John Hickenlooper, `stricter-gun-laws`

- Source: direct_statement, 2026-10-14
- Quote: "John supports legislation to expand background checks to all gun sales, ban assault weapons, and better regulate the safe home storage of firearms."
- Ours: **5**. No note.
- Codex: **4**. The quote supports universal background checks, an assault-weapons ban, and stronger safe-storage rules.
- Resolution: **5 (kept)**. Keep 5. Names three specific new restrictions (universal checks, assault-weapons ban, storage rules) without qualification.

### Lauren Boebert, `minor-gender-surgery-ban`

- Source: direct_statement, 2026-10-15 (accessed)
- Quote: "Sex change surgeries render a person sterile for life, and taxpayer dollars should not be used to permanently maim confused children. Children should never be used as pawns to advance radical gender ideology. Permanently altering and disabling the physical bodies of children is never ok"
- Ours: **4**. Opposes gender-transition surgery for minors; the page does not mention Proposition 135 or a Colorado ban, so this is coded agree rather than strongly agree.
- Codex: **5**. The quote categorically rejects sex-change surgery for children as permanently harmful and never acceptable.
- Resolution: **5**. Take Codex's 5. "Never ok" is categorical; the scale's 5 is a position stated without qualification, and not naming the measure is not a qualification.

### Manny Rutinel, `abortion-legal`

- Source: sponsored_bill, 2025-04-16
- Quote: "the act authorizes a prescription label for mifepristone, misoprostol, and the generic alternatives to those prescriptions to include only the name of the prescribing health-care practice"
- Ours: **5**. Cosponsored this law protecting abortion-medication prescribers; reinforced by his campaign site: "When it comes to abortion, the government needs to respect Americans’ freedom to make our own decisions about our own families without interference from politicians."
- Codex: **4**. The sponsored-bill quote protects prescriber privacy for abortion medications, supporting access to abortion care.
- Resolution: **4**. Take Codex's 4. The sourced bill protects abortion-medication prescribers, a related protection rather than a bill "doing exactly this", and he was a cosponsor.

### Manny Rutinel, `clean-energy-shift`

- Source: questionnaire, 2026-10-03
- Quote: "I support an all of the above energy solution to protect Colorado jobs and power Colorado’s future. And I think we can have an all of the above energy system that does not require new oil and gas leases on public land in this district"
- Ours: **3**. Coded as mixed: an all-of-the-above energy stance alongside opposition to new oil and gas leases on public land in the district.
- Codex: **4**. Despite supporting mixed energy sources, the quote favors avoiding new oil and gas leases on public land.
- Resolution: **3 (kept)**. Keep 3. All-of-the-above (against forcing the pace) and no new leases on public land in the district (a drilling limit) point both ways; item 45 codes that 3.

### Manny Rutinel, `health-coverage`

- Source: direct_statement, 2026-10-14
- Quote: "Trump and Gabe Evans’ cuts to Medicaid and the Affordable Care Act will kick hundreds of thousands of Coloradans off their health care."
- Ours: **5**. Opposes Medicaid/ACA cuts and campaigns on expanding affordability of coverage.
- Codex: **4**. The quote criticizes Medicaid and Affordable Care Act cuts for stripping health coverage from Coloradans.
- Resolution: **4**. Take Codex's 4. The quote opposes Medicaid and ACA cuts (the guide's "protecting Medicaid"), but does not itself call for doing more at taxpayer cost.

### Manny Rutinel, `immigration-notify-ice`

- Source: sponsored_bill, 2025-05-07
- Quote: "The act prohibits the jail custodian from delaying a defendant's release for the purpose of an immigration enforcement operation."
- Ours: **1**. Cosponsored this law limiting jail cooperation with federal immigration enforcement; his campaign site calls it a bill that "keeps Colorado law enforcement focused on keeping us safe rather than supporting ICE’s cruelty."
- Codex: **2**. The sponsored-bill quote restricts jail cooperation by prohibiting delayed release for immigration enforcement.
- Resolution: **1 (kept)**. Keep 1. Cosponsored a law doing the opposite of the statement (barring jails from holding people for immigration enforcement) and campaigns on it.

### Manny Rutinel, `keep-tariffs`

- Source: direct_statement, 2026-10-14
- Quote: "Trump’s tariffs drive up the cost of everyday goods like groceries and housing."
- Ours: **1**. Campaign site states he will "stop his tariffs," making opposition to broad tariffs a signature message.
- Codex: **2**. The quote criticizes current tariffs for increasing the cost of everyday goods.
- Resolution: **1 (kept)**. Keep 1. The note records "stop his tariffs" as a campaign message: opposition as a signature issue.

### Manny Rutinel, `stricter-gun-laws`

- Source: sponsored_bill, 2025-04-02
- Quote: "The act prohibits knowingly manufacturing, distributing, transferring, selling, or purchasing a specified semiautomatic firearm on or after August 1, 2026"
- Ours: **5**. Cosponsor of this 2025 law restricting certain semiautomatic firearms, cited directly in the statement's coding guide.
- Codex: **4**. The sponsored-bill quote prohibits manufacture and sale of specified semiautomatic firearms.
- Resolution: **5 (kept)**. Keep 5. Cosponsor of SB25-003, the bill the coding guide names.

### Mark Baisley, `health-coverage`

- Source: questionnaire, 2026-10-05
- Quote: "Baisley said he supports the work requirements and that it should be considered a success whenever someone comes off Medicaid and a failure every time someone is enrolled in the health insurance program for low income and disabled people."
- Ours: **2**. Answering a question on Medicaid work requirements imposed by the One Big Beautiful Bill Act. He also said he is concerned the requirements may prevent people who need the program from accessing it ('but this is not a zero-sum game'), which is why this is coded as a qualified rather than unqualified disagreement.
- Codex: **1**. The quote endorses Medicaid work requirements and treats every new enrollment as a failure.
- Resolution: **2 (kept)**. Keep 2. The note records his concern that the work requirements may keep people who need Medicaid from it, a qualification.

### Melat Kiros, `stricter-gun-laws`

- Source: direct_statement, 2026-10-15 (accessed)
- Quote: "Universal Background Checks: Background checks are the foundation of any serious gun safety system."
- Ours: **5**. The same document also calls for a federal red-flag law, an assault weapons ban, a high-capacity magazine ban and safe-storage requirements, and says she stands with Moms Demand Action; gun violence prevention is a stated priority, so coded strongly agree.
- Codex: **4**. The quote explicitly supports universal firearm background checks.
- Resolution: **5 (kept)**. Keep 5. The note records universal checks, a red-flag law, an assault-weapons ban, a magazine ban and storage rules as a stated priority.

### Meredith Ryan, `abortion-legal`

- Source: direct_statement, 2024-10-19
- Quote: "My political orientation is progressive, and I am pro-choice on abortion."
- Ours: **5**. From her 2024 Candidate Connection survey for Colorado State Senate District 26; her current 2026 survey does not readdress abortion, but this is her own stated position and no contrary statement was found.
- Codex: **4**. The quote explicitly states a pro-choice position on abortion.
- Resolution: **5 (kept)**. Keep 5. "I am pro-choice on abortion", unqualified.

### Meredith Ryan, `clean-energy-shift`

- Source: direct_statement, 2026-10-14 (accessed)
- Quote: "The USA needs to offer a Green New Deal allowing for advancements in technologies without them being at the expense of working people and their work/career options."
- Ours: **5**. No note.
- Codex: **4**. The quote supports a Green New Deal while protecting workers during the technological transition.
- Resolution: **5 (kept)**. Keep 5. A Green New Deal is a faster shift by definition; protecting workers during it is an addition, as with Underwood.

### Michael J. Allen, `fentanyl-penalties`

- Source: direct_statement, 2022-02-22
- Quote: "The first step should be increasing the penalty for possession of fentanyl back to a felony because as little as 2mg of fentanyl can be deadly."
- Ours: **5**. Statement made in 2022, predating Proposition 132 on the 2026 ballot, but calling for the same change (felony for any amount, plus a mandatory sentence enhancer for distribution deaths).
- Codex: **4**. The quote explicitly supports restoring felony penalties for fentanyl possession.
- Resolution: **5 (kept)**. Keep 5. Calls for exactly the felony-for-possession change the guide names, with a mandatory enhancer for distribution deaths in the note, stated without qualification.

### Michael J. Allen, `immigration-notify-ice`

- Source: questionnaire, 2026-10-06
- Quote: "the law already gives us the ability to work with federal agencies when there's criminal elements involved, and I think it's probably fine the way it is now. I'm not sure that we need a ballot measure on that."
- Ours: **3**. Declined to take a position on the ballot measure itself ('that's up to the voters') while suggesting current law may already be adequate — coded as a mixed/middle position.
- Codex: **2**. The quote defends existing cooperation law as sufficient and questions the need for a new ballot measure.
- Resolution: **2**. Take Codex's 2. "Probably fine the way it is now" defends the current limits, the guide's disagree branch; declining to campaign on the measure is a qualification, not a second direction.

### Phil Weiser, `housing-state-zoning`

- Source: questionnaire, 2026-10-10
- Quote: "What if the state passed a default measure that would call for rationalizing of zoning. I want to try to work with local governments to come up with solutions that they don't see as antithetical to local control but that move the ball forward."
- Ours: **4**. Open to a state default zoning measure, while trying to work with rather than override local governments.
- Codex: **3**. The quote considers a state zoning default while seeking local agreement and preserving local control.
- Resolution: **4 (kept)**. Keep 4. He is the one proposing a state default zoning measure; working with local governments is the qualification that makes it 4 rather than 5, not a second direction.

### Phil Weiser, `immigration-notify-ice`

- Source: direct_statement, 2026-01-01
- Quote: "Enforce state laws to prevent the federal government from coercing state and local law enforcement to conduct immigration enforcement activities and that bar sales of government facilities for ICE detention centers."
- Ours: **1**. He pledges to enforce Colorado's existing limits on cooperation with ICE, the opposite of what Amendment 81 would require.
- Codex: **2**. The quote defends state limits on local immigration enforcement and use of facilities for ICE detention.
- Resolution: **1 (kept)**. Keep 1. A pledge to enforce the state's existing limits on cooperation, unqualified, is the opposite of what Amendment 81 would require.

### Phil Weiser, `stricter-gun-laws`

- Source: direct_statement, 2026-01-01
- Quote: "Sign, support, and defend responsible gun safety laws —that will save lives and protect children."
- Ours: **5**. Part of his public safety platform; also pledges to strengthen the state Office of Gun Violence Prevention.
- Codex: **4**. The quote supports signing and defending gun-safety laws.
- Resolution: **4**. Take Codex's 4. "Sign, support, and defend responsible gun safety laws" supports new laws in general terms without naming a restriction; Hickenlooper's 5 names three.

### Samir Ezzeldin Witta, `deportation-priority`

- Source: questionnaire, 2026-10-03
- Quote: "I support mandatory E-Verify with actual enforcement; a clear, efficient path to legal status for long-term residents who built lives and contribute here; full funding for immigration courts to eliminate the years-long backlog; and enforcement that respects constitutional rights."
- Ours: **3**. Explicitly mixed: pairs stricter workplace-enforcement tools with a path to legal status, rather than treating deportation itself as the top priority.
- Codex: **2**. The quote prioritizes legal status for long-term contributing residents and rights-respecting enforcement.
- Resolution: **3 (kept)**. Keep 3. Mandatory E-Verify "with actual enforcement" expands enforcement (the guide's agree branch) and a path to legal status is the disagree branch; the record points both ways (item 45). Unlike Huber, Chew and Blau, the enforcement half is not limited to people who threaten public safety.

### Shimon Blau, `deportation-priority`

- Source: questionnaire, 2026-10-02
- Quote: "Criminal aliens who threaten public safety should be deported, and our streets must be safer. At the same time, we should fast-track legal status for long-term, contributing members of our communities who have built their lives here."
- Ours: **3**. Explicitly mixed: supports deporting those who threaten public safety while opposing broader enforcement he calls indiscriminate.
- Codex: **2**. The quote pairs deportation of dangerous criminals with fast-tracked legal status for contributing long-term residents.
- Resolution: **2**. Take Codex's 2. DECISIONS.md item 46: supporting deportation of people who threaten public safety while opposing broader deportation is coded disagree, as for Pettersen, Rutinel and Laubacher.

### Stephen T. Hamilton, `clean-energy-shift`

- Source: questionnaire, 2026-10-03
- Quote: "I’ll cut car prices: 75% tax break for automakers who flood dealers with affordable gas/hybrid inventory. No CA EV mandate – grid can’t handle it."
- Ours: **2**. Answering a question about transportation policy; opposes an EV mandate, coded as a qualified disagreement since this is specifically about EV mandates rather than energy policy generally.
- Codex: **1**. The quote rejects electric-vehicle mandates and proposes substantial tax incentives for gas and hybrid vehicle production.
- Resolution: **2 (kept)**. Keep 2. Opposes one clean-energy mandate (EVs) in a transportation answer; a qualified disagree.

### Steve Barton, `graduated-income-tax`

- Source: direct_statement, 2026-10-07
- Quote: "I oppose NN and 87 because both trick voters into killing TABOR (Taxpayer Bill of Rights) for a fake "benefit of the kids""
- Ours: **2**. He proposes an alternative (a minimum education share of the state budget) rather than opposing more education funding outright, so coded as qualified disagreement.
- Codex: **1**. The quote explicitly condemns Amendment 87 as a deceptive attempt to eliminate TABOR.
- Resolution: **1**. Take Codex's 1. "I oppose NN and 87 because both trick voters into killing TABOR" is unqualified opposition; proposing a different school-funding mechanism does not qualify it, as with Espinoza.

### Steve Barton, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "I oppose NN and 87 because both trick voters into killing TABOR (Taxpayer Bill of Rights) for a fake "benefit of the kids""
- Ours: **2**. Same answer, addressing Proposition NN and Amendment 87 together.
- Codex: **1**. The quote explicitly condemns Proposition NN as a deceptive attempt to eliminate TABOR.
- Resolution: **1**. Take Codex's 1, for the same reason.

### Victor Marx, `abortion-legal`

- Source: direct_statement, 2025-11-01
- Quote: "I’m a child advocate, always have been ... It’d be hypocritical for me not to protect children in the womb who are humans. So there’s only two choices — life or death — and I am for life."
- Ours: **2**. Exact date of the radio appearance (Dan Caplis Show) is unknown; article published 2025-12-02 describes it as happening 'last month.' In the same interview he also said of Colorado's constitutional abortion protections, 'The people voted.I can't go in and.do the magical trick,' suggesting he would not try to change current law even though he personally opposes abortion, hence a qualified rather than unqualified disagree.
- Codex: **1**. The quote frames abortion as a life-or-death choice and unequivocally supports protecting children in the womb.
- Resolution: **2 (kept)**. Keep 2. The note records that in the same interview he said the people voted and he cannot undo Colorado's abortion protections: personal opposition with a stated limit on acting on it.

### Victor Marx, `clean-energy-shift`

- Source: questionnaire, 2026-10-10
- Quote: "Yes. "If I'm governor, I'm opening up all forms of energy. We're going to make sure they meet appropriate health and environmental standards, but I just don't believe Colorado should shut down responsible domestic energy production and then import energy from somewhere else.""
- Ours: **1**. Answering whether Colorado would still be drilling new oil and gas wells at the end of a second term, he said yes and described opening up all forms of energy production.
- Codex: **2**. The quote supports opening domestic energy production and opposes shutting it down.
- Resolution: **2**. Take Codex's 2. "Opening up all forms of energy" includes renewables; he opposes shutting down fossil production rather than opposing the shift as such, so disagree with qualification.

### Victor Marx, `fentanyl-penalties`

- Source: direct_statement, 2026-07-01
- Quote: "I will pursue enhanced penalties for trafficking quantities exceeding statutory thresholds under C.R.S. § 18-18-405.5, while expanding treatment diversion for non-violent addiction cases."
- Ours: **4**. Supports tougher trafficking penalties above certain thresholds combined with treatment diversion for non-violent cases, short of Proposition 132's mandatory prison for any amount sold.
- Codex: **3**. The quote pairs tougher penalties above trafficking thresholds with treatment diversion, rather than mandatory imprisonment for every amount.
- Resolution: **3**. Take Codex's 3. Tougher penalties above a threshold (agree) and treatment diversion (the guide's disagree branch) point both ways, like Pettersen's 2022 law (item 56).

### Victor Marx, `health-coverage`

- Source: questionnaire, 2026-10-03
- Quote: "Savings should protect access for children, pregnant women, seniors and people with disabilities, while maintaining adequate rates for essential providers. We cannot solve this with one-time money or across-the-board cuts that drive providers out."
- Ours: **2**. Answering a question about the state's Medicaid funding crisis, Marx said he would require an audit and pursue fraud/waste savings rather than new funding, but explicitly ruled out across-the-board cuts; coded as a qualified rather than unqualified disagreement.
- Codex: **4**. The quote supports protecting healthcare access for vulnerable groups and rejects broad cuts that undermine providers.
- Resolution: **3**. The one direction reversal (ours 2, Codex 4). Neither reading holds alone: savings instead of new money is against "even if it costs taxpayers more", and protecting access while ruling out across-the-board cuts is against reducing coverage. Item 45: a record that points both ways is 3, with both halves named.

### Victor Marx, `minor-gender-surgery-ban`

- Source: questionnaire, 2026-06-06
- Quote: "How do you plan to vote on Initiatives 108, 109 and 110, which would, respectively, make child sex trafficking punishable by life in prison without the possibility of parole; prohibit transgender kids and college students from participating in gendered sports that do not align with their biological sex; and prohibit surgery on a child for the purpose of altering their biological sex characteristics. [Victor Marx:] Yes."
- Ours: **5**. The Colorado Sun asked one question about Initiatives 108, 109 and 110, which became Propositions 133, 134 and 135; Marx answered yes to all three.
- Codex: **4**. The quote explicitly answers yes to a proposal banning surgery that alters children's biological sex characteristics.
- Resolution: **5 (kept)**. Keep 5. Same unqualified "yes".

### Victor Marx, `sports-biological-sex`

- Source: questionnaire, 2026-06-06
- Quote: "How do you plan to vote on Initiatives 108, 109 and 110, which would, respectively, make child sex trafficking punishable by life in prison without the possibility of parole; prohibit transgender kids and college students from participating in gendered sports that do not align with their biological sex; and prohibit surgery on a child for the purpose of altering their biological sex characteristics. [Victor Marx:] Yes."
- Ours: **5**. The Colorado Sun asked one question about Initiatives 108, 109 and 110, which became Propositions 133, 134 and 135; Marx answered yes to all three.
- Codex: **4**. The quote explicitly answers yes to a proposal requiring sports participation to align with biological sex.
- Resolution: **5 (kept)**. Keep 5. An unqualified "yes" to voting for the measure.

## Codex unknown, position kept

Votes, bills, identified answers, and inferences that name the policy area.

### Amanda Gonzalez, `mail-ballot-id`

- Source: direct_statement, 2026-10-07
- Quote: "I am interested in solving actual problems in our elections and finding ways to make it more accessible for voters, not creating new hoops for eligible voters to jump through."
- Ours: **2**. Directly asked whether she supports Amendment 84. She said she does not take official positions on ballot measures, but these are her own words answering that question, so this is coded as a qualified disagree rather than inferred.
- Codex: **unknown**. Opposing unspecified voting barriers does not establish a position on ID numbers on mail-ballot envelopes.
- Resolution: **2 (kept)**. Keep 2. The note records that this answered a direct question on Amendment 84; calling the measure "new hoops for eligible voters" is disagreement, qualified by her declining to take an official position.

### BetteRose Ryan, `challenge-federal-policies`

- Source: inferred, 2026-10-05
- Quote: "I believe that if the policy is reasonable for our system, we commit. If it is unreasonable, we reject it and figure out how to survive without federal assistance."
- Ours: **3**. Answer to Chalkbeat's question on whether she would commit CU to the Trump administration's priorities. An explicitly case-by-case stance, coded as mixed; she does not mention the state's lawsuits, so this is inferred.
- Codex: **unknown**. Conditional acceptance or rejection of federal policies does not establish a position on challenging them in court.
- Resolution: **3 (kept)**. Keep inferred 3. The guide's disagree branch is "pledges to cooperate with the administration instead", so Chalkbeat's question on whether she would commit CU to the administration's priorities is in the statement's policy area; her case-by-case answer is a middle position, inferred because lawsuits are not mentioned.

### Bob Chew, `redistricting-commission`

- Source: inferred, 2026-10-14 (accessed)
- Quote: "The United States is one of the only modern democracies where politicians effectively choose their voters through redistricting. That must change."
- Ours: **4**. He does not address Colorado's Amendment 86 or mid-decade redistricting specifically; this is inferred from his stated opposition to politician-drawn maps and support for 'eliminating gerrymandering,' which is consistent with favoring independent, commission-drawn maps.
- Codex: **unknown**. Opposing politicians choosing their voters does not establish a position on Colorado's commission or mid-decade redistricting.
- Resolution: **4 (kept)**. Keep inferred 4. Redistricting is the policy area, named; opposing politicians choosing their voters supports commission-only maps.

### Brittany Pettersen, `federal-budget-law`

- Source: recorded_vote, 2025-07-03
- Quote: "Representative Pettersen of Democratic from Colorado Voted No"
- Ours: **2**. Final passage vote on the One Big Beautiful Bill Act.
- Codex: **unknown**. The quote reports a no vote without identifying the legislation voted on.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Brittany Pettersen, `fentanyl-penalties`

- Source: sponsored_bill, 2022-05-25
- Quote: "changing the criminal penalties associated with synthetic opiates; using a substance abuse assessment to direct appropriate treatment at sentencing"
- Ours: **3**. Pettersen was a Senate prime sponsor. The law changed fentanyl penalties (possession of more than 1 gram of a fentanyl compound became a felony) and paired them with treatment and harm-reduction funding; it kept a 1-gram threshold rather than making any amount a felony, which is what Proposition 132 would do. Coded as mixed. No statement by her on Proposition 132 was found.
- Codex: **unknown**. The quote mentions changing penalties and treatment assessments without specifying tougher penalties or a treatment-first policy.
- Resolution: **3 (kept)**. Keep 3. DECISIONS.md item 56 already weighed this bill: tougher penalties above 1 gram paired with treatment funding, short of Proposition 132, coded mixed with both halves in the note.

### Brittany Pettersen, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Pettersen of Democratic from Colorado Voted Yea"
- Ours: **2**. H.J.Res. 72 ends the national emergency behind Trump's tariffs on Canada; voting Yea opposes keeping the tariffs.
- Codex: **unknown**. The quote reports a yea vote without identifying the measure or its relationship to tariffs.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Brittany Pettersen, `public-lands`

- Source: direct_statement, 2025-06-01
- Quote: "Several Colorado Democrats — including U.S. Sen. Michael Bennet, U.S. Reps. Jason Crow and Brittany Pettersen as well as state Sen. Dylan Roberts — joined Neguse in calling out Senate Republicans on Friday. The lawmakers referred to the proposal as radical, shameful, deeply unpopular and reckless."
- Ours: **4**. Article only gives the month (June 2025). Describes Pettersen joining other Colorado Democrats opposing a Senate reconciliation provision to sell BLM public lands; it is a news characterization of the group's reaction rather than an individually quoted Pettersen statement.
- Codex: **unknown**. The quote condemns an unnamed proposal without identifying a public-land sale or transfer.
- Resolution: **4 (kept)**. Keep 4. The quote is the Sun's report that she joined other Colorado Democrats in calling the Senate's public-land sale proposal radical and shameful; the note says it is a group characterization, which is why it is 4 rather than 5.

### Chad Humphrey, `deportation-priority`

- Source: questionnaire, 2026-10-03
- Quote: "We can't have uneducated, unqualified federal stormtroopers roaming our streets, pulling kids out of school, and shooting innocent Americans."
- Ours: **3**. Explicitly mixed: opposes current enforcement methods but also says of people who are undocumented, 'if you break our laws, there are no second chances.'
- Codex: **unknown**. The quote condemns abusive federal agents without identifying immigration enforcement or deportation.
- Resolution: **3 (kept)**. Keep 3. The quote opposes the methods of current enforcement (the disagree branch) and the note records "no second chances" for people who break the law, which is not limited to serious crimes; item 45 codes a record that points both ways as 3.

### Chad Humphrey, `stricter-gun-laws`

- Source: inferred, 2026-10-14
- Quote: "The Second Amendment isn't about hunting. It's about preserving the rights of a free people."
- Ours: **2**. Inferred, coded no stronger than 2: frames gun rights as a core individual liberty without directly addressing whether current gun laws should be made stricter or looser.
- Codex: **unknown**. Affirming the purpose of the Second Amendment does not establish opposition to additional gun restrictions.
- Resolution: **2 (kept)**. Keep inferred 2. A Second Amendment statement names the policy area (gun rights); opposition to stricter laws is implied, not stated, which is what the inferred type is for.

### Christopher Baum, `clean-energy-shift`

- Source: questionnaire, 2026-10-15 (accessed)
- Quote: "Remove government obstacles to production; insure that environmental protections are fully justified and not just politically expedient"
- Ours: **2**. Answer on U.S. energy production; favors removing obstacles to production rather than a faster shift. Vote411 shows answers only after an address is entered, so the quote cannot be checked by script; it was read in a browser on 2026-10-15 using a public address in the race.
- Codex: **unknown**. The quote opposes unspecified production obstacles without identifying fossil-fuel expansion or renewable-energy mandates.
- Resolution: **2 (kept)**. Keep 2. Answering Vote411's energy-production question with "remove government obstacles to production" and a demand that environmental protections be "fully justified" supports expanding production; qualified because fossil fuels are not named.

### Christy Peterson, `challenge-federal-policies`

- Source: inferred, 2026-10-03
- Quote: "I approve of the Presidents' work and support his administration."
- Ours: **2**. Inferred, coded no stronger than 2: answering a question about Congressional oversight of the Trump administration, she opposes more scrutiny of it, which suggests she would not want Colorado's government challenging it either, though she was not asked about state lawsuits directly.
- Codex: **unknown**. General support for the administration does not establish opposition to Colorado challenging specific policies in court.
- Resolution: **2 (kept)**. Keep inferred 2. Answering a question on oversight of the administration, she supports it: the guide's "cooperate with the administration instead" branch, inferred because state lawsuits are not mentioned.

### Christy Peterson, `clean-energy-shift`

- Source: direct_statement, 2026-10-03
- Quote: "Yes I am for allowing more public lands for extraction. These are resources we want plus work opportunities. I support nuclear energy, it is possible to be done cleanly."
- Ours: **2**. Answering whether more federal land in Colorado should be opened to oil and gas extraction; her support for expanding that extraction maps to disagreement with speeding the shift away from oil and gas.
- Codex: **unknown**. The quote supports public-land extraction and nuclear energy without specifying fossil-fuel production or opposing renewable energy.
- Resolution: **2 (kept)**. Keep 2. Answering the Denver Post's question on opening more federal land to oil and gas extraction, "yes" supports expanding production; item 49 routes drilling answers to this statement.

### Christy Peterson, `federal-budget-law`

- Source: inferred, 2026-10-03
- Quote: "I support the President, his agendas and tax breaks. He is a strong man and we are lucky to have him!"
- Ours: **4**. Inferred, coded no stronger than 4: general approval of 'his agendas and tax breaks' without naming the One Big Beautiful Bill Act specifically.
- Codex: **unknown**. General support for the president's agenda and tax breaks does not identify the 2025 budget law.
- Resolution: **4 (kept)**. Keep inferred 4. "His agendas and tax breaks" in 2026 names the law's tax provisions, the policy area, without naming the law.

### Dan "Kilo" Sallis, `clean-energy-shift`

- Source: direct_statement, 2026-10-03
- Quote: "Yes, more public land should be made available for extraction. Energy independence is a top national security priority."
- Ours: **2**. His campaign site similarly opposes 'top-down federal energy mandates' and 'federal fracking bans,' while saying oil, gas, and renewables should all compete.
- Codex: **unknown**. The quote supports energy-resource extraction without identifying fossil fuels rather than resources used for other energy sources.
- Resolution: **2 (kept)**. Keep 2. Same Denver Post drilling question (item 49); the note adds his opposition to federal energy mandates.

### Erik Underwood, `immigration-notify-ice`

- Source: inferred, 2026-01-01
- Quote: "I will sign a bill holding ICE agents accountable for any constitutional or human rights violations in Colorado."
- Ours: **2**. Inferred opposition to Amendment 81 from his adversarial stance toward ICE; the amendment's notification requirement is not addressed directly.
- Codex: **unknown**. Holding ICE agents accountable for rights violations does not establish a position on local criminal-case notifications or cooperation limits.
- Resolution: **2 (kept)**. Keep inferred 2. A pledge to hold ICE agents accountable in Colorado is a related statement in the policy area (ICE enforcement in the state), which is what the protocol's inferred type covers; the notification rule itself is not addressed, which is why it is inferred and no stronger than 2. A first pass of this resolution removed it and Kiros's; re-reading both against the protocol's definition of an inferred position kept them.

### Gabe Evans, `deportation-priority`

- Source: direct_statement, 2026-10-14
- Quote: "There are many aspects of the immigration system that need fixing, but my priorities are: secure the physical border, streamline the system for legal immigration, and deport illegal immigrants who commit crimes."
- Ours: **4**. Prioritizes deporting immigrants who commit crimes specifically, rather than all people without legal status, so coded as agree-with-qualification rather than strongest value.
- Codex: **unknown**. Prioritizing deportation of people who commit crimes does not establish support for expanded enforcement or mass deportation.
- Resolution: **4 (kept)**. Keep 4. Deporting people who commit crimes is stated as a priority with no opposition to broader deportation, so item 46 does not apply; agree with qualification.

### Gabe Evans, `federal-budget-law`

- Source: direct_statement, 2026-10-14
- Quote: "I voted for the largest tax cut in American history, including no tax on tips, overtime, or social security—saving Colorado families over $4,000 a year."
- Ours: **5**. From his 2026 Candidate Connection survey response; reinforced by his recorded Yea vote on H.R. 1 final passage (clerk.house.gov/Votes/2025190, 2025-07-03).
- Codex: **unknown**. The quote praises an unnamed tax-cut measure without identifying H.R. 1 or the One Big Beautiful Bill Act.
- Resolution: **5 (kept)**. Keep 5. "I voted for the largest tax cut in American history, including no tax on tips, overtime, or social security" describes H.R. 1 by its provisions, and the note cites his recorded vote.

### Gabe Evans, `housing-state-zoning`

- Source: recorded_vote, 2024-04-14
- Quote: "Evans No Frizell No"
- Ours: **2**. Final House passage vote on HB24-1313, Housing in Transit-Oriented Communities, which requires larger transit-served communities to allow denser housing near transit, overriding local zoning. The roll call lists members alphabetically; the quote carries the next member's line so it is long enough to check.
- Codex: **unknown**. The quote lists no votes without identifying the legislation or its zoning provisions.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Gabe Evans, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Evans (CO) of Republican from Colorado Voted Nay"
- Ours: **4**. Voted against the resolution disapproving (ending) the national emergency underlying the Canada tariffs, i.e., to keep the tariffs in place. Vote only.
- Codex: **unknown**. The quote reports a nay vote without identifying the measure or its relationship to tariffs.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Gabe Evans, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Evans (CO) of Republican from Colorado Voted Yea"
- Ours: **4**. Voted for the Protection of Women and Girls in Sports Act. Vote only.
- Codex: **unknown**. The quote reports a yea vote without identifying a school-sports measure.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Gabe Evans, `stricter-gun-laws`

- Source: interest_group_rating, 2026-10-14
- Quote: "NRA Political Victory Fund Colorado State Shooting Association"
- Ours: **2**. Listed among organizations endorsing Evans; NRA endorsement coded as opposing stricter gun laws, coded no stronger than disagree as for all interest-group ratings.
- Codex: **unknown**. The quote lists gun-rights organizations without giving a grade, endorsement, or policy position.
- Resolution: **2 (kept)**. Keep interest-group 2. The quote is the NRA Political Victory Fund in his endorsement list; the guide treats an NRA grade as an interest-group rating, and an endorsement is at least that.

### Greg Lopez, `child-trafficking-life`

- Source: direct_statement, 2025-01-01
- Quote: "I encourage all voters to support the efforts of "Protect Kids Colorado" in passing the three legislative initiatives that will appear on the November general election ballot."
- Ours: **5**. Covers Proposition 133 (life without parole for child sex trafficking), one of the three Protect Kids Colorado measures.
- Codex: **unknown**. The quote supports three unnamed initiatives without identifying life-without-parole penalties for child trafficking.
- Resolution: **5 (kept)**. Keep 5. Same quote; Proposition 133 is one of the three.

### Greg Lopez, `health-coverage`

- Source: questionnaire, 2026-10-03
- Quote: "My administration will go after fraud, waste, and abuse to cut costs before cutting benefits and services for Colorado's most vulnerable."
- Ours: **2**. Answering a question about the state's Medicaid funding crisis; coded as a qualified disagreement since he frames cost control as an alternative to new funding but also pledges to protect benefits for the most vulnerable.
- Codex: **unknown**. The quote discusses unspecified benefits and services without identifying health coverage or a commitment to preserve it.
- Resolution: **2 (kept)**. Keep 2. Answering the Medicaid shortfall question with cost-cutting first and benefit cuts after is a qualified disagree; unlike Marx he does not rule cuts out.

### Greg Lopez, `minor-gender-surgery-ban`

- Source: direct_statement, 2025-01-01
- Quote: "I encourage all voters to support the efforts of "Protect Kids Colorado" in passing the three legislative initiatives that will appear on the November general election ballot."
- Ours: **5**. Covers Proposition 135 (surgery ban for minors), one of the three Protect Kids Colorado measures.
- Codex: **unknown**. The quote supports three unnamed initiatives without identifying a ban on surgery for minors.
- Resolution: **5 (kept)**. Keep 5. Same quote; Proposition 135 is one of the three.

### Greg Lopez, `sports-biological-sex`

- Source: direct_statement, 2025-01-01
- Quote: "I encourage all voters to support the efforts of "Protect Kids Colorado" in passing the three legislative initiatives that will appear on the November general election ballot."
- Ours: **5**. Protect Kids Colorado is the campaign behind Propositions 133, 134 and 135 (dailycitizen.focusonthefamily.com, coloradopolitics.com); this record covers Proposition 134 (school sports).
- Codex: **unknown**. The quote supports three unnamed initiatives without identifying school-sports eligibility rules.
- Resolution: **5 (kept)**. Keep 5. He urges voters to pass the three Protect Kids Colorado initiatives; the note sources that campaign to Propositions 133, 134 and 135. Codex did not have that mapping.

### Ilana Spiegel, `challenge-federal-policies`

- Source: inferred, 2026-10-05
- Quote: "I oppose the Trump regime’s efforts to discredit university faculty, defund our life-saving research, and turn university programs into political battlegrounds."
- Ours: **4**. Answer to Chalkbeat's question on whether she would commit CU to the Trump administration's priorities. She pledges to oppose them but does not mention the state's lawsuits, so this is inferred and capped at agree.
- Codex: **unknown**. The quote opposes federal university policies without endorsing state lawsuits against them.
- Resolution: **4 (kept)**. Keep inferred 4. Same question; she pledges to oppose the administration's university policies, the opposite of the guide's "cooperate instead" branch.

### James Wiley, `challenge-federal-policies`

- Source: direct_statement, 2026-10-07
- Quote: "If federal agencies in their demands exceed what I determine as their lawful right, then I will stand on restricting their action."
- Ours: **3**. Explicitly mixed: answering how Colorado should respond to possible Trump administration limits on mail voting, he said he would 'gladly cooperate with federal agencies' within the bounds of law, but would resist demands he judges unlawful.
- Codex: **unknown**. The quote promises resistance to unlawful federal demands without specifying court challenges against current policies.
- Resolution: **3 (kept)**. Keep 3. He would cooperate with federal agencies within the law and resist demands he judges unlawful: an explicit middle position between the guide's two branches.

### Jason Clark, `deportation-priority`

- Source: inferred, 2026-10-11
- Quote: "But we have to have the facilities, and I support the guys out there doing it."
- Ours: **3**. In the same interview he said immigration enforcement "has been reckless" and that he supports the agents and the detention facility; coded as mixed.
- Codex: **unknown**. The quote refers to unspecified facilities and people doing unspecified work, so its immigration position cannot be established.
- Resolution: **3 (kept)**. Keep 3. Already weighed in the build review: in one interview he called enforcement reckless and said he supports the agents and the detention facility, a record that points both ways.

### Jason Crow, `deportation-priority`

- Source: recorded_vote, 2025-01-22
- Quote: "Representative Crow of Democratic from Colorado Voted Nay"
- Ours: **2**. Voted against the Laken Riley Act, which mandates detention of undocumented immigrants charged with certain crimes; coded as disagreeing with making deportation enforcement a top priority. Vote only.
- Codex: **unknown**. The quote reports a nay vote without identifying an immigration-enforcement measure.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jason Crow, `federal-budget-law`

- Source: direct_statement, 2025-04-29
- Quote: "I’m a hard no."
- Ours: **1**. Statement on the reconciliation package that became the One Big Beautiful Bill Act, combined with his recorded Nay vote on H.R. 1 final passage (clerk.house.gov/Votes/2025190, 2025-07-03).
- Codex: **unknown**. A hard no without an identified subject cannot establish a position on the 2025 budget law.
- Resolution: **1 (kept)**. Keep 1. "I'm a hard no" on the reconciliation package that became the law, backed by his recorded Nay in the note. The quote would read better with the question; it is flagged for the next source pass.

### Jason Crow, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Crow of Democratic from Colorado Voted Yea"
- Ours: **2**. Voted to disapprove of (end) the national emergency underlying the Canada tariffs; coded as disagreeing with keeping broad tariffs. Vote only, so not coded stronger.
- Codex: **unknown**. The quote reports a yea vote without identifying the measure or its relationship to tariffs.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jason Crow, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Crow of Democratic from Colorado Voted Nay"
- Ours: **2**. Voted against the Protection of Women and Girls in Sports Act. Vote only.
- Codex: **unknown**. The quote reports a nay vote without identifying a school-sports measure.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Bridges, `abortion-legal`

- Source: sponsored_bill, 2025-01-17
- Quote: "Concerning the designation of January 22 as "Reproductive Rights and Justice Day"."
- Ours: **4**. Co-sponsor (not prime sponsor) of this symbolic resolution.
- Codex: **unknown**. Designating a reproductive-rights observance does not specify support for abortion legality or a measure named in the guide.
- Resolution: **4 (kept)**. Keep 4. Cosponsoring a resolution designating Reproductive Rights and Justice Day is symbolic support for abortion rights; agree with qualification.

### Jeff Bridges, `federal-budget-law`

- Source: direct_statement, 2025-05-22
- Quote: "While we budget with a scalpel, Congressional Republicans are using a chainsaw. This budget is irresponsible and reckless, and it will hurt Coloradans."
- Ours: **1**. Statement issued as chair of the Joint Budget Committee after the U.S. House passed the bill in May 2025; it became law in July 2025.
- Codex: **unknown**. The quote condemns an unnamed congressional budget without identifying the 2025 tax and spending law.
- Resolution: **1 (kept)**. Keep 1. "This budget is irresponsible and reckless" was issued as Joint Budget Committee chair about the bill after the House passed it; criticism without qualification.

### Jeff Crank, `deportation-priority`

- Source: recorded_vote, 2026-06-09
- Quote: "Funding ICE and CBP through 2029 S. 2 – June 9, 2026 Crank voted ‘Yea.’"
- Ours: **4**. Multi-year funding for immigration enforcement agencies.
- Codex: **unknown**. The quote supports funding ICE and CBP but does not establish expanded funding, mass deportation, or a deportation priority.
- Resolution: **4 (kept)**. Keep 4. A vote for multi-year ICE and CBP funding is the guide's "expanded federal immigration enforcement and funding"; a vote alone is 4.

### Jeff Crank, `federal-budget-law`

- Source: recorded_vote, 2025-07-03
- Quote: "Representative Crank of Republican from Colorado Voted Aye"
- Ours: **4**. He also touted his Yea vote in a Gazette editorial, per Pikes Peak Bulletin's summary of his record.
- Codex: **unknown**. The quote reports an aye vote without identifying the legislation voted on.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Crank, `health-coverage`

- Source: questionnaire, 2026-10-07
- Quote: "“I support them as they are for able-bodied adults, ages 18 to 64, who are not caregivers.”"
- Ours: **2**. Answering a question on Medicaid work requirements imposed by the One Big Beautiful Bill Act.
- Codex: **unknown**. The quote supports an unspecified policy for some adults without identifying work requirements or health coverage.
- Resolution: **2 (kept)**. Keep 2. "I support them as they are" answers a question on the Medicaid work requirements, which the guide names.

### Jeff Crank, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Crank of Republican from Colorado Voted Nay"
- Ours: **4**. Voted against ending the Canada tariff emergency; Pikes Peak Bulletin reports he voted the same way on three related procedural tariff votes (H.Res. 211, 313, 707) in February 2026, despite opposing tariffs generally in a 2024 interview.
- Codex: **unknown**. The quote reports a nay vote without identifying the measure or its relationship to tariffs.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Crank, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Crank of Republican from Colorado Voted Yea"
- Ours: **4**. H.R. 28 would bar athletes whose sex was male from women's and girls' school sports programs.
- Codex: **unknown**. The quote reports a yea vote without identifying a school-sports measure.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Hurd, `deportation-priority`

- Source: recorded_vote, 2025-01-22
- Quote: "Representative Hurd (CO) of Republican from Colorado Voted Yea"
- Ours: **4**. Voted for the Laken Riley Act, which expanded mandatory detention of certain noncitizens and enforcement-related authorities.
- Codex: **unknown**. The quote reports a yea vote without identifying an immigration-enforcement measure.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Hurd, `federal-budget-law`

- Source: recorded_vote, 2025-07-03
- Quote: "Representative Hurd (CO) of Republican from Colorado Voted Aye"
- Ours: **4**. Later said of the bill, "I supported the legislation while recognizing that it was not perfect" (Aspen Times, Oct. 7, 2026).
- Codex: **unknown**. The quote reports an aye vote without identifying the legislation voted on.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Hurd, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Hurd (CO) of Republican from Colorado Voted Yea"
- Ours: **2**. One of six Republicans who voted to end the Canada tariff emergency; voting Yea is against keeping the tariffs.
- Codex: **unknown**. The quote reports a yea vote without identifying the measure or its relationship to tariffs.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jeff Hurd, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Hurd (CO) of Republican from Colorado Voted Yea"
- Ours: **4**. Voted for the bill barring transgender girls and women from female school sports teams.
- Codex: **unknown**. The quote reports a yea vote without identifying a school-sports measure.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Jessica Killin, `clean-energy-shift`

- Source: interest_group_rating, 2026-01-01
- Quote: "She has also been endorsed by the following national organizations: Defend the Vote, EMILYs List, Elect Democratic Women, Human Rights Campaign, Giffords, League of Conservation Voters Action Fund"
- Ours: **4**. League of Conservation Voters Action Fund endorsement coded no stronger than agree under this guide’s rules.
- Codex: **unknown**. The listed endorsements do not specify support for renewable-energy acceleration or the policies named in the guide.
- Resolution: **4 (kept)**. Keep interest-group 4. A League of Conservation Voters Action Fund endorsement is an environmental group's rating; coded no stronger than agree.

### Jessica Killin, `federal-budget-law`

- Source: inferred, 2026-10-07
- Quote: "She said she would “pull back on or eliminate” tax cuts for large corporations and the wealthy — “those making over $1 million.”"
- Ours: **2**. Answering which H.R. 1 tax cuts she would keep or change, she would preserve only targeted middle- and lower-income provisions and reverse the law's corporate and top-earner tax cuts; inferred opposition to the law as passed, coded no stronger than disagree since she was not asked squarely whether Congress was right to pass it.
- Codex: **unknown**. Opposing tax cuts for corporations and high earners does not identify the 2025 budget law.
- Resolution: **2 (kept)**. Keep inferred 2. She answered which H.R. 1 tax cuts she would keep, so the law is the subject; reversing its corporate and top-earner cuts is inferred opposition.

### Joe Krzeczkowski, `stricter-gun-laws`

- Source: direct_statement, 2026-06-05
- Quote: "In Colorado, we respect the right to own firearms for self-defense and sport, but we also expect the common-sense transparency required to keep our schools and streets safe."
- Ours: **3**. Explicit mixed position: affirms gun ownership rights while calling for added safety measures, rather than clearly agreeing or disagreeing with stricter laws generally.
- Codex: **unknown**. Support for unspecified transparency alongside gun ownership does not identify a new gun restriction.
- Resolution: **3 (kept)**. Keep 3. Affirms gun rights and expects added safety measures in one sentence: an explicit middle in the policy area.

### Joe Neguse, `clean-energy-shift`

- Source: recorded_vote, 2022-08-12
- Quote: "Representative Neguse of Democratic from Colorado Voted Yea"
- Ours: **4**. The Inflation Reduction Act included roughly $369 billion for climate and clean-energy programs per Ballotpedia's summary of the bill.
- Codex: **unknown**. The quote reports a yea vote without identifying an energy measure or its provisions.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Joe Neguse, `deportation-priority`

- Source: recorded_vote, 2025-01-22
- Quote: "Representative Neguse of Democratic from Colorado Voted Nay"
- Ours: **2**. Voted against the Laken Riley Act, which expanded mandatory detention of certain noncitizens and enforcement-related authorities.
- Codex: **unknown**. The quote reports a nay vote without identifying an immigration-enforcement measure.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Joe Neguse, `federal-budget-law`

- Source: recorded_vote, 2025-07-03
- Quote: "Representative Neguse of Democratic from Colorado Voted No"
- Ours: **2**. Voted against final passage of the One Big Beautiful Bill Act.
- Codex: **unknown**. The quote reports a no vote without identifying the legislation voted on.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Joe Neguse, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Neguse of Democratic from Colorado Voted Yea"
- Ours: **2**. Voting Yea ended the tariff emergency declaration, i.e. against keeping the tariffs.
- Codex: **unknown**. The quote reports a yea vote without identifying the measure or its relationship to tariffs.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Joe Neguse, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Neguse of Democratic from Colorado Voted Nay"
- Ours: **2**. Voted against the bill barring transgender girls and women from female school sports teams.
- Codex: **unknown**. The quote reports a nay vote without identifying a school-sports measure.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### John Hickenlooper, `clean-energy-shift`

- Source: sponsored_bill, 2025-07-01
- Quote: "On the Amendment (Hickenlooper Amdt. No. 2719)"
- Ours: **5**. He authored this amendment to preserve the residential clean-energy tax credit that H.R. 1 would terminate, and voted Yea on his own amendment.
- Codex: **unknown**. The quote names an amendment without describing its energy provisions or the sponsor's policy position.
- Resolution: **5 (kept)**. Keep. The quote is the official bill or amendment title; the note says the candidate sponsored it and what it does. He authored the amendment (one preserving the residential clean-energy credit, one blocking the use of land-sale proceeds), the scale's "authored a bill doing exactly this".

### John Hickenlooper, `deportation-priority`

- Source: recorded_vote, 2025-01-20
- Quote: "Hickenlooper (D-CO), Nay"
- Ours: **2**. Final passage of the Laken Riley Act, which expands mandatory federal detention of unauthorized immigrants charged with certain crimes; a Nay vote opposes that expansion of enforcement. In an Oct. 5, 2026 Colorado Sun questionnaire he said people who have been working and paying taxes should get a guest-worker visa and that DACA recipients should have a path to citizenship.
- Codex: **unknown**. The quote gives only a nay vote without identifying an immigration-enforcement measure.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### John Hickenlooper, `federal-budget-law`

- Source: recorded_vote, 2025-07-01
- Quote: "Hickenlooper (D-CO), Nay"
- Ours: **2**. Final Senate passage vote on H.R. 1, the One Big Beautiful Bill Act; a Nay vote opposes the law the statement asks about.
- Codex: **unknown**. The quote gives only a nay vote without identifying the legislation voted on.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### John Hickenlooper, `health-coverage`

- Source: direct_statement, 2026-10-10
- Quote: "I've said for forever, since 1977, I'm on the record that health care should be a right and not a privilege"
- Ours: **5**. Direct quote in a Denver7 interview; his campaign site similarly supports a public option and empowering Medicare to negotiate drug prices, and in an Oct. 5, 2026 Colorado Sun questionnaire he said he opposes the Medicaid work requirements in H.R. 1 because 'they're punitive.'
- Codex: **unknown**. Calling healthcare a right does not identify expanded insurance coverage or a government coverage policy.
- Resolution: **5 (kept)**. Keep 5. "Health care should be a right" since 1977, with a public option on his site and opposition to the work requirements in the note: a signature issue.

### John Hickenlooper, `keep-tariffs`

- Source: recorded_vote, 2025-10-30
- Quote: "Hickenlooper (D-CO), Yea"
- Ours: **2**. Voted to terminate the national emergency used to impose broad global tariffs, i.e. against keeping those tariffs. In an Oct. 5, 2026 Colorado Sun questionnaire he said directly, 'No. I think the tariffs have been a significant drag on our economy and have been especially harmful to ranchers and farmers across the country,' but the recorded vote is used here per source-strength ranking.
- Codex: **unknown**. The quote gives only a yea vote without identifying the measure or its relationship to tariffs.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### John Hickenlooper, `public-lands`

- Source: sponsored_bill, 2025-04-05
- Quote: "On the Amendment (Hickenlooper Amdt. No. 2107)"
- Ours: **5**. He authored this budget-resolution amendment to block using proceeds from federal public-land sales to reduce the deficit, and voted Yea on his own amendment.
- Codex: **unknown**. The quote names an amendment without describing public-land ownership provisions or a policy position.
- Resolution: **5 (kept)**. Keep. The quote is the official bill or amendment title; the note says the candidate sponsored it and what it does. He authored the amendment (one preserving the residential clean-energy credit, one blocking the use of land-sale proceeds), the scale's "authored a bill doing exactly this".

### Kelley Anne Dennison, `hunting-right`

- Source: inferred, 2026-10-15 (accessed)
- Quote: "Protect hunting, sport shooting, and outdoor traditions that are deeply connected to Colorado's culture, conservation efforts, and rural communities."
- Ours: **4**. Pledges to protect hunting but does not mention Amendment 83 or a constitutional right, so this is inferred. The site renders with JavaScript; the quote was confirmed in a browser.
- Codex: **unknown**. Protecting hunting traditions does not establish support for a constitutional hunting and fishing right.
- Resolution: **4 (kept)**. Keep inferred 4. A pledge to protect hunting names the policy area of a constitutional right to hunt.

### Kelley Anne Dennison, `public-lands`

- Source: questionnaire, 2026-10-03
- Quote: "its no harm no foul. On principal, I want to develop a more robust interaction between the federal government and it’s land, and our resource sector. Colorado deserves to be a rich state, we need minerals now more than we ever have. However, it is imperative we preserve the beauty of our state, all the wealth in the world isn’t worth living on a pile of ashes."
- Ours: **3**. Answering a question about opening federal land to oil and gas leasing, she says she has no objection to land swaps between private holders and the federal government and wants more mineral development, while also stressing preservation of the state's natural beauty; coded as an explicit middle position rather than a clear agree or disagree on land staying in federal hands.
- Codex: **unknown**. The quote balances resource extraction with conservation but does not address selling or transferring federal ownership.
- Resolution: **3 (kept)**. Keep 3. She has no objection to land swaps (a transfer) and wants more mineral development, while insisting on preserving the state; an explicit middle on whether land stays federal. Item 49 allows drilling answers that address swaps.

### Kevin Grantham, `income-tax-cap`

- Source: inferred, 2018-01-11
- Quote: "the bill reduces both the individual and the corporate state income tax rate from 4.63% to 4.43%"
- Ours: **4**. Grantham was a prime sponsor of this 2018 bill, which did not pass. Sponsoring a cut to the flat rate is read as support for holding the rate at or below today's level; he has not been found commenting on Proposition 136 itself.
- Codex: **unknown**. A past tax-rate reduction does not establish support for a 4.4 percent cap or opposition to all future increases.
- Resolution: **4 (kept)**. Keep inferred 4. DECISIONS.md item 57: sponsoring a cut to the flat rate names the policy area and supports holding the rate at or below today's.

### Lauren Boebert, `keep-tariffs`

- Source: recorded_vote, 2026-02-11
- Quote: "Representative Boebert of Republican from Colorado Voted Nay"
- Ours: **4**. The resolution would have terminated the national emergency underlying tariffs on Canada; voting Nay opposed ending the tariffs.
- Codex: **unknown**. The quote reports a nay vote without identifying the measure or its relationship to tariffs.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Lauren Boebert, `sports-biological-sex`

- Source: recorded_vote, 2025-01-14
- Quote: "Representative Boebert of Republican from Colorado Voted Yea"
- Ours: **4**. H.R. 28 would bar athletes whose sex was male from women's and girls' school sports programs.
- Codex: **unknown**. The quote reports a yea vote without identifying a school-sports measure.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Lisa Escárcega, `graduated-income-tax`

- Source: direct_statement, 2026-10-07
- Quote: "Yes. Our school funding formula, even the new one being implemented, is not enough to provide adequate funding for a strong Colorado education system."
- Ours: **4**. Answering Chalkbeat's combined question on whether she supports 'changing state tax rules to raise more money for education, as proposed in Proposition NN and Amendment 87'; her 'yes' covers both measures.
- Codex: **unknown**. The quote supports more school funding but does not identify what its opening yes refers to or a graduated tax proposal.
- Resolution: **4 (kept)**. Keep 4. "Yes" to Chalkbeat's combined question on Proposition NN and Amendment 87; the note names the question. Flagged: the quote should carry the question text (item 38).

### Lisa Escárcega, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "Yes. Our school funding formula, even the new one being implemented, is not enough to provide adequate funding for a strong Colorado education system."
- Ours: **4**. Same answer as above; Chalkbeat asked about Proposition NN (keep-tabor-surplus) and Amendment 87 (graduated-income-tax) together and she answered 'yes' to both.
- Codex: **unknown**. The quote supports more school funding but does not identify what its opening yes refers to or TABOR surplus retention.
- Resolution: **4 (kept)**. Keep 4. Same answer and flag.

### Manny Rutinel, `federal-budget-law`

- Source: direct_statement, 2026-10-14
- Quote: "their budget cuts take away earned benefits like Social Security, Medicaid, and Medicare - benefits Trump calls “entitlements” - to pay for massive tax cuts for the wealthy and big corporations"
- Ours: **1**. Direct criticism of the One Big Beautiful Bill Act's tax and spending provisions, a central campaign theme.
- Codex: **unknown**. The quote criticizes unspecified budget cuts and tax cuts without identifying the 2025 federal law.
- Resolution: **1 (kept)**. Keep 1. The quote describes the law by its provisions (benefit cuts paying for tax cuts) and the note records it as a central campaign theme.

### Manny Rutinel, `housing-state-zoning`

- Source: recorded_vote, 2024-04-14
- Quote: "Rutinel Yes"
- Ours: **4**. Final House passage vote on HB24-1313, Housing in Transit-Oriented Communities, which requires larger transit-served communities to allow denser housing near transit, overriding local zoning.
- Codex: **unknown**. The quote gives only a yes vote without identifying zoning legislation.
- Resolution: **4 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Mark Baisley, `deportation-priority`

- Source: questionnaire, 2026-10-05
- Quote: "No. We should not be the relief valve for all the dysfunctional countries around the world."
- Ours: **5**. Answering whether anyone already living in the U.S. illegally should be permitted to stay.
- Codex: **unknown**. The quote rejects being a relief valve for other countries without specifying deportation or enforcement priorities.
- Resolution: **5 (kept)**. Keep 5. "No" to whether anyone living here illegally should be permitted to stay is unqualified support for deporting all of them; flagged for the question text.

### Mark Baisley, `federal-budget-law`

- Source: questionnaire, 2026-10-05
- Quote: "I'm appreciative of everything that I've seen in that bill."
- Ours: **5**. Answering a question about H.R. 1 (the One Big Beautiful Bill Act), Baisley said he loves that the bill made permanent nearly all of the 2017 federal income tax cuts and did not name any provision he would change.
- Codex: **unknown**. The quote praises an unidentified bill, so its relationship to the 2025 budget law is unknown.
- Resolution: **5 (kept)**. Keep 5. "Appreciative of everything that I've seen in that bill", answering a question about H.R. 1; flagged for the question text.

### Mark Baisley, `housing-state-zoning`

- Source: recorded_vote, 2024-05-06
- Quote: "Baisley No"
- Ours: **2**. Final Senate passage vote on HB24-1152, which requires many Colorado cities to allow accessory dwelling units on single-family lots, overriding local zoning restrictions.
- Codex: **unknown**. The quote gives only a no vote without identifying zoning legislation.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Mark Baisley, `keep-tabor-surplus`

- Source: direct_statement, 2023-08-14
- Quote: "It is a sneaky, underhanded way to get rid of TABOR by dangling some dollars in front of people who have not earned those dollars."
- Ours: **1**. Criticizing a 2023 bill that tied a flat TABOR refund to a ballot measure that would have reduced future TABOR refunds; a 2023 statement, but it directly addresses the same underlying question (keeping vs. refunding revenue above the TABOR limit) as the 2026 statement.
- Codex: **unknown**. The quote opposes an unnamed effort to eliminate TABOR without specifying surplus retention, refunds, or Proposition NN.
- Resolution: **1 (kept)**. Keep 1. A 2023 statement, but on the same question: letting the state keep money above the TABOR limit, which he called a way to get rid of TABOR.

### Mark Baisley, `stricter-gun-laws`

- Source: recorded_vote, 2025-02-18
- Quote: "Baisley No"
- Ours: **2**. Final Senate passage vote on SB25-003, which created a permit requirement for certain semiautomatic firearms; this directly matches the statement's own coding example.
- Codex: **unknown**. The quote gives only a no vote without identifying gun legislation.
- Resolution: **2 (kept)**. Keep. The quote is the member's line from the official roll call, which is how the protocol quotes votes; the source title and note name the bill. Codex coded from the quote alone and did not read the title.

### Melat Kiros, `federal-budget-law`

- Source: questionnaire, 2026-05-29
- Quote: "the ultra wealthy and corporations. We are desperately in need of those dollars to uplift the working class, and so I would not vote to keep those."
- Ours: **1**. Answering 'Absolutely not' to whether she would vote to continue the tax cuts in the One Big Beautiful Bill Act when they expire in 2029.
- Codex: **unknown**. The fragment opposes unspecified benefits for wealthy people and corporations without identifying the 2025 budget law.
- Resolution: **1 (kept)**. Keep 1. "Absolutely not" to continuing the law's tax cuts, per the note; criticism of its central provision without qualification. Flagged: the quote starts mid-sentence.

### Melat Kiros, `housing-state-zoning`

- Source: inferred, 2026-10-02
- Quote: "We need Housing First policies, federal dollars for housing production, along with zoning and permitting reform."
- Ours: **4**. Inferred, coded no stronger than 4: she calls for zoning and permitting reform to build more housing, but as a congressional candidate she addresses this as federal policy rather than naming Colorado's state zoning-preemption laws specifically.
- Codex: **unknown**. The quote supports zoning reform without specifying state overrides of local zoning authority.
- Resolution: **4 (kept)**. Keep inferred 4. "Zoning and permitting reform" to build more housing names the policy area.

### Melat Kiros, `immigration-notify-ice`

- Source: inferred, 2026-10-02
- Quote: "ICE is out of control and making communities less safe."
- Ours: **2**. Inferred, coded no stronger than 2: she opposes current ICE enforcement broadly but does not address Colorado's specific limits on local police/jail cooperation with federal immigration authorities.
- Codex: **unknown**. Criticizing ICE as unsafe does not establish a position on local criminal-case notifications or cooperation limits.
- Resolution: **2 (kept)**. Keep inferred 2. "ICE is out of control and making communities less safe" is a related statement in the same policy area; same reasoning as Underwood.

### Melat Kiros, `sports-biological-sex`

- Source: inferred, 2026-04-24
- Quote: "state legislatures across the country continue to target trans youth and roll back protections"
- Ours: **2**. Inferred, coded no stronger than 2, from her general opposition to restrictions targeting transgender youth; she does not address school sports or Proposition 134 by name.
- Codex: **unknown**. The quote criticizes unspecified restrictions on transgender youth without addressing sports eligibility.
- Resolution: **2 (kept)**. Keep inferred 2. Opposing legislatures that "target trans youth and roll back protections" names the policy area; sports bans are the main such legislation.

### Michael J. Allen, `challenge-federal-policies`

- Source: questionnaire, 2026-10-06
- Quote: "I would guess that there's a big chunk of those that we would continue and maybe some that we wouldn't continue, but to tell a specific case that we wouldn't pursue would be improper because I don't know the intricate facts of each one of those cases."
- Ours: **3**. Explicitly case-by-case on whether to continue AG Weiser's roughly 80 lawsuits against the Trump administration.
- Codex: **unknown**. The quote conditionally supports continuing unspecified cases without identifying lawsuits against federal policies.
- Resolution: **3 (kept)**. Keep 3. Explicitly case-by-case on continuing the attorney general's lawsuits against the administration.

### Nolbert Chavez, `challenge-federal-policies`

- Source: inferred, 2026-10-05
- Quote: "The Trump administration has weaponized the federal government against universities. Cutting grant funding and gutting the Department of Education. I would not voluntarily commit to those policies."
- Ours: **4**. Answer to Chalkbeat's question on whether he would commit CU to the Trump administration's priorities. He says he would not, but does not mention the state's lawsuits, so this is inferred and capped at agree.
- Codex: **unknown**. Rejecting federal university policies does not establish support for challenging them in court.
- Resolution: **4 (kept)**. Keep inferred 4. Same question; "I would not voluntarily commit to those policies".

### Phil Weiser, `challenge-federal-policies`

- Source: direct_statement, 2026-01-01
- Quote: "I've led that fight as your attorney general by filing more than 60 lawsuits and winning, and I will continue it as your next governor."
- Ours: **5**. No note.
- Codex: **unknown**. The quote pledges to continue an unspecified legal fight without identifying the defendants or federal policies challenged.
- Resolution: **5 (kept)**. Keep 5. The more than 60 lawsuits he filed as attorney general are the state's suits against the federal administration; pledging to continue them is the guide's agree branch, as a signature issue.

### Phil Weiser, `conservation-sales-tax`

- Source: direct_statement, 2026-09-30
- Quote: "That's a responsible way to ensure these important priorities are supported while not reducing critical funds for K-12 schools and healthcare"
- Ours: **5**. In late September 2026 Weiser announced his support for Proposition 137; this quote is from his statement explaining why.
- Codex: **unknown**. The quote praises an unspecified funding approach without identifying sporting-goods sales taxes or Proposition 137.
- Resolution: **5 (kept)**. Keep 5. The note records this as his statement announcing support for Proposition 137.

### Ross Klopf, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "This measure was placed on the ballot by the state legislature, and I believe it is better than Amendment 87. Although funding is a significant issue for many schools, I do not support this measure."
- Ours: **2**. Addressing Proposition NN specifically.
- Codex: **unknown**. The quote opposes an unnamed measure and compares it with Amendment 87 without identifying Proposition NN or surplus retention.
- Resolution: **2 (kept)**. Keep 2. "This measure was placed on the ballot by the state legislature" identifies Proposition NN (Amendment 87 was a citizen initiative), and he says he does not support it.

### Sherri M Wright, `graduated-income-tax`

- Source: direct_statement, 2026-10-07
- Quote: "No. I strongly support adequately funding education, but voters deserve clear and transparent ballot measures."
- Ours: **2**. Wright opposes Proposition NN and Amendment 87 specifically over ballot-transparency concerns while saying she supports funding education adequately; coded as qualified disagreement rather than unqualified opposition.
- Codex: **unknown**. The quote gives a no without identifying the measure and discusses ballot clarity rather than graduated taxation.
- Resolution: **2 (kept)**. Keep 2. "No" to the same combined question, qualified by her support for school funding; flagged for the question text.

### Sherri M Wright, `keep-tabor-surplus`

- Source: direct_statement, 2026-10-07
- Quote: "No. I strongly support adequately funding education, but voters deserve clear and transparent ballot measures."
- Ours: **2**. Same answer, addressing Proposition NN and Amendment 87 together.
- Codex: **unknown**. The quote gives a no without identifying the measure and does not address retaining TABOR surplus.
- Resolution: **2 (kept)**. Keep 2. Same answer and flag.

### Tim Bennett, `fentanyl-penalties`

- Source: inferred, 2026-10-01
- Quote: "I'll support law enforcement, first responders, and efforts to combat violent crime and the fentanyl epidemic while ensuring local communities have the flexibility to meet their own needs."
- Ours: **4**. Inferred: he supports tougher enforcement generally against the 'fentanyl epidemic' but does not specifically address mandatory prison time or felony charges for any amount, as Proposition 132 and the statement contemplate.
- Codex: **unknown**. A pledge to combat the fentanyl epidemic does not specify tougher penalties or mandatory prison terms.
- Resolution: **4 (kept)**. Keep inferred 4. Supporting law enforcement efforts against the fentanyl epidemic names the policy area and leans toward enforcement rather than the guide's treatment-first branch, without saying anything about penalties: implied, not stated, so inferred and no stronger than 4. A first pass of this resolution removed it; re-reading it against the protocol's definition of an inferred position kept it.

### Tim Bennett, `health-coverage`

- Source: direct_statement, 2026-10-01
- Quote: "By resisting a full federal takeover, we keep decisions closer to the people who know their needs best."
- Ours: **2**. In the context of a Medicare/Medicaid section favoring price transparency and competition over expanded federal coverage.
- Codex: **unknown**. The quote rejects an unspecified federal takeover without identifying healthcare, insurance, or government coverage.
- Resolution: **2 (kept)**. Keep 2. "Resisting a full federal takeover" is from his platform's Medicare and Medicaid section (per the note), which favors transparency and competition: the guide's market-based branch, qualified.

### Victor Marx, `hunting-right`

- Source: questionnaire, 2026-06-24
- Quote: ""Absolutely," Marx said. "If we do not act now, decisions about wildlife management will continue drifting away from science and into ideology.""
- Ours: **5**. Answering whether he supports what was then proposed Initiative 302, the hunting/fishing constitutional right that became Amendment 83.
- Codex: **unknown**. The quote's absolute support has no identified proposal, and wildlife-management concerns do not establish a constitutional hunting right.
- Resolution: **5 (kept)**. Keep 5. "Absolutely", answering whether he supports the initiative that became Amendment 83; flagged for the question text.

### Victor Marx, `income-tax-cap`

- Source: inferred, 2026-07-01
- Quote: "As Governor, I will support a responsible and phased reduction of the state income tax rate under C.R.S. § 39-22-104 when verified revenue surpluses exist and when reductions comply with voter-approval requirements under Colo. Const. art. X, § 20(3)(a)."
- Ours: **4**. Inferred: commits to reducing, not raising, the state income tax rate, consistent with Proposition 136's cap, though the measure is not named directly.
- Codex: **unknown**. Conditional future tax reductions do not establish support for a permanent 4.4 percent cap or rejection of all increases.
- Resolution: **4 (kept)**. Keep inferred 4. A pledge to reduce the state income tax rate names the policy area; the same reading as Grantham (item 57).

## Codex unknown, direction kept, strength or source type corrected

The quote supports the position but not at the first pass's strength, or it implies rather than states it.

### Adam Withrow, `clean-energy-shift`

- Source: direct_statement, 2026-10-14
- Quote: "Fossil fuels are obsolete. Yes, we have them. Yes, we will continue to use them, but they are finite resources, and the rate we use them up keeps increasing."
- Ours: **5**. He calls for 'a smooth transition starting today' to future energy sources.
- Codex: **unknown**. Calling fossil fuels obsolete does not state support for government action or a faster shift to renewable energy.
- Resolution: **4**. Keep the direction, 5 to 4. The transition call supports the statement, but "we will continue to use them" and "smooth" are qualifications; 5 needs none.

### Amanda Gonzalez, `challenge-federal-policies`

- Source: direct_statement, 2026-10-07
- Quote: "It is clearly not the president's role to regulate how Colorado runs our elections. He should particularly not be doing that for partisan purposes."
- Ours: **4**. Answering how Colorado should respond to possible Trump administration attempts to limit mail voting.
- Codex: **unknown**. The quote criticizes presidential interference in elections but does not endorse state lawsuits.
- Resolution: **4, inferred**. Keep 4 as inferred. Saying the president has no role in Colorado's elections, answering how the state should respond to federal limits on mail voting, implies resistance in the statement's policy area (the state against federal action) without mentioning lawsuits, so it is inferred, as with the regents. A first pass of this resolution removed it; re-reading it against the protocol's definition of an inferred position restored it as inferred.

### Chad Humphrey, `public-lands`

- Source: questionnaire, 2026-10-03
- Quote: "Decisions about Colorado's public lands have no business being made in Washington, D.C. Period."
- Ours: **1**. Argues the state legislature, not Washington, should decide Colorado's land policy, which the coding guide treats as supporting transfer away from federal control.
- Codex: **unknown**. The quote rejects federal decision-making over public lands but does not explicitly support transferring or selling ownership.
- Resolution: **2**. Keep the direction, 1 to 2. Moving decisions out of Washington supports transfer of control (the disagree branch) but does not say sell or transfer ownership, so it is qualified.

### Christy Peterson, `health-coverage`

- Source: direct_statement, 2026-04-13
- Quote: "In 2013 when Obamacare was planning to fine citizens for not buying their health insurance, she knew it was unconstitutional."
- Ours: **2**. Opposition to the ACA's individual mandate, paired with her stated 'low taxes, limited government' philosophy, read as opposing expanded government health-insurance mandates.
- Codex: **unknown**. Opposition to the individual insurance mandate does not establish opposition to expanded government health coverage.
- Resolution: **2, inferred**. Keep 2 as inferred. Opposing the ACA mandate names the policy area but implies rather than states a position on expanding coverage; the note had stacked her general limited-government philosophy on top, which item 48 does not allow.

### Christy Peterson, `minor-gender-surgery-ban`

- Source: questionnaire, 2026-04-13
- Quote: "no to mutilizing innocent childrens' body parts, no to adults who manipulate children to mutilize."
- Ours: **5**. Listed among her core 'no to' campaign positions; read as opposing gender-transition surgery for minors. Typos are in the original survey text.
- Codex: **unknown**. The quote condemns harm to children's bodies without identifying gender-transition surgery or a proposed ban.
- Resolution: **4, inferred**. Keep the direction, questionnaire 5 to inferred 4. The quote names surgery on children's bodies, the statement's policy area, but not gender transition or the measure, so the position is implied rather than stated. A first pass of this resolution removed it; re-reading it against the protocol's definition of an inferred position restored it as inferred.

### Christy Peterson, `stricter-gun-laws`

- Source: direct_statement, 2026-04-13
- Quote: "Yes to protecting free speech, bear arms & America First!"
- Ours: **2**. A short platform bullet rather than an elaborated statement, so coded as disagree-with-qualification rather than strongly disagree.
- Codex: **unknown**. General support for the right to bear arms does not specify a position on stricter gun laws.
- Resolution: **2, inferred**. Keep 2 as inferred. "Yes to ... bear arms" names the policy area without stating a position on new restrictions, the same treatment as Humphrey.

### Dwayne L. Romero, `abortion-legal`

- Source: direct_statement, 2026-10-01
- Quote: "I will put healthcare at the top of my priority list. We've got to keep rural hospitals open and funded, allow medicare to negotiate lower drug prices, and protect women's access to reproductive healthcare."
- Ours: **4**. Lists protecting reproductive healthcare access among his healthcare priorities.
- Codex: **unknown**. Protecting reproductive healthcare does not explicitly establish a position on abortion legality.
- Resolution: **4, inferred**. Keep 4 as inferred. "Reproductive healthcare" names the policy area but is not a statement on abortion; Pettersen's "pro-choice" is.

### Eric Mulder, `immigration-notify-ice`

- Source: questionnaire, 2026-10-03
- Quote: "I support limiting state cooperation with federal agencies in order to uphold constitutional safeguards on privacy and due process."
- Ours: **1**. He also says ICE's 'wrongful arrest, detention, and deportation of citizens is inexcusable,' with no stated carve-out for cooperation on serious crimes, so coded as an unqualified disagreement with Amendment 81's approach.
- Codex: **unknown**. The quote supports unspecified limits on federal cooperation without identifying immigration enforcement or criminal-case notifications.
- Resolution: **2**. Keep the direction, 1 to 2. A general limit on cooperation defends the current limits, but the serious-crime notification the statement asks about is not addressed, so it is qualified.

### Gabe Evans, `fentanyl-penalties`

- Source: sponsored_bill, 2026-07-21
- Quote: "The Stop Pills that Kill Act would implement new penalties and close a sentencing loophole for counterfeit pill production."
- Ours: **5**. Background note on the same release: "Congressman Evans has made combating fentanyl and the flow of illicit drugs a top legislative priority."
- Codex: **unknown**. The quote describes counterfeit-pill penalties without identifying fentanyl or the proposed severity of its penalties.
- Resolution: **4**. Keep the direction, 5 to 4. The bill adds penalties for counterfeit pills (the fentanyl-pill problem) but is not a bill "doing exactly this" (mandatory prison for any amount), so the scale gives 4.

### Gabe Evans, `health-coverage`

- Source: direct_statement, 2026-10-14
- Quote: "This is also why I support free market policies, which will allow good competition and bring down costs."
- Ours: **2**. Statement on prescription drug prices favoring market-based solutions over expanded government coverage; consistent with his Yea vote on H.R. 1, which included Medicaid work requirements.
- Codex: **unknown**. The quote supports free markets and lower costs without identifying healthcare or health insurance.
- Resolution: **2, inferred**. Keep 2 as inferred. A market-based stance on drug prices is in the health policy area but is not a statement about coverage.

### Greg Lopez, `abortion-legal`

- Source: direct_statement, 2025-01-01
- Quote: "I strongly believe every human life has value and deserves dignity, compassion, and respect. I will continue to support policies that protect life while also supporting mothers, families, adoption services, healthcare access, and community-based support systems that help women and children thrive."
- Ours: **2**. This is his most recent (2025/2026 campaign) statement and is a softer formulation than a 2022 interview in which, as a Republican candidate for governor, he said of signing a legislative abortion ban, 'Odds are I would sign it' (news.yahoo.com, 2022-05-04). A reviewer may want to double-check whether his current position has in fact moderated or whether this is just different phrasing.
- Codex: **unknown**. General support for protecting life and helping mothers does not specify abortion legality or restrictions.
- Resolution: **2, inferred**. Keep 2 as inferred. "Policies that protect life" with adoption and mothers names the policy area without saying abortion, so the position is implied.

### Greg Lopez, `housing-state-zoning`

- Source: direct_statement, 2025-01-01
- Quote: "As Governor, I will work to restore local control whenever possible by reducing unnecessary state mandates and empowering counties, municipalities, and school districts to make decisions that best serve their communities."
- Ours: **1**. Consistent with his statement in the Aug. 27, 2026 debate with Weiser that he 'would never take local control away from a jurisdiction' (montrosepress.com).
- Codex: **unknown**. The quote favors local control generally without addressing zoning or state housing laws.
- Resolution: **2, inferred**. Keep the direction, direct 1 to inferred 2. Reducing state mandates on municipalities is the mechanism the statement asks about, but zoning and housing are not named, so the position is inferred and cannot be 1.

### Jason Crow, `clean-energy-shift`

- Source: direct_statement, 2026-10-14 (accessed)
- Quote: "We must fight climate change and protect the Colorado that we love. Climate change is the defining issue of our age."
- Ours: **5**. No note.
- Codex: **unknown**. Calling climate change a defining issue does not identify a renewable-energy transition or government energy policy.
- Resolution: **4, inferred**. Keep the direction, direct 5 to inferred 4. Climate is the policy area, but none of the guide's indicators (renewables, mandates, credits, drilling limits) is stated.

### Jeff Crank, `challenge-federal-policies`

- Source: questionnaire, 2026-10-07
- Quote: "Crank called the lawsuit “constitutionally laughable” and said the state should use its money for more productive endeavors such as working to entice aerospace companies to move to the state."
- Ours: **1**. About Colorado's lawsuit challenging the Trump administration's relocation of U.S. Space Command headquarters to Alabama; he disagreed with the relocation decision itself but dismissed the state's court challenge to it as wasteful.
- Codex: **unknown**. The quote criticizes an unnamed state lawsuit without identifying a challenge to the current federal administration.
- Resolution: **2**. Keep the direction, 1 to 2. He criticized one lawsuit as wasteful (the guide's disagree branch); the statement is about the state's lawsuits generally, so the scale gives 2.

### Jeff Crank, `mail-ballot-id`

- Source: recorded_vote, 2025-04-10
- Quote: "SAVE America Act H.R. 22 & S. 1383 – April 10, 2025 & February 11, 2026 Crank voted ‘Yea’ both times."
- Ours: **4**. General proof-of-citizenship voter ID requirement; does not mention mail ballots specifically, so coded as inferred support coded no stronger than agree.
- Codex: **unknown**. The quote names a bill and votes but does not describe an ID requirement or mail-ballot verification provision.
- Resolution: **4, inferred**. Keep 4, retyped from recorded vote to inferred. The guide itself says general voter-ID support without mention of mail ballots is inferred and no stronger than 4.

### Jeff Crank, `stricter-gun-laws`

- Source: direct_statement, 2024-01-01 (year)
- Quote: "As a lifelong Second Amendment supporter and gun owner and a proud pro-life advocate, I know the importance of a strong conservative voice on these issues."
- Ours: **1**. Date is approximate (text dated to the 2024 campaign cycle on Ballotpedia); month/day unknown.
- Codex: **unknown**. General support for the Second Amendment does not specify a position on stricter gun laws.
- Resolution: **2, inferred**. Keep the direction, direct 1 to inferred 2. Being a Second Amendment supporter implies opposition to new restrictions but does not state it, and an inference cannot be 1.

### Jena Griswold, `clean-energy-shift`

- Source: questionnaire, 2026-10-06
- Quote: "Addressing corporate polluters and protecting our climate has to be the top priority of the next AG and it will absolutely be mine"
- Ours: **5**. Said she would focus on 'the climate crisis' and strict enforcement of anti-pollution laws given federal rollbacks.
- Codex: **unknown**. Prioritizing climate protection and action against polluters does not identify renewable-energy policy or fossil-fuel limits.
- Resolution: **4, inferred**. Keep the direction, direct 5 to inferred 4, for the same reason as Crow.

### Kevin Grantham, `keep-tabor-surplus`

- Source: questionnaire, 2026-10-05
- Quote: "The taxpayers since 1992 have viewed it as a means to protect themselves against the overreaching government when it comes to taxation, when it comes to spending. And I think they have guarded their right to vote on those matters very jealously."
- Ours: **1**. Said in response to a question on whether he views TABOR primarily as a positive or negative; he said 'I view it entirely positively.' In an Oct. 2, 2026 Colorado Politics questionnaire he separately said opponent Jeff Bridges 'is also leading the charge to increase taxes again on Coloradans,' referring to Bridges' sponsorship of the Proposition NN ballot measure.
- Codex: **unknown**. The quote praises voter control of taxes and spending without addressing surplus retention or refunds.
- Resolution: **2, inferred**. Keep the direction, questionnaire 1 to inferred 2. The quote praises TABOR's revenue and spending limits, the statement's own policy area, but does not address Proposition NN or refunds; the remark on Bridges is in a different source. An inference cannot be 1. He stays at 2 of 5 for the treasurer race.

### Lauren Boebert, `mail-ballot-id`

- Source: recorded_vote, 2025-04-10
- Quote: "SAVE Act...was a bill passed by the House of Representatives on 4/10/2025 that required individuals to provide documentary proof of citizenship when registering to vote in federal elections...Yea"
- Ours: **4**. General voter-ID/citizenship-verification vote; does not mention mail ballots specifically, so coded as inferred support coded no stronger than agree.
- Codex: **unknown**. Proof of citizenship at registration does not specify an ID requirement when voting or on mail-ballot envelopes.
- Resolution: **4, inferred**. Keep 4, retyped to inferred, for the same reason.

### Michael J. Allen, `clean-energy-shift`

- Source: questionnaire, 2026-06-01
- Quote: "Man-made climate change is a global threat and requires urgent political action. Disagree"
- Ours: **2**. No note.
- Codex: **unknown**. Rejecting urgent political action on climate change does not specify fossil-fuel expansion or renewable-energy policy.
- Resolution: **2, inferred**. Keep 2 as inferred. The survey item is about climate urgency, not energy policy; the mirror of Crow and Griswold.

### Samir Ezzeldin Witta, `health-coverage`

- Source: direct_statement, 2026-10-14 (accessed)
- Quote: "Reform healthcare. Cap out-of-pocket deductibles at $2,000, and require drug prices to reflect real science and the prices paid in the rest of the world — so no family has to choose between their health and their rent."
- Ours: **4**. Proposes capping patient costs and regulating drug prices rather than a specific coverage-expansion program; coded as agreeing with more government action on healthcare costs.
- Codex: **unknown**. The quote proposes cost and deductible controls without specifying expanded insurance coverage or government coverage programs.
- Resolution: **4, inferred**. Keep 4 as inferred. Deductible caps and price rules are government doing more on health insurance, but none of the guide's coverage-expansion examples is stated.

### Victor Marx, `child-trafficking-life`

- Source: questionnaire, 2026-06-06
- Quote: "Yes. "If an adult rapes a child, I'm absolutely for the death penalty. I've seen it again and again, it's horrific.""
- Ours: **5**. Answered 'yes' to a single question covering Initiatives 108, 109 and 110, which became Propositions 133 (child sex trafficking - life without parole), 134 (sports) and 135 (minors' surgery ban); this record covers Initiative 108/Proposition 133.
- Codex: **unknown**. Supporting the death penalty for child rape does not establish support for life without parole for child sex trafficking or Proposition 133.
- Resolution: **5, quote extended**. Keep 5, and give it the same question-plus-answer quote the build review gave his sports and surgery positions (item 38): the "yes" answered one three-part question covering all three measures.

## Codex unknown, position removed

The quote and note honestly support no position on the statement.

### Bob Chew, `health-coverage`

- Source: direct_statement, 2026-10-14 (accessed)
- Quote: "Different countries and states use different combinations of public and private systems, each with strengths and weaknesses."
- Ours: **3**. He explicitly declines to back either expanding government coverage or a market-only approach, instead calling for study of multiple systems' tradeoffs; coded as an explicit middle/mixed position.
- Codex: **unknown**. Describing strengths and weaknesses of public and private systems does not state a position on expanding government coverage.
- Resolution: **removed**. Remove. The quote describes trade-offs between public and private systems and the note says he declines to back either; that is undecided, which item 36 makes unknown rather than 3.

### Christopher Mitchell, `deportation-priority`

- Source: inferred, 2024-01-01
- Quote: "America First policies such as U.S. Energy Independence, U.S. Economic Strength, Fiscal Responsibility, Sealed U.S. Sovereign Borders, Fiscal Responsibility, and Superior Military Modalities."
- Ours: **4**. Statement calls for 'Sealed U.S. Sovereign Borders' but does not address deportation directly; inferred support, coded no stronger than agree.
- Codex: **unknown**. Support for sealed borders does not establish a position on deporting people already in the country.
- Resolution: **removed**. Remove. "Sealed U.S. Sovereign Borders" is border policy; candidates who pair secure borders with legal pathways are coded 2 or 3, so sealed borders alone cannot support agree on deporting people already here.

### Dan "Kilo" Sallis, `deportation-priority`

- Source: direct_statement, 2026-10-03
- Quote: "I support securing the border while dramatically expanding legal pathways so people can come here to work, not sneak in."
- Ours: **2**. Puts expanding legal immigration pathways first rather than treating deportation of unauthorized immigrants as the top priority.
- Codex: **unknown**. Expanding legal entry pathways does not establish a position on deporting people already present without status.
- Resolution: **removed**. Remove. Securing the border and expanding legal pathways for people to come says nothing about deporting people already here.

### Eileen Laubacher, `health-coverage`

- Source: direct_statement, 2026-01-01 (year)
- Quote: "We need a healthcare system that works for everyone and is affordable and accessible, so people can receive the care they need without worrying about costs."
- Ours: **4**. The page was live during the 2026 general election campaign.
- Codex: **unknown**. The quote advocates affordable care for everyone without specifying health insurance or expanded government coverage.
- Resolution: **removed**. Remove. "A healthcare system that works for everyone and is affordable" names none of the guide's coverage policies and is compatible with either side.

### Eric Mulder, `housing-state-zoning`

- Source: inferred, 2026-10-15 (accessed)
- Quote: "Housing diversity should be pursued, encouraging home rule districts to allow for multiple family units, accessory dwelling units, mobile home and tiny communities, etc."
- Ours: **4**. Favors the state encouraging local governments to allow denser housing; he says encourage rather than override, so this is inferred and capped at agree. Vote411 shows answers only after an address is entered, so the quote cannot be checked by script; it was read in a browser on 2026-10-15 using a public address in the race.
- Codex: **unknown**. Encouraging local districts to allow more housing does not establish support for state overrides or exclusive local control.
- Resolution: **removed**. Remove. He wants the state to encourage home-rule districts to allow denser housing: the agree side's outcome by the disagree side's mechanism. The quote supports neither reading of the override question.

### Eric Mulder, `natural-gas-right`

- Source: inferred, 2026-01-01
- Quote: "From small modular reactors, to natural gas, wind, solar, and geothermal we must use every tool in our disposal to power our state and fortify our energy grid"
- Ours: **4**. Inferred support for continued natural gas use from his energy-diversity platform; Amendment 82 is not named.
- Codex: **unknown**. Including natural gas in electricity generation does not establish support for constitutional protections or unrestricted hookups and appliances.
- Resolution: **removed**. Remove. Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference.

### Erik Underwood, `natural-gas-right`

- Source: inferred, 2026-01-01
- Quote: "On April 22, 2026, the Colorado Energy and Carbon Management Commission (ECMC) approved 24 new oil and gas wells at the State Sunlight/Long pad... That decision is wrong, and I opposed it."
- Ours: **2**. Inferred disagreement with Amendment 82 from his opposition to new oil and gas development and push to accelerate the renewable transition; the amendment itself (about consumer gas hookups, not drilling) is not addressed directly.
- Codex: **unknown**. Opposing new oil and gas wells does not establish a position on natural-gas hookups, appliances, or a constitutional right.
- Resolution: **removed**. Remove. Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference.

### Greg Lopez, `graduated-income-tax`

- Source: inferred, 2025-01-01
- Quote: "I firmly believe that Colorado taxpayers deserve transparency, accountability, and protection from unchecked government growth."
- Ours: **2**. Inferred opposition to Amendment 87 from his general TABOR-defense and anti-tax-growth stance; he does not name the measure directly.
- Codex: **unknown**. General support for taxpayer protection and accountability does not establish a position on graduated income-tax rates.
- Resolution: **removed**. Remove. Transparency, accountability and protection from government growth is a general principle that does not name the income tax (item 48).

### Greg Lopez, `hunting-right`

- Source: inferred, 2025-01-01
- Quote: "The Game and Fish will focus on wildlife management, hunting, fishing, and habitat protection and State Parks will focus on managing state parks, trails and recreational facilities."
- Ours: **4**. Inferred support for Amendment 83 from his broader pro-hunting/fishing platform; the amendment is not named directly.
- Codex: **unknown**. Assigning hunting and fishing responsibilities to an agency does not establish support for a constitutional right.
- Resolution: **removed**. Remove. An agency-reorganization plan assigning hunting and fishing to a Game and Fish department says nothing about a constitutional right.

### Greg Lopez, `income-tax-cap`

- Source: inferred, 2025-01-01
- Quote: "I strongly support the Taxpayer's Bill of Rights because it empowers citizens, limits excessive taxation, and ensures taxpayers have a direct voice in major fiscal decisions."
- Ours: **4**. Inferred support for Proposition 136's rate cap from his strong general TABOR support; the measure is not named directly.
- Codex: **unknown**. Support for TABOR and voter control of tax decisions does not establish support for a 4.4 percent income-tax cap.
- Resolution: **removed**. Remove. TABOR support is a different mechanism from a statutory income-tax rate cap; the guide's agree branch needs a pledge against rate increases, which general TABOR praise is not. Grantham's and Marx's positions stay because their sources name the income tax rate.

### Greg Lopez, `natural-gas-right`

- Source: inferred, 2025-01-01
- Quote: "I will lead Colorado in pursuing an "all-of-the-above" energy strategy that supports innovation, affordability, reliability, and job creation."
- Ours: **4**. Inferred support for continued natural gas access from his all-of-the-above energy stance; Amendment 82 is not named.
- Codex: **unknown**. An all-of-the-above energy strategy does not establish a position on gas hookups, appliances, or constitutional protections.
- Resolution: **removed**. Remove. Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference.

### Joe Krzeczkowski, `abortion-legal`

- Source: inferred, 2026-06-05
- Quote: "Whether it's your home, your data, or what happens in your bedroom or doctor's office, your business is your own. You have the right to privacy."
- Ours: **4**. Inferred: a general medical-privacy statement; abortion is not named explicitly.
- Codex: **unknown**. General medical and personal privacy rights do not explicitly address abortion legality.
- Resolution: **removed**. Remove. A general privacy principle ("your bedroom or doctor's office"); item 48 removed the same kind of abortion inference in the build review.

### Joe Krzeczkowski, `federal-budget-law`

- Source: inferred, 2026-06-05
- Quote: "We gave trickle-down economics an honest run, and it's clear that it doesn't work."
- Ours: **2**. Inferred: he does not name the One Big Beautiful Bill Act, but this statement opposes the tax-cut approach it embodies and calls for 'the wealthy elites and corporations' to 'pay their fair share.'
- Codex: **unknown**. Criticism of trickle-down economics does not identify the 2025 federal tax and spending law.
- Resolution: **removed**. Remove. Criticism of trickle-down economics does not name the law.

### Joe Krzeczkowski, `keep-mail-voting`

- Source: inferred, 2026-06-05
- Quote: "We should be encouraging and enabling every citizen to vote in our elections, not putting red tape in the way."
- Ours: **4**. Inferred: this is a general pro-access voting-rights statement (tied to the federal Freedom to Vote Act), not a statement about Colorado's all-mail ballot system specifically.
- Codex: **unknown**. General support for easier voting does not establish support for Colorado's current all-mail system.
- Resolution: **removed**. Remove. A general voting-access statement tied to a federal bill does not name Colorado's mail-ballot system.

### Kelley Anne Dennison, `deportation-priority`

- Source: direct_statement, 2026-06-11
- Quote: "We need an immigration system that discourages entrenchment, strengthens border security and creates a lawful path to citizenship that makes following the legal process more worthwhile than taking the risk of entering illegally."
- Ours: **3**. Explicitly combines stronger border security with a lawful path to citizenship, an explicitly mixed position rather than prioritizing deportation alone.
- Codex: **unknown**. The quote favors lawful immigration pathways without addressing deportation or legal status for people already present unlawfully.
- Resolution: **removed**. Remove. Border security plus a path to citizenship for future entrants, with nothing on deporting people already here; the same reasoning as Sallis.

### Melat Kiros, `fentanyl-penalties`

- Source: inferred, 2026-04-24
- Quote: "We cannot arrest our way out of poverty or criminalize mental illness. A holistic approach to public safety needs includes access to housing, mental healthcare, good jobs, and strong schools."
- Ours: **2**. Inferred, coded no stronger than 2, from her general public-safety philosophy opposing increased criminalization; she does not address fentanyl penalties or Proposition 132 by name.
- Codex: **unknown**. Opposing criminalization of poverty and mental illness does not specify fentanyl penalties or drug-treatment policy.
- Resolution: **removed**. Remove. A general public-safety philosophy that does not mention drugs; item 48 removed the same kind of fentanyl inference in the build review.

### Melat Kiros, `minor-gender-surgery-ban`

- Source: inferred, 2026-04-24
- Quote: "We need to pass the Equality Act to protect LGBTQIA+ individuals from discrimination in schools, workplaces, and public life."
- Ours: **2**. Inferred, coded no stronger than 2, from her general opposition to restrictions on gender-affirming care; she does not address surgery or Proposition 135 specifically.
- Codex: **unknown**. Support for general LGBTQIA+ nondiscrimination protections does not address minors' medical care or surgery.
- Resolution: **removed**. Remove. The Equality Act is anti-discrimination law, not gender-affirming care; the guide's inferred path needs a statement on care restrictions.

### Michael J. Allen, `hunting-right`

- Source: inferred, 2026-06-01
- Quote: "Our members will see your 'AQ' rating as a sign that you are a strong supporter of gun rights and hunting, advocating for the Right to Keep and Bear Arms."
- Ours: **4**. NRA-PVF letter praises general support for 'gun rights and hunting,' not a direct statement on Amendment 83's constitutional hunting-rights measure specifically.
- Codex: **unknown**. A gun-rights rating and support for hunting do not establish support for a constitutional hunting and fishing right.
- Resolution: **removed**. Remove. The NRA's form letter about a gun-rights rating mentions hunting in passing; it is not a position on a constitutional hunting right.

### Tim Bennett, `keep-tariffs`

- Source: inferred, 2026-10-01
- Quote: "When we use sensible trade policy to thoughtfully to counter unfair market practices that hurt our nation's workers, we are not turning away from the world; we are simply insisting on fair rules so that honest competition can thrive."
- Ours: **4**. Inferred: he does not name the 2025-2026 tariffs specifically, but describes using trade policy/tariff-like tools to counter unfair practices, which leans toward supporting the broad-tariffs approach rather than opposing it.
- Codex: **unknown**. Support for fair trade rules against unfair practices does not establish support for broad tariffs.
- Resolution: **removed**. Remove. "Sensible trade policy" against unfair practices does not name tariffs, and the wording could as easily be a criticism of broad tariffs as support for them.

### Victor Marx, `graduated-income-tax`

- Source: inferred, 2026-10-02
- Quote: "I will not balance the budget through new taxes or backdoor fees. Colorado needs a sustainable budget that lives within recurring revenue, protects TABOR, and maintains an adequate reserve."
- Ours: **2**. Inferred opposition to a graduated income tax increase (Amendment 87) from his general no-new-taxes stance; asked directly about Amendment 87 in the June 6, 2026 primary guide he predicted it 'won't pass' but said new revenue 'shouldn't be an excuse to stop demanding accountability,' which does not state a clear yes/no on the measure itself.
- Codex: **unknown**. Opposing new taxes and fees does not establish opposition to replacing the existing flat tax with graduated rates.
- Resolution: **removed**. Remove. He was asked about Amendment 87 directly and gave no yes or no (per the note); inferring an answer from a general no-new-taxes line when the direct question went unanswered reaches too far.

### Victor Marx, `natural-gas-right`

- Source: inferred, 2026-07-01
- Quote: "I will support an all-of-the-above energy strategy that expands renewable sources like wind, solar, and geothermal while maintaining the vital role of oil, gas, hydroelectric power, and emerging technologies such as modular nuclear and advanced storage systems."
- Ours: **4**. Inferred: his platform commits to maintaining the role of oil and gas broadly but does not address consumer natural-gas hookups or appliances specifically, so coded no stronger than agree. He separately told the Colorado Sun (Oct. 10, 2026) he is 'opening up all forms of energy' and opposes shutting down domestic gas production.
- Codex: **unknown**. Supporting gas within a broad energy strategy does not address gas hookups, appliances, or a constitutional right.
- Resolution: **removed**. Remove. Amendment 82 is about gas hookups and appliances in buildings; an energy-mix statement (all-of-the-above, or opposing new wells) does not name that policy area, so item 48 bars the inference.

