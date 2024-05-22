import { expect, test } from '@playwright/test';
import { PASSWORD } from './helpers/constant';
import { genTestEmail } from './helpers/genTestEmail';
import { signUp } from './helpers/signUp';
import { getAccountSignInPath, getRootPath } from '@/helpers/functions/paths';
import { SIGN_IN_ERROR } from '@/helpers/account/constant';

test.describe('give /account/sign-in', () => {
  test.describe('when I enter correct credentials', () => {
    test('then it should redirect to root path', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await signUp(page, email);

      await expect(page).toHaveURL(getRootPath());
    });
  });

  test.describe('when I signed in', () => {
    test('then it should redirect to root path', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await signUp(page, email);
      await page.context().clearCookies();

      await page.goto(getAccountSignInPath());
      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password').fill(PASSWORD);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page).toHaveURL(getRootPath());
    });
  });

  test.describe('when I enter incorrect credentials', () => {
    test('then it should render error', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await signUp(page, email);
      await page.context().clearCookies();

      await page.goto(getAccountSignInPath());

      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password').fill(`${PASSWORD}wrong`);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page.getByText(SIGN_IN_ERROR)).toBeVisible();
    });
  });
});
