# Report: Colorado Ballot Guide

**Production URL: https://colorado-ballot-guide-claude.vercel.app**

Built and shipped in one session on October 14, 2026 (Mountain time), from the brief in `brief/BUILD-BRIEF.md`. Repository: `jsweetdude/colorado-ballot-guide-claude`, branch `main`. Every judgment call is in `DECISIONS.md`.

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

| Group | Candidates | Full | Partial | Unknown |
|---|---|---|---|---|
| Tier A, major party | 26 | 16 | 10 | 0 |
| Tier A, unaffiliated with full profile (Lopez) | 1 | 1 | 0 | 0 |
| Tier A, minor party and other unaffiliated | 30 | 0 | 18 | 12 |
| Tier B (regents, State Board) | 17 | 0 | 8 | 9 |
| All | 74 | 17 | 36 | 21 |

"Full" means known on at least a third of the statements used for the candidate's race, so they rank for a visitor who answers everything. "Partial" means at least one known position but fewer. Attorney general, secretary of state and treasurer are measured against their office's statement set (9, 5 and 5 statements); everyone else against all 25.

**289 sourced positions** in all: 68 questionnaire answers, 31 recorded votes, 11 sponsored bills, 138 direct statements, 35 inferred (labeled as such), 6 interest-group ratings or endorsements. 36 positions come from undated pages or pages giving only a year and are shown that way, never with an invented day.

<details>
<summary>Every candidate</summary>

| Race | Candidate | Party | Known / used for race | Level |
|---|---|---|---|---|
| us-senate | Mark Baisley | Republican | 9 / 25 | full |
| us-senate | John Hickenlooper | Democratic | 9 / 25 | full |
| us-senate | Bob Chew | Forward | 6 / 25 | partial |
| us-senate | Christopher Baum | Approval Voting | 0 / 25 | unknown |
| us-senate | Blake Huber | Libertarian | 1 / 25 | partial |
| us-senate | Adam Withrow | Unity | 2 / 25 | partial |
| governor | Victor Marx | Republican | 14 / 25 | full |
| governor | Phil Weiser | Democratic | 12 / 25 | full |
| governor | Stephen T. Hamilton | American Constitution | 2 / 25 | partial |
| governor | Eric Mulder | Libertarian | 2 / 25 | partial |
| governor | Jeff Peckman | Unity | 0 / 25 | unknown |
| governor | Erik Underwood | Approval Voting | 7 / 25 | partial |
| governor | Greg Lopez | Unaffiliated | 13 / 25 | full |
| attorney-general | Michael J. Allen | Republican | 7 / 9 (12 of 25 overall) | full |
| attorney-general | Jena Griswold | Democratic | 5 / 9 (8 of 25 overall) | full |
| secretary-of-state | Amanda Gonzalez | Democratic | 3 / 5 (3 of 25 overall) | full |
| secretary-of-state | James Wiley | Republican | 3 / 5 (3 of 25 overall) | full |
| secretary-of-state | Sean Vadney | Libertarian | 1 / 5 (1 of 25 overall) | partial |
| secretary-of-state | Amanda Campbell | American Constitution | 0 / 5 (0 of 25 overall) | unknown |
| secretary-of-state | Celeste Landry | Forward | 1 / 5 (1 of 25 overall) | partial |
| treasurer | Jeff Bridges | Democratic | 1 / 5 (4 of 25 overall) | partial |
| treasurer | Kevin Grantham | Republican | 1 / 5 (1 of 25 overall) | partial |
| treasurer | Jodie Barr | Libertarian | 1 / 5 (1 of 25 overall) | partial |
| treasurer | Marilee Langner Sturgis | Approval Voting | 0 / 5 (0 of 25 overall) | unknown |
| us-house-1 | Melat Kiros | Democratic | 11 / 25 | full |
| us-house-1 | Christy Peterson | Republican | 10 / 25 | full |
| us-house-1 | Critter Milton | Unity | 0 / 25 | unknown |
| us-house-1 | Chad Humphrey | Libertarian | 4 / 25 | partial |
| us-house-1 | Shimon Blau | Unaffiliated | 4 / 25 | partial |
| us-house-2 | Joe Neguse | Democratic | 10 / 25 | full |
| us-house-2 | Kelley Anne Dennison | Republican | 2 / 25 | partial |
| us-house-2 | Gaylon Kent | Libertarian | 5 / 25 | partial |
| us-house-3 | Dwayne L. Romero | Democratic | 7 / 25 | partial |
| us-house-3 | Jeff Hurd | Republican | 8 / 25 | partial |
| us-house-3 | Cory Robertson | Libertarian | 0 / 25 | unknown |
| us-house-3 | Clifton Brown | Unaffiliated | 0 / 25 | unknown |
| us-house-4 | Lauren Boebert | Republican | 9 / 25 | full |
| us-house-4 | Eileen Laubacher | Democratic | 4 / 25 | partial |
| us-house-4 | Douglas Mangeris | Libertarian | 0 / 25 | unknown |
| us-house-5 | Jeff Crank | Republican | 12 / 25 | full |
| us-house-5 | Jessica Killin | Democratic | 9 / 25 | full |
| us-house-5 | Christopher Mitchell | American Constitution | 2 / 25 | partial |
| us-house-5 | Mark "Marky Jr" Elworth | Libertarian | 0 / 25 | unknown |
| us-house-6 | Jason Crow | Democratic | 10 / 25 | full |
| us-house-6 | Jason Clark | Republican | 5 / 25 | partial |
| us-house-6 | Patty McMahon | Libertarian | 0 / 25 | unknown |
| us-house-6 | Meredith Ryan | Unity | 3 / 25 | partial |
| us-house-6 | Samir Ezzeldin Witta | Unaffiliated | 4 / 25 | partial |
| us-house-7 | Tim Bennett | Republican | 5 / 25 | partial |
| us-house-7 | Brittany Pettersen | Democratic | 8 / 25 | partial |
| us-house-7 | Susan Hall | Unity | 0 / 25 | unknown |
| us-house-7 | Lawrence Kyle Clark | American Constitution | 0 / 25 | unknown |
| us-house-7 | Dan "Kilo" Sallis | Libertarian | 4 / 25 | partial |
| us-house-7 | Joe Krzeczkowski | Unaffiliated | 6 / 25 | partial |
| us-house-8 | Gabe Evans | Republican | 9 / 25 | full |
| us-house-8 | Manny Rutinel | Democratic | 7 / 25 | partial |
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
| cu-regent-6 | Ilana Spiegel | Democratic | 0 / 25 | unknown |
| cu-regent-6 | Joe Johnson | Libertarian | 0 / 25 | unknown |
| cu-regent-7 | Paul Mueller | Republican | 0 / 25 | unknown |
| cu-regent-7 | Nolbert Chavez | Democratic | 0 / 25 | unknown |
| cu-regent-7 | BetteRose Ryan | Libertarian | 0 / 25 | unknown |

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

