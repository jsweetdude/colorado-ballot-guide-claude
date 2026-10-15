# Research protocol: Colorado Ballot Guide candidate profiles

You are researching candidates for a free, nonpartisan voter guide for Colorado's November 3, 2026 general election. Today is 2026-10-14. Your output is data that real voters will read while marking their ballots. Accuracy beats coverage: an `unknown` is always acceptable; an invented or stretched position is not.

## Hard rules

1. **Never write anything from memory.** Every fact, position, vote, endorsement and number must come from a page you fetched in this session (WebFetch, or `curl` via Bash). If you cannot fetch a page that supports a claim, leave the claim out.
2. **Every position carries a verbatim quote** copied character-for-character from the fetched page text (40 to 400 characters). Do not paraphrase inside `quote`. Do not stitch two passages together. For roll-call votes, the quote is the line from the official roll call showing the member's vote (for example `Hickenlooper (D-CO), Nay`) or the official vote description.
3. **Do not invent positions, votes, endorsements or quotes.** Unknown is a valid value: just omit that statement from `positions`.
4. **No party-platform inference.** Never code a position because of the candidate's party. A position needs the candidate's own words, vote, bill, questionnaire answer, or a rating or endorsement about that specific candidate.
5. **Neutral language** in every field you write (`summary`, `experience`, `record`, `note`). Describe; never characterize. No "extreme", "radical", "common-sense", "MAGA", "far-left", "controversial", "embattled" and similar. Use the candidate's own job titles and plain facts.
6. **Do not ask the user anything and do not call AskUserQuestion.** If you are blocked, write the blocker in `research_notes` and move on. Do not spawn subagents.
7. Work only on the candidates you were assigned. Do not read or copy from any other ballot-guide project on this machine.

## Where to look (and what is blocked)

Reachable and good: Ballotpedia candidate pages and Candidate Connection surveys (`https://ballotpedia.org/<Name>`), Colorado Sun (`coloradosun.com`), Denver7, 9News, Colorado Politics, Denver Post, Axios Denver, KUNC, KRCC, Chalkbeat, Wikipedia (follow its references to primary sources and cite the primary source when you can fetch it), campaign websites, official office websites, House roll calls at `https://clerk.house.gov/Votes/<year><rollnumber>` (e.g. `https://clerk.house.gov/Votes/2025190`), Senate roll calls at `https://www.senate.gov/legislative/LIS/roll_call_votes/vote1191/vote_119_1_00NNN.htm` (119th Congress, 1st session = 2025; `vote1192/vote_119_2_` for 2026), the Colorado General Assembly (`https://leg.colorado.gov/bills/sb25-003` style; send an `Accept: text/html` header with curl), the 2026 Blue Book.

Blocked to automated fetching (403): congress.gov, govtrack.us, votesmart.org, cpr.org, coloradonewsline.com. You may try `https://web.archive.org/web/2026/<original url>` for a blocked page; if that works, cite the original URL and add `"via": "web.archive.org"` to that record. Web search results are for finding pages, not for citing: a snippet you did not fetch is not a source.

curl tip: `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" -H "Accept: text/html" <url>` then strip tags, e.g. with `python3 -c` and `re.sub`. WebFetch summarizes pages with a small model and may paraphrase; when you need an exact quote, get the raw text with curl and copy from that. If curl is blocked but WebFetch works, ask WebFetch to "return the exact sentence(s), verbatim, that mention X".

## The 25 statements

They are in `statements.json` next to this file. Each has an `id`, the statement `text`, and a `coding_guide` that says what counts as agree or disagree. Code each candidate on every statement you can source, on this 5-point scale:

| value | meaning |
|---|---|
| 5 | Strongly agree: states it without qualification, makes it a signature issue, or authored or sponsored a bill doing exactly this |
| 4 | Agree: supports it with qualifications, or only a vote shows it |
| 3 | Explicitly takes a middle or mixed position (NOT the same as unknown) |
| 2 | Disagree: opposes with qualifications, or only a vote shows it |
| 1 | Strongly disagree: opposes without qualification, makes opposition a signature issue, or sponsored a bill doing the opposite |

`source_type` must be one of:

- `recorded_vote`: an official roll-call vote (Congress or the Colorado General Assembly).
- `sponsored_bill`: the candidate sponsored or cosponsored a bill that does what the statement says (or the opposite).
- `questionnaire`: the candidate's answer to a questionnaire (Ballotpedia Candidate Connection, a newsroom questionnaire, Vote411, a League of Women Voters guide).
- `direct_statement`: the candidate's own words in an interview, debate, speech, campaign site, press release, social post quoted by a news outlet.
- `interest_group_rating`: a rating or endorsement of this candidate by a group whose stance on the statement is unambiguous (NRA grade, Planned Parenthood endorsement, League of Conservation Voters score). Code no stronger than 4 or 2.
- `inferred`: the source does not address the statement directly, and the value is reasoned from a closely related stated position. Use sparingly; explain the reasoning in `note`; code no stronger than 4 or 2. Never infer from party.

