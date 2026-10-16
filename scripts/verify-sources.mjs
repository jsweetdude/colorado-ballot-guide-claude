// Re-fetches every position's source page and checks that its quote appears
// there. Writes the result into each candidate file's `verification` block and
// prints a summary. Pages that block automated requests are "unreachable",
// which is not the same as wrong.
//
//   node scripts/verify-sources.mjs [candidate-id ...]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { UA, normalize, pageText, quoteFound } from './lib/page-text.mjs';

export { normalize, quoteFound };

// House roll-call XML is cached here; page text is cached in the shared module.
const cache = new Map();

const only = process.argv.slice(2);
const dir = new URL('../src/data/candidates/', import.meta.url).pathname;
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
// House roll-call pages load member votes with JavaScript, so check the
// Clerk's official XML for the same roll call instead.
const VOTE_WORDS = { yea: 'yea', aye: 'yea', nay: 'nay', no: 'nay', present: 'present', 'not voting': 'not voting' };
async function houseVote(url, candidateName) {
  const m = /clerk\.house\.gov\/Votes\/(\d{4})(\d+)/i.exec(url);
  if (!m) return null;
  const key = `xml:${m[1]}:${m[2]}`;
  let xml = cache.get(key);
  if (xml === undefined) {
    try {
      const r = await fetch(`https://clerk.house.gov/evs/${m[1]}/roll${m[2].padStart(3, '0')}.xml`, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      xml = r.ok ? await r.text() : null;
    } catch {
      xml = null;
    }
    cache.set(key, xml);
  }
  if (!xml) return null;
  const last = candidateName.replace(/["“”].*?["“”]/g, '').trim().split(/\s+/).pop().toLowerCase();
  const re = /<recorded-vote>\s*<legislator[^>]*state="CO"[^>]*>([^<]+)<\/legislator>\s*<vote>([^<]+)<\/vote>/gi;
  for (const [, name, vote] of xml.matchAll(re)) if (name.toLowerCase().includes(last)) return VOTE_WORDS[vote.trim().toLowerCase()] ?? vote.trim().toLowerCase();
  return 'absent-from-roll';
}
function voteInQuote(quote) {
  const q = quote.toLowerCase();
  const hit = Object.keys(VOTE_WORDS).filter((w) => new RegExp(`\\b${w}\\b`).test(q));
  return hit.length ? VOTE_WORDS[hit[hit.length - 1]] : null;
}

const files = readdirSync(dir).filter((f) => f.endsWith('.json') && (!only.length || only.includes(f.replace(/\.json$/, ''))));
let found = 0, notFound = 0, unreachable = 0, kept = 0;
const misses = [];
for (const f of files) {
  const path = join(dir, f);
  const c = JSON.parse(readFileSync(path, 'utf8'));
  if (!c.positions.length) continue;
  const detail = {};
  // A quote confirmed on an earlier run stays confirmed when its page cannot be re-read today.
  const earlier = c.verification?.detail ?? {};
  const keepEarlier = (statement) => {
    if (earlier[statement] === 'found') {
      detail[statement] = 'found';
      kept++;
      return true;
    }
    return false;
  };
  for (const p of c.positions) {
    if (/clerk\.house\.gov\/Votes\//i.test(p.source_url)) {
      const actual = await houseVote(p.source_url, c.name);
      const claimed = voteInQuote(p.quote);
      if (actual == null) {
        if (!keepEarlier(p.statement)) {
          detail[p.statement] = 'unreachable';
          unreachable++;
        }
      } else if (claimed && actual === claimed) {
        detail[p.statement] = 'found';
        found++;
      } else {
        detail[p.statement] = 'not-found';
        notFound++;
        misses.push(`${c.id} / ${p.statement}: ${p.source_url} roll call says ${actual}, quote says ${claimed}`);
      }
      continue;
    }
    const page = await pageText(p.source_url);
    if (page == null) {
      if (!keepEarlier(p.statement)) {
        detail[p.statement] = 'unreachable';
        unreachable++;
      }
    } else if (quoteFound(p.quote, page)) {
      detail[p.statement] = 'found';
      found++;
    } else {
      detail[p.statement] = 'not-found';
      notFound++;
      misses.push(`${c.id} / ${p.statement}: ${p.source_url}\n    "${p.quote.slice(0, 160)}"`);
    }
  }
  const v = Object.values(detail);
  c.verification = {
    checked: TODAY,
    positions_verified: v.filter((x) => x === 'found').length,
    positions_unverifiable: v.filter((x) => x !== 'found').length,
    detail,
  };
  writeFileSync(path, `${JSON.stringify(c, null, 2)}\n`);
}
console.log(`Quotes found on source page: ${found}; not found: ${notFound}; source unreachable: ${unreachable}; confirmed on an earlier run and kept because the page could not be re-read today: ${kept}.`);
if (misses.length) console.log(`\nNot found:\n${misses.join('\n')}`);
