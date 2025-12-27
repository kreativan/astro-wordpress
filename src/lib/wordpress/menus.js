// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getMenu(name) {
  try {
    let wpUrl = import.meta.env.WP_URL
    const res = await fetch(`${wpUrl}wp-json/custom/v1/menu/?name=${name}`);
    const menu = await res.json();
    return menu
  } catch (error) {
    console.error('Error fetching menu:', error);
    return null;
  }
}

export async function getMenuAll() {
  try {
    let wpUrl = import.meta.env.WP_URL
    const res = await fetch(`${wpUrl}wp-json/custom/v1/menu/all`);
    const menu = await res.json();
    return menu
  } catch (error) {
    console.error('Error fetching all menus:', error);
    return [];
  }
}
