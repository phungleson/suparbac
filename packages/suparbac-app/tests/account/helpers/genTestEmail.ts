import type { TestInfo } from '@playwright/test';

export const genTestEmail = (testInfo: TestInfo): string => {
  const title = testInfo.titlePath.slice(1).join('_');
  return `${title.split(/\s/).join('_')}_${testInfo.project.name.split(/\s/).join('_')}_${testInfo.retry}@email.com`;
};
