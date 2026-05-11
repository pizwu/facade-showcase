# 門面 Facade — Demo Collection

## 這個專案是什麼

門面（Facade）是一個網站設計服務品牌，在正式官網 `facade.tw` 上線之前，先用這個 repo 展示四個不同產業的 demo 網站，作為作品範例集。預計部署在 GitHub Pages。

## 檔案結構

```
facade-demo/
├── index.html              ← Demo Index 首頁（四張卡片連向各 demo）
├── consultant/             ← 余明道 企業教練（顧問/講師）
│   ├── index.html          ← 首頁（深海軍藍，深色系）
│   ├── about.html
│   ├── services.html
│   ├── products.html
│   ├── portfolio.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── booking.html
│   └── contact.html
├── photographer/           ← 光葉影像 Hikari Photo（攝影師）
│   ├── index.html          ← 首頁（暖棕色系）
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── booking.html
│   └── contact.html
├── pilates/                ← 身研所 Somatics Studio（皮拉提斯）
│   ├── index.html          ← 首頁（米白暖色系）
│   ├── about.html
│   ├── services.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── booking.html
│   ├── contact.html
│   ├── visit.html
│   └── monthly-special.html
└── studio/                 ← 疊工作室 DDIE Studio（室內設計）
    ├── index.html          ← 首頁（米白暖色系）
    ├── about.html
    ├── services.html
    ├── portfolio.html
    ├── blog.html
    ├── blog-post.html
    ├── booking.html
    ├── contact.html
    └── visit.html
```

## 技術特性

- **純靜態 HTML**：沒有框架、沒有 build tool、沒有 JS 框架。每個 `.html` 都是獨立完整的頁面（含內嵌 CSS 和 JS）。
- **字型**：全站使用 Google Fonts — Cormorant Garamond（serif）、Noto Sans TC（中文）、Inter（英文 sans）。
- **圖片**：目前使用 Pexels 免費圖庫連結作為佔位圖，帶有 `data-img-*` 屬性標記圖片需求描述。
- **文案標記**：部分頁面的文案元素帶有 `data-text` 和 `data-text-description` 屬性，用於標記可替換的文案區塊。

## 門面品牌設計系統（根目錄 index.html）

- 主色：`--cream: #F5F2EC`、`--warm-white: #FAF9F6`、`--sand: #D4C9B4`、`--bark: #5C4A35`、`--charcoal: #2A2520`
- 強調色：`--accent-gold: #C4A96B`
- 字型：Cormorant Garamond（標題）、Noto Sans TC（內文）、Inter（英文/標籤）
- 風格：極簡、留白、溫暖、專業

## 各 Demo 的設計語言

| 品牌 | 色調 | 氛圍 |
|---|---|---|
| 余明道（consultant） | 深海軍藍 `#0D1F3C` + 金 `#C9A96E` | 權威、信任、專業 |
| 光葉影像（photographer） | 暖米 `#FAF7F2` + 棕 `#B5855A` | 溫暖、底片感、情感 |
| 身研所（pilates） | 米白 `#FAF8F5` + 赭 `#C8956C` | 溫柔、身體、陪伴 |
| 疊工作室（studio） | 米白 `#FAF8F5` + 灰棕 `#8A7560` | 質感、建築、沉穩 |

## 各 Demo 統一導覽結構

每個 demo 的 **index.html** 用 `#anchor` 指向同頁區塊，其餘子頁面統一用 `.html` 連結。

| 品牌 | Nav 連結 | CTA |
|---|---|---|
| consultant | 關於我 · 服務項目 · 成功案例 · 部落格 | 預約諮詢 → contact.html |
| photographer | 作品集 · 服務方案 · 關於我們 · 部落格 | 預約諮詢 → contact.html |
| pilates | 關於教練 · 服務項目 · 專業分享 · 來店資訊 | 預約初次諮詢 → contact.html |
| studio | 作品集 · 服務項目 · 關於我們 · 設計誌 | 預約諮詢 → contact.html |

## 修改注意事項

- 修改 nav 或 footer 時，該 demo 資料夾內**所有頁面**都要同步更新，保持一致。
- 每個 `.html` 檔案的 CSS 是內嵌的（`<style>` 標籤），修改樣式時要注意是改哪一頁。
- 圖片目前都是外連 Pexels，未來可能替換為本地圖片。
- 品牌名稱、聯絡資訊都是假資料（demo 用途）。
