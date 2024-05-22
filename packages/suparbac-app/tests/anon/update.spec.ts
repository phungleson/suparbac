import test, { expect } from '@playwright/test';
import { CLIENT_UPDATE, SERVER_UPDATE, UNAUTHORIZED } from '@/helpers/constant';
import { getSuparbacUpdatePath } from '@/helpers/functions/paths';

test.describe(`give ${getSuparbacUpdatePath()}`, () => {
  for (const action of [CLIENT_UPDATE, SERVER_UPDATE]) {
    test.describe(`when I click '${action}'`, () => {
      test(`then it should render ${UNAUTHORIZED}`, async ({ page }) => {
        await page.goto(getSuparbacUpdatePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(UNAUTHORIZED)).toBeVisible();
      });
    });
  }
});
