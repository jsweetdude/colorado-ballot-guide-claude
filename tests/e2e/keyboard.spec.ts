import { expect, test } from '@playwright/test';

test('the interview can be completed with the keyboard alone', async ({ page }) => {
  await page.goto('/interview/');
  // The skip link is the first stop and moves focus to the main content.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();

  const firstRadio = page.locator('input[name="a-graduated-income-tax"]').first();
  for (let i = 0; i < 40 && !(await firstRadio.evaluate((el) => el === document.activeElement)); i++) await page.keyboard.press('Tab');
  await expect(firstRadio).toBeFocused();
  // Arrow keys move through the five answers and select as they go.
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('input[name="a-graduated-income-tax"][value="3"]')).toBeChecked();
  // Tab reaches the importance choices; arrows pick High.
  await page.keyboard.press('Tab');
  await expect(page.locator('input[name="w-graduated-income-tax"][value="normal"]')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('input[name="w-graduated-income-tax"][value="high"]')).toBeChecked();
  // Enter submits the form, which advances and moves focus to the next statement.
  await page.keyboard.press('Enter');
  await expect(page.locator('.iv-card[data-index="1"] .iv-statement')).toBeFocused();

  // Second statement: answer with the keyboard, then go Back with the keyboard.
  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');
  await expect(page.locator('.iv-card[data-index="2"] .iv-statement')).toBeFocused();
  const back = page.getByRole('button', { name: 'Back' });
  await back.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.iv-card[data-index="1"] .iv-statement')).toBeFocused();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('cbg.answers.v1') ?? '{}'));
  expect(saved['graduated-income-tax']).toEqual({ value: 3, importance: 'high' });
});

test('focus is visible on interactive controls', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const shadow = await page.evaluate(() => getComputedStyle(document.activeElement as Element).boxShadow);
  expect(shadow).not.toBe('none');
});
