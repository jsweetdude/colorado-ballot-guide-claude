# Report: Colorado Ballot Guide

**Production URL: https://colorado-ballot-guide-claude.vercel.app**

Built and shipped in one session on October 14, 2026 (Mountain time), and extended in a gap-fill session on October 15 and 16 (see "Gap fill" below), from the brief in `brief/BUILD-BRIEF.md` (the `brief/` folder is kept out of the repository; see DECISIONS.md item 2). Repository: `jsweetdude/colorado-ballot-guide-claude`, branch `main`. Every judgment call is in `DECISIONS.md`.

## What was built

- **Landing page** with what the guide is, how it works in three steps, what it does not do (store answers, recommend, take money), the October 26 and November 3 dates (the only kiln-colored elements on the site), a Start button, a no-interview "browse races" path, and links to GoVoteColorado.gov, the Blue Book and the Office of Judicial Performance Evaluation.
- **Find your ballot:** a street-address lookup through one Vercel function (`api/districts.js`) that calls the free U.S. Census Geocoder. The address goes in a POST body, is not logged, is not stored, and never touches a third-party script in the browser. It returns the 120th Congress district, the 2026 state Senate and House districts and the county; the visitor can change any of them, pick them by hand, or skip to statewide races only. Verified live: the State Capitol resolves to CD1, Senate 31, House 6, Denver County.
- **The interview:** 25 statements (11 economic, 9 social, 5 governance), one per screen, each with a five-point radio group, a Low/Normal/High importance choice and a skip. Progress bar, Back, browser Back (the step is in the URL), a review screen, and answers saved to `localStorage` only. Statements tied to a measure say so.
- **Results:** one section per race on the visitor's ballot (statewide, their U.S. House district, and their CU regent and State Board of Education seats when up), each a real table with match percentage, a High/Medium/Low confidence badge, "based on N of M questions" and a coverage meter (known positions solid, unknown hatched, with a legend). The top match is marked in text; candidates known on fewer than a third of the visitor's answered statements are listed below as "not enough known to rank." Then all 14 statewide measures with the visitor's lean (leans yes, leans no, unclear, with the answers that drove it), what a yes and a no vote do, the Blue Book summary, arguments for and against and fiscal impact, who put it on the ballot and who is campaigning, and the threshold. Then the visitor's state legislative districts (with whether their state Senate seat is up), Ballot Issue 7A where their county has it, judges, and local races. A share link carries answers and congressional district in the URL fragment.
- **Candidate profiles** for all 74 certified candidates: background, experience, key votes and decisions (House and Senate roll calls; Colorado General Assembly bills; documented official decisions), positions on all 25 statements with source link, source type, date and a verbatim quote (unknowns hatched and labeled), the visitor's own answer under each statement, endorsements, campaign finance (FEC for federal candidates), and "where this came from, last checked on" with every source.
- **Race pages, measure pages and an About and method page** with the exact formulas, confidence rules, the office-specific statement sets, the full statement list with the coding rule for each, how inference is labeled, privacy, the data date, error reporting, license and the builder line.
- **Design:** Porcelain, Calm voice, light by default with the spec's dark mode; navy for headings, cobalt only for what can be clicked, hatching for unknown, kiln only for the two dates, grain on the landing and results pages only. Web Awesome 3.14.0 is bundled from npm (`wa-details`, `wa-dialog`, `wa-copy-button`) with no Web Awesome CSS. Fonts are self-hosted.

## Left out, or partial

- **State legislative races** are out of scope by design; the results page shows the visitor's district numbers and links to Vote411 and the Secretary of State.
- **Judges** are a link to the Office of Judicial Performance Evaluation, not profiles (Tier B allowed this).
- **Ballot Issue 7A** is shown when the visitor's county is one of the 13 the Secretary of State lists; only voters inside the listed municipalities actually vote on it, and the page says so.
- **Other local measures** are not covered; the guide points to the official sample ballot.
- **Coverage is uneven** (next section). Treasurer and secretary of state candidates said little that maps to the statements, even after a second research pass.

## Candidates and coverage

