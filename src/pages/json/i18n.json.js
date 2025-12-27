// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// import json file
import localTranslations from '@data/i18n.json';

export async function GET({ params, request }) {
  let lang = import.meta.env.LANG || 'en';
  let local = localTranslations[lang] || localTranslations['en'];
  let translations;
  try {
    const response = await fetch(import.meta.env.WP_URL + `/wp-json/supersonic/v1/i18n`);
    translations = await response.json();
    translations = { ...local, ...translations };
  } catch (error) {
    console.error("Error fetching translations:", error);
    translations = local;
  }
  return new Response(
    JSON.stringify(translations)
  )
}