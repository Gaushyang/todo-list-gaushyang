# 高祥電信公司形象網站

以 Next.js App Router、TypeScript、Tailwind CSS v4 與 Motion 建立的公司形象網站。

## 開發預覽

```powershell
npm install
npm run dev
```

開啟 `http://localhost:3000`。這是開發階段最即時的監看方式。

## VS Code Go Live 預覽

Go Live 無法直接編譯 TSX。先建立靜態輸出：

```powershell
npm run build
```

再以 Go Live 開啟 `out/index.html`。每次程式更新後需重新執行 `npm run build` 才會更新 `out/`。

## 品質檢查

```powershell
npm run lint
npm run typecheck
npm run build
```

## 素材註記

網頁中所有帶有「素材待補」的區塊都是交付前需要替換或確認的內容。請依區塊內標示的尺寸、授權及內容需求準備素材。

## 專案規範

開始修改前閱讀：

- `PROJECT_PLAN.md`
- `.agents/skills/taste-skill/SKILL.md`
