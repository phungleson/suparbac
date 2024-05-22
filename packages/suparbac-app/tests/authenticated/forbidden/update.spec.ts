import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getSuparbacUpdatePath } from '@/helpers/functions/paths';
import { CLIENT_UPDATE, FORBIDDEN, SERVER_UPDATE } from '@/helpers/constant';

test.describe(`give ${getSuparbacUpdatePath()}`, () => {
  for (const action of [CLIENT_UPDATE, SERVER_UPDATE]) {
    test.describe(`when I click '${action}' without permission`, () => {
      test(`then it should render ${FORBIDDEN}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getSuparbacUpdatePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(FORBIDDEN)).toBeVisible();
      });
    });
  }
});
