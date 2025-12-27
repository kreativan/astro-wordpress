import fs from "fs";
import path from "path";
import { loadEnv } from "vite";
const { WP_URL } = loadEnv(process.env, process.cwd(), "");

// New: derive relative path starting at "wp-content/uploads"
function getRelPathFromUploads(fileUrl) {
  try {
    const { pathname } = new URL(fileUrl);
    const clean = pathname.replace(/^\/+/, "");
    const marker = "wp-content/uploads/";
    const idx = clean.indexOf(marker);
    if (idx >= 0) return clean.slice(idx); // includes "wp-content/uploads/..."
    return path.basename(clean); // fallback: just the file name
  } catch {
    return path.basename(fileUrl);
  }
}

async function getPdfFiles() {
  const wpUrl = WP_URL;
  let files = [];
  try {
    const res = await fetch(`${wpUrl}wp-json/custom/v1/media/pdf`);
    const data = await res.json();
    data.forEach((file) => {
      files.push(file.url);
    });
  } catch (error) {
    console.error(`Failed to fetch PDF files: ${error.message}`);
  }
  return files;
}

const files = await getPdfFiles();

const outputDir = path.resolve("dist/_assets/files");
fs.mkdirSync(outputDir, { recursive: true });

for (const url of files) {
  const relPath = getRelPathFromUploads(url);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Failed to download ${relPath}: ${res.statusText}`);
    continue;
  }
  const buffer = await res.arrayBuffer();

  const destPath = path.join(outputDir, relPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, Buffer.from(buffer));
  console.log(`Downloaded ${relPath}`);
}

console.log("✅ All files downloaded from HTTPS endpoints!");
