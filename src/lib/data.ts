import { cache } from "react";
import { prisma } from "./prisma";
import { fallbackCategories, fallbackHomeVideo, fallbackPages, fallbackProducts, fallbackSlides } from "./fallback";
import { normalizeLegacySlug } from "./paths";
import type { IconCatalogCategory } from "./icons";
import { assetPath } from "./assets";
import { iconCategories as fallbackIconCategories, seedIcons } from "./seed-icon-data";
import { fallbackBlogPosts } from "./fallback-blog";
import { fallbackGalleryImages, serializeGalleryImage } from "./gallery";
import { defaultSiteSettings } from "./site-settings";
import { hasDatabaseUrl, type DbFallbackReason } from "./database";
import type {
  SiteBlogPost,
  SiteCategory,
  SiteGalleryImage,
  SiteHeroSlide,
  SiteHomeVideo,
  SitePage,
  SiteProduct,
  SiteProductVariant,
  SiteSettings
} from "./types";

function toNumber(value: unknown) {
  if (value == null) {
    return 0;
  }

  return Number(value);
}

function serializeVariant(variant: {
  id?: string;
  label: string;
  quantity: number;
  unitPrice: unknown;
  shipmentPrice: unknown;
  sortOrder?: number;
}): SiteProductVariant {
  return {
    id: variant.id,
    label: variant.label,
    quantity: variant.quantity,
    unitPrice: toNumber(variant.unitPrice),
    shipmentPrice: toNumber(variant.shipmentPrice),
    sortOrder: variant.sortOrder
  };
}

function serializeProduct(product: any): SiteProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    seoBody: product.seoBody ?? null,
    imagePath: product.imagePath,
    price: toNumber(product.price),
    compareAtPrice: product.compareAtPrice ? toNumber(product.compareAtPrice) : null,
    badge: product.badge,
    metaTitle: product.metaTitle ?? null,
    metaDescription: product.metaDescription ?? null,
    metaKeywords: product.metaKeywords ?? null,
    ogImagePath: product.ogImagePath ?? null,
    active: product.active,
    featured: product.featured,
    customizable: product.customizable,
    sortOrder: product.sortOrder,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          iconPath: product.category.iconPath,
          sortOrder: product.category.sortOrder
        }
      : null,
    variants: (product.variants ?? []).map(serializeVariant)
  };
}

async function loadHomeVideo(): Promise<SiteHomeVideo> {
  try {
    const row = await prisma.homeVideo.findUnique({ where: { id: "default" } });
    if (row) {
      return { videoPath: row.videoPath, href: row.href, active: row.active };
    }
  } catch {
    // HomeVideo tablosu yoksa veya sorgu hatası — slider/ürünler yine DB'den gelir
  }
  return fallbackHomeVideo;
}

export async function getHomeData() {
  if (!hasDatabaseUrl()) {
    return {
      slides: fallbackSlides,
      homeVideo: fallbackHomeVideo,
      categories: fallbackCategories,
      products: fallbackProducts,
      usingFallback: true,
      fallbackReason: "missing_url" as DbFallbackReason
    };
  }

  try {
    const [slides, categories, products, homeVideo] = await Promise.all([
      prisma.heroSlide.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.category.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.product.findMany({
        where: { active: true, featured: true },
        include: {
          category: true,
          variants: { orderBy: { sortOrder: "asc" } }
        },
        orderBy: { sortOrder: "asc" }
      }),
      loadHomeVideo()
    ]);

    return {
      slides: slides as SiteHeroSlide[],
      homeVideo,
      categories: categories as SiteCategory[],
      products: products.map(serializeProduct),
      usingFallback: false,
      fallbackReason: undefined
    };
  } catch (error) {
    console.error("[getHomeData] Veritabanı okunamadı:", error);
    return {
      slides: fallbackSlides,
      homeVideo: fallbackHomeVideo,
      categories: fallbackCategories,
      products: fallbackProducts,
      usingFallback: true,
      fallbackReason: "connection_error" as DbFallbackReason
    };
  }
}

export async function getAdminHomeVideo() {
  if (!hasDatabaseUrl()) {
    return { homeVideo: fallbackHomeVideo, dbReady: false };
  }

  try {
    const homeVideo = await prisma.homeVideo.findUnique({ where: { id: "default" } });
    return {
      homeVideo: homeVideo
        ? { videoPath: homeVideo.videoPath, href: homeVideo.href, active: homeVideo.active }
        : fallbackHomeVideo,
      dbReady: true
    };
  } catch {
    return { homeVideo: fallbackHomeVideo, dbReady: false };
  }
}

export async function getProductBySlug(slug: string) {
  const cleanSlug = normalizeLegacySlug(slug);

  if (!hasDatabaseUrl()) {
    return fallbackProducts.find((product) => product.slug === cleanSlug) ?? null;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { slug: cleanSlug },
      include: {
        category: true,
        variants: { orderBy: { sortOrder: "asc" } }
      }
    });

    return product ? serializeProduct(product) : null;
  } catch {
    return fallbackProducts.find((product) => product.slug === cleanSlug) ?? null;
  }
}

