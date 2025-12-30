// use it only for local development
if (process.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

import { wordpressDataLoader } from "@lib/wordpress/loader.js";
import { getCptItems } from "@lib/wordpress/cpt.js";

export async function GET({ params, request }) {
  if (import.meta.env.WP_ENV != "dev") {
    return new Response('Not found', { status: 404 });
  }

  const wordpress = await wordpressDataLoader({
    page: "home",
    lang: null,
    services: await getCptItems("service"),
  });
  return new Response(JSON.stringify(wordpress), {
    headers: { 'Content-Type': 'application/json' }
  });
}