import test, { expect } from '@playwright/test';
import { CLIENT_DELETE, SERVER_DELETE, UNAUTHORIZED } from '@/helpers/constant';
import { getSuparbacDeletePath } from '@/helpers/functions/paths';

test.describe(`give ${getSuparbacDeletePath()}`, () => {
  for (const action of [CLIENT_DELETE, SERVER_DELETE]) {
    test.describe(`when I click '${action}'`, () => {
      test(`then it should render ${UNAUTHORIZED}`, async ({ page }) => {
        await page.goto(getSuparbacDeletePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(UNAUTHORIZED)).toBeVisible();
      });
    });
  }
});
