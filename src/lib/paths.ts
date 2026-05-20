export function normalizeLegacySlug(input: string) {
  return input
    .replace(/^\/+/, "")
    .replace(/\/index\.html$/i, "")
    .replace(/\.html$/i, "")
    .replace(/\/+$/, "");
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
