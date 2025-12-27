import i18nData from "@data/i18n.json";

/**
 * Render strings from data i18n.json
 * @example i18n('test_key')
 * @example i18n('welcome_message', 'fr') // returns the French translation
 */
export function i18n(key = null, lang) {
  lang = lang || import.meta.env.SITE_LANG || "en";
  const data = i18nData[lang] || i18nData["en"];
  return key ? data[key] : data;
}