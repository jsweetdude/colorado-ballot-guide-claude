# Colorado Ballot Guide

A free, nonpartisan web app for Colorado's November 3, 2026 general election. A visitor answers 25 statements about economic, social and governance questions; the app explains their ballot race by race and measure by measure, shows how closely each candidate's sourced positions line up with their answers (with a confidence level and "based on N of M questions"), and links every claim to its source.

Live: https://colorado-ballot-guide-claude.vercel.app

Built by John Sweet as a personal project. No money was spent. Not affiliated with any campaign, party or organization.

## What is in it

- **Landing, ballot finder, interview, results, candidate profiles, race and measure pages, and an About and method page.** Static pages built with [Astro](https://astro.build), plus one serverless function.
- **Address lookup** (`api/districts.js`): the browser POSTs a street address to this function, which asks the free U.S. Census Geocoder for the congressional, state Senate and state House districts and the county. The address travels in the request body, is not logged and is not stored.
- **Answers stay in the browser** (`localStorage`). A share link carries answers after the `#`, which browsers never send to a server.
- **Data in the repo**, one JSON file per candidate and per measure, validated by a schema before every build.
- **Design:** the Porcelain design system (Calm voice), copied to `src/styles/porcelain.css`, with Web Awesome 3.14.0 components (`wa-details`, `wa-dialog`, `wa-copy-button`) bundled from npm. Fonts are self-hosted.

## Run it

Requires Node 22 or later.

```sh
npm install
npm run dev          # http://localhost:4321 (the address lookup needs `vercel dev` to run locally)
npm run build        # validates data, then builds to dist/
npm test             # unit tests: matching, confidence, measure leans, share links, geocoder parsing
npx playwright install chromium   # once
npm run test:e2e     # headless interview run, axe WCAG 2.2 AA checks in light and dark mode, 360px layout
```

Deploy: `vercel link --yes --project colorado-ballot-guide-claude` then `vercel deploy --prod --yes`. Vercel builds Astro with zero configuration and serves `api/` as a function.

## Update the data

```
src/data/
  statements.json      the 25 interview statements, their ties to measures, and the coding rule for each
  races.json           races and candidates in official ballot order (Secretary of State certified list)
  candidates/<id>.json one file per candidate: background, record, positions, endorsements, finance, sources
  measures/<id>.json   one file per measure, in the Blue Book's words
  geography.json       counties and which state Senate districts are on the 2026 ballot
  fec-ids.json         FEC candidate IDs for federal candidates
```

A **position** is a record: statement id, value on the 1 to 5 scale, source URL, source title, source type (`recorded_vote`, `sponsored_bill`, `questionnaire`, `direct_statement`, `interest_group_rating`, `inferred`), date, and a short verbatim quote. A statement with no record is unknown. Inferred positions and interest-group ratings may only be coded 2 to 4. Party platforms are never used. Edit a file, then:

```sh
npm run validate                      # schema and cross-file checks (also runs before every build)
node scripts/verify-sources.mjs <id>  # re-fetch sources and confirm each quote is on the page
FEC_API_KEY=... node scripts/fec-finance.mjs   # refresh federal campaign finance totals
```

Research for the first version followed `scripts/research-protocol.md`; `scripts/ingest-research.mjs` merged it. Set `last_checked` on anything you re-check, and update `DATA_LAST_CHECKED` in `src/lib/site.ts`.

## The method

All formulas live in `src/lib/match.ts` and are printed on the About page.

- **Match:** for each statement the visitor answered and the candidate has a known position on, `points = weight × (4 − |steps apart|) ÷ 4`, with weight 0.5, 1 or 2 for low, normal or high importance. Match = points ÷ the maximum possible on those statements.
- **Ranking:** a candidate is ranked if known on at least a third of the statements the visitor answered (and at least 2); others are listed as "not enough known to rank."
- **Confidence:** High needs coverage ≥ 60%, source quality ≥ 0.85, a margin of ≥ 10 points over the nearest ranked neighbor and ≥ 5 shared statements; Medium needs ≥ a third, ≥ 0.6, ≥ 4 points and ≥ 3; otherwise Low. Votes, bills, questionnaires and direct statements count 1.0 toward quality, interest-group ratings 0.6, inferences 0.3.
- **Measure lean:** sum of `weight × (answer − 3)` over the statements tied to the measure, sign-flipped where agreeing points to a no vote. Positive leans yes, negative leans no, zero or unanswered is unclear.

See `DECISIONS.md` for every judgment call and `REPORT.md` for coverage, gaps and what is unverified.

## License

Code: MIT (`LICENSE`). Data in `src/data/`: CC BY 4.0 (`src/data/LICENSE.md`). Blue Book text is a public document of the Colorado Legislative Council Staff.

To report an error, open an issue: https://github.com/jsweetdude/colorado-ballot-guide-claude/issues