`date` is the date of the vote, statement, article or questionnaire (YYYY-MM-DD; if only month is known use the first of the month and say so in `note`).

If a candidate has several sources for one statement, choose the strongest (votes and sponsored bills beat statements beat ratings beat inference) and the most recent. One record per statement.

## Output: one JSON file per candidate

Write `<output dir>/<candidate-id>.json` (ids are given in your assignment). UTF-8, valid JSON, exactly this shape:

```json
{
  "id": "jane-doe",
  "name": "Jane Doe",
  "race": "us-house-9",
  "party": "Democratic Party",
  "incumbent": false,
  "profile": "full",
  "website": "https://janedoe.com",
  "summary": [
    { "text": "Jane Doe is a former Denver city council member and nurse.", "source_url": "https://..." }
  ],
  "experience": [
    { "text": "Denver City Council, District 4, 2015-2023", "source_url": "https://..." }
  ],
  "record": [
    { "kind": "recorded_vote", "title": "H.R. 1, One Big Beautiful Bill Act, final passage", "date": "2025-07-03", "detail": "Voted Nay.", "source_url": "https://clerk.house.gov/Votes/2025190" },
    { "kind": "sponsored_bill", "title": "HB24-1234, Example Act", "date": "2024-05-01", "detail": "Prime sponsor. Signed into law.", "source_url": "https://leg.colorado.gov/bills/hb24-1234" },
    { "kind": "decision", "title": "Example decision as county clerk", "date": "2023-01-01", "detail": "One neutral sentence.", "source_url": "https://..." }
  ],
  "positions": [
    {
      "statement": "abortion-legal",
      "value": 5,
      "source_type": "direct_statement",
      "source_url": "https://...",
      "source_title": "Page or article title",
      "date": "2026-09-30",
      "quote": "Verbatim text copied from the page.",
      "note": "One short sentence on how the quote maps to the statement, if not obvious."
    }
  ],
  "endorsements": [
    { "name": "Organization or person", "source_url": "https://..." }
  ],
  "finance": null,
  "sources": [
    { "title": "Page title", "url": "https://...", "accessed": "2026-10-14" }
  ],
  "last_checked": "2026-10-14",
  "research_notes": "What you could not find, what was blocked, anything a reviewer should double-check."
}
```

Field rules:

- `summary`: 1 to 3 short, neutral sentences on who they are (occupation, current or past office, where they live). Each sentence sourced.
- `experience`: offices held, major jobs, military service, education if notable. Each item sourced.
- `record`: for incumbents and former officeholders, 4 to 10 of the most consequential votes, sponsored bills or official decisions relevant to the 25 statements or widely reported. Members of Congress: use official roll calls. Former or current state legislators: Colorado General Assembly bill pages. County officials, prosecutors, executives: documented official decisions reported by news outlets. Leave empty for people who have never held office.
- `endorsements`: only endorsements stated on a fetched page (campaign endorsement page, news report, the endorsing group's own page). Up to 10 notable ones; prefer organizations.
- `finance`: leave `null` for federal candidates (the build team pulls FEC numbers centrally). For state candidates, if a fetched news story or TRACER page reports totals, fill `{ "raised": 0, "spent": null, "cash_on_hand": null, "as_of": "YYYY-MM-DD", "source_url": "...", "source_name": "Colorado Sun", "note": "" }` with numbers as plain integers in dollars; otherwise `null`.
- `sources`: every URL you cited anywhere in the file, once each.
- `profile`: use the value given in your assignment (`full` or `short`). A `short` profile still needs a sourced `summary`, `website` if one exists, and any positions you can source, but `record`, `experience` and `endorsements` may be brief.

## Effort guide

For each `full` candidate: aim to source as many of the 25 statements as honestly possible (incumbents in Congress usually support 12 or more through votes and statements; first-time candidates fewer). Check: Ballotpedia page and any Candidate Connection survey; the campaign site's issues page; Colorado Sun and Denver7 coverage of the race, debates and questionnaires; for members of Congress, roll calls on H.R. 1 (One Big Beautiful Bill Act, 2025), the Laken Riley Act (S. 5, 2025), the Protection of Women and Girls in Sports Act (H.R. 28, 2025), tariff-related resolutions, and any public-lands sale votes or statements; for state legislators, their Colorado bills. Colorado ballot measure positions (Amendments 81 to 87, Propositions NN and 132 to 137) are often covered in debates and news pieces; search for "<name> Amendment 87" and so on.

For each `short` candidate: Ballotpedia (Candidate Connection survey if any), campaign site, any news coverage. 20 to 40 minutes of effort at most.

When done, reply with a short plain-text summary: for each candidate, the number of positions sourced, and anything a reviewer should double-check. Do not paste the JSON into your reply.
