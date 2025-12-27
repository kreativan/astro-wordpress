// use it only for local development
if (import.meta.env.IS_LOCAL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getMedia(id) {
  let wpUrl = import.meta.env.WP_URL
  const res = await fetch(`${wpUrl}wp-json/wp/v2/media/${id}`);
  const media = await res.json();
  return media;
}

export async function getPdfFiles(params = {}) {
  const wpUrl = import.meta.env.WP_URL;
  let files = {};
  try {
    const res = await fetch(`${wpUrl}wp-json/custom/v1/media/pdf`);
    const data = await res.json();
    data.forEach((file) => {
      let localUrl = file.url.replace(wpUrl, '/_assets/files/');
      files[file.id] = { ...file, localUrl: localUrl };
    });
  } catch (error) {
    console.error('Error fetching PDF files:', error);
  }
  return files;
}