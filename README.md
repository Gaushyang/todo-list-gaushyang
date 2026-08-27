# 高祥電信股份有限公司 - 企業官方網站

本專案為高祥電信股份有限公司（Gaushyang Telecom）之官方網站，提供電信工程、5G基地台建設、網路優化及衛星通訊等專業服務展示。

## 🛠️ 技術棧 (Tech Stack)

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: 自建企業響應式 CSS (`enterprise.css`)
- **Deployment**: Netlify (自動化靜態網站託管)
- **Security**: Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options

## 🚀 本地開發與測試 (Local Development)

本專案為純靜態網頁，無須安裝額外 npm 依賴套件。可以使用任何靜態 HTTP 伺服器進行本地開發測試：

```bash
# 使用 Python 啟動本地測試伺服器 (Port 3000)
python -m http.server 3000

# 或使用 Node.js 的 serve 工具
npx serve .
```
