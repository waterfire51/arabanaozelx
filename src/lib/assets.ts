const DEFAULT_ASSETS_BASE =
  "https://raw.githubusercontent.com/waterfire51/arabanaozelx_assets/main";

export const ASSET_FOLDERS = [
  "plakalik_gorsel",
  "motor_plakalik_gorsel",
  "kapiesigi_gorsel",
  "urun_gorsel",
  "slider_gorsel",
  "icon_gorsel",
  "wp_musteri_gorsel",
  "site_gorsel",
  "figures_gorsel",
  "ikon_kategori_gorsel",
  "ikon_kategori_kapak",
  "ozel_ikon_gorsel",
  "video"
] as const;

export type AssetFolder = (typeof ASSET_FOLDERS)[number];

export function assetsBaseUrl() {
  return (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || DEFAULT_ASSETS_BASE).replace(/\/$/, "");
}

export function githubAssetsOwner() {
  return process.env.GITHUB_ASSETS_OWNER || "waterfire51";
}

export function githubAssetsRepo() {
  return process.env.GITHUB_ASSETS_REPO || "arabanaozelx_assets";
}

export function githubAssetsToken() {
  return process.env.GITHUB_TOKEN || "";
}

export function resolveProductAssetFolder(slug: string): AssetFolder {
  const normalized = slug.replace(/^\/+/, "").toLowerCase();

  if (normalized.startsWith("plplakalik/motor") || normalized.startsWith("plakalik/motor")) {
    return "motor_plakalik_gorsel";
  }

  if (
    normalized.startsWith("plplakalik/") ||
    normalized.startsWith("plakalik/") ||
    normalized === "showroom"
  ) {
    return "plakalik_gorsel";
  }

  if (normalized === "plkapiesigi" || normalized === "kapiesigi") {
    return "kapiesigi_gorsel";
  }

  return "urun_gorsel";
}

export function normalizeStoredAssetPath(path: string) {
  return path.replace(/^\/+/, "").trim();
}

export function migrateLegacyAssetPath(path: string, slug?: string) {
  const clean = normalizeStoredAssetPath(path);

  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }

  if (ASSET_FOLDERS.some((folder) => clean.startsWith(`${folder}/`))) {
    return clean;
  }

  const basename = clean.split("/").pop() || clean;

  if (clean.startsWith("assets/img/urunler/")) {
    const folder = slug ? resolveProductAssetFolder(slug) : "urun_gorsel";
    return `${folder}/${basename}`;
  }

  if (clean.startsWith("assets/img/slider/min/") || clean.startsWith("assets/img/slider/")) {
    return `slider_gorsel/${basename}`;
  }

  if (clean.startsWith("assets/img/icon/")) {
    return `icon_gorsel/${basename}`;
  }

  if (clean.startsWith("assets/img/wp-musteri/")) {
    return `wp_musteri_gorsel/${basename}`;
  }

  if (clean.startsWith("assets/img/")) {
    return `site_gorsel/${basename}`;
  }

  if (clean.startsWith("assets/video/")) {
    return `video/${basename}`;
  }

  if (clean.startsWith("inc_all/figures/")) {
    return `figures_gorsel/${basename}`;
  }

  return clean;
}

export function buildProductAssetPath(slug: string, filename: string) {
  const folder = resolveProductAssetFolder(slug);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `${folder}/${safeName}`;
}

/** Plakalık tasarım önizlemesi — public/assets/image (site kökünden servis) */
export const PLATE_FRAME_IMAGE = "/assets/image/plakalik.png";
export const PLATE_FRAME_MOTOR_IMAGE = "/assets/image/plakalik-motor.png";

type AssetPathOptions = {
  /** Ürün görselleri için varsayılan; marka görsellerinde `null` verin */
  fallback?: string | null;
};

export function assetPath(path: string | null | undefined, slug?: string, options?: AssetPathOptions) {
  const fallback =
    options && "fallback" in options
      ? options.fallback ?? ""
      : `${assetsBaseUrl()}/site_gorsel/logo.png`;

  if (!path) {
    return fallback ?? "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const clean = normalizeStoredAssetPath(path);

  if (clean.startsWith("assets/image/") || clean.startsWith("uploads/")) {
    return `/${clean}`;
  }

  const resolved = migrateLegacyAssetPath(clean, slug);
  return `${assetsBaseUrl()}/${normalizeStoredAssetPath(resolved)}`;
}

export function plateFrameImagePath(productSlug?: string) {
  if (productSlug?.includes("motor")) {
    return PLATE_FRAME_MOTOR_IMAGE;
  }
  return PLATE_FRAME_IMAGE;
}