As of October 16, 2026, after the gap fill and the blind recode (the October 14 numbers are in the gap-fill section below; the recode's effect is under "Blind recode").

| Group | Candidates | Full | Partial | Unknown |
|---|---|---|---|---|
| Tier A, major party | 26 | 21 | 5 | 0 |
| Tier A, unaffiliated with full profile (Lopez) | 1 | 1 | 0 | 0 |
| Tier A, minor party and other unaffiliated | 30 | 1 | 20 | 9 |
| Tier B (regents, State Board) | 17 | 0 | 11 | 6 |
| All | 74 | 23 | 36 | 15 |

"Full" means known on at least a third of the statements used for the candidate's race, so they rank for a visitor who answers everything. "Partial" means at least one known position but fewer. Attorney general, secretary of state and treasurer are measured against their office's statement set (9, 5 and 5 statements); everyone else against all 25. A race is ranked only when at least two candidates are "full" (the fairness rule, below).

**304 sourced positions** in all (325 before the blind recode): questionnaire answers: 79, recorded votes: 31, sponsored bills: 12, direct statements: 132, inferred (labeled as such): 44, interest-group ratings or endorsements: 6.

<details>
<summary>Every candidate</summary>

| Race | Candidate | Party | Known / used for race | Level |
|---|---|---|---|---|
| us-senate | Mark Baisley | Republican | 9 / 25 | full |
| us-senate | John Hickenlooper | Democratic | 9 / 25 | full |
| us-senate | Bob Chew | Forward | 5 / 25 | partial |
| us-senate | Christopher Baum | Approval Voting | 3 / 25 | partial |
| us-senate | Blake Huber | Libertarian | 2 / 25 | partial |
| us-senate | Adam Withrow | Unity | 3 / 25 | partial |
| governor | Victor Marx | Republican | 13 / 25 | full |
| governor | Phil Weiser | Democratic | 13 / 25 | full |
| governor | Stephen T. Hamilton | American Constitution | 5 / 25 | partial |
| governor | Eric Mulder | Libertarian | 3 / 25 | partial |
| governor | Jeff Peckman | Unity | 4 / 25 | partial |
| governor | Erik Underwood | Approval Voting | 6 / 25 | partial |
| governor | Greg Lopez | Unaffiliated | 10 / 25 | full |
| attorney-general | Michael J. Allen | Republican | 7 / 9 (11 of 25 overall) | full |
| attorney-general | Jena Griswold | Democratic | 5 / 9 (8 of 25 overall) | full |
| secretary-of-state | Amanda Gonzalez | Democratic | 3 / 5 (3 of 25 overall) | full |
| secretary-of-state | James Wiley | Republican | 3 / 5 (3 of 25 overall) | full |
| secretary-of-state | Sean Vadney | Libertarian | 2 / 5 (2 of 25 overall) | full |
| secretary-of-state | Amanda Campbell | American Constitution | 0 / 5 (0 of 25 overall) | unknown |
| secretary-of-state | Celeste Landry | Forward | 1 / 5 (1 of 25 overall) | partial |
| treasurer | Jeff Bridges | Democratic | 2 / 5 (6 of 25 overall) | full |
| treasurer | Kevin Grantham | Republican | 2 / 5 (3 of 25 overall) | full |
| treasurer | Jodie Barr | Libertarian | 1 / 5 (1 of 25 overall) | partial |
| treasurer | Marilee Langner Sturgis | Approval Voting | 0 / 5 (0 of 25 overall) | unknown |
| us-house-1 | Melat Kiros | Democratic | 9 / 25 | full |
| us-house-1 | Christy Peterson | Republican | 9 / 25 | full |
| us-house-1 | Critter Milton | Unity | 0 / 25 | unknown |
| us-house-1 | Chad Humphrey | Libertarian | 4 / 25 | partial |
| us-house-1 | Shimon Blau | Unaffiliated | 4 / 25 | partial |
| us-house-2 | Joe Neguse | Democratic | 10 / 25 | full |
| us-house-2 | Kelley Anne Dennison | Republican | 5 / 25 | partial |
| us-house-2 | Gaylon Kent | Libertarian | 5 / 25 | partial |
| us-house-3 | Dwayne L. Romero | Democratic | 7 / 25 | partial |
| us-house-3 | Jeff Hurd | Republican | 9 / 25 | full |
| us-house-3 | Cory Robertson | Libertarian | 1 / 25 | partial |
| us-house-3 | Clifton Brown | Unaffiliated | 0 / 25 | unknown |
| us-house-4 | Lauren Boebert | Republican | 10 / 25 | full |
| us-house-4 | Eileen Laubacher | Democratic | 3 / 25 | partial |
| us-house-4 | Douglas Mangeris | Libertarian | 0 / 25 | unknown |
| us-house-5 | Jeff Crank | Republican | 12 / 25 | full |
| us-house-5 | Jessica Killin | Democratic | 9 / 25 | full |
| us-house-5 | Christopher Mitchell | American Constitution | 1 / 25 | partial |
| us-house-5 | Mark "Marky Jr" Elworth | Libertarian | 0 / 25 | unknown |
| us-house-6 | Jason Crow | Democratic | 10 / 25 | full |
| us-house-6 | Jason Clark | Republican | 5 / 25 | partial |
| us-house-6 | Patty McMahon | Libertarian | 0 / 25 | unknown |
| us-house-6 | Meredith Ryan | Unity | 3 / 25 | partial |
| us-house-6 | Samir Ezzeldin Witta | Unaffiliated | 3 / 25 | partial |
| us-house-7 | Tim Bennett | Republican | 5 / 25 | partial |
| us-house-7 | Brittany Pettersen | Democratic | 9 / 25 | full |
| us-house-7 | Susan Hall | Unity | 0 / 25 | unknown |
| us-house-7 | Lawrence Kyle Clark | American Constitution | 0 / 25 | unknown |
| us-house-7 | Dan "Kilo" Sallis | Libertarian | 3 / 25 | partial |
| us-house-7 | Joe Krzeczkowski | Unaffiliated | 3 / 25 | partial |
| us-house-8 | Gabe Evans | Republican | 10 / 25 | full |
| us-house-8 | Manny Rutinel | Democratic | 9 / 25 | full |
| us-house-8 | Dave Wood | Libertarian | 2 / 25 | partial |
| state-board-1 | Lisa Escárcega | Democratic | 2 / 25 | partial |
| state-board-1 | Frederick Espinoza | Republican | 2 / 25 | partial |
| state-board-1 | Clayton Casciato | Libertarian | 0 / 25 | unknown |
| state-board-3 | Sherri M Wright | Republican | 2 / 25 | partial |
| state-board-3 | Barb Clementi | Democratic | 2 / 25 | partial |
| state-board-7 | Karla Esser | Democratic | 2 / 25 | partial |
| state-board-7 | Steve Barton | Republican | 4 / 25 | partial |
| state-board-7 | Ross Klopf | Libertarian | 2 / 25 | partial |
| cu-regent-2 | Marty Neilson | Republican | 0 / 25 | unknown |
| cu-regent-2 | Edie Hooton | Democratic | 2 / 25 | partial |
| cu-regent-2 | Richard Friend | Libertarian | 0 / 25 | unknown |
| cu-regent-6 | Veanessa Burbage | Republican | 0 / 25 | unknown |
| cu-regent-6 | Ilana Spiegel | Democratic | 1 / 25 | partial |
| cu-regent-6 | Joe Johnson | Libertarian | 0 / 25 | unknown |
| cu-regent-7 | Paul Mueller | Republican | 0 / 25 | unknown |
| cu-regent-7 | Nolbert Chavez | Democratic | 1 / 25 | partial |
| cu-regent-7 | BetteRose Ryan | Libertarian | 1 / 25 | partial |

</details>

## The statements

1. **Economic, State income tax:** Colorado should tax higher incomes at higher rates instead of using one flat rate for everyone. Tied to Amendment 87 (agree means yes); Proposition 136 (agree means no).
2. **Economic, State income tax:** State law should cap Colorado's income tax rate at today's 4.4 percent. Tied to Proposition 136 (agree means yes).
3. **Economic, TABOR refunds:** When Colorado collects more than its TABOR revenue limit, the state should keep the extra for schools instead of refunding it. Tied to Proposition NN (agree means yes).
4. **Economic, Water and land:** Sales tax collected on sporting goods should be set aside for water, land and wildfire programs. Tied to Proposition 137 (agree means yes).
5. **Economic, Energy:** The state constitution should protect the right to buy and use natural gas in homes and businesses. Tied to Amendment 82 (agree means yes).
6. **Economic, Energy:** Government should speed up the shift from oil, gas and coal to renewable energy.
7. **Economic, Housing:** The state should be able to override local zoning rules to allow more housing to be built.
8. **Economic, Health care:** Government should do more to make sure everyone has health insurance, even if it costs taxpayers more.
9. **Economic, Trade:** The federal government should keep broad tariffs on imported goods.
10. **Economic, Federal taxes and spending:** Congress was right to pass the 2025 federal tax and spending law known as the One Big Beautiful Bill Act.
11. **Economic, Public lands:** Federal public lands should stay in federal ownership rather than being sold or transferred.
12. **Social, Abortion:** Abortion should be legal in all or most cases.
13. **Social, Guns:** Gun laws should be stricter than they are now.
14. **Social, Transgender youth:** Students should play on school sports teams that match their biological sex, not their gender identity. Tied to Proposition 134 (agree means yes).
15. **Social, Transgender youth:** Colorado should ban surgery that changes the sex characteristics of patients under 18 as treatment for gender identity. Tied to Proposition 135 (agree means yes).
16. **Social, Immigration:** Colorado police and jails should notify federal immigration authorities when they charge someone with a serious crime and cannot confirm the person is in the country legally. Tied to Amendment 81 (agree means yes).
17. **Social, Immigration:** Deporting people who are in the U.S. without legal status should be a top federal priority.
18. **Social, Criminal justice:** Fentanyl crimes should carry tougher penalties, including mandatory prison time for selling any amount. Tied to Proposition 132 (agree means yes).
19. **Social, Criminal justice:** Child sex trafficking should be punished with life in prison without parole. Tied to Proposition 133 (agree means yes).
20. **Social, Wildlife:** Hunting and fishing should be a right protected in the state constitution. Tied to Amendment 83 (agree means yes).
21. **Governance, Voting:** Voters should have to write an ID number, such as the last four digits of their Social Security number, on their mail ballot envelope. Tied to Amendment 84 (agree means yes).
22. **Governance, Ballot measures:** Ballot questions should be required to be written at an eighth-grade reading level. Tied to Amendment 85 (agree means yes).
23. **Governance, Redistricting:** Only Colorado's independent commission should redraw the state's congressional map, even if other states redraw theirs mid-decade. Tied to Amendment 86 (agree means yes).
24. **Governance, Elections:** Colorado's all-mail ballot election system should stay largely as it is.
25. **Governance, State and federal:** Colorado's state government should challenge the current federal administration's policies in court.

## Gap fill, October 15 and 16, 2026

A second session worked the coverage gap: incumbents had voting records, challengers did not, so in CD2, CD4, CD6 and CD8 only the incumbent ranked and treasurer, CD3 and CD7 ranked nobody. The brief for that session is summarized in `research/gap-list-2026-10-16.md`; its decisions are DECISIONS.md items 51 to 65.

### Before and after

| | Before (Oct. 14) | After (Oct. 16) |
|---|---|---|
| Candidates rankable for a full interview | 17 | 23 |
| Candidates with some positions, below the bar | 37 | 36 |
| Candidates with no sourced position | 20 | 15 |
| Sourced positions | 295 | 325 |
| Major-party candidates over the bar | 16 of 26 | 21 of 26 |

Thirty positions were added: 12 in the first batch (priority-1 challengers, the two treasurer candidates, Hurd and Pettersen), 5 confirmed from the sibling build's sources, 3 from Chalkbeat's regent guide, and 10 from Vote411 answers by statewide minor-party candidates and one CD3 candidate. Every one carries a fetched source, a verbatim quote, a source type and a date; `scripts/verify-sources.mjs` found the quote on its source page for 308 of the 325 positions. The 17 it could not confirm are the 10 Vote411 answers and 4 quotes from Kelley Dennison's site, which only render in a browser, and 3 CPR News interviews, which block scripts; all 17 were read in Chrome.

### Per-race ranking status

The fairness rule (DECISIONS.md item 61) now ranks a race only when at least two candidates clear the one-third bar. Otherwise every candidate is shown as "not enough known to compare," with known positions and the visitor's own answers side by side, and no one is called a top match.

| Race | Before | After |
|---|---|---|
| us-senate | ranked | ranked |
| governor | ranked | ranked |
| attorney-general | ranked | ranked |
| secretary-of-state | ranked (Gonzalez, Wiley) | ranked (Gonzalez, Wiley, Vadney) |
| treasurer | nobody ranked | ranked (Bridges 2/5, Grantham 2/5) |
| us-house-1 | ranked | ranked |
| us-house-2 | Neguse only | not ranked under the fairness rule (Neguse 10/25; Dennison 6/25) |
| us-house-3 | nobody ranked | not ranked under the fairness rule (Hurd 9/25; Romero 7/25) |
| us-house-4 | Boebert only | not ranked under the fairness rule (Boebert 10/25; Laubacher 4/25) |
| us-house-5 | ranked | ranked |
| us-house-6 | Crow only | not ranked under the fairness rule (Crow 10/25; Clark 5/25) |
| us-house-7 | nobody ranked | not ranked under the fairness rule (Pettersen 9/25; Bennett 6/25) |
| us-house-8 | Evans only | ranked (Evans 10/25, Rutinel 9/25) |
| State Board (3 races) and CU regents (3 races) | nobody ranked | nobody ranked |

### What remains unknown, and why

- **Romero (CD3, 7 of 25), Laubacher (CD4, 4), Clark (CD6, 5), Bennett (CD7, 6) and Dennison (CD2, 6)** stay below the bar. Each was checked against the Denver Post Q&A, the Colorado Sun's guide where one exists, CPR News, Colorado Newsline, Vote411, KUNC, Ballotpedia, their own sites and local coverage. What those sources cover (tariffs, health care, immigration, energy, public lands) was already coded; the statements still unknown are mostly the 14 state ballot measures, guns and abortion, which no outlet asked congressional candidates about and which their campaigns have not addressed. None of the five answered Vote411.
- **Treasurer:** Bridges and Grantham each reached 2 of 5 and the race now ranks, but neither has been found on Amendment 87 or Proposition 137, and Grantham's income-tax-cap position is an inference from a 2018 bill he sponsored.
- **The 15 candidates with nothing** are minor-party, unaffiliated, regent and State Board candidates whose public material does not touch the 25 statements. The State Board and regent candidates were coded from Chalkbeat's school-funding and federal-oversight questions; its other questions are about education policy, which the statements do not cover.
- **Vote411** reaches House candidates only on guns and energy, and its address lookup rejected the place-name addresses it suggested for other districts, so only CD3 and the statewide races were read there.

### Other changes in this session

- **Amendment 87 and the October 26 date** were checked against the Blue Book and the Secretary of State's 2026 election calendar. Both were already right in the data and on the landing page (DECISIONS.md items 12 and 14); the landing page card now also says registration continues in person through Election Day.
- **Campaign finance** was refreshed from the FEC API on October 15. The API had processed third-quarter reports for only five candidates (period ending September 30); 16 federal candidates still show totals through June 30, and 6 have no report on file. The "as of" date on each profile says which.
- **A blind recode file**, `research/codes-for-blind-review.json`, lists all 325 positions with the coding guide, quote and source but without the 1 to 5 code, for an independent second coding. Codex coded it the same day; the comparison is the next section.
- **A campaign email**, `research/campaign-email.md`, carries the 25 statements and the scale for John to send, with the contact addresses found for the priority-1 campaigns.
- **The theme is pinned to light**, and scrollable tables are keyboard-focusable regions.
- Tests: 31 unit tests (3 new, for the fairness rule) and 37 Playwright tests pass; the link check found 359 of 365 URLs loading, with the same 3 script-blocked and 3 unreachable pages as before plus the Vote411 and campaign-site pages described above.

### Not done

- No Vote411 answers for House districts other than CD3.
- No campaign has been emailed; John sends the message himself.
- State candidates' finance totals are still not pulled from TRACER.

### Blind recode

Codex coded all 325 positions from the blind file, seeing the statement, coding guide, quote, note, source type, title and date but not the first-pass value or the party (`research/codes-blind-codex.json`, DECISIONS.md item 67). The comparison and every resolution are in `research/blind-recode-comparison.md`; the rules are DECISIONS.md items 68 to 74; `scripts/apply-review.mjs` applies the result after every ingest.

| Agreement | Count | Rate |
|---|---|---|
| Exact, all 325 | 141 | 43.4% |
| Exact, among the 196 Codex coded | 141 | 71.9% |
| Within one step, among the 196 Codex coded | 194 | 99.0% |
| Codex "unknown" | 129 | 39.7% |

One direction reversal (Victor Marx on health coverage: 2 against 4, resolved to 3 as a mixed record). Of the 129 unknowns, 86 were kept: roll-call votes and sponsored bills, whose quote is the member's line or the bill title by the protocol's rule, answers whose question the note identifies, and inferences that name the policy area. Codex coded from the quote text alone and did not read the source title.

| Resolution | Count |
|---|---|
| First-pass code kept | 122 |
| Codex's code taken | 18 |
| Direction kept, strength or source type corrected | 23 |
| Position removed | 21 |

In all: 30 codes changed to a different 1 to 5 value, 16 positions retyped as inferred (10 of them with no value change), 21 positions removed (325 to 304), one quote extended to carry its question. Coverage after: 23 candidates over the bar for a full interview, 36 with some positions below it, 15 with none, exactly as before; no candidate crossed the bar in either direction, and the five unranked House races stay unranked (item 66). The largest drops were Greg Lopez (14 to 10), Victor Marx (15 to 13) and Melat Kiros (11 to 9); Kiros and Christy Peterson now sit exactly at the bar in CD1. Seven quotes are flagged for the next source pass because the answer's question lives only in the note, or the quote starts mid-sentence (Escarcega and Wright on the combined NN and 87 question, Baisley on H.R. 1 and on deportation, Marx on Amendment 83, Crow's "I'm a hard no", Kiros on the budget law).

