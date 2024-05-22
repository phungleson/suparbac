import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getSuparbacCreatePath } from '@/helpers/functions/paths';
import { CLIENT_INSERT, CLIENT_UPSERT, FORBIDDEN, SERVER_INSERT, SERVER_UPSERT } from '@/helpers/constant';

test.describe(`give ${getSuparbacCreatePath()}`, () => {
  for (const action of [CLIENT_INSERT, SERVER_INSERT, CLIENT_UPSERT, SERVER_UPSERT]) {
    test.describe(`when I click '${action}' without permission`, () => {
      test(`then it should render ${FORBIDDEN}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getSuparbacCreatePath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(FORBIDDEN)).toBeVisible();
      });
    });
  }
});
