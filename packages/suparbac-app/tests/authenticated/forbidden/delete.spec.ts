import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getSuparbacDeletePath } from '@/helpers/functions/paths';
import { CLIENT_DELETE, FORBIDDEN, SERVER_DELETE } from '@/helpers/constant';

test.describe(`give ${getSuparbacDeletePath()}`, () => {
  for (const action of [CLIENT_DELETE, SERVER_DELETE]) {
    test.describe(`when I click '${action}' without permission`, () => {
      test(`then it should render ${FORBIDDEN}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getSuparbacDeletePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(FORBIDDEN)).toBeVisible();
      });
    });
  }
});
