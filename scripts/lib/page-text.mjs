// Fetches a page as normalized text (HTML, embedded graphics, PDFs) and checks
// whether a quote appears on it. Shared by verify-sources.mjs and
// verify-explainers.mjs so both apply the same rules.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const tmp = mkdtempSync(join(tmpdir(), 'cbg-verify-'));
const cache = new Map();

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', sbquo: "'", bdquo: '"',
  mdash: '-', ndash: '-', minus: '-', hellip: '...', sect: '§', para: '¶', copy: '©', reg: '®', trade: '™', deg: '°', middot: '·', bull: '•',
  laquo: '«', raquo: '»', thinsp: ' ', ensp: ' ', emsp: ' ', zwj: '', zwnj: '', shy: '', eacute: 'é', egrave: 'è', aacute: 'á', iacute: 'í',
  oacute: 'ó', uacute: 'ú', ntilde: 'ñ', uuml: 'ü', ouml: 'ö', auml: 'ä', ccedil: 'ç', frac12: '½', times: '×', dollar: '$', percnt: '%',
};
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

export async function pageText(url) {
  if (cache.has(url)) return cache.get(url);
  let text = null;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    // Some sites answer scripts with an empty 202 or a bot-check page; that is unreachable, not a missing quote.
    if (r.ok && r.status !== 202) {
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
      if (text.trim().length < 200) text = null;
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
  // Split on ellipses and [editorial inserts] before normalizing, which strips brackets.
  const pieces = String(quote)
    .split(/\.\.\.|\u2026|\[[^\]]*\]/)
    .map((p) => normalize(p).replace(/^["',.;: ]+|["',.;: ]+$/g, ''))
    .filter((p) => p.length >= 12);
  if (pieces.length && pieces.every((p) => page.includes(p))) return true;
  // Tolerate punctuation differences: compare letters and digits only.
  const strip = (s) => s.replace(/[^a-z0-9]+/g, '');
  const sq = strip(q);
  return sq.length >= 20 && strip(page).includes(sq);
}

