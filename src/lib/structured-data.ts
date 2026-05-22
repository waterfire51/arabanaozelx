import { assetPath } from "@/lib/assets";
import { getSiteBaseUrl } from "@/lib/site-url";
import type { SiteBlogPost, SiteCategory, SiteProduct, SiteSettings } from "@/lib/types";

function absoluteUrl(path: string) {
  const base = getSiteBaseUrl();
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteAsset(path: string | null | undefined, fallbackSlug?: string) {
  if (!path) {
    return undefined;
  }
  return absoluteUrl(assetPath(path, fallbackSlug));
}

function cleanText(value: string | null | undefined) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildOrganizationJsonLd(settings: SiteSettings) {
  const base = getSiteBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: base,
    logo: absoluteAsset(settings.logoPath),
    email: settings.contactEmail || undefined,
    telephone: settings.contactPhone || settings.contactWhatsapp || undefined
  };
}

export function buildProductJsonLd(product: SiteProduct, settings: SiteSettings) {
  const base = getSiteBaseUrl();
  const url = `${base}/${product.slug}`;
  const description = cleanText(
    product.metaDescription || product.shortDescription || product.description || product.seoBody
  );

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: description || `${product.name} - ${settings.siteName}`,
    image: absoluteAsset(product.imagePath, product.slug),
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: settings.siteName
    },
    category: product.category?.name || undefined,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "TRY",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    }
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  const base = getSiteBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path.startsWith("/") ? item.path : `/${item.path}`}`
    }))
  };
}

export function buildCategoryItemListJsonLd(category: SiteCategory, products: SiteProduct[]) {
  const base = getSiteBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} ürünleri`,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${base}/${product.slug}`,
      name: product.name
    }))
  };
}

export function buildBlogPostingJsonLd(post: SiteBlogPost, settings: SiteSettings) {
  const cover = absoluteAsset(post.coverImagePath || post.ogImagePath || settings.ogImagePath);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: cover,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: settings.siteName },
    publisher: buildOrganizationJsonLd(settings),
    mainEntityOfPage: articleUrl
  };
}
