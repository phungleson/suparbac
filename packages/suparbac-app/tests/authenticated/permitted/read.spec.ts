import test, { expect } from '@playwright/test';
import { genTestEmail } from '../../account/helpers/genTestEmail';
import { signUp } from '../../account/helpers/signUp';
import { getApiReadPath, getSuparbacReadPath } from '@/helpers/functions/paths';
import {
  CLIENT_COUNT,
  CLIENT_SELECT,
  CLIENT_SELECT_SINGLE,
  SERVER_COUNT,
  SERVER_SELECT,
  SERVER_SELECT_SINGLE,
  SUCCESS,
} from '@/helpers/constant';

test.describe(`given ${getSuparbacReadPath()}`, () => {
  for (const action of [
    CLIENT_SELECT,
    CLIENT_SELECT_SINGLE,
    CLIENT_COUNT,
    SERVER_SELECT,
    SERVER_SELECT_SINGLE,
    SERVER_COUNT,
  ]) {
    test.describe(`when I click '${action}' with permission`, () => {
      test(`then it should render ${SUCCESS}`, async ({ page }, testInfo) => {
        const email = genTestEmail(testInfo);
        await signUp(page, email);

        await page.goto(getApiReadPath());
        await page.goto(getSuparbacReadPath());

        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(SUCCESS)).toBeVisible();
      });
    });
  }
});
