import type { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on',
    video: 'on-first-retry',
  },
// 
  reporter:[
    ['list'],
    ['html', {open: 'never', outputFolder:'./__tests__/playwright_reports'}]
  ],

  // Each test is given 15 seconds
  timeout: 15 * 1000,

  // two retries for each test
  retries: 2,

  // only the files matching one of these patterns are executed as test files
  // default is  .*(test|spec)\.(js|ts|mjs)
  testMatch: /.*\.e2e\.(js|ts|jsx|tsx)/,
  
  // directroy to be scanned for test files. Defaults to directory of the config file
  testDir: './__tests__',
  // outputDir: './__tests__/playwright_reports'
};
export default config;