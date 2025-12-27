import i18nData from '@data/i18n.json';

// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Get website options
export async function getOptions(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang && lang != "en") wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/options`);
  const options = await res.json();
  return options;
}

export async function i18n(lang = null) {
  lang = lang ? lang : import.meta.env.SITE_LANG;
  const localI18n = i18nData[lang] || i18nData.en;
  const response = await fetch(import.meta.env.WP_URL + `/wp-json/custom/v1/i18n`);
  const translations = await response.json();
  const mergedTranslations = { ...localI18n, ...translations };
  return mergedTranslations;
}

export async function getCommonData() {
  let wpUrl = import.meta.env.WP_URL;
  try {
    const response = await fetch(`${wpUrl}wp-json/custom/v1/common`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching common data:', error);
    return null;
  }
}