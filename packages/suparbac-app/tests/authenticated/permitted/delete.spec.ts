import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getApiDeletePath, getSuparbacDeletePath } from '@/helpers/functions/paths';
import { CLIENT_DELETE, SERVER_DELETE, SUCCESS } from '@/helpers/constant';

test.describe(`given ${getSuparbacDeletePath()}`, () => {
  for (const action of [CLIENT_DELETE, SERVER_DELETE]) {
    test.describe(`when I click '${action}' with permission`, () => {
      test(`then it should render ${SUCCESS}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getApiDeletePath());
        await page.goto(getSuparbacDeletePath());

        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(SUCCESS)).toBeVisible();
      });
    });
  }
});
