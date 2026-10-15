// Screenshot a page with sample answers loaded, for design review.
import { chromium } from '@playwright/test';
const [, , path, name, width = '1280', scheme = 'light'] = process.argv;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: Number(width), height: 900 }, colorScheme: scheme });
await ctx.addInitScript(() => {
  localStorage.setItem('cbg.ballot.v1', JSON.stringify({ cd: 8, sd: 25, hd: 31, county: 'Adams', source: 'manual' }));
  const vals = [4, 2, 4, 4, 2, 4, 3, 5, 2, 1, 5, 5, 4, 2, 2, 2, 2, 3, 5, 3, 2, 4, 4, 5, 4];
  const ids = ['graduated-income-tax','income-tax-cap','keep-tabor-surplus','conservation-sales-tax','natural-gas-right','clean-energy-shift','housing-state-zoning','health-coverage','keep-tariffs','federal-budget-law','public-lands','abortion-legal','stricter-gun-laws','sports-biological-sex','minor-gender-surgery-ban','immigration-notify-ice','deportation-priority','fentanyl-penalties','child-trafficking-life','hunting-right','mail-ballot-id','plain-language-ballots','redistricting-commission','keep-mail-voting','challenge-federal-policies'];
  const a = {};
  ids.forEach((id, i) => (a[id] = { value: vals[i], importance: i % 7 === 0 ? 'high' : 'normal' }));
  localStorage.setItem('cbg.answers.v1', JSON.stringify(a));
});
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('http://127.0.0.1:47613' + path, { waitUntil: 'networkidle' });
await p.screenshot({ path: `${process.env.SHOT_DIR}/${name}.png`, fullPage: true });
console.log(name, errs.length ? errs : 'no errors');
await b.close();
