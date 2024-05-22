import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getApiCreatePath, getSuparbacCreatePath } from '@/helpers/functions/paths';
import { CLIENT_INSERT, CLIENT_UPSERT, SERVER_INSERT, SERVER_UPSERT, SUCCESS } from '@/helpers/constant';

test.describe(`given ${getSuparbacCreatePath()}`, () => {
  for (const action of [CLIENT_INSERT, SERVER_INSERT, CLIENT_UPSERT, SERVER_UPSERT]) {
    test.describe(`when I click '${action}' with permission`, () => {
      test(`then it should render ${SUCCESS}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getApiCreatePath());
        await page.goto(getSuparbacCreatePath());

        await page.pause();

        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(SUCCESS)).toBeVisible();
      });
    });
  }
});
