import type { SiteCategory, SiteProduct, SiteSettings } from "@/lib/types";
import { assetPath } from "@/lib/assets";
import { truncateText } from "@/lib/seo";

/** CDN’deki eski Otodark dosyaları — panelden yüklenen path kullanılmalı */
export const LEGACY_BRAND_ASSET_PATHS = new Set(["site_gorsel/logo.png", "site_gorsel/ddark.png"]);

export type SiteBranding = {
  logoUrl: string | null;
  faviconUrl: string | null;
  siteName: string;
  settings: SiteSettings;
};

export const emptySiteBranding: SiteBranding = {
  logoUrl: null,
  faviconUrl: null,
  siteName: "Arabana Özel",
  settings: {
    siteName: "Arabana Özel",
    defaultMetaTitle: "Arabana Özel | Kişiye Özel Oto Aksesuar",
    defaultMetaDescription:
      "Kişiye özel oto plakalık, anahtarlık, araç içi aksesuar ve sipariş yönetimi.",
    titleTemplate: "%s | Arabana Özel",
    logoPath: "",
    faviconPath: ""
  }
};

export const CONTACT_PAGE_SLUG = "iletisim";

export const CONTRACT_PAGE_SLUGS = [
  "sozlesmeler",
  "gizlilik-sozlesmesi",
  "kvkk",
  "satis-sozlesmesi",
  "iade-ve-ipal-sozlesmesi"
] as const;

export const defaultSiteSettings: SiteSettings = {
  id: "default",
  siteName: "Arabana Özel",
  defaultMetaTitle: "Arabana Özel | Kişiye Özel Oto Aksesuar",
  defaultMetaDescription:
    "Kişiye özel oto plakalık, anahtarlık, araç içi aksesuar ve sipariş yönetimi.",
  defaultMetaKeywords: "oto aksesuar, plakalık, kişiye özel plakalık, arabana özel",
  titleTemplate: "%s | Arabana Özel",
  logoPath: "",
  faviconPath: "",
  ogImagePath: null,
  contactPhone: "0(549) 574 20 25",
  contactEmail: "info@arabanaozel.com",
  contactWhatsapp: "905495742025"
};

export function applyTitleTemplate(template: string, pageTitle: string, siteName: string) {
  const withSite = template.replace("%s", pageTitle).replace("%site", siteName);
  if (withSite.includes(siteName) || withSite === pageTitle) {
    return withSite;
  }
  return `${pageTitle} | ${siteName}`;
}

function brandImagePathForSeo(settings: SiteSettings) {
  if (settings.ogImagePath?.trim()) {
    return settings.ogImagePath;
  }
  const logo = settings.logoPath?.trim();
  if (logo && !LEGACY_BRAND_ASSET_PATHS.has(logo.replace(/^\/+/, ""))) {
    return logo;
  }
  return null;
}

export function resolveSiteSeo(settings: SiteSettings = defaultSiteSettings) {
  return {
    title: settings.defaultMetaTitle,
    description: settings.defaultMetaDescription,
    path: "/",
    imagePath: brandImagePathForSeo(settings),
    keywords: settings.defaultMetaKeywords
  };
}

export function resolvePageSeo(
  page: { slug: string; title: string; body: string; metaTitle?: string | null; metaDescription?: string | null; metaKeywords?: string | null },
  settings: SiteSettings = defaultSiteSettings
) {
  const title = page.metaTitle?.trim() || page.title;
  const description =
    page.metaDescription?.trim() || truncateText(page.body.replace(/\n+/g, " "), 160);
  const formattedTitle = applyTitleTemplate(settings.titleTemplate, title, settings.siteName);

  return {
    title: formattedTitle,
    description,
    path: `/${page.slug}`,
    imagePath: brandImagePathForSeo(settings),
    keywords: page.metaKeywords || settings.defaultMetaKeywords
  };
}

function cleanDescriptionText(value: string | null | undefined) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveProductSeo(product: SiteProduct, settings: SiteSettings = defaultSiteSettings) {
  const baseTitle = product.metaTitle?.trim() || `${product.name} | Kişiye Özel Oto Aksesuar`;
  const descriptionSource =
    product.metaDescription?.trim() ||
    product.shortDescription?.trim() ||
    product.description?.trim() ||
    product.seoBody?.trim() ||
    `${product.name} modellerini Arabana Özel'de kişiselleştirin. Hızlı üretim, güvenli ödeme ve Türkiye geneli kargo avantajıyla sipariş verin.`;
  const formattedTitle = applyTitleTemplate(settings.titleTemplate, baseTitle, settings.siteName);

  return {
    title: formattedTitle,
    description: truncateText(cleanDescriptionText(descriptionSource), 160),
    path: `/${product.slug}`,
    imagePath: product.ogImagePath || product.imagePath || brandImagePathForSeo(settings),
    keywords:
      product.metaKeywords ||
      [product.name, product.category?.name, "kişiye özel oto aksesuar", "arabana özel"].filter(Boolean).join(", ")
  };
}

export function resolveCategorySeo(
  category: SiteCategory,
  products: SiteProduct[] = [],
  settings: SiteSettings = defaultSiteSettings
) {
  const title = `${category.name} Modelleri ve Fiyatları`;
  const productNames = products
    .slice(0, 4)
    .map((product) => product.name)
    .join(", ");
  const description = productNames
    ? `${category.name} kategorisinde ${productNames} ve daha fazla kişiye özel oto aksesuar modelini inceleyin. Hızlı üretim ve güvenli sipariş avantajı.`
    : `${category.name} kategorisindeki kişiye özel oto aksesuar modellerini inceleyin. Hızlı üretim ve güvenli sipariş avantajı.`;

  return {
    title: applyTitleTemplate(settings.titleTemplate, title, settings.siteName),
    description: truncateText(description, 160),
    path: `/kategori/${category.slug}`,
    imagePath: category.iconPath || products[0]?.imagePath || brandImagePathForSeo(settings),
    keywords: [category.name, "oto aksesuar", "kişiye özel", "arabana özel"].filter(Boolean).join(", ")
  };
}

export function normalizeWhatsAppNumber(value: string | null | undefined) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  if (digits.startsWith("90")) {
    return digits;
  }
  if (digits.startsWith("0")) {
    return `90${digits.slice(1)}`;
  }
  return `90${digits}`;
}

export function buildWhatsAppUrl(
  phone: string | null | undefined,
  message = "Merhaba, Arabana Özel üzerinden yazıyorum. Bilgi almak istiyorum."
) {
  const normalized = normalizeWhatsAppNumber(phone);
  if (!normalized) {
    return null;
  }
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function brandingAssetUrl(path: string | null | undefined) {
  const clean = path?.trim();
  if (!clean || LEGACY_BRAND_ASSET_PATHS.has(clean.replace(/^\/+/, ""))) {
    return null;
  }

  const url = assetPath(clean, undefined, { fallback: null });
  return url || null;
}

export function resolveSiteBranding(settings: SiteSettings): SiteBranding {
  return {
    logoUrl: brandingAssetUrl(settings.logoPath),
    faviconUrl: brandingAssetUrl(settings.faviconPath),
    siteName: settings.siteName,
    settings
  };
}
