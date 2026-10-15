import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/ballot/',
  '/interview/',
  '/interview/#review',
  '/results/',
  '/races/',
  '/races/us-house-8/',
  '/candidates/john-hickenlooper/',
  '/candidates/lauren-boebert/',
  '/candidates/greg-lopez/',
  '/measures/',
  '/measures/amendment-87/',
  '/measures/issue-7a/',
  '/about/',
];

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} mode`, () => {
    test.use({ colorScheme: scheme });
    for (const path of pages) {
      test(`axe: ${path}`, async ({ page }) => {
        await page.addInitScript(() => {
          localStorage.setItem('cbg.ballot.v1', JSON.stringify({ cd: 8, sd: 25, hd: 31, county: 'Adams', source: 'manual' }));
          const ans: Record<string, unknown> = {};
          for (const id of ['graduated-income-tax', 'abortion-legal', 'stricter-gun-laws', 'keep-tariffs', 'federal-budget-law', 'health-coverage', 'deportation-priority', 'clean-energy-shift'])
            ans[id] = { value: 4, importance: 'normal' };
          localStorage.setItem('cbg.answers.v1', JSON.stringify(ans));
        });
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        // Open every disclosure so hidden content is checked too.
        await page.evaluate(() => document.querySelectorAll('wa-details').forEach((d) => d.setAttribute('open', '')));
        await page.waitForTimeout(300);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(' ')}`);
        expect(summary, summary.join('\n')).toEqual([]);
      });
    }
  });
}

test('works at 360px wide with no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  for (const path of ['/', '/interview/', '/results/', '/candidates/john-hickenlooper/', '/measures/amendment-87/', '/about/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
  }
});