## Phases and time

Times are Mountain Daylight Time on October 14, 2026, from the session's own log and the commit history. Research ran in parallel with the build, so phases overlap.

| Phase | Clock time | Duration |
|---|---|---|
| Read the brief and design system; checked which sources were reachable; pulled the Secretary of State's certified list and ballot order; downloaded and extracted the Blue Book; wrote the 25 statements, the race roster and the research protocol | 20:49 to 20:56 | 7 min |
| First research pass: 11 Sonnet agents (8 candidate groups, 1 for regents and State Board, 2 for measures) | 20:56 to 21:27 | 31 min, in the background |
| App to first deploy: Astro scaffold, matching and confidence library with unit tests, data schema, landing, ballot finder, geocoder function, interview, results, profiles, race, measure and About pages | 20:57 to 21:10 | 13 min |
| Merging research: ingest, quote verifier, FEC finance, Playwright and axe tests; deploys 2 and 3 | 21:10 to 21:28 | 18 min |
| Second research pass: 4 gap-fill agents working from the Colorado Sun issue guides and Denver Post candidate Q&As | 21:14 to 21:50 (est.) | about 35 min, in the background |
| Review and quality: neutrality pass on all prose, direction check of every major-party position, consistency rules, office-specific statement sets, Blue Book verbatim check, link check, phone layout, keyboard and 360px accessibility tests | 21:28 to 21:45 | 17 min |
| Final merge, tests, deploy and this report | 21:45 to 21:50 | 5 min |
| **Total** | 20:49 to 21:50 | about 1 hour |

## Verification and what is unverified

What was checked by machine, in this session:

