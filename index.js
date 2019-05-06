const puppeteer = require('puppeteer');
const config = require('./config.json');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1280 });
  await page.goto('https://pairs.lv', { waitUntil: 'networkidle0' });

  await page.click('#registerBtn1');

  await page.waitFor(3000);
  const pages = await browser.pages();
  const popup = pages[pages.length - 1];
  await popup.waitFor('#email');
  await popup.type('#email', config.Facebook.email);
  await popup.type('#pass', config.Facebook.password);
  await popup.click('#u_0_0');

  await page.waitFor(8000);
  await page.waitFor('div[data-pickup-modal] .modal_close');
  await page.click('div[data-pickup-modal] .modal_close');

  await page.waitFor(3000);
  await page.click('#openSearchConditionBtn');
  await page.waitFor(1000);
  await page.waitFor('#select-age-low');
  await page.select('#select-age-low', config.Pairs.searchCriteria.lower.toString());
  await page.select('#select-age-height', config.Pairs.searchCriteria.higher.toString());
  await page.click('#submitSearchConditionBtn');

  await page.waitFor(2000);
  for (let p = 0; p < 1000; p++) {
    await page.waitFor(3000);
    for (let i = 1; i <= 16; i++) {
      await page.waitFor(1000);
      await page.waitFor(`ul.list_view_users li:nth-child(${i})`);
      await page.click(`ul.list_view_users li:nth-child(${i}) a`);

      await page.waitFor(2500 * Math.random() + 2500);
      await page.waitFor('#modal_personal_view a.modal_close');
      await page.click('#modal_personal_view a.modal_close');
    }
    await page.waitFor(1000);
    await page.waitFor('#pairs_search_page .pager_next');
    await page.click('#pairs_search_page .pager_next');
  }
})();
