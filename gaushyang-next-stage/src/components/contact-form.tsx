"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "preview";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("sending");
    window.setTimeout(() => setState("preview"), 450);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-grid">
        <label>
          姓名或稱謂
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          公司或單位
          <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          電子信箱
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
        <label>
          聯絡電話
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <label>
          場域所在縣市
          <input name="location" maxLength={50} placeholder="例如：新北市" />
        </label>
        <label>
          需求項目
          <select name="service" defaultValue="">
            <option value="" disabled>請選擇</option>
            <option>基地台建設</option>
            <option>網路優化與量測</option>
            <option>室內涵蓋與專網</option>
            <option>低軌衛星通訊</option>
            <option>C-RAN 機房整合</option>
            <option>其他工程需求</option>
          </select>
        </label>
      </div>
      <label>
        需求說明與預計時程
        <textarea name="message" rows={5} required maxLength={800} />
      </label>
      <label className="consent-row">
        <input name="consent" type="checkbox" required />
        <span>我已閱讀並同意隱私權政策與個人資料蒐集告知。</span>
      </label>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "檢查資料中" : "送出工程需求"}
        </button>
        <p className="form-status" aria-live="polite">
          {state === "preview" ? "目前為網站預覽模式，資料尚未傳送。請提供正式收件信箱與部署平台後串接。" : ""}
        </p>
      </div>
    </form>
  );
}
