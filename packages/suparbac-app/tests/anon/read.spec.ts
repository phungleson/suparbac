import test, { expect } from '@playwright/test';
import {
  CLIENT_COUNT,
  CLIENT_SELECT,
  CLIENT_SELECT_SINGLE,
  SERVER_COUNT,
  SERVER_SELECT,
  SERVER_SELECT_SINGLE,
  UNAUTHORIZED,
} from '@/helpers/constant';
import { getSuparbacReadPath } from '@/helpers/functions/paths';

test.describe(`given ${getSuparbacReadPath()}`, () => {
  for (const action of [
    CLIENT_SELECT,
    CLIENT_SELECT_SINGLE,
    CLIENT_COUNT,
    SERVER_SELECT,
    SERVER_SELECT_SINGLE,
    SERVER_COUNT,
  ]) {
    test.describe(`when I click '${action}'`, () => {
      test(`then it should render ${UNAUTHORIZED}`, async ({ page }) => {
        await page.goto(getSuparbacReadPath());
        await page.getByRole('button', { name: action, exact: true }).click();
        await expect(page.getByText(UNAUTHORIZED)).toBeVisible();
      });
    });
  }
});
