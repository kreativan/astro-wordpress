// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getForms(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/forms`);
  const form = await res.json();
  return form;
}

export async function getForm(name, lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/forms?name=${name}`);
  const form = await res.json();
  return form;
}

export async function getFormById(id, lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/forms?id=${id}`);
  const form = await res.json();
  return form;
}