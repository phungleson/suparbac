import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getApiUpdatePath, getSuparbacUpdatePath } from '@/helpers/functions/paths';
import { CLIENT_UPDATE, SERVER_UPDATE, SUCCESS } from '@/helpers/constant';

test.describe(`given ${getSuparbacUpdatePath()}`, () => {
  for (const action of [CLIENT_UPDATE, SERVER_UPDATE]) {
    test.describe(`when I click '${action}' with permission`, () => {
      test(`then it should render ${SUCCESS}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getApiUpdatePath());
        await page.goto(getSuparbacUpdatePath());

        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(SUCCESS)).toBeVisible();
      });
    });
  }
});
