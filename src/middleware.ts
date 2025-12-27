// src/middleware.ts
import type { MiddlewareResponseHandler } from 'astro';

const languages: Record<string, { url: string }> = {
  en: { url: 'https://wp.kreativan.dev/sandbox/' },
  es: { url: 'https://wp.kreativan.dev/sandbox/es/' },
};

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  // Only run in SSR mode
  if (!import.meta.env.SSR) return next();
  
  console.log('🌟 Middleware triggered:', context.request.url);

  const url = new URL(context.request.url);
  const host = url.hostname;
  const path = url.pathname;

  // --- Detect language dynamically ---
  let lang = 'en'; // default fallback

  // Option A: subdomain-based
  for (const code of Object.keys(languages)) {
    if (host.startsWith(`${code}.`)) {
      lang = code;
      break;
    }
  }

  // Option B: path-based (if you want it to work both ways)
  if (lang === 'en') {
    for (const code of Object.keys(languages)) {
      if (path.startsWith(`/${code}/`)) {
        lang = code;
        break;
      }
    }
  }

  // --- Resolve WP URL from config ---
  const wpUrl = languages[lang]?.url ?? languages.en.url;

  // --- Override process.env for this request ---
  process.env.WP_URL = wpUrl;
  process.env.SITE_LANG = lang;

  // Optional: expose for access in Astro.locals too
  context.locals.lang = lang;
  context.locals.wpApiUrl = wpUrl;

  return next();
};
