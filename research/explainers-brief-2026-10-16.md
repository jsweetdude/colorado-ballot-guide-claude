# Research brief: "More info" explainers for the 25 interview statements

You are researching background for a free, nonpartisan voter guide to Colorado's November 3, 2026 election. Today is 2026-10-16. Each interview statement gets a "More info" panel that tells a voter, in plain words, what the question is about, what is true today, and what is actually at stake: effects on people's money, the economy, the environment, public services, safety, health, rights and elections, with numbers wherever numbers exist. Voters have said the current explanations tell them what a measure does but not what it would mean for them. Your job is to find the facts that close that gap.

Working folder: `/Users/johnsweet/Projects/colorado-ballot-guide-claude-explainers` (a git worktree). Read, do not edit, anything outside `research/explainers-draft/`.

## Hard rules

1. **Nothing from memory.** Every factual sentence must come from a page you fetched in this session. If you cannot fetch support for a claim, leave the claim out.
2. **Every sourced item carries at least one source with a verbatim `quote`** (20 to 300 characters) copied character for character from the fetched page, that supports the sentence. A script will re-fetch each page and look for the quote. Do not paraphrase inside `quote`; do not stitch passages together.
3. **Blocked pages: use the browser.** When a fetch fails (403, paywall or login wall, a JavaScript-only page that comes back empty or as a shell, an empty response), open the page in Chrome with the `mcp__claude-in-chrome__*` tools (load them with ToolSearch in one call: `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__tabs_close_mcp`). Create your own new tab with `tabs_create_mcp`, use only that tab id, and close it when you finish; other researchers share the browser. Mark any source read this way with `"via": "browser"`. Only if the browser also fails, drop the source and say so in `research_notes`. Never substitute a search snippet for a page.
4. **Neutral, but not mushy.** State plainly what a policy does and what the evidence shows, with numbers, even when the facts cut one way. Attribute anything contested ("The Legislative Council estimates…", "Supporters, including X, say…"). Give each side's strongest case. Never tell the reader how to vote, never use loaded words ("extreme", "radical", "common-sense", "job-killing", "MAGA", "woke"), never infer a position from a party.
5. **Source preference.** Official and nonpartisan first: the 2026 Blue Book and Legislative Council fiscal notes, state agencies (PUC, CDPHE, Colorado Energy Office, Department of Revenue, OSPB, Secretary of State), federal agencies (CBO, CRS, EIA, Census, BLS, CDC), university research centers, KFF, Pew. Then news: Colorado Sun, CPR News, Colorado Newsline, Denver Post, Axios Denver, Chalkbeat, KUNC, Colorado Politics. Think tanks are fine when labeled with their usual leaning in the text (for example "the Common Sense Institute, a free-market think tank" or "the Bell Policy Center, a progressive think tank"). Campaigns and advocacy groups only to report what each side says. Never cite a company's marketing page or a seller's explainer.
6. **Plain words.** Write for a busy voter: sentences under about 25 words, no jargon without a short definition, eighth-grade reading level.
7. Do not ask anyone anything and do not call AskUserQuestion. If blocked, write the blocker in `research_notes` and move on. Do not spawn subagents. Do not copy text from the sibling build in `~/Projects/colorado-ballot-guide-codex`.

## What you already have

- `src/data/statements.json`: each statement's `text`, `topic`, `coding_guide` (what agree and disagree mean) and the measures it is tied to.
- `src/data/measures/<id>.json`: Blue Book text for each measure, verbatim (summary, arguments for and against, fiscal impact, who is behind it), with `blue_book_pages`. Use these as a starting point and cite the Blue Book PDF, `https://content.leg.colorado.gov/sites/default/files/2026-blue-book-en-accessible.pdf`, quoting its words. The Blue Book is the floor, not the ceiling: the point of this work is the context it leaves out.

## Output: one JSON file per statement

Write `research/explainers-draft/<statement-id>.json`, UTF-8, valid JSON, exactly this shape:

```json
{
  "id": "natural-gas-right",
  "plain": "One or two sentences restating the question in everyday words.",
  "agree_means": "One or two sentences: what agreeing amounts to in practice.",
  "disagree_means": "One or two sentences: what disagreeing amounts to in practice.",
  "now": [
    { "text": "What is true today: current law, current numbers, who is affected.", "sources": [ { "url": "https://...", "title": "Page title (Publisher)", "date": "2026-09-10", "quote": "verbatim support" } ] }
  ],
  "stakes": [
    { "area": "Your money", "text": "A concrete effect, with a number if one exists.", "sources": [ ... ] }
  ],
  "case_for": [ { "text": "Supporters' strongest point, attributed.", "sources": [ ... ] } ],
  "case_against": [ { "text": "Opponents' strongest point, attributed.", "sources": [ ... ] } ],
  "unknowns": [ { "text": "What is genuinely uncertain or disputed, and why.", "sources": [ ... ] } ],
  "measure": "amendment-82",
  "research_notes": "What you could not find, what was blocked, which pages you read in the browser, anything a reviewer should double-check."
}
```

Field rules:

- `now`: 2 to 4 items. `stakes`: 3 to 6 items, the heart of the panel. `case_for` and `case_against`: 2 or 3 each. `unknowns`: 1 to 3 (sources optional only here).
- `area` is one of: `Your money`, `The economy`, `The environment`, `Public services`, `Health`, `Safety`, `Rights and freedoms`, `Elections`, `How government works`. Cover every area that genuinely applies; for an energy or land question that means both money and environment.
- `measure` is the tied measure id from `statements.json`, or `null`.
- `date` is the page's publication date (YYYY-MM-DD); if undated, the day you read it plus `"date_basis": "accessed"`.
- Prefer 2025 and 2026 sources. Colorado-specific numbers beat national ones.
- Target length: what a voter can read in two to three minutes, roughly 300 to 500 words of `text` across the file.

When done, reply with one line per statement: the file written, how many sourced items, which pages you read in the browser, and anything a reviewer should double-check.
