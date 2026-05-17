/**
 * 門面 Facade — 短影片錄製腳本
 *
 * 流程：身研所 → 光葉影像 → Demo Index → CTA
 * 裝置：iPhone 14 (390×844)
 *
 * 用法：
 *   npx playwright test record-demo.mjs      # 不行，這不是 test 檔
 *   node record-demo.mjs                      # ← 直接跑
 *
 * 產出：recordings/ 資料夾內的 .webm 影片
 */

import { chromium } from 'playwright';

const BASE = 'https://pizwu.github.io/facade-showcase';

// iPhone 14 viewport
const DEVICE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
};

// ── helpers ──────────────────────────────────────────────

/** 用 wheel 事件 + easing 滾到指定元素 */
async function scrollTo(page, selector, { duration = 1800, offset = -60 } = {}) {
  const distance = await page.evaluate(
    ({ selector, offset }) => {
      const el = document.querySelector(selector);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY + offset - window.scrollY;
    },
    { selector, offset }
  );

  if (Math.abs(distance) < 5) return;

  const steps = Math.max(Math.round(duration / 16), 30);
  const stepDelay = duration / steps;

  let prevEase = 0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const ease = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    const delta = (ease - prevEase) * distance;
    prevEase = ease;
    await page.mouse.wheel(0, delta);
    await wait(stepDelay);
  }
}

/** 等待一段時間（讓動畫跑完、讓畫面穩定） */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** 滾到頁面頂端 */
async function scrollToTop(page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
}

/** 觸發所有 reveal 元素立刻顯示（避免動畫延遲影響錄影） */
async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
  });
  await wait(500);
}

// ── 主流程 ──────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ...DEVICE,
    recordVideo: {
      dir: 'recordings/',
      size: { width: 390 * 2, height: 844 * 2 }, // 2x for quality
    },
  });

  const page = await context.newPage();

  // ── 1. 身研所 Somatics Studio ──
  console.log('▶ 身研所 Hero...');
  await page.goto(`${BASE}/pilates/index.html`, { waitUntil: 'networkidle' });
  await wait(1500);
  // await revealAll(page);
  // await wait(1000);

  console.log('  → 體驗描述');
  await scrollTo(page, '#experience', { duration: 2200 });
  await wait(1500);

  console.log('  → 適合妳嗎');
  await scrollTo(page, '#fit', { duration: 2200 });
  await wait(1500);

  console.log('  → 合作流程');
  await scrollTo(page, '#process', { duration: 2200 });
  await wait(1500);

  // ── 2. 光葉影像 Hikari Photo ──
  console.log('▶ 光葉影像 Hero...');
  await page.goto(`${BASE}/photographer/index.html`, { waitUntil: 'networkidle' });
  await wait(1500);
  // await revealAll(page);
  // await wait(1000);

  console.log('  → 作品集');
  await scrollTo(page, '#gallery', { duration: 2200 });
  await wait(1500);

  console.log('  → 保存的意義');
  await scrollTo(page, '#meaning', { duration: 2200 });
  await wait(1500);

  console.log('  → 服務方案');
  await scrollTo(page, '#packages', { duration: 2200 });
  await wait(1500);

  // ── 3. Demo Index ──
  console.log('▶ Demo Index...');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await wait(2000);

  console.log('  → 作品卡片（前兩張）');
  await scrollTo(page, '.demos-section', { duration: 2000 });
  await wait(1500);

  console.log('  → 作品卡片（後兩張）');
  await scrollTo(page, '.demo-card:nth-child(3)', { duration: 2000 });
  await wait(1500);

  console.log('  → 流程');
  await scrollTo(page, '.process-section', { duration: 2000 });
  await wait(1500);

  console.log('  → CTA');
  await scrollTo(page, '.cta-section', { duration: 2000 });
  await wait(2000);

  // ── 結束 ──
  console.log('✓ 錄製完成！');

  // 必須 close context 才會寫入影片檔
  await page.close();
  await context.close();
  await browser.close();

  console.log('影片已儲存到 recordings/ 資料夾');
})();
