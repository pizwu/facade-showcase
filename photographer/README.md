# 光葉影像 Hikari Photo — Demo Site

攝影師品牌 demo 網站，純靜態 HTML，無框架。

## 本地開發

Nav / Footer 使用 JS `fetch()` 載入共用片段（`_nav.html`、`_footer.html`），需透過 HTTP server 瀏覽：

```bash
cd photographer
python3 -m http.server 8000
```

開啟 http://localhost:8000

> ⚠️ 直接用 `file://` 開啟會因 CORS 限制導致 nav/footer 無法載入。

## 共用檔案

| 檔案 | 說明 |
|---|---|
| `_nav.html` | 導覽列 + 漢堡按鈕 + mobile menu |
| `_footer.html` | 網站底部 |
| `_shared.css` | 漢堡選單 / mobile menu 樣式 |
| `_shared.js` | 載入片段 + 漢堡互動邏輯 |

修改 nav 或 footer 只需編輯 `_nav.html` / `_footer.html`，全站 8 頁自動同步。

## 頁面結構

- `index.html` — 首頁
- `about.html` — 關於我們
- `services.html` — 服務項目
- `portfolio.html` — 作品集
- `blog.html` — 部落格列表
- `blog-post.html` — 部落格文章
- `booking.html` — 預約
- `contact.html` — 聯絡我們
