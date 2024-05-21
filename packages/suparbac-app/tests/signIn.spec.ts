import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { genTestEmail } from './genTestEmail';
import { PASSWORD, setupUser } from './setupUser';
import { getAccountSignInPath, getRootPath } from '@/helpers/functions/paths';
import { SIGN_IN_ERROR } from '@/helpers/account/constant';

test.describe('give /account/sign-up', () => {
  const signIn = async (page: Page, email: string): Promise<void> => {
    await page.goto(getAccountSignInPath());
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
  };

  test.describe('when I enter correct credentials', () => {
    test('then it should redirect to root path', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await setupUser(page, genTestEmail(testInfo));
      await signIn(page, email);

      await expect(page).toHaveURL(getRootPath());
    });
  });

  test.describe('when I signed in', () => {
    test('then it should redirect to root path', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await setupUser(page, genTestEmail(testInfo));
      await signIn(page, email);

      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password').fill(PASSWORD);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page).toHaveURL(getRootPath());
    });
  });

  test.describe('when I enter incorrect credentials', () => {
    test('then it should render error', async ({ page }, testInfo) => {
      const email = genTestEmail(testInfo);

      await setupUser(page, genTestEmail(testInfo));
      await page.goto(getAccountSignInPath());

      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password').fill(`${PASSWORD}wrong`);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page.getByText(SIGN_IN_ERROR)).toBeVisible();
    });
  });
});
