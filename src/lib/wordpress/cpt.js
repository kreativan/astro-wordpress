// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getCptItems(name = 'service', params = {}) {
  let orderby = params.orderby || 'menu_order'; //menu_order, date, title
  let order = params.order || 'asc'; // asc, desc
  let per_page = params.per_page || 100;
  try {
    let wpUrl = import.meta.env.WP_URL
    const response = await fetch(`${wpUrl}wp-json/wp/v2/${name}?orderby=${orderby}&order=${order}&per_page=${per_page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return [];
  }
}

export async function getCptById(name = 'service', id) {
  try {
    let wpUrl = import.meta.env.WP_URL
    const response = await fetch(`${wpUrl}wp-json/wp/v2/${name}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${name} by ID:`, error);
    return null;
  }
}

export async function getCptBySlug(name = 'service', slug) {
  try {
    let wpUrl = import.meta.env.WP_URL
    const response = await fetch(`${wpUrl}wp-json/wp/v2/${name}?slug=${slug}`);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Error fetching ${name} by slug:`, error);
    return null;
  }
}