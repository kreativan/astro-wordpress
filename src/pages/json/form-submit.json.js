// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST({ params, request }) {
  return new Response(
    JSON.stringify({
      status: 'success',
      message: 'POST request received',
    })
  )
}