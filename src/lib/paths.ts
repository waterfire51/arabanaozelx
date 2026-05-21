const LEGACY_SLUG_ALIASES: Record<string, string> = {
  "otodark-katalog": "katalog"
};

export function normalizeLegacySlug(input: string) {
  const clean = input
    .replace(/^\/+/, "")
    .replace(/\/index\.html$/i, "")
    .replace(/\.html$/i, "")
    .replace(/\/+$/, "");

  return LEGACY_SLUG_ALIASES[clean] ?? clean;
}

export function hrefForSlug(slug: string) {
  const clean = normalizeLegacySlug(slug);
  return clean ? `/${clean}` : "/";
}

export { assetPath } from "@/lib/assets";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(value);
}
