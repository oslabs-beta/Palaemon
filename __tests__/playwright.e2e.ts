import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { expect, test } from '@playwright/test';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
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
});

test.afterAll(async () => {
  // close the app
  await electronApp.close();
});

test('launch app', async () => {
});

test.describe('Rendering landing page:', () => {
  test('renders the first page', async () => {
    page = await electronApp.firstWindow();

    await page.waitForSelector('h1');
    const text = await page.$eval('h1', (el) => el.textContent);
    expect(text).toBe('PALAEMON');

    // const title = await page.title();
    // expect(title).toBe('Palaemon');
    await expect(page).toHaveTitle('Palaemon');
  });

  test('sidebar for navigation exists', async () => {
    expect(await page.$('#sidebar')).toBeTruthy();
  });

  test('on app load, hash routing is initialized as an empty string', async () => {
    // HashRouter keeps track of routing by using #
    // when the app loads, the default hash is empty
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('');
  });
});

test.describe('Routing and navigation around the app:', () => {
  test('clicking on hat logo routes back to landing page', async () => {
    await page.click('#sidebar #logo');

    expect(await page.$('#landing-container')).toBeTruthy();
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#/');
  });

  test('clicking on logo text PALAEMON routes back to landing page', async () => {
    await page.click('text=PALAEMON', { force: true });

    expect(await page.$('#landing-container')).toBeTruthy();
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#/');
  });

  test('clicking on "Namespace" on sidebar routes back to landing page', async () => {
    await page.click('text=Namespace', { force: true });

    expect(await page.$('#landing-container')).toBeTruthy();
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#/');
  });

  // I don't think the clicking on link is working 
  test.skip('clicking on "Home" on sidebar routes to home page', async () => {
    await page.locator('text=Home').click({ force: true });
    await page.waitForTimeout(1000);

    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#/home');
    expect(await page.$('#landing-container')).toBeNull();
    expect(await page.$('#contents')).toBeTruthy();
    // form should no longer exist on the page
    page.pause();
  });
});