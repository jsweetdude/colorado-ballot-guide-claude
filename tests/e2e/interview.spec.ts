import { expect, test } from '@playwright/test';
import statements from '../../src/data/statements.json' with { type: 'json' };

test('a visitor finds their districts, completes the interview and sees results', async ({ page }) => {
  // The address lookup runs on Vercel; in this static preview, answer it with a recorded Census result.
  await page.route('**/api/districts', (route) =>
    route.fulfill({
      json: { found: true, matchedAddress: '200 E COLFAX AVE, DENVER, CO, 80203', districts: { cd: 1, sd: 31, hd: 6, county: 'Denver' } },
    }),
  );

  await page.goto('/');
  await page.getByRole('link', { name: 'Start', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Find your ballot' })).toBeVisible();
  await page.getByLabel('Street address, city and ZIP code').fill('200 E Colfax Ave, Denver, CO 80203');
  await page.getByRole('button', { name: 'Look up my districts' }).click();
  await expect(page.getByRole('status')).toContainText('congressional district 1');
  await expect(page.getByLabel('Congressional district')).toHaveValue('1');
  await expect(page.getByLabel('State House district')).toHaveValue('6');
  await page.getByRole('button', { name: 'Use these districts and continue' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'The interview' })).toBeVisible();
  const total = statements.length;
  for (let i = 0; i < total; i++) {
    const card = page.locator(`.iv-card[data-index="${i}"]`);
    await expect(card).toBeVisible();
    // Focus moves to each new statement; on first load the page does not steal focus.
    if (i > 0) await expect(card.getByRole('heading')).toBeFocused();
    if (i === 3) {
      await page.getByRole('button', { name: 'Skip this statement' }).click();
      continue;
    }
    const choices = ['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree'];
    await card.getByLabel(choices[i % 5], { exact: true }).check();
    if (i === 0) await card.getByLabel('High', { exact: true }).check();
    if (i === 1) {
      // Back works and keeps the earlier answer.
      await page.getByRole('button', { name: 'Back' }).click();
      await expect(page.locator('.iv-card[data-index="0"]').getByLabel('Strongly disagree', { exact: true })).toBeChecked();
      await page.getByRole('button', { name: 'Next' }).click();
    }
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(page.getByRole('heading', { name: 'Review your answers' })).toBeVisible();
  await expect(page.locator('#review-list li')).toHaveCount(total);
  await expect(page.locator('#review-list li').nth(3)).toContainText('Skipped');
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(total));

  await page.getByRole('link', { name: 'See my results' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Your results' })).toBeVisible();
  await expect(page.locator('#summary-body')).toContainText(`You answered ${total - 1} of ${total}`);
  await expect(page.locator('#summary-body')).toContainText('congressional district 1');
  for (const id of ['us-senate', 'governor', 'attorney-general', 'secretary-of-state', 'treasurer', 'us-house-1']) {
    await expect(page.locator(`#race-${id}`)).toBeVisible();
  }
  await expect(page.locator('#race-us-house-2')).toHaveCount(0);
  // Every measure has a lean badge with text.
  const badges = page.locator('[data-lean-for]');
  expect(await badges.count()).toBeGreaterThanOrEqual(14);
  for (const text of await badges.allTextContents()) expect(text).toMatch(/lean yes|lean no|unclear/i);
  // Denver is in the passenger rail district, so Ballot Issue 7A shows.
  await expect(page.locator('[data-local-measure="issue-7a"]')).toBeVisible();

  // Share link reproduces the same answers in a fresh browser context.
  await page.getByRole('button', { name: 'Share these answers' }).click();
  const url = await page.locator('#share-url').inputValue();
  expect(url).toContain('/results/#v=1&a=');
  const fresh = await page.context().browser()!.newContext();
  const other = await fresh.newPage();
  await other.goto(url);
  await expect(other.locator('#summary-body')).toContainText('shared link');
  await expect(other.locator('#summary-body')).toContainText(`You answered ${total - 1} of ${total}`);
  await fresh.close();
});

test('skipping the ballot step shows statewide races only', async ({ page }) => {
  await page.goto('/ballot/');
  await page.getByRole('button', { name: 'Skip: statewide races only' }).click();
  await expect(page).toHaveURL(/\/interview\/$/);
  await page.goto('/results/');
  await expect(page.locator('#race-us-senate')).toBeVisible();
  await expect(page.locator('[id^="race-us-house"]')).toHaveCount(0);
  await expect(page.getByText('Your U.S. House race is not shown.')).toBeVisible();
});
