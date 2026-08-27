import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div>
        <span className="topic-label">找不到頁面</span>
        <h1>這個網址目前沒有內容。</h1>
        <p>請返回首頁，或前往核心服務查看工程項目。</p>
        <Link className="button button-primary" href="/">返回首頁</Link>
      </div>
    </main>
  );
}
