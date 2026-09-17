import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = new URL('.', import.meta.url);
const html = new URL('carousel.html', root).href;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
await page.goto(html, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'screen' });
await page.evaluate(() => document.fonts.ready);
const slides = page.locator('.slide');
const count = await slides.count();
if (count !== 7) throw new Error(`Expected 7 slides, found ${count}`);
await mkdir(resolve(new URL('.', root).pathname, 'png'), { recursive: true });
for (let i = 0; i < count; i += 1) {
  await slides.nth(i).screenshot({ path: resolve(new URL('.', root).pathname, 'png', `slide-${i + 1}.png`), animations: 'disabled' });
}
await page.pdf({
  path: resolve(new URL('.', root).pathname, 'linkedin-carousel.pdf'),
  width: '1080px',
  height: '1350px',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' }
});
await browser.close();
console.log(`Exported ${count} PNG files and one PDF.`);
