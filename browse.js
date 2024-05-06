const puppeteer = require('puppeteer');
const config = require('./config.json');

console.log(config);

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // 啟用 headless mode
    args: ['--no-sandbox', '--disable-dev-shm-usage'] // 避免在某些環境中出現的錯誤
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'zh' // 設定 Accept-Language 為 zh
  });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "language", {
        get: function() {
            return "zh-TW"; // 設定語言為台灣中文
        }
    });
    Object.defineProperty(navigator, "languages", {
        get: function() {
            return ["zh-TW"]; // 設定語言列表為台灣中文
        }
    });
});

  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(config.host, { waitUntil: 'networkidle0' });
  
  
  //await page.waitForNavigation({ waitUntil: "domcontentloaded" }).catch(error => {
    // 處理超時錯誤的代碼
    //console.log(error);
    //});
  await page.screenshot({path: 'google.png'});
  // 進行您的操作，例如抓取內容或截圖
  await browser.close();
})();