## More info explainers, October 16, 2026

Every interview statement now has a "More info" button under it. It opens a panel that says what the question means in everyday words, what agreeing and disagreeing amount to, where things stand today, what is at stake by area (your money, the economy, the environment, public services, health, safety, rights, elections, how government works), each side's strongest case, and what is still uncertain. Every line carries a numbered link to its source. The idea came from the Codex build's button; ours goes further because John found that one explained what a measure does but not what it would mean for his bills or the environment.

| Check | Result |
|---|---|
| Explainers | 25 of 25 statements |
| Supporting quotes found on their pages by script | 733 |
| Quotes not found | 0 |
| Quotes from pages read in a browser (sites that block scripts) | 69 |
| Browser and accessibility tests | 41 pass, including the dialog open at 1280px and 360px |

How it was made: five research agents gathered sources from one written brief (`research/explainers-brief-2026-10-16.md`), and the main session edited every file for accuracy and tone. The tone is blunt and factual, never a recommendation (DECISIONS.md items 77 to 82). The explainers are background only and change no match, position or measure lean.

Known gaps, each stated inside the explainer it affects: Colorado's building-emissions share comes from 2015 and 2020 estimates because the 2025 state inventory sits in a viewer scripts cannot read; the gas-versus-electric bill comparison rests on the gas industry's trade group plus national lab work, and says so; no independent jobs estimate was found for Proposition 137; the latest out-of-state abortion count is 2023; deportation figures come from a live federal-data dashboard that will change.

