import { expect, test } from '@playwright/test';

// The local server sends production's security headers (vercel.json). Every page
// type must load with no Content Security Policy violations and no page errors,
// including the interview with a More info dialog open and the results page.
const pages = ['/', '/ballot/', '/interview/#q5', '/results/', '/races/us-house-3/', '/candidates/jeff-hurd/', '/measures/amendment-82/', '/about/'];

for (const path of pages) {
  test(`no CSP violations: ${path}`, async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (m) => /Content Security Policy|Refused to/i.test(m.text()) && problems.push(m.text()));
    page.on('pageerror', (e) => problems.push(e.message));
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) => console.error(`Refused to load: CSP ${e.violatedDirective} ${e.blockedURI}`));
      const ans: Record<string, unknown> = {};
      for (const id of ['graduated-income-tax', 'abortion-legal', 'stricter-gun-laws', 'keep-tariffs', 'natural-gas-right']) ans[id] = { value: 4, importance: 'normal' };
      localStorage.setItem('cbg.answers.v1', JSON.stringify(ans));
      localStorage.setItem('cbg.ballot.v1', JSON.stringify({ cd: 3, sd: 7, hd: 55, county: 'Mesa', source: 'manual' }));
    });
    const res = await page.goto(path);
    expect(res?.headers()['content-security-policy']).toContain("default-src 'self'");
    if (path.startsWith('/interview')) {
      await page.locator('[data-explainer="natural-gas-right"]').click();
      await expect(page.locator('#ex-natural-gas-right')).toHaveAttribute('open', '');
    }
    await page.waitForTimeout(400);
    expect(problems, problems.join('\n')).toEqual([]);
  });
}
