import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { PASSWORD } from './constant';

export const signUp = async (page: Page, email: string): Promise<void> => {
  await page.goto('/');

  await page.getByText('Sign up').click();
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign up' }).click();

  await expect(page.getByText('Home')).toBeVisible();
};
