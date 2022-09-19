import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { expect, test } from '@playwright/test';

let electronApp: ElectronApplication;
let page: Page;

// Test basic launching of the app
test.describe('01. Launch app', async () => {
  test.beforeEach(async () => {
    // open the app
    electronApp = await electron.launch({ args: ['dist/electron/main.js'] });
    electronApp.on('window', async (page) => {
      const filename = page.url()?.split('/').pop();
      console.log(`Window opened: ${filename}`);

      // capture errors
      page.on('pageerror', (err) => console.log('page has errors: ', err));

      // capture console messages
      page.on('console', (log) => console.log(log.text()));
    });
    page = await electronApp.firstWindow();
  });

  test.afterEach(async () => {
    // close the app
    await electronApp.close();
  });

  test.describe('Rendering landing page:', () => {
    test('renders the first page', async () => {
      // page = await electronApp.firstWindow();

      await page.waitForSelector('h1');
      const text = await page.$eval('h1', (el) => el.textContent);
      expect(text).toBe('PALAEMON');

      // const title = await page.title();
      // expect(title).toBe('Palaemon');
      await expect(page).toHaveTitle('Palaemon');
    });

    test('sidebar for navigation exists', async () => {
      await page.waitForSelector('#sidebar');
      expect(await page.$('#sidebar')).toBeTruthy();
    });

    test('on app load, hash routing is initialized as an empty string', async () => {
      // HashRouter keeps track of routing by using #
      // when the app loads, the default hash is empty
      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('');
    });
  });

  test.describe('Static routing and navigation around the app:', () => {

    test('clicking on hat logo routes back to landing page', async () => {
      await page.click('#sidebar #logo');

      expect(await page.$('#landing-container')).toBeTruthy();
      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('#/');
    });

    test('clicking on logo text PALAEMON routes back to landing page', async () => {
      await page.click('#company-name');

      expect(await page.$('#landing-container')).toBeTruthy();
      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('#/');
    });

    test('clicking on "Namespace" on sidebar routes back to landing page', async () => {
      await page.click('#link-namespace');
      await page.waitForSelector('#landing-container');

      expect(await page.$('#landing-container')).toBeTruthy();
      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('#/');
    });

    test('clicking on "Dashboard" on sidebar routes to homepage', async () => {
      await page.click('#link-dashboard');

      // wait for react router to load
      await page.waitForSelector('#contents');

      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('#/home');

      //landing container from previous page should no longer exist
      expect(await page.$('#landing-container')).toBeNull();
      expect(await page.$('#contents')).toBeTruthy();
      // form should no longer exist on the page
    });

    test('clicking on "Analysis" on sidebar routes to analysis page', async () => {
      await page.click('#link-analysis');

      // wait for react router to load
      await page.waitForSelector('#analysis-container');

      const hash = await page.evaluate(() => window.location.hash);
      expect(hash).toBe('#/analysis');

      //landing container from previous page should no longer exist
      expect(await page.$('#landing-container')).toBeNull();
      expect(await page.$('#analysis-container')).toBeTruthy();
      // form should no longer exist on the page
    });
  });
});

// Testing Namespace page
test.describe.only('02. Namespace page ', async () => {
  test.beforeEach(async () => {
    // open the app
    electronApp = await electron.launch({ args: ['dist/electron/main.js'] });
    electronApp.on('window', async (page) => {
      const filename = page.url()?.split('/').pop();
      console.log(`Window opened: ${filename}`);

      // capture errors
      page.on('pageerror', (err) => console.log('page has errors: ', err));

      // capture console messages
      page.on('console', (log) => console.log(log.text()));
    });
    page = await electronApp.firstWindow();
  });

  test.afterEach(async () => {
    // close the app
    await electronApp.close();
  });

  test('Select menu should be populated based on available namespaces:', async () => {

  });
});

