// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getPage(slug, lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages?slug=${slug}`);
  const page = await res.json();
  return page[0];
}

export async function getPageById(id, lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages/${id}`);
  const page = await res.json();
  return page[0];
}

export async function getAllPages(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages/?status=publish&per_page=100`);
  const pages = await res.json();
  return pages;
}

export async function getRootPages(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages?parent=0&status=publish&per_page=100`);
  const pages = await res.json();
  return pages;
}

export async function getSubPages(slug, lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages?slug=${slug}`);
  const page = await res.json();
  const id = page[0].id;
  const res2 = await fetch(`${wpUrl}wp-json/wp/v2/pages?parent=${id}&status=publish&per_page=100`);
  const subPages = await res2.json();
  return subPages;
}

export async function getAllSubPages(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/wp/v2/pages/?parent_exclude=0&status=publish&per_page=100`);
  const subPages = await res.json();
  return subPages;
}