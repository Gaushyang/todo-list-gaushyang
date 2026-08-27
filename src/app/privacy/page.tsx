import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "隱私權政策與個人資料蒐集告知",
  description: "高祥電信網站隱私權政策與工程諮詢表單個人資料蒐集、處理及利用告知。",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-main">
      <span className="topic-label">隱私與個人資料</span>
      <h1>隱私權政策與個人資料蒐集告知</h1>
      <p className="updated">最後更新：2026 年 8 月 19 日。本頁正式上線前應由公司管理或法律顧問確認。</p>

      <section><h2>一、適用範圍</h2><p>本政策適用於高祥電信股份有限公司網站及其工程諮詢、現場會勘與招募聯絡功能。外部網站或第三方服務另依其政策辦理。</p></section>
      <section><h2>二、蒐集目的與資料類別</h2><p>我們僅為回覆工程諮詢、安排技術評估、報價、現場會勘、客戶服務或招募聯絡，蒐集您主動提供的姓名或稱謂、公司或單位、電話、電子信箱、場域概略地區、需求內容及應徵資料。</p></section>
      <section><h2>三、利用期間、地區、對象與方式</h2><p>資料於完成聯絡、專案評估及法定保存義務所需期間內，於本公司營運所及地區，由獲授權之業務、專案、技術或人資人員，以電話、電子郵件或其他必要方式處理。除法律要求、履行服務必要或取得您的同意外，不提供無關第三方。</p></section>
      <section><h2>四、您的權利</h2><p>您可依法請求查詢、閱覽、製給複製本、補充、更正、停止蒐集、處理、利用或刪除個人資料。請寄信至 <a href={`mailto:${site.email}`}>{site.email}</a>，我們將於確認身分後處理。</p></section>
      <section><h2>五、資料安全與保存</h2><p>我們採取合理的存取權限與傳輸保護措施。資料保存期限及刪除流程應依公司實際表單服務、通知信箱、備份與專案管理制度執行；正式啟用收單前將完成內部盤點。</p></section>
      <section><h2>六、不提供資料的影響</h2><p>您可選擇不提供個人資料，但若缺少回覆需求所需的聯絡方式，我們可能無法安排評估、會勘或回覆。</p></section>
      <section><h2>七、政策更新與聯絡窗口</h2><p>本政策若因服務或法令調整而更新，將於本頁標示日期。相關問題請洽 <a href={site.phoneHref}>{site.phoneDisplay}</a> 或 <a href={`mailto:${site.email}`}>{site.email}</a>。</p></section>
    </main>
  );
}
