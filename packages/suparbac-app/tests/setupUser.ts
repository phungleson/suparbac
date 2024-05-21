import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const PASSWORD = '123456';

export const setupUser = async (page: Page, email: string): Promise<void> => {
  await page.goto('/');

  await page.getByText('Sign up').click();
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign up' }).click();

  await expect(page.getByText('Home')).toBeVisible();

  await page.context().clearCookies();
};
