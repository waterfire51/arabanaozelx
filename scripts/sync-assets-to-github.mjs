/**
 * Ürün ve site görsellerini arabanaozelx_assets reposuna taşır.
 * Kullanım: GITHUB_TOKEN=xxx node scripts/sync-assets-to-github.mjs
 */

import fs from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(filename) {
  try {
    const content = fs.readFileSync(path.join(root, filename), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      const index = trimmed.indexOf("=");
      if (index === -1) {
        continue;
      }
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing env files
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const OWNER = process.env.GITHUB_ASSETS_OWNER || "waterfire51";
const REPO = process.env.GITHUB_ASSETS_REPO || "arabanaozelx_assets";
const TOKEN = process.env.GITHUB_TOKEN || "";
const BRANCH = "main";

const LEGACY_BASE = "https://otodark.com";

const ASSET_MANIFEST = [
  ...[
    "slider_gorsel/isiklioto.jpg",
    "slider_gorsel/isiksizoto.webp",
    "urun_gorsel/kayis-anahtarlik.gif",
    "urun_gorsel/8.webp",
    "urun_gorsel/9.webp",
    "plakalik_gorsel/otomobil-isikli-1.webp",
    "plakalik_gorsel/otomobil-isiksiz-1.webp",
    "motor_plakalik_gorsel/motor-plakalik-isikli.webp",
    "motor_plakalik_gorsel/motor-plakalik-isiksiz.webp",
    "urun_gorsel/7.webp",
    "urun_gorsel/ayna-sus-3.gif",
    "urun_gorsel/isikli-panjur-armasi.gif",
    "urun_gorsel/qr-dijital-numaratik.webp",
    "urun_gorsel/ruhsat-kabi-urun.webp",
    "plakalik_gorsel/plakalik_2.webp",
    "kapiesigi_gorsel/5.webp",
    "kapiesigi_gorsel/6.webp",
    "urun_gorsel/11.webp",
    "urun_gorsel/18.webp",
    "urun_gorsel/10.webp",
    "urun_gorsel/12.webp",
    "urun_gorsel/13.webp",
    "urun_gorsel/14.webp",
    "urun_gorsel/15.webp",
    "urun_gorsel/20.webp",
    "urun_gorsel/3.webp",
    "urun_gorsel/17.webp",
    "urun_gorsel/21.webp",
    "urun_gorsel/22.webp",
    "icon_gorsel/iconplakalik.png",
    "icon_gorsel/iconmotorplakalik.png",
    "icon_gorsel/iconkapiesik.png",
    "icon_gorsel/iconanahtarlik.png",
    "icon_gorsel/iconguneslikorganizer.png",
    "icon_gorsel/iconboyunyastik.png",
    "assets/image/plakalik.png",
    "site_gorsel/logo.png",
    "site_gorsel/visa-master-3d-iyzico.png",
    "video/toptan-plakalik-ads-2.mp4"
  ],
  ...Array.from({ length: 28 }, (_, index) => `wp_musteri_gorsel/${String(index + 1).padStart(3, "0")}.jpg`)
];

/** public/ altından GitHub'a yüklenir */
const LOCAL_ASSET_SOURCES = {
  "assets/image/plakalik.png": path.join(root, "public", "assets", "image", "plakalik.png")
};

function legacyDownloadUrl(repoPath) {
  const file = repoPath.split("/").pop();

  if (repoPath.startsWith("wp_musteri_gorsel/")) {
    return `${LEGACY_BASE}/assets/img/wp-musteri/${file}`;
  }

  if (repoPath.startsWith("icon_gorsel/")) {
    return `${LEGACY_BASE}/assets/img/icon/${file}`;
  }

  if (repoPath.startsWith("slider_gorsel/")) {
    if (file === "isiksizoto.webp") {
      return `${LEGACY_BASE}/assets/img/slider/min/${file}`;
    }
    return `${LEGACY_BASE}/assets/img/slider/${file}`;
  }

  if (repoPath.startsWith("assets/image/")) {
    return `${LEGACY_BASE}/assets/image/${file}`;
  }

  if (repoPath.startsWith("site_gorsel/")) {
    return `${LEGACY_BASE}/assets/img/${file}`;
  }

  if (repoPath.startsWith("video/")) {
    return `${LEGACY_BASE}/assets/video/${file}`;
  }

  if (
    repoPath.startsWith("plakalik_gorsel/") ||
    repoPath.startsWith("motor_plakalik_gorsel/") ||
    repoPath.startsWith("kapiesigi_gorsel/") ||
    repoPath.startsWith("urun_gorsel/")
  ) {
    return `${LEGACY_BASE}/assets/img/urunler/${file}`;
  }

  return `${LEGACY_BASE}/${repoPath}`;
}

function api(pathname, init = {}) {
  return fetch(`https://api.github.com/repos/${OWNER}/${REPO}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "arabanaozel-sync",
      ...(init.headers || {})
    }
  });
}

async function ensureRepo() {
  const check = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json"
    }
  });

  if (check.ok) {
    return;
  }

  const create = await fetch(`https://api.github.com/user/repos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: REPO,
      description: "Arabana Ozel görsel ve medya deposu",
      private: false,
      auto_init: true
    })
  });

  if (!create.ok) {
    const text = await create.text();
    throw new Error(`Repo oluşturulamadı: ${text}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 2500));
}

async function getSha(repoPath) {
  const response = await api(`/contents/${encodeURIComponent(repoPath)}?ref=${BRANCH}`);
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    return undefined;
  }
  const data = await response.json();
  return data.sha;
}

async function uploadBinary(repoPath, buffer, message) {
  const sha = await getSha(repoPath);
  const body = {
    message,
    content: buffer.toString("base64"),
    branch: BRANCH
  };
  if (sha) {
    body.sha = sha;
  }

  const response = await api(`/contents/${encodeURIComponent(repoPath)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${repoPath} yüklenemedi (${response.status}): ${text}`);
  }
}

async function uploadReadme() {
  const readme = `# arabanaozelx_assets

Görsel ve medya deposu (GitHub CDN üzerinden servis edilir).

## Klasör yapısı

- \`plakalik_gorsel/\` — plakalık ürün görselleri
- \`motor_plakalik_gorsel/\` — motosiklet plakalık görselleri
- \`kapiesigi_gorsel/\` — kapı eşiği görselleri
- \`urun_gorsel/\` — diğer ürün görselleri
- \`slider_gorsel/\` — ana sayfa slider
- \`icon_gorsel/\` — kategori ikonları
- \`wp_musteri_gorsel/\` — müşteri galerisi
- \`site_gorsel/\` — logo ve site görselleri
- \`figures_gorsel/\` — plakalık tasarım sembolleri (SVG)
- \`video/\` — tanıtım videoları

Yeni dosya yolu örneği: \`plakalik_gorsel/otomobil-isikli-1.webp\`
`;

  await uploadBinary("README.md", Buffer.from(readme, "utf8"), "docs: klasör yapısı");
}

async function syncFigures() {
  const figuresDir = path.join(root, "public", "inc_all", "figures");
  try {
    const files = await readdir(figuresDir);
    for (const file of files) {
      if (!file.endsWith(".svg")) {
        continue;
      }
      const buffer = await readFile(path.join(figuresDir, file));
      const repoPath = `figures_gorsel/${file}`;
      await uploadBinary(repoPath, buffer, `sync local figure: ${repoPath}`);
      console.log(`OK ${repoPath} (local)`);
    }
  } catch {
    console.log("SKIP figures (yerel klasör yok, GitHub assets kullanılıyor)");
  }
}

async function downloadBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`İndirilemedi ${url} (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function loadAssetBuffer(repoPath) {
  const localPath = LOCAL_ASSET_SOURCES[repoPath];
  if (localPath && fs.existsSync(localPath)) {
    return readFile(localPath);
  }
  const url = legacyDownloadUrl(repoPath);
  return downloadBuffer(url);
}

async function main() {
  if (!TOKEN) {
    throw new Error("GITHUB_TOKEN gerekli.");
  }

  await ensureRepo();
  await uploadReadme();

  let ok = 0;
  let fail = 0;

  for (const repoPath of ASSET_MANIFEST) {
    try {
      const buffer = await loadAssetBuffer(repoPath);
      await uploadBinary(repoPath, buffer, `sync asset: ${repoPath}`);
      ok += 1;
      console.log(`OK ${repoPath}`);
    } catch (error) {
      fail += 1;
      console.error(`FAIL ${repoPath}:`, error.message);
    }
  }

  await syncFigures();

  console.log(`\nTamamlandı. Başarılı: ${ok}, Hatalı: ${fail}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
