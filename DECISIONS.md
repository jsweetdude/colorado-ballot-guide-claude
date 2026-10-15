# Decisions

Every choice made in place of asking, with the reason. The brief said not to ask questions; these are the calls that were made instead. Newest at the bottom of each section.

## Process

1. **Worked directly in the repo's single checkout, not a separate git worktree.** The repository was brand new and empty, with no other worktrees and nothing in it but the handoff folder, so no other process could be sharing its `HEAD`.
2. **`brief/` is git-ignored.** It holds handoff material, including notes from John's personal vault about the design system. The design system's stylesheet is copied into `src/styles/porcelain.css` with its source path and copy date, which is what the build needs.
3. **Research ran on Claude Sonnet subagents, not Codex.** John's usual routing sends fetch-and-summarize fan-outs of three or more to Codex. This repo is named `-claude` and the brief forbids reading any other implementation, which points to a side-by-side comparison; sending the research to another vendor's model would mix the two entries. Eleven Sonnet agents worked from one written protocol (`scripts/research-protocol.md`).
4. **Codex cross-model review was skipped** for the same reason.
5. **The repository stays private.** The brief asks for an error-report link to the repo's issues. Making the repository public is an outward-facing change that is John's call, so the link points at the issues page and works for collaborators now and for everyone once the repo is public.

## Data and research

6. **The candidate roster is the Secretary of State's certified list (September 4, 2026), not the handoff inventory.** The inventory was secondary-sourced and differs: the Senate field is Chew (Forward), Baum (Approval Voting), Huber (Libertarian) and Withrow (Unity), with Willoughby only a write-in; CD5 adds Mitchell (American Constitution) and Elworth (Libertarian); CD6 adds McMahon (Libertarian), Ryan (Unity) and Witta (unaffiliated); CD1 adds Milton (Unity) and Humphrey (Libertarian); CD2 to CD4 each add a Libertarian; CD3 adds Brown (unaffiliated); the State Board of Education's third seat is District 7 (Esser, Barton, Klopf); regent races in CD2, CD6 and CD7 each have Republican and Libertarian candidates. Certified write-ins are left out.
7. **Candidates are listed in official ballot order** (major parties, then minor parties, then unaffiliated, each tier by the Secretary of State's July 28 lot drawing; governor tickets by last name). It is the order on the voter's ballot and the most neutral one available. Results tables re-sort by match.
8. **Data is JSON**, one file per candidate and per measure, validated by Zod schemas (`scripts/schema.mjs`) in `npm run build`'s prebuild step. JSON parses strictly and is what the research agents and scripts write natively.
9. **No party-platform inference.** The brief allows party-platform inference as a low-quality source. It was not used: a position needs the candidate's own vote, bill, questionnaire, statement, or a rating about that candidate. Party is visible on every result anyway, and inferring from it would make every minor-party candidate look fully known.
10. **Inferred positions and interest-group ratings are capped at agree or disagree (2 or 4)**, never "strongly", and the schema enforces it. They count at 0.3 and 0.6 quality toward confidence.
11. **Every position carries a short verbatim quote** from its source, and `scripts/verify-sources.mjs` re-fetches each source and checks the quote is on the page. Profiles say when a quote was confirmed this way.
12. **Measure thresholds follow the Blue Book, not the rule of thumb.** The brief says constitutional amendments need 55 percent; the Blue Book says Amendment 87 passes with a simple majority. Each measure shows the threshold the Blue Book states.
13. **Federal campaign finance comes from the FEC API** in one script for all federal candidates, so the numbers share a date and method. State candidates' totals are filled only where a fetched news story or TRACER page reports them.
14. **Election dates are sourced to the Larimer County Clerk's 2026 election page** (October 26 last day to get a ballot by mail and recommended last day to mail one back; ballots received by 7 p.m. November 3), confirmed by fetching it.
15. **State Senate seats on the 2026 ballot** come from the Secretary of State's ballot order page (21 districts). The results page says whether the visitor's Senate district has a race this year.

## Interview and matching

16. **25 statements**, the top of the 20 to 25 range, because 14 measures each need at least one tied statement and the brief's topic list needs the rest. Every measure has a tied statement, so every measure can show a lean. Two statements (Proposition 133, Amendment 85) will rarely separate candidates but are there so those measures get a lean.
17. **Importance weights: low 0.5, normal 1, high 2.**
18. **A candidate is ranked if known on at least a third of the statements the visitor answered, and at least 2.** The brief says "fewer than a third of positions known"; measuring against what the visitor answered (rather than all 25) keeps the rule meaningful for visitors who skip a lot.
19. **Confidence is an all-must-hold rule.** High: coverage at least 60 percent, source quality at least 0.85, margin at least 10 points, at least 5 shared statements. Medium: coverage at least a third, quality at least 0.6, margin at least 4 points, at least 3 shared statements. Low otherwise. Margin is the distance to the nearest ranked neighbor, so a near-tie lowers confidence for both candidates. A single ranked candidate has no margin, and margin is left out for them.
20. **Measure lean = sum of weight × (answer − 3) × direction** over the tied statements; zero or nothing answered is "unclear."
21. **Yes and no leans share one neutral style** (cobalt-soft info badge). Green-for-yes and red-for-no would read as good and bad.
22. **One statement per screen**, with Back, Skip and Next, a review screen at the end, and the step in the URL hash so the browser's Back button works. Focus moves to each new statement's heading.
23. **"Next" without an answer counts as a skip**, and an explicit "Skip this statement" button also clears any answer. Neither blocks the visitor.
24. **Share links carry answers and the congressional district only**, never the street address or legislative districts.

## Product and design

25. **Astro 7 static site plus one Vercel Node function** (`api/districts.js`). Vercel builds Astro with zero configuration and serves `/api` functions alongside it.
26. **The address goes to the function in a POST body, not the URL**, so it never appears in request logs; the function does not log it and sends `Cache-Control: no-store`. It asks the Census Geocoder for the `Public_AR_Current` benchmark and `Current_Current` vintage, which returns the 120th Congress districts and the 2026 state legislative districts.
27. **Fonts are self-hosted from npm (`@fontsource`) instead of Google Fonts.** The brief's privacy line is that nothing but the address lookup leaves the browser; loading Google Fonts would send every visitor's IP to Google. Instrument Sans and Atkinson Hyperlegible Mono are the Calm voice's faces.
28. **Web Awesome components used: `wa-details` (measure and source disclosures), `wa-dialog` and `wa-copy-button` (share link).** Imported one by one from the npm package and bundled. Native HTML with `pc-*` classes everywhere else, as the Porcelain spec prefers.
29. **Grain on the landing and results pages only**, as the brief says; not on the interview, ballot finder, race, profile, measure or About pages, which are forms or tables.
30. **Kiln only for the October 26 and November 3 date cards.**
31. **Hatching marks unknown positions** on profiles and the coverage meters, always with a "No known position" label or legend.
32. **A "Browse races without the interview" path** so the guide is useful to people who will not take a quiz.
