import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "高祥電信｜通訊工程、基地台建設與系統整合",
    template: "%s｜高祥電信",
  },
  description: site.description,
  icons: { icon: "/brand/gaushyang-logo.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: site.name,
    title: "高祥電信｜讓關鍵通訊，持續連線",
    description: site.description,
    images: [{ url: "/projects/ran-field.png", width: 1155, height: 752, alt: "高祥電信基地台工程現場" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">跳至主要內容</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