## Borrowed from the Codex build, October 16, 2026

After comparing the two builds, John picked what to bring over (DECISIONS.md items 83 to 88). Every fact taken from the Codex build was re-opened at its source and re-quoted before it went in.

- **Landing page:** Codex's layout, a headline with the election dates in a card beside it, above the fold, with this guide's own content.
- **Security headers:** a Content Security Policy and related headers in `vercel.json`. A browser test checks every page type for violations.
- **Explainers:** each of the 25 now opens with "The short version," then "How this connects to your ballot" (with the Blue Book's yes and no lines and the races an answer counts toward), and adds "A concrete example." Nothing was removed. The explainers also appear on measure pages.
- **Records:** 32 vote, bill and decision items, 29 new and 3 replacing looser ones.
- **Campaign finance:** TRACER totals for 14 statewide state candidates and a "no committee registered" note for the other 4, with a plain explanation of what the numbers mean and every candidate in the race side by side. Federal totals refreshed from the FEC the same day.
- **Left out:** Codex's "compare on one issue" view, at John's choice for now.

Checks: 31 unit tests and 49 browser and accessibility tests pass, including the new security test on every page type. Of 624 cited links, 594 load, 27 block scripts and were read in a browser, and 3 are broken older candidate links (two paywalled Coloradoan stories and James Wiley's removed endorsements page).

## Phases and time

Times are Mountain Daylight Time on October 14, 2026, from the session's own log and the commit history. Research ran in parallel with the build, so phases overlap.

| Phase | Clock time | Duration |
|---|---|---|
| Read the brief and design system; checked which sources were reachable; pulled the Secretary of State's certified list and ballot order; downloaded and extracted the Blue Book; wrote the 25 statements, the race roster and the research protocol | 20:49 to 20:56 | 7 min |
| First research pass: 11 Sonnet agents (8 candidate groups, 1 for regents and State Board, 2 for measures) | 20:56 to 21:27 | 31 min, in the background |
| App to first deploy: Astro scaffold, matching and confidence library with unit tests, data schema, landing, ballot finder, geocoder function, interview, results, profiles, race, measure and About pages | 20:57 to 21:10 | 13 min |
| Merging research: ingest, quote verifier, FEC finance, Playwright and axe tests; deploys 2 and 3 | 21:10 to 21:28 | 18 min |
| Second research pass: 4 gap-fill agents working from the Colorado Sun issue guides and Denver Post candidate Q&As | 21:14 to 21:44 | 30 min, in the background |
| Review and quality: neutrality pass on all prose, direction check of every major-party position, consistency rules, office-specific statement sets, Blue Book verbatim check, link check, phone layout, keyboard and 360px accessibility tests | 21:28 to 21:45 | 17 min |
| Final merge, tests, deploy and this report | 21:45 to 21:49 | 4 min |
| **Total** | 20:49 to 21:49 | about 1 hour |

## Verification and what is unverified

What was checked by machine, in this session:

- **Quotes:** on October 14, `scripts/verify-sources.mjs` re-fetched every position's source and found the quote on the page for **294 of 295 positions**; on October 16, after the gap fill, **308 of 325** (the rest are listed in the gap-fill section), and after the blind recode **288 of 304** (the 16 not confirmed are the same browser-only and script-blocked pages, one fewer after a removal; Marx's extended quote was re-fetched and found). House roll calls were checked against the House Clerk's official XML, Senate roll calls against senate.gov, and embedded newsroom graphics were followed. One was not confirmed automatically (below).
- **Measures:** `scripts/verify-measures.mjs` found 196 of 201 Blue Book passages in the measure files word for word in the Blue Book itself. The other 5 are Ballot Issue 7A's fiscal table, flattened into "label: value" lines; every number matches the printed table.
- **Links:** `scripts/check-links.mjs` fetched all 350 cited URLs: 346 loaded. Two Coloradoan articles answer scripts with a paywall response, one site blocks scripts, and one campaign site (Chad Humphrey's) fails with Node's fetch but loads with curl.
- **Data:** the Zod schema and cross-file checks run before every build.
- **App:** 28 unit tests (matching, confidence, measure leans, share links, geocoder parsing) and 37 Playwright tests: a full headless interview run, keyboard-only completion, axe checks with WCAG 2.0, 2.1 and 2.2 A and AA rules on 14 page types in light and dark mode and 4 pages at 360px (zero violations), and no horizontal scrolling at 360px.
- **Geocoder:** tested live in production with the State Capitol's address, plus a unit test on a recorded Census response.

What is **not** verified:

- **Coding judgments.** Each quote is real, but turning a quote into a 1 to 5 value is a judgment. The research agents coded every position; I reviewed the direction of every major-party position and every minor-party position, and that review corrected one reversed code (Jena Griswold on redistricting), recoded four positions as mixed or for consistency, removed seven inferences that reached too far, and removed seven public-land positions that were really answers about drilling (DECISIONS.md items 45 to 49). A second coder (Codex, blind to the first pass and to party) then coded all 325 positions: 71.9 percent exact and 99.0 percent within one step among the 196 it coded, 129 read as unknown, one direction reversal. Resolving the 184 disagreements changed 30 codes, retyped 16 positions as inferred and removed 21 (DECISIONS.md items 68 to 74; `research/blind-recode-comparison.md`). The resolver was the first-pass build's own model, working from the coding guide, quote and note; no person has reviewed the codes.
- **Quotes not confirmed automatically:** Blake Huber's immigration answer (from a Coloradoan Q&A that blocks scripts; the research agent read it through a third-party reader and says so in the file). Every other quote was found on its source page.
- **Self-described records.** A few record items come from campaigns' own sites (for example Amanda Gonzalez's and Michael Allen's accomplishments, Kevin Grantham's tax record) and are labeled as the campaign's claims.
- **Backgrounds and endorsements** come from Ballotpedia, campaign sites and news coverage and were not cross-checked against a second source. Endorsement lists are not exhaustive.
- **Campaign finance** was refreshed from the FEC on October 15; the API had processed third-quarter reports for five candidates, and most federal candidates still show totals through June 30, 2026. Each profile's "as of" date says which. State candidates' totals are not included; profiles link to TRACER.
- **Address lookup** was tested with one address; rural route addresses, new construction and P.O. boxes were not tested. The manual district picker is the fallback.
- **No manual screen-reader test** was done; accessibility testing is automated plus a scripted keyboard pass.

## Known weaknesses

- **Coverage is still thinner for challengers and down-ballot offices,** though less so after the October 16 gap fill: 21 of 26 major-party candidates now clear the bar (16 before), the treasurer race ranks, and 15 of 74 candidates (20 before) have no sourced position, mostly minor-party and State Board or regent candidates whose public statements do not touch the 25 statements. Five House races (CD2, CD3, CD4, CD6, CD7) are not ranked at all under the fairness rule because only the incumbent clears the bar; those show known positions side by side instead.
- **Federal votes stand in for broad statements.** The Laken Riley Act vote is used for the deportation statement and the Canada tariff resolution for the tariff statement. That is defensible, but a vote is a narrower thing than the statement.
- **Two statements rarely separate candidates** (Proposition 133 on child sex trafficking and Amendment 85 on plain-language ballots). They are there so those measures get a lean.
- **The office-specific statement sets** for attorney general, secretary of state and treasurer are my judgment (`DECISIONS.md` item 44). A visitor could reasonably weigh, say, an attorney general candidate's abortion stance more or less than this does.
- **Statements are scored independently,** so related statements (the two income tax statements, the two transgender-youth statements) count twice for a visitor who agrees with both.
- **The search budget ran out** partway through research. Agents switched to Google News RSS and the newsrooms' own search pages, which worked, but CPR News, Colorado Newsline, Congress.gov and Vote Smart block automated fetching and were not used at all.
- **The repository is private,** so the "Report an error" link works only for collaborators until it is made public.
- **English only.**

## With another day

1. **A person's pass over the 184 coding disagreements** in `research/blind-recode-comparison.md` (the second model's pass is done), and a re-fetch of the seven quotes flagged there so each carries the question it answers.
2. **Ask the thin candidates directly.** Send the 25 statements to every campaign, especially treasurer, secretary of state, State Board and regent candidates, and publish their answers as questionnaire sources.
3. **Refresh campaign finance** from the October 15 FEC reports and add state candidates' totals from TRACER's bulk data.
4. **Read the blocked sources by hand** (CPR News and Colorado Newsline voter guides, Vote411 answers) and add what they support.
5. **A Spanish version,** using the Blue Book's official Spanish edition for the measures.
6. **Judges:** bring the Office of Judicial Performance Evaluation's recommendations into the data so the results page lists the visitor's judges.
7. **Local measures beyond 7A,** matched by county.
8. **A usability session with five voters and a screen-reader pass,** then fix what they find.
9. Make the repository public and connect it to Vercel for automatic deploys on push.
