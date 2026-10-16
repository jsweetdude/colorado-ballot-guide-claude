import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import statements from '../../src/data/statements.json' with { type: 'json' };

// Statements that have a "More info" explainer, in interview order.
const written = new Set(readdirSync(new URL('../../src/data/explainers/', import.meta.url)).map((f) => f.replace(/\.json$/, '')));
const withExplainer = statements.map((s, i) => ({ id: s.id, step: i + 1 })).filter((s) => written.has(s.id));

test.describe('More info explainers', () => {
  test('every statement has an explainer', () => {
    expect(withExplainer.map((s) => s.id)).toEqual(statements.map((s) => s.id));
  });

  for (const width of [1280, 360]) {
    test(`opens, passes axe, closes and returns focus at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      const { id, step } = withExplainer.find((s) => s.id === 'natural-gas-right') ?? withExplainer[0];
      await page.goto(`/interview/#q${step}`);
      const button = page.locator(`[data-explainer="${id}"]`);
      await expect(button).toBeVisible();
      await button.click();
      const dialog = page.locator(`#ex-${id}`);
      await expect(dialog).toHaveAttribute('open', '');
      await expect(dialog.getByRole('heading', { name: "What's at stake" })).toBeVisible();
      // Every line outside "Still uncertain" carries at least one numbered source link.
      const items = dialog.locator('.explainer-list:not(.explainer-list--unknowns) > li');
      const n = await items.count();
      expect(n).toBeGreaterThan(5);
      for (let i = 0; i < n; i++) expect(await items.nth(i).locator('a.ref').count(), await items.nth(i).innerText()).toBeGreaterThan(0);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(' ')}`);
      expect(summary, summary.join('\n')).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toHaveAttribute('open', '');
      await expect(button).toBeFocused();
      await expect(page).toHaveURL(new RegExp(`#q${step}$`));
    });
  }

  test('no horizontal scroll inside the dialog at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 760 });
    const { id, step } = withExplainer[0];
    await page.goto(`/interview/#q${step}`);
    await page.locator(`[data-explainer="${id}"]`).click();
    const overflow = await page.locator(`#ex-${id}`).evaluate((d) => {
      const body = d.shadowRoot!.querySelector('[part="body"]') as HTMLElement;
      return body.scrollWidth - body.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
