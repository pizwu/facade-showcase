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

/** 平滑滾動一段距離 */
async function smoothScroll(page, distance, duration = 1600) {
  await page.evaluate(
    ({ distance, duration }) => {
      return new Promise((resolve) => {
        const start = window.scrollY;
        const target = start + distance;
        const startTime = performance.now();
        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeInOutCubic
          const ease =
            progress < 0.5
              ? 4 * progress ** 3
              : 1 - (-2 * progress + 2) ** 3 / 2;
          window.scrollTo(0, start + (target - start) * ease);
          if (progress < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    },
    { distance, duration }
  );
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
  await revealAll(page);
  await wait(1000);

  // 慢慢往下滑：Hero → 體驗描述 → 適合妳嗎
  console.log('  滑動中...');
  await smoothScroll(page, 600, 2000);   // Hero 下半部
  await wait(800);
  await smoothScroll(page, 700, 2500);   // 體驗描述（每一堂課都是只為妳準備的）
  await wait(1000);
  await smoothScroll(page, 800, 2500);   // 適合妳嗎
  await wait(1200);

  // ── 2. 光葉影像 Hikari Photo ──
  console.log('▶ 光葉影像 Hero...');
  await page.goto(`${BASE}/photographer/index.html`, { waitUntil: 'networkidle' });
  await wait(1500);
  await revealAll(page);
  await wait(1000);

  console.log('  滑動中...');
  await smoothScroll(page, 500, 2000);   // Hero 下方
  await wait(800);
  await smoothScroll(page, 700, 2500);   // Gallery 作品集
  await wait(1200);
  await smoothScroll(page, 800, 2500);   // meaning / packages
  await wait(1000);

  // ── 3. Demo Index ──
  console.log('▶ Demo Index...');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await wait(1500);

  // 等卡片動畫
  await wait(1500);

  console.log('  滑動中...');
  await smoothScroll(page, 500, 2000);   // 四張卡片
  await wait(1200);
  await smoothScroll(page, 600, 2000);   // 流程 + CTA
  await wait(2000);

  // ── 結束 ──
  console.log('✓ 錄製完成！');

  // 必須 close context 才會寫入影片檔
  await page.close();
  await context.close();
  await browser.close();

  console.log('影片已儲存到 recordings/ 資料夾');
})();