- **Quotes:** `scripts/verify-sources.mjs` re-fetched every position's source and found the quote on the page for **287 of 289 positions**. House roll calls were checked against the House Clerk's official XML, Senate roll calls against senate.gov, and embedded newsroom graphics were followed. 2 were not confirmed automatically (listed below).
- **Measures:** `scripts/verify-measures.mjs` found 196 of 201 Blue Book passages in the measure files word for word in the Blue Book itself. The other 5 are Ballot Issue 7A's fiscal table, flattened into "label: value" lines; every number matches the printed table.
- **Links:** `scripts/check-links.mjs` fetched all 344 cited URLs: 340 loaded, 2 Coloradoan articles are behind a paywall response for scripts, and 1 campaign site timed out once and loads normally.
- **Data:** the Zod schema and cross-file checks run before every build.
- **App:** 28 unit tests (matching, confidence, measure leans, share links, geocoder parsing) and 37 Playwright tests: a full headless interview run, keyboard-only completion, axe checks with WCAG 2.0, 2.1 and 2.2 A and AA rules on 14 page types in light and dark mode and 4 pages at 360px (zero violations), and no horizontal scrolling at 360px.
- **Geocoder:** tested live in production with the State Capitol's address, plus a unit test on a recorded Census response.

What is **not** verified:

- **Coding judgments.** Each quote is real, but turning a quote into a 1 to 5 value is a judgment. The research agents coded every position; I reviewed the direction of every major-party position and every minor-party position, and that review corrected one reversed code (Jena Griswold on redistricting) and removed seven inferences that reached too far. There was no independent second coder.
- **Quotes not confirmed automatically:** Blake Huber's immigration answer (from a Coloradoan Q&A that blocks scripts; the research agent read it through a third-party reader and says so in the file) and Jason Clark's deportation answer (added by a research pass still finishing when this was written).
- **Self-described records.** A few record items come from campaigns' own sites (for example Amanda Gonzalez's and Michael Allen's accomplishments, Kevin Grantham's tax record) and are labeled as the campaign's claims.
- **Backgrounds and endorsements** come from Ballotpedia, campaign sites and news coverage and were not cross-checked against a second source. Endorsement lists are not exhaustive.
- **Campaign finance** for most federal candidates runs through June 30, 2026, the latest report the FEC had processed; third-quarter reports are due October 15. State candidates' totals are not included; profiles link to TRACER.
- **Address lookup** was tested with one address; rural route addresses, new construction and P.O. boxes were not tested. The manual district picker is the fallback.
- **No manual screen-reader test** was done; accessibility testing is automated plus a scripted keyboard pass.

## Known weaknesses

- **Coverage is thin for challengers and down-ballot offices.** 16 of 26 major-party candidates are known on at least a third of their race's statements. The treasurer race (Bridges 1 of 5, Grantham 1 of 5) will rarely rank anyone, and the secretary of state race ranks only on 3 of 5. 21 of 74 candidates have no sourced position at all, mostly minor-party and State Board or regent candidates whose public statements do not touch the 25 statements.
- **Federal votes stand in for broad statements.** The Laken Riley Act vote is used for the deportation statement and the Canada tariff resolution for the tariff statement. That is defensible, but a vote is a narrower thing than the statement.
- **Two statements rarely separate candidates** (Proposition 133 on child sex trafficking and Amendment 85 on plain-language ballots). They are there so those measures get a lean.
- **The office-specific statement sets** for attorney general, secretary of state and treasurer are my judgment (`DECISIONS.md` item 44). A visitor could reasonably weigh, say, an attorney general candidate's abortion stance more or less than this does.
- **Statements are scored independently,** so related statements (the two income tax statements, the two transgender-youth statements) count twice for a visitor who agrees with both.
- **The search budget ran out** partway through research. Agents switched to Google News RSS and the newsrooms' own search pages, which worked, but CPR News, Colorado Newsline, Congress.gov and Vote Smart block automated fetching and were not used at all.
- **The repository is private,** so the "Report an error" link works only for collaborators until it is made public.
- **English only.**

## With another day

1. **A second, independent coding pass** on every position (a different model or a person), with disagreements resolved and logged. This is the single biggest quality gain available.
2. **Ask the thin candidates directly.** Send the 25 statements to every campaign, especially treasurer, secretary of state, State Board and regent candidates, and publish their answers as questionnaire sources.
3. **Refresh campaign finance** from the October 15 FEC reports and add state candidates' totals from TRACER's bulk data.
4. **Read the blocked sources by hand** (CPR News and Colorado Newsline voter guides, Vote411 answers) and add what they support.
5. **A Spanish version,** using the Blue Book's official Spanish edition for the measures.
6. **Judges:** bring the Office of Judicial Performance Evaluation's recommendations into the data so the results page lists the visitor's judges.
7. **Local measures beyond 7A,** matched by county.
8. **A usability session with five voters and a screen-reader pass,** then fix what they find.
9. Make the repository public and connect it to Vercel for automatic deploys on push.
