// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getStaticPathsRoot(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/pages/root/`);
  const pages = await res.json();
  return pages;
}

export async function getStaticPathsSubPages(lang = null) {
  let wpUrl = import.meta.env.WP_URL
  if (lang) wpUrl = wpUrl + lang + '/';
  const res = await fetch(`${wpUrl}wp-json/custom/v1/pages/subpages/`);
  const pages = await res.json();
  return pages;
} 