import type { Page } from '@playwright/test';
import { PASSWORD } from './constant';
import { getAccountSignInPath } from '@/helpers/functions/paths';

export const signIn = async (page: Page, email: string): Promise<void> => {
  await page.goto(getAccountSignInPath());
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
};
