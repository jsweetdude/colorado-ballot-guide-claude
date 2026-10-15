// Checks that every Blue Book field in src/data/measures/ appears word for word
// in the Blue Book's own text (pdftotext of the official PDF).
//   node scripts/verify-measures.mjs [path-to-bluebook.pdf]
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_PDF = 'https://content.leg.colorado.gov/sites/default/files/2026-blue-book-en-accessible.pdf';
let pdf = process.argv[2];
if (!pdf || !existsSync(pdf)) {
  pdf = join(mkdtempSync(join(tmpdir(), 'bb-')), 'bluebook.pdf');
  const r = await fetch(URL_PDF);
  writeFileSync(pdf, Buffer.from(await r.arrayBuffer()));
}
// Letters and digits only, so line breaks, hyphenation at line ends and quote styles do not matter.
const squash = (s) => s.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, '');
const book = squash(execFileSync('pdftotext', [pdf, '-'], { maxBuffer: 64 * 1024 * 1024 }).toString());
const dir = new URL('../src/data/measures/', import.meta.url).pathname;
// A paragraph can be split by a page header or footer in the PDF text, so allow
// up to three skips of at most 160 characters between matching runs.
function foundAcrossPageBreaks(needle) {
  if (book.includes(needle)) return true;
  let start = 0;
  outer: for (let tries = 0; tries < 50; tries++) {
    let at = book.indexOf(needle.slice(0, 40), start);
    if (at < 0) return false;
    start = at + 1;
    let i = 0, pos = at, skips = 0;
    while (i < needle.length) {
      if (book[pos] === needle[i]) { i++; pos++; continue; }
      if (++skips > 3) continue outer;
      const next = book.slice(pos, pos + 160 + 30).indexOf(needle.slice(i, i + 30));
      if (next < 0) continue outer;
      pos += next;
    }
    return true;
  }
  return false;
}
let ok = 0, bad = 0;
for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const m = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const fields = { ballot_title: [m.ballot_title], yes_means: [m.yes_means], no_means: [m.no_means], summary: m.summary, arguments_for: m.arguments_for, arguments_against: m.arguments_against, fiscal_impact: m.fiscal_impact };
  for (const [k, list] of Object.entries(fields))
    for (const [i, text] of list.entries()) {
      if (!text) continue;
      if (foundAcrossPageBreaks(squash(text))) ok++;
      else {
        bad++;
        console.log(`NOT FOUND ${m.id} ${k}[${i}]: ${text.slice(0, 120)}`);
      }
    }
}
console.log(`Blue Book passages found verbatim: ${ok}; not found: ${bad}.`);
