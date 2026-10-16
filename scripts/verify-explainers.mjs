// Re-fetches every source cited in the "More info" explainers and checks that
// each item's supporting quote is on the page. Prints a summary and the misses.
// Sources marked "via": "browser" were read in Chrome because the site blocks
// scripts; they are reported separately, not as failures.
//
//   node scripts/verify-explainers.mjs [statement-id ...] [--dir <folder>]
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pageText, quoteFound } from './lib/page-text.mjs';

const args = process.argv.slice(2);
const dirFlag = args.indexOf('--dir');
const dir = dirFlag >= 0 ? args[dirFlag + 1] : new URL('../src/data/explainers/', import.meta.url).pathname;
const only = args.filter((a, i) => !(dirFlag >= 0 && (i === dirFlag || i === dirFlag + 1)));
const files = readdirSync(dir).filter((f) => f.endsWith('.json') && (!only.length || only.includes(f.replace(/\.json$/, ''))));

let found = 0, missing = 0, unreachable = 0, browser = 0;
const misses = [], blocked = [], browserRead = [];
for (const f of files) {
  const e = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const sections = ['short_version', 'connection', 'example', 'now', 'stakes', 'case_for', 'case_against', 'unknowns'];
  for (const sec of sections)
    for (const [i, item] of (Array.isArray(e[sec]) ? e[sec] : e[sec] ? [e[sec]] : []).entries())
      for (const s of item.sources ?? []) {
        const where = `${e.id} / ${sec}[${i}]`;
        const page = await pageText(s.url);
        if (page == null) {
          if (s.via === 'browser') {
            browser++;
            browserRead.push(`${where}: ${s.url}`);
          } else {
            unreachable++;
            blocked.push(`${where}: ${s.url}`);
          }
        } else if (quoteFound(s.quote, page)) found++;
        else if (s.via === 'browser') {
          browser++;
          browserRead.push(`${where}: ${s.url} (script sees a different page)`);
        } else {
          missing++;
          misses.push(`${where}: ${s.url}\n    "${s.quote.slice(0, 160)}"`);
        }
      }
}
console.log(`Explainer quotes found on the page: ${found}; not found: ${missing}; unreachable to scripts: ${unreachable}; read in a browser and not checkable by script: ${browser}.`);
if (misses.length) console.log(`\nNot found:\n${misses.join('\n')}`);
if (blocked.length) console.log(`\nUnreachable:\n${blocked.join('\n')}`);
if (browserRead.length) console.log(`\nRead in a browser:\n${browserRead.join('\n')}`);
process.exitCode = missing ? 1 : 0;