export async function getCategoryLandingData(slug: string) {
  const cleanSlug = normalizeLegacySlug(slug);

  if (!hasDatabaseUrl()) {
    const category = fallbackCategories.find((item) => item.slug === cleanSlug) ?? null;
    const products = fallbackProducts.filter((product) => product.category?.slug === cleanSlug && product.active !== false);
    return category ? { category, products, dbReady: false } : null;
  }

  try {
    const category = await prisma.category.findFirst({
      where: { slug: cleanSlug, active: true },
      include: {
        products: {
          where: { active: true },
          include: {
            category: true,
            variants: { orderBy: { sortOrder: "asc" } }
          },
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    if (!category) {
      return null;
    }

    return {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        iconPath: category.iconPath,
        sortOrder: category.sortOrder
      },
      products: category.products.map(serializeProduct),
      dbReady: true
    };
  } catch {
    const category = fallbackCategories.find((item) => item.slug === cleanSlug) ?? null;
    const products = fallbackProducts.filter((product) => product.category?.slug === cleanSlug && product.active !== false);
    return category ? { category, products, dbReady: false } : null;
  }
}

function serializeBlogPost(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImagePath: string | null;
  status: string;
  publishedAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImagePath: string | null;
  author: string | null;
  createdAt: Date;
  updatedAt: Date;
}): SiteBlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImagePath: row.coverImagePath,
    status: row.status as SiteBlogPost["status"],
    publishedAt: row.publishedAt,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    metaKeywords: row.metaKeywords,
    ogImagePath: row.ogImagePath,
    author: row.author,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export async function getPublishedBlogPosts() {
  if (!hasDatabaseUrl()) {
    return { posts: fallbackBlogPosts, dbReady: false };
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
    });

    return {
      posts: posts.map(serializeBlogPost),
      dbReady: true
    };
  } catch (error) {
    console.error("[getPublishedBlogPosts]", error);
    return { posts: fallbackBlogPosts, dbReady: false };
  }
}

export async function getBlogPostBySlug(slug: string) {
  const cleanSlug = normalizeLegacySlug(slug);

  if (!hasDatabaseUrl()) {
    return fallbackBlogPosts.find((post) => post.slug === cleanSlug) ?? null;
  }

  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug: cleanSlug, status: "PUBLISHED" }
    });

    return post ? serializeBlogPost(post) : null;
  } catch {
    return fallbackBlogPosts.find((post) => post.slug === cleanSlug) ?? null;
  }
}

export async function getAdminBlogPosts() {
  if (!hasDatabaseUrl()) {
    return { posts: fallbackBlogPosts, dbReady: false };
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
    });

    return {
      posts: posts.map(serializeBlogPost),
      dbReady: true
    };
  } catch (error) {
    console.error("[getAdminBlogPosts]", error);
    return { posts: [], dbReady: false };
  }
}

export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasDatabaseUrl()) {
    return defaultSiteSettings;
  }

  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!row) {
      return defaultSiteSettings;
    }

    return {
      id: row.id,
      siteName: row.siteName,
      defaultMetaTitle: row.defaultMetaTitle,
      defaultMetaDescription: row.defaultMetaDescription,
      defaultMetaKeywords: row.defaultMetaKeywords,
      titleTemplate: row.titleTemplate,
      logoPath: row.logoPath,
      faviconPath: row.faviconPath,
      ogImagePath: row.ogImagePath,
      contactPhone: row.contactPhone,
      contactEmail: row.contactEmail,
      contactWhatsapp: row.contactWhatsapp
    };
  } catch (error) {
    console.error("[getSiteSettings]", error);
    return defaultSiteSettings;
  }
});

export async function getPageBySlug(slug: string) {
  const cleanSlug = normalizeLegacySlug(slug);

  if (!hasDatabaseUrl()) {
    return fallbackPages.find((page) => page.slug === cleanSlug) ?? null;
  }

  try {
    const page = await prisma.page.findFirst({
      where: { slug: cleanSlug, status: "PUBLISHED" }
    });

    return page as SitePage | null;
  } catch {
    return fallbackPages.find((page) => page.slug === cleanSlug) ?? null;
  }
}

export async function getPublishedGalleryImages() {
  if (!hasDatabaseUrl()) {
    return { images: fallbackGalleryImages(), dbReady: false };
  }

  try {
    const rows = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" }
    });

    if (rows.length === 0) {
      return { images: fallbackGalleryImages(), dbReady: true };
    }

    return {
      images: rows.map(serializeGalleryImage),
      dbReady: true
    };
  } catch (error) {
    console.error("[getPublishedGalleryImages]", error);
    return { images: fallbackGalleryImages(), dbReady: false };
  }
}

export async function getAdminGalleryImages() {
  if (!hasDatabaseUrl()) {
    return { images: fallbackGalleryImages(), dbReady: false };
  }

  try {
    const rows = await prisma.galleryImage.findMany({
      orderBy: { sortOrder: "asc" }
    });

    return {
      images: rows.map(serializeGalleryImage),
      dbReady: true
    };
  } catch (error) {
    console.error("[getAdminGalleryImages]", error);
    return { images: [], dbReady: false };
  }
}

