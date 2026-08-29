const LIMITS = {
  name: 60,
  company: 100,
  email: 120,
  phone: 30,
  location: 50,
  contactTime: 40,
  message: 600
};

const ALLOWED_SERVICES = new Set([
  '4G／5G 基地台建設',
  '5G 網路優化與量測',
  'C-RAN 集中式機房施工',
  '大型場館/室內涵蓋(DAS)',
  '低軌衛星通訊地面站整合',
  '其他客製化工程需求'
]);

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const clean = (form, key) => String(form.get(key) || '').trim();

export const onRequestPost = async ({ request, env }) => {
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ error: '聯絡服務尚未完成設定，請直接來信 service@gaushyang.com。' }, 503);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: '無法讀取送出內容。' }, 400);
  }

  if (clean(form, 'bot-field')) return json({ ok: true });

  const fields = Object.fromEntries(Object.keys(LIMITS).map(key => [key, clean(form, key)]));
  const services = form.getAll('services').map(String).map(value => value.trim());
  const consent = form.get('consent');
  const token = clean(form, 'cf-turnstile-response');

  if (!fields.name || !fields.message) return json({ error: '請填寫姓名與需求說明。' }, 400);
  if (!fields.email && !fields.phone) return json({ error: '請至少提供電子信箱或聯絡電話。' }, 400);
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return json({ error: '電子信箱格式不正確。' }, 400);
  if (!services.length || services.some(service => !ALLOWED_SERVICES.has(service))) return json({ error: '請至少選擇一項有效的工程服務。' }, 400);
  if (!consent) return json({ error: '請先同意隱私權條款。' }, 400);
  if (Object.entries(LIMITS).some(([key, limit]) => fields[key].length > limit)) return json({ error: '部分欄位超過允許長度。' }, 400);
  if (!token) return json({ error: '請先完成安全驗證。' }, 400);

  const verificationBody = new FormData();
  verificationBody.set('secret', env.TURNSTILE_SECRET_KEY);
  verificationBody.set('response', token);
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) verificationBody.set('remoteip', remoteIp);

  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: verificationBody
  });
  const verificationResult = await verification.json();
  if (!verification.ok || !verificationResult.success) return json({ error: '安全驗證失敗，請重新驗證後再試。' }, 400);

  const submittedAt = new Intl.DateTimeFormat('zh-TW', {
    dateStyle: 'full', timeStyle: 'medium', timeZone: 'Asia/Taipei'
  }).format(new Date());
  const rows = [
    ['需求項目', services.join('、')],
    ['姓名／稱謂', fields.name],
    ['公司／單位', fields.company || '未提供'],
    ['電子信箱', fields.email || '未提供'],
    ['聯絡電話', fields.phone || '未提供'],
    ['場域地點', fields.location || '未提供'],
    ['方便聯絡時段', fields.contactTime || '未提供'],
    ['需求說明', fields.message],
    ['送出時間', submittedAt]
  ];
  const html = `<h2>高祥電信網站新需求</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`).join('')}</table>`;

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      subject: `高祥電信網站新需求｜${fields.name}`,
      html,
      ...(fields.email ? { reply_to: fields.email } : {})
    })
  });

  if (!emailResponse.ok) {
    console.error('Resend request failed', emailResponse.status, await emailResponse.text());
    return json({ error: '通知信暫時無法寄出，請稍後再試或直接來信 service@gaushyang.com。' }, 502);
  }

  return json({ ok: true });
};
