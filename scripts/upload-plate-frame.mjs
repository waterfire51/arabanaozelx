/**
 * public/assets/image/plakalik.png → arabanaozelx_assets
 * Kullanım: node scripts/upload-plate-frame.mjs
 */

import fs from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

for (const filename of [".env.local", ".env"]) {
  try {
    const content = fs.readFileSync(path.join(root, filename), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

const OWNER = process.env.GITHUB_ASSETS_OWNER || "waterfire51";
const REPO = process.env.GITHUB_ASSETS_REPO || "arabanaozelx_assets";
const TOKEN = process.env.GITHUB_TOKEN || "";
const BRANCH = "main";
const REPO_PATH = "assets/image/plakalik.png";
const LOCAL = path.join(root, "public", "assets", "image", "plakalik.png");

function api(pathname, init = {}) {
  return fetch(`https://api.github.com/repos/${OWNER}/${REPO}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "arabanaozel-upload-plate",
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });
}

async function main() {
  if (!TOKEN) throw new Error("GITHUB_TOKEN gerekli (.env.local)");
  if (!fs.existsSync(LOCAL)) throw new Error(`Dosya yok: ${LOCAL}`);

  const buffer = await readFile(LOCAL);
  let sha;
  const existing = await api(`/contents/${encodeURIComponent(REPO_PATH)}?ref=${BRANCH}`);
  if (existing.ok) sha = (await existing.json()).sha;

  const response = await api(`/contents/${encodeURIComponent(REPO_PATH)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: "sync: plakalık çerçeve (public)",
      content: buffer.toString("base64"),
      branch: BRANCH,
      ...(sha ? { sha } : {})
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  console.log(`OK ${REPO_PATH} (${buffer.length} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
