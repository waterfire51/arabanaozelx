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

export function assetPath(path: string | null | undefined) {
  if (!path) {
    return "/assets/img/ddark.png";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `/${path.replace(/^\/+/, "")}`;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(value);
}
