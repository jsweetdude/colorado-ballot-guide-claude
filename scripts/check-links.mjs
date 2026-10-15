// Fetches every URL cited in the data and reports the ones that fail.
// Sites that block automated requests (403, 429) are reported separately; they
// usually work in a browser.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const data = new URL('../src/data/', import.meta.url).pathname;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const urls = new Map();
const add = (u, where) => {
  if (typeof u === 'string' && /^https?:\/\//.test(u)) urls.set(u, [...(urls.get(u) ?? []), where]);
};
for (const dir of ['candidates', 'measures'])
  for (const f of readdirSync(join(data, dir)).filter((x) => x.endsWith('.json'))) {
    const walk = (v) => {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => (/url|website/.test(k) ? add(x, `${dir}/${f}`) : walk(x)));
    };
    walk(JSON.parse(readFileSync(join(data, dir, f), 'utf8')));
  }
const list = [...urls.keys()];
const results = [];
let next = 0;
async function worker() {
  while (next < list.length) {
    const u = list[next++];
    let status = 0;
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'text/html,application/pdf,*/*' }, redirect: 'follow', signal: AbortSignal.timeout(25000) });
      status = r.status;
      await r.body?.cancel();
    } catch {
      status = 0;
    }
    results.push({ u, status });
  }
}
await Promise.all(Array.from({ length: 12 }, worker));
const ok = results.filter((r) => r.status >= 200 && r.status < 400);
const blocked = results.filter((r) => [401, 403, 406, 429].includes(r.status));
const broken = results.filter((r) => !ok.includes(r) && !blocked.includes(r));
console.log(`URLs: ${results.length}; OK: ${ok.length}; blocked to scripts: ${blocked.length}; broken or unreachable: ${broken.length}`);
for (const r of broken) console.log(`  ${r.status || 'ERR'} ${r.u}  (${[...new Set(urls.get(r.u))].join(', ')})`);
if (process.argv.includes('--blocked')) for (const r of blocked) console.log(`  blocked ${r.status} ${r.u}`);
