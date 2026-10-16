# Adds "short_version", "connection" and "example" to every explainer.
# Sources are copied from items already in the same explainer (verified quotes),
# or quoted from the 2026 Blue Book. Run from the repo root:
#   python3 research/codex-borrow/explainer-additions.py
import json, copy
BB = 'https://content.leg.colorado.gov/sites/default/files/2026-blue-book-en-accessible.pdf'
BBT = '2026 Colorado State Ballot Information Booklet (Blue Book) (Legislative Council Staff)'
def bb(q): return {'url': BB, 'title': BBT, 'date': '2026-09-10', 'quote': q}

A = {
 'graduated-income-tax': dict(
  short=("Amendment 87 would trim state income tax for most filers, by up to $325 a year below $500,000 of taxable income, and raise it for higher earners. It would bring in about $2 billion a year for schools, health care and child care. Whether high earners would leave is disputed: a free-market group models losses, while other research finds millionaires rarely move.",
         [('stakes',0),('stakes',1),('stakes',2),('stakes',3)]),
  conn=("This statement stands in for Amendment 87 and its rival, Proposition 136. Your answer is not a vote. If both measures pass, the Blue Book says the outcome is unclear, and the legislature or a court would decide.", [('unknowns',2)]),
  ex=("Someone with $125,000 of taxable income would pay about $325 less a year. Someone with $2 million would pay about $55,925 more.", [('stakes',0),('stakes',1)])),
 'income-tax-cap': dict(
  short=("By itself, Proposition 136 changes no one's taxes: it writes today's 4.4 percent rate into state law as a ceiling, and the Blue Book finds no fiscal impact. Its real effect is on Amendment 87, the graduated tax. If both pass, a court may have to decide what survives.",
         [('stakes',0),('unknowns',0)]),
  conn=("Raising an income tax rate already takes a vote of the people, so the cap matters mostly this year, as Amendment 87's rival. It is an ordinary law, not a constitutional change, so it could be changed later.", [('now',1),('stakes',3)]),
  ex=("A married couple with about $100,000 of taxable income owes $4,400 at 4.4 percent. Proposition 136 would keep that rate as a ceiling in state law.", [('now',0)])),
 'keep-tabor-surplus': dict(
  short=("Proposition NN trades refunds for school money. For the next two years, refunds would drop to zero; for a single filer with $50,000 to $100,000 of income that is about $21 to $68 a year. Schools and children's programs would get about $240 million a year each at first, and possibly far more later.",
         [('stakes',0),('stakes',2)]),
  conn=("NN is about what happens to money the state collects above its TABOR limit: refund it, or keep it for schools and children's programs. Later refunds are unknown and could be zero in some years or over $1,000 per taxpayer in others.", [('now',0),('stakes',1)]),
  ex=("A single filer with $100,000 of income would give up refunds of about $28 in 2027 and $68 in 2028. At $500,000 the loss is about $65, then $276.", [('stakes',0)])),
 'conservation-sales-tax': dict(
  short=("Proposition 137 raises no tax and no price. It sets aside about $175 million a year of sales tax already collected on sporting goods for wildfire, watershed, parks and outdoor programs. The cost falls on TABOR refunds in years when there are refunds, and on other state programs in years when there aren't.",
         [('now',0),('stakes',0),('stakes',1),('stakes',3)]),
  conn=("The money now goes into the general budget. If Proposition NN also passes, Proposition 137 shrinks what the state keeps under NN.", [('now',0),('stakes',4)]),
  ex=("Someone buying a bike or a tent pays the same price and tax either way. What changes is how much state sales tax goes to conservation and wildfire work: about $175 million a year, set by a formula, since the state doesn't track sporting-goods sales separately.", [('now',0),('stakes',4)])),
 'natural-gas-right': dict(
  short=("Gas is legal and for sale today, and no Colorado elected body has banned gas stoves or heaters in homes. Amendment 82 would make buying and selling gas a constitutional right, which could block future state and local limits, such as rules steering new buildings to electric heat. Burning gas in buildings adds to Colorado's climate pollution. Whether switching saves a household money depends on the home, and the main bill comparison comes from the gas industry.",
         [('now',2),('now',3),('stakes',0),('stakes',2)]),
  conn=("Disagreeing does not ban gas or make anyone replace a stove or furnace: gas stays legal either way. The vote is about whether to put gas access in the constitution, where only voters can change it, and which, the Blue Book says, may limit state and local rules.", [('now',2),('unknowns',0)]),
  ex=("Crested Butte requires new homes to use electricity for heat. Under Amendment 82, a rule like that could be challenged as conflicting with the new right.", [('now',2),('now',3)])),
 'clean-energy-shift': dict(
  short=("Colorado is already shifting fast: coal fell from 60 percent to 27 percent of its electricity in a decade, and renewables hit a record 43 percent in 2024. The argument is over speed and cost. A conservative think tank projects higher bills and lost jobs from state rules; the state says wind and solar are the cheapest new power and its plan adds jobs and avoids pollution deaths.",
         [('now',1),('stakes',1),('stakes',2),('stakes',4)]),
  conn=("State targets are set in state law. Federal clean-energy tax credits are set by Congress, and a 2025 federal law ends them for many projects. The races your answer counts toward are listed below.", [('now',0),('now',2)]),
  ex=("A homeowner who installed solar panels in 2025 could claim the federal credit. One installing them in 2026 cannot.", [('now',2)])),
 'public-lands': dict(
  short=("About 36 percent of Colorado is federal land, and it underpins an $18.1 billion outdoor economy plus ranching and energy leasing. A 2025 plan to sell some Western federal land failed in Congress, but advocates expect it back. Keeping land federal does not stop drilling: 2 million Colorado acres were leased at the end of 2025.",
         [('now',0),('now',1),('stakes',0),('stakes',5)]),
  conn=("Selling federal land takes Congress or federal agencies acting under laws Congress wrote. The 2025 plan came from a U.S. senator, so this answer bears most on your U.S. Senate and House races.", [('now',1),('now',2)]),
  ex=("The revised 2025 plan would have let the government sell some Bureau of Land Management land within 5 miles of towns. That land could become private and taxable; critics say people would lose places to hunt, fish and camp.", [('case_against',1),('case_for',1),('unknowns',1)])),
 'housing-state-zoning': dict(
  short=("Colorado already overrode local zoning in 2024 to allow backyard homes and denser housing near transit. Prices and rents are high and easing only slightly. Zoning is one cost among several, and it isn't yet clear how much housing the new laws will add. The trade-off is more homes against local control.",
         [('now',0),('stakes',0),('stakes',1),('stakes',2),('stakes',5)]),
  conn=("Zoning overrides come from state law, as the 2024 laws did; no statewide measure on this ballot addresses them. The races your answer counts toward are listed below.", [('now',0)]),
  ex=("In a city covered by the 2024 laws, a homeowner can now add a backyard home that local rules may have banned. Residents who wanted larger-lot neighborhoods lose some say over that.", [('now',0),('case_against',0)])),
 'health-coverage': dict(
  short=("The enhanced federal premium credits ended in 2025, and about 225,000 Coloradans saw 2026 premiums roughly double. Medicaid work rules start in 2027. Making the credits permanent would cost taxpayers about $350 billion over ten years; not doing it means more people paying more or going uninsured.",
         [('now',1),('stakes',0),('stakes',2),('now',2)]),
  conn=("The premium credits and the Medicaid rules are federal, set by Congress, so this bears most on your U.S. Senate and House races. The state pays its share of Medicaid, which drives this year's state budget.", [('now',1),('stakes',3)]),
  ex=("A Denver-area family of four earning about $128,000 lost all of its premium help in 2026 and faced about $14,000 more a year.", [('stakes',0)])),
 'keep-tariffs': dict(
  short=("Tariffs are taxes paid by importers, and most of the cost has landed on U.S. buyers, about $1,100 a household a year by one estimate. Factory jobs fell rather than rose from April 2025 to February 2026, and courts struck down part of the tariffs. Supporters say they pressure trading partners and raise revenue.",
         [('now',0),('stakes',0),('stakes',1),('case_for',0)]),
  conn=("Tariffs come from the president acting under laws Congress passed, and the Supreme Court ruled in February 2026 that one of those laws did not allow them. Congress can change those laws, so this bears most on your U.S. Senate and House races.", [('now',0)]),
  ex=("A Larimer County dairy farmer told Sen. Hickenlooper that corn and wheat prices were down because of tariffs. A shopper pays more for imported goods: about $1,100 a year per household, by the Yale Budget Lab's estimate.", [('stakes',3),('stakes',0)])),
 'federal-budget-law': dict(
  short=("The 2025 law cut taxes for most households, with the largest dollar gains at the top, and cut Medicaid and food aid. Counting both, the Congressional Budget Office estimates the poorest tenth of households lose about $1,214 a year while the top tenth gain $13,622. In Colorado it also opened a state budget gap of hundreds of millions of dollars.",
         [('stakes',0),('stakes',1),('now',2)]),
  conn=("Congress passed this law, so it bears on your U.S. Senate and House races. Colorado's delegation split by party: Reps. Evans, Hurd, Boebert and Crank backed it; Sens. Bennet and Hickenlooper and Reps. DeGette, Neguse, Crow and Pettersen opposed it.", [('now',3)]),
  ex=("A worker who earns tips or overtime gets a new federal deduction. A Colorado adult covered by Medicaid expansion must show 80 hours a month of work or school starting in 2027.", [('now',0),('now',1),('stakes',2)])),
 'abortion-legal': dict(
  short=("Abortion is legal in Colorado at any stage, and since 2024 that right is in the state constitution, so changing it would take another statewide vote. About 30 percent of abortions in Colorado in 2023 were for out-of-state patients. The open questions are federal: rules for the abortion pill and Medicaid funding.",
         [('now',0),('now',1),('stakes',0),('now',2)]),
  conn=("Colorado's protections can change only by amending the constitution again. National rules, such as on the abortion pill or a federal law, come from Congress and federal agencies, so this also bears on your U.S. Senate and House races.", [('stakes',0),('now',2)]),
  ex=("A patient from Texas can travel to Colorado for an abortion today; about 2,800 did in 2023. Whether the abortion pill stays as available depends on a federal review now under way.", [('now',1),('unknowns',1)])),
 'stricter-gun-laws': dict(
  short=("Colorado already has a three-day wait, a minimum buying age of 21, red-flag orders and, since August 2026, a permit and training rule for many semiautomatic guns. Most gun deaths in Colorado are suicides. Research supports some laws, such as background checks and waiting periods, more than others, and the new permit rule faces a court challenge.",
         [('now',0),('now',1),('now',2),('stakes',0),('now',3)]),
  conn=("State gun laws come from the legislature; SB25-003, the newest, took effect August 1, 2026, with Gov. Polis's support. Federal gun laws come from Congress, and the Supreme Court is deciding cases that could limit both.", [('now',1),('case_for',0),('unknowns',1)]),
  ex=("Someone buying a covered semiautomatic rifle in Colorado now needs a sheriff-issued eligibility card, a background check and a 4- or 12-hour safety course, plus a $52 state fee.", [('now',1)])),
 'sports-biological-sex': dict(
  short=("Proposition 134 would set one statewide rule: school teams from elementary school through college divided by biological sex, plus open teams. Nobody tracks how many transgender athletes would be affected. The argument is fairness and safety for girls against inclusion, privacy and how sex would be checked.",
         [('now',0),('unknowns',0),('stakes',1),('stakes',2)]),
  conn=("Disagreeing keeps today's rules, where schools, districts and the state athletic association decide, and some districts already bar transgender girls from girls' teams. Agreeing makes one rule for every school.", [('now',1)]),
  ex=("Today a transgender girl at one high school may play on the girls' team after a school review, while a district next door bars her. Under Proposition 134, she could play only on an open team or the team for her sex at birth.", [('now',1),('stakes',0)])),
 'minor-gender-surgery-ban': dict(
  short=("Proposition 135 bans gender-transition surgery for minors. It is rare, about 2 per 100,000 teens in a 2019 study, and Colorado's three large children's surgical providers say they don't perform it on transgender patients under 18. Medical groups differ on a legal ban. It doesn't cover hormones or puberty blockers, but its wording could reach some other surgeries.",
         [('now',1),('stakes',0),('stakes',1),('stakes',3)]),
  conn=("The vote covers surgery only. Hormones and puberty blockers, the subject of a separate court case, are not part of it. Disagreeing keeps current Colorado law, which lets insurance pay for these surgeries.", [('stakes',3),('now',0)]),
  ex=("Under Proposition 135, a doctor could not perform chest surgery on a 16-year-old as part of a gender transition, and insurance could not pay for it. Colorado's large children's surgical providers say they do not do it now.", [('now',0),('now',1)])),
 'immigration-notify-ice': dict(
  short=("Amendment 81 would require officials to notify federal immigration authorities when they charge someone with a violent crime, or with any crime after a prior felony, and can't confirm the person's legal status. Some sheriffs already notify ICE; state law limits others. The argument is public safety against acting on a charge before guilt is decided.",
         [('now',1),('now',0),('stakes',1)]),
  conn=("Notice would come at the charge, not at a conviction. Disagreeing keeps today's mix of local policies, from Denver's limits to El Paso County's required notice.", [('stakes',1),('stakes',3)]),
  ex=("Someone with a past felony is charged with a traffic offense and can't quickly prove citizenship. Under Amendment 81, Denver's district attorney says, officials would have to notify federal immigration authorities.", [('stakes',1)])),
 'deportation-priority': dict(
  short=("Congress has sharply raised enforcement money, $170.7 billion in 2025 and $69.5 billion more in 2026, and detention reached about 65,800 people in July 2026, most with no criminal conviction. The Penn Wharton Budget Model projects slower economic growth from large-scale removal. Supporters point to removing people who commit crimes and to wage gains for some workers.",
         [('now',0),('now',1),('stakes',3),('stakes',1),('case_for',1)]),
  conn=("Immigration enforcement is federal and funded by Congress, so this bears on your U.S. Senate and House races. Amendment 81, a separate statement, is the state-level question about local cooperation.", [('now',0)]),
  ex=("In Colorado this shows up at the Aurora detention center, with 1,532 beds, and at a new Hudson site under a July 2026 federal contract worth up to $528.6 million.", [('stakes',4)])),
 'fentanyl-penalties': dict(
  short=("Proposition 132 would make possessing any amount of fentanyl a felony and require 8 to 32 years in prison for distributing any amount. Fentanyl deaths in Colorado rose again in 2025. Research doubts that longer sentences deter drug crime, and state costs would reach about $68 million a year by year five.",
         [('now',2),('now',1),('stakes',1),('stakes',0)]),
  conn=("Disagreeing keeps the 2022 law, under which possessing more than 1 gram is a felony and the most serious dealing already carries 8 to 32 years. Fentanyl stays illegal either way.", [('now',0)]),
  ex=("Someone caught with half a gram of a fentanyl mixture faces a misdemeanor today. Under Proposition 132 it would be a felony, which could be reduced to a misdemeanor after court-ordered treatment.", [('now',0),('now',2)])),
 'child-trafficking-life': dict(
  short=("Proposition 133 would make child sex trafficking punishable only by life without parole, instead of 8 to 48 years, and remove judges' discretion. Few cases reach court each year; about a third of trafficking cases end in a trafficking conviction, and most of the rest in a conviction on another charge. State costs would begin in about 14 years.",
         [('now',0),('now',2),('now',1),('stakes',0)]),
  conn=("Disagreeing keeps today's sentence of 8 to 48 years plus mandatory parole. Child sex trafficking stays a serious felony either way.", [('now',0)]),
  ex=("Colorado courts handled 46 cases of minor sex trafficking in 2023. Under Proposition 133, a conviction on that charge would mean life without parole; today a judge picks a term between 8 and 48 years.", [('now',1),('now',0)])),
 'hunting-right': dict(
  short=("Hunting and fishing are already legal, and Amendment 83 changes nothing right away. It would make them a constitutional right and the preferred way to manage wildlife, which could let courts strike down future limits. What \"traditional methods\" means is undefined.",
         [('now',0),('stakes',1),('stakes',2)]),
  conn=("Disagreeing does not restrict hunting or fishing; both stay legal and regulated by Colorado Parks and Wildlife either way. The question is whether to make them a constitutional right that courts would weigh limits against.", [('now',0),('now',1)]),
  ex=("Colorado voters earlier approved limits on leghold traps and bear baiting. Opponents fear a hunter could challenge those limits as banning a \"traditional method\"; a supporter says Parks and Wildlife's rules would not change.", [('stakes',1)])),
 'mail-ballot-id': dict(
  short=("Colorado checks mail ballots by signature today and did not count 1.4 percent of returned mail ballots in 2024. Amendment 84 adds an ID number. In Texas, a similar rule sent rejections up sharply at first, and they fell after envelopes improved. No one has estimated the effect in Colorado.",
         [('now',1),('now',2),('stakes',1),('stakes',2),('unknowns',0)]),
  conn=("Disagreeing keeps signature checks alone. Either way, every active voter still gets a mail ballot.", [('now',0)]),
  ex=("You would write a number on your return envelope: the last four digits of your Social Security number, or your Colorado driver's license or ID card number. If it's missing or wrong, the county contacts you, and you have until eight days after Election Day to fix it.",
      [('now',2), bb('include the last four digits of their social security number or their Colorado driver’s license or identification card number on the outside of their mail ballot')])),
 'plain-language-ballots': dict(
  short=("Amendment 85 would require every state and local ballot question to be written at an eighth-grade reading level. Colorado's titles score as hard to read. The disputed part is what it would undo: it could knock out rules that make tax measures spell out their effects, and it doesn't say who judges reading level.",
         [('now',2),('stakes',0),('stakes',1)]),
  conn=("Disagreeing keeps today's rules: the Title Board's plain-language standard, a 2026 law adding an accessible-language duty, and the required tax-effect wording.", [('now',0),('now',1)]),
  ex=("Amendment 79 in 2024 scored at grade 32 by one formula. Under Amendment 85, a title like that would have to meet an eighth-grade level, but the measure doesn't name the formula.", [('now',2),('unknowns',1)])),
 'redistricting-commission': dict(
  short=("Colorado's independent commission draws its congressional map once a decade. After Texas, California and others redrew mid-decade, Colorado groups tried too, and the state Supreme Court struck those measures down. Amendment 86 would route any mid-decade redraw through the commission and the court and bar maps that favor a party. Opponents say it would keep Colorado from answering other states.",
         [('now',0),('now',1),('now',2),('stakes',2),('case_against',0)]),
  conn=("Disagreeing does not redraw any map: the 2021 map stays until the next scheduled redraw or a future change. The vote is about how hard a mid-decade change would be.", [('now',0)]),
  ex=("If another state redraws to gain seats, Colorado could respond only through its commission, after three public hearings and Supreme Court approval, and not with a map drawn to help a party.", [('stakes',2)])),
 'keep-mail-voting': dict(
  short=("Colorado has mailed every active voter a ballot since 2013. In 2024, 92 percent voted by mail and turnout was high, and the state says its post-election audits have never found a voting-system error. A study of the early years found lower costs. The pressure now comes from federal mail-ballot rules and from proposals like Amendment 84 to add checks.",
         [('now',0),('now',1),('now',2),('stakes',0),('stakes',3)]),
  conn=("Colorado's system rests on a 2013 state law, and the secretary of state oversees elections. Amendment 84 on this ballot would keep mail voting but add an ID number.", [('now',0),('case_for',0),('case_against',1)]),
  ex=("You can mail your ballot back, put it in a drop box, or vote in person at a vote center; this year drop boxes opened October 12 and vote centers October 19.", [('now',0)])),
 'challenge-federal-policies': dict(
  short=("Colorado's attorney general has filed or joined 82 lawsuits against the current federal administration, and in most cases decided so far courts at least temporarily blocked the policy. The governor's office says the suits saved more than $868 million; critics see politics and cost. Even the Republican nominee for attorney general says he would keep many of the cases.",
         [('now',0),('now',1),('stakes',0),('unknowns',0)]),
  conn=("The attorney general's office files these suits, so this bears most directly on the attorney general's race.", [('now',0)]),
  ex=("In February 2026 Colorado sued over the cancellation of $8 billion in energy and infrastructure awards, more than $600 million of it for Colorado projects.", [('stakes',2)])),
}

def gather(e, refs, first_only=False):
    out, seen = [], set()
    for r in refs:
        if isinstance(r, dict):
            cands = [r]
        else:
            sec, i = r
            cands = e[sec][i]['sources'][:1] if first_only else e[sec][i]['sources']
        for s in cands:
            k = (s['url'], s['quote'])
            if k not in seen:
                seen.add(k); out.append(copy.deepcopy(s))
    return out

for id_, a in A.items():
    p = f'src/data/explainers/{id_}.json'
    e = json.load(open(p))
    # The short version cites one source per point it draws on, to keep the reference list readable.
    e['short_version'] = {'text': a['short'][0], 'sources': gather(e, a['short'][1], first_only=True)}
    e['connection'] = {'text': a['conn'][0], 'sources': gather(e, a['conn'][1])}
    e['example'] = {'text': a['ex'][0], 'sources': gather(e, a['ex'][1])}
    order = ['id','plain','short_version','connection','agree_means','disagree_means','example','now','stakes','case_for','case_against','unknowns','measure','last_checked','research_notes']
    out = {k: e[k] for k in order if k in e}
    with open(p, 'w') as f: json.dump(out, f, indent=2, ensure_ascii=False); f.write('\n')
print(len(A), 'explainers updated')
