// /lib/wordpress/loader/loader.js

/**
 * WordPress Data Loader
 * Loads common WordPress data (options, menus...) and page-specific data.
 * Caches global data to avoid redundant requests during a build.
 * @example const data = await wordpressDataLoader({page: 'about'});
 * @example const data = await wordpressDataLoader({lang: 'fr', page: 'contact'});
 * 
 * Load additional custom data by passing it in params:
 * @example const data = await wordpressDataLoader({page: 'home', customData: await myFunction()});
 */

import { getOptions, getCommonData } from './wordpress.js';
import { getPage } from './pages.js';
import { getMenuAll } from './menus.js';

let cachedGlobals = {}; // store global data once per build

/**
 * Load common WordPress data: options, menus, global content
 * @param {Object} params
 * @param {string} params.lang - Language code (e.g., 'en', 'fr')
 * @param {string} [params.page] - Page slug to load specific page data
 * @returns {Promise<Object>} Loaded WordPress data
 */
export async function wordpressDataLoader(params = {}) {
  const lang = params.lang || import.meta.env.SITE_LANG || 'en';
  const pageSlug = params.page || null;

  let data = params;
  delete data.page; // remove page from additional data
  delete data.lang; // remove lang from additional data

  // Fetch global data once per build per language
  if (!cachedGlobals[lang] || import.meta.env.WP_ENV === 'dev') {

    const commonData = await getCommonData();

    cachedGlobals[lang] = {
      options: commonData.options || await getOptions(),
      menus: commonData.menu_all || await getMenuAll(),
    };
  }

  // Page-specific data
  const page = pageSlug ? await getPage(pageSlug) : null;

  // Merge globals + page
  const website = {
    ...cachedGlobals[lang],
    ...data,
    page
  };

  return website;
}
