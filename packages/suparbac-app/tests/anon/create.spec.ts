import test, { expect } from '@playwright/test';
import { CLIENT_INSERT, CLIENT_UPSERT, SERVER_INSERT, SERVER_UPSERT, UNAUTHORIZED } from '@/helpers/constant';
import { getSuparbacCreatePath } from '@/helpers/functions/paths';

test.describe(`give ${getSuparbacCreatePath()}`, () => {
  for (const action of [CLIENT_INSERT, SERVER_INSERT, CLIENT_UPSERT, SERVER_UPSERT]) {
    test.describe(`when I click '${action}'`, () => {
      test(`then it should render ${UNAUTHORIZED}`, async ({ page }) => {
        await page.goto(getSuparbacCreatePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(UNAUTHORIZED)).toBeVisible();
      });
    });
  }
});