export async function getAdminSlides() {
  if (!hasDatabaseUrl()) {
    return { slides: [], dbReady: false };
  }

  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" }
    });

    return {
      slides: slides.map((slide) => ({
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle,
        imagePath: slide.imagePath,
        href: slide.href,
        sortOrder: slide.sortOrder,
        active: slide.active
      })),
      dbReady: true
    };
  } catch (error) {
    console.error("[getAdminSlides] Veritabanı okunamadı:", error);
    return { slides: [], dbReady: false };
  }
}

export async function getAdminSummary() {
  if (!hasDatabaseUrl()) {
    return {
      products: fallbackProducts.length,
      orders: 0,
      pages: fallbackPages.length,
      slides: fallbackSlides.length,
      blogPosts: fallbackBlogPosts.length,
      galleryImages: fallbackGalleryImages().length,
      dbReady: false
    };
  }

  try {
    const [products, orders, pages, slides, blogPosts, galleryImages] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.page.count(),
      prisma.heroSlide.count(),
      prisma.blogPost.count(),
      prisma.galleryImage.count()
    ]);

    return { products, orders, pages, slides, blogPosts, galleryImages, dbReady: true };
  } catch {
    return {
      products: fallbackProducts.length,
      orders: 0,
      pages: fallbackPages.length,
      slides: fallbackSlides.length,
      blogPosts: fallbackBlogPosts.length,
      galleryImages: fallbackGalleryImages().length,
      dbReady: false
    };
  }
}

export async function getAdminProducts() {
  if (!hasDatabaseUrl()) {
    return { products: fallbackProducts, dbReady: false };
  }

  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: { orderBy: { sortOrder: "asc" } }
      },
      orderBy: { sortOrder: "asc" }
    });

    return { products: products.map(serializeProduct), dbReady: true };
  } catch {
    return { products: fallbackProducts, dbReady: false };
  }
}

export async function getAdminCategories() {
  if (!hasDatabaseUrl()) {
    return { categories: fallbackCategories, dbReady: false };
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" }
    });

    return { categories: categories as SiteCategory[], dbReady: true };
  } catch {
    return { categories: fallbackCategories, dbReady: false };
  }
}

export async function getAdminPages() {
  if (!hasDatabaseUrl()) {
    return { pages: fallbackPages, dbReady: false };
  }

  try {
    const pages = await prisma.page.findMany({
      orderBy: { sortOrder: "asc" }
    });

    return { pages: pages as SitePage[], dbReady: true };
  } catch {
    return { pages: fallbackPages, dbReady: false };
  }
}

function fallbackIconCatalog(): IconCatalogCategory[] {
  return fallbackIconCategories.map((category) => ({
    id: category.slug,
    name: category.name,
    slug: category.slug,
    coverPath: null,
    coverUrl: null,
    icons: seedIcons
      .filter((icon) => icon.categorySlug === category.slug)
      .map((icon, index) => ({
        id: `${category.slug}-${index}`,
        name: icon.name,
        filePath: icon.filePath,
        url: assetPath(icon.filePath),
        source: "ADMIN" as const
      }))
  }));
}

export async function getIconCatalog(): Promise<IconCatalogCategory[]> {
  if (!hasDatabaseUrl()) {
    return fallbackIconCatalog();
  }

  try {
    const categories = await prisma.iconCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      include: {
        icons: {
          where: { active: true, source: "ADMIN" },
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      coverPath: category.coverPath,
      coverUrl: category.coverPath ? assetPath(category.coverPath) : null,
      icons: category.icons.map((icon) => ({
        id: icon.id,
        name: icon.name,
        filePath: icon.filePath,
        url: assetPath(icon.filePath),
        source: icon.source as "ADMIN" | "CUSTOMER"
      }))
    }));
  } catch {
    return fallbackIconCatalog();
  }
}

export async function getAdminIconCategories() {
  if (!hasDatabaseUrl()) {
    return { categories: fallbackIconCatalog(), dbReady: false };
  }

  try {
    const categories = await prisma.iconCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        icons: {
          orderBy: { sortOrder: "asc" }
        },
        _count: { select: { icons: true } }
      }
    });

    return {
      categories: categories.map((category) => ({
        ...category,
        coverUrl: category.coverPath ? assetPath(category.coverPath) : null,
        icons: category.icons.map((icon) => ({
          ...icon,
          url: assetPath(icon.filePath)
        }))
      })),
      dbReady: true
    };
  } catch {
    return { categories: [], dbReady: false };
  }
}

export async function getAdminOrders() {
  if (!hasDatabaseUrl()) {
    return { orders: [], dbReady: false };
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return {
      orders: orders.map((order) => ({
        ...order,
        subtotal: toNumber(order.subtotal),
        shipmentTotal: toNumber(order.shipmentTotal),
        total: toNumber(order.total)
      })),
      dbReady: true
    };
  } catch {
    return { orders: [], dbReady: false };
  }
}
