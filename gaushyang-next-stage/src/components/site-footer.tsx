import Link from "next/link";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <strong className="footer-name">{site.name}</strong>
          <p>{site.englishName}</p>
          <p>{site.address}</p>
        </div>
        <nav aria-label="頁尾導覽">
          {navigation.slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/privacy/">隱私權政策</Link>
        </nav>
        <div>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>週一至週五 08:30-17:30</p>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>通訊工程、系統整合與維運服務</span>
      </div>
    </footer>
  );
}
