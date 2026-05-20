import { assetPath, normalizeStoredAssetPath } from "@/lib/assets";

export const ICON_CATEGORY_FOLDER = "ikon_kategori_gorsel";
export const ICON_CATEGORY_COVER_FOLDER = "ikon_kategori_kapak";
export const CUSTOM_ICON_FOLDER = "ozel_ikon_gorsel";

export type IconCatalogItem = {
  id: string;
  name: string;
  filePath: string;
  url: string;
  source: "ADMIN" | "CUSTOMER";
};

export type IconCatalogCategory = {
  id: string;
  name: string;
  slug: string;
  coverPath?: string | null;
  coverUrl?: string | null;
  icons: IconCatalogItem[];
};

export function buildCategoryCoverPath(categorySlug: string, filename: string) {
  const safeCategory = categorySlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `${ICON_CATEGORY_COVER_FOLDER}/${safeCategory}/${safeName}`;
}

export function buildCategoryIconPath(categorySlug: string, filename: string) {
  const safeCategory = categorySlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `${ICON_CATEGORY_FOLDER}/${safeCategory}/${safeName}`;
}

export function buildCustomIconPath(uploadId: string, filename: string) {
  const safeId = uploadId.replace(/[^a-zA-Z0-9._-]/g, "-");
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `${CUSTOM_ICON_FOLDER}/${safeId}/${safeName}`;
}

/** Eski siparişlerde sadece dosya adı (siyah) veya tam yol desteklenir */
export function resolveSymbolAssetPath(symbol: string) {
  const clean = normalizeStoredAssetPath(symbol);
  if (!clean) {
    return assetPath(`${ICON_CATEGORY_FOLDER}/genel/bos.svg`);
  }
  if (clean.includes("/")) {
    return assetPath(clean);
  }
  return assetPath(`figures_gorsel/${clean}.svg`);
}
