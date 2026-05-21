import type { SiteSettings } from "@/lib/types";
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
