// Re-fetches every position's source page and checks that its quote appears
// there. Writes the result into each candidate file's `verification` block and
// prints a summary. Pages that block automated requests are "unreachable",
// which is not the same as wrong.
//
//   node scripts/verify-sources.mjs [candidate-id ...]
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const only = process.argv.slice(2);
const dir = new URL('../src/data/candidates/', import.meta.url).pathname;
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' });
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const tmp = mkdtempSync(join(tmpdir(), 'cbg-verify-'));
const cache = new Map();

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', mdash: '-', ndash: '-', hellip: '...' };
function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
export function normalize(s) {
  return decode(s)
    .normalize('NFKC')
    .replace(/[‘’‚′`´]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/…/g, '...')
    .replace(/[    ]/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9$%'".,;:!?()\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function pageText(url) {
  if (cache.has(url)) return cache.get(url);
  let text = null;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    if (r.ok) {
      const type = r.headers.get('content-type') ?? '';
      if (type.includes('pdf') || /\.pdf($|\?)/i.test(url)) {
        const f = join(tmp, `${cache.size}.pdf`);
        writeFileSync(f, Buffer.from(await r.arrayBuffer()));
        text = execFileSync('pdftotext', ['-layout', f, '-'], { maxBuffer: 64 * 1024 * 1024 }).toString();
      } else {
        // Keep script text: some guides ship their Q&A as a JSON blob the page renders.
        const html = (await r.text())
          .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
          .replace(/\\[nrt]/g, ' ')
          .replace(/\\(["'\/])/g, '$1');
        text = html.replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
        // Embedded graphics (iframes) are part of what a reader sees on the page.
        const frames = [...html.matchAll(/<(?:iframe|side-chain)[^>]+src="(https?:[^"]+)"/gi)].map((m) => m[1]).filter((u) => !/googletagmanager|youtube|doubleclick|facebook/i.test(u)).slice(0, 6);
        for (const f of frames) {
          try {
            const fr = await fetch(f, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
            if (fr.ok) text += ' ' + (await fr.text()).replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\(["'\/])/g, '$1').replace(/<[^>]+>/g, ' ');
          } catch {
            /* frame unavailable */
          }
        }
      }
      text = normalize(text);
    }
  } catch {
    text = null;
  }
  cache.set(url, text);
  return text;
}

/** found if the quote, or every piece of it between ellipses, appears in order-insensitive form. */
export function quoteFound(quote, page) {
  const q = normalize(quote).replace(/^["']|["']$/g, '');
  if (page.includes(q)) return true;
  const pieces = q.split(/\.\.\.|\[[^\]]*\]/).map((p) => p.trim().replace(/^["',.;: ]+|["',.;: ]+$/g, '')).filter((p) => p.length >= 12);
  if (pieces.length && pieces.every((p) => page.includes(p))) return true;
  // Tolerate punctuation differences: compare letters and digits only.
  const strip = (s) => s.replace(/[^a-z0-9]+/g, '');
  const sq = strip(q);
  return sq.length >= 20 && strip(page).includes(sq);
}

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
let found = 0, notFound = 0, unreachable = 0;
const misses = [];
for (const f of files) {
  const path = join(dir, f);
  const c = JSON.parse(readFileSync(path, 'utf8'));
  if (!c.positions.length) continue;
  const detail = {};
  for (const p of c.positions) {
    if (/clerk\.house\.gov\/Votes\//i.test(p.source_url)) {
      const actual = await houseVote(p.source_url, c.name);
      const claimed = voteInQuote(p.quote);
      if (actual == null) {
        detail[p.statement] = 'unreachable';
        unreachable++;
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
      detail[p.statement] = 'unreachable';
      unreachable++;
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
console.log(`Quotes found on source page: ${found}; not found: ${notFound}; source unreachable: ${unreachable}.`);
if (misses.length) console.log(`\nNot found:\n${misses.join('\n')}`);
