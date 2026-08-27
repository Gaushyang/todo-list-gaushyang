"use client";

import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { navigation, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label={`${site.shortName}首頁`}>
          <Image src="/brand/gaushyang-logo.jpg" alt="高祥電信標誌" width={107} height={92} priority />
          <span>
            <b>{site.shortName}</b>
            <small>GAUSHYANG TELECOM</small>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "關閉導覽選單" : "開啟導覽選單"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={24} /> : <List aria-hidden="true" size={24} />}
        </button>
        <nav id="primary-navigation" className={open ? "primary-navigation is-open" : "primary-navigation"} aria-label="主要導覽">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#contact" onClick={() => setOpen(false)}>
            預約現場會勘
          </Link>
        </nav>
      </div>
    </header>
  );
}
