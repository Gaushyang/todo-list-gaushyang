export const onRequestGet = ({ env }) => Response.json(
  { turnstileSiteKey: env.TURNSTILE_SITE_KEY || '' },
  { headers: { 'Cache-Control': 'no-store' } }
);
