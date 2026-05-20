import { prisma } from "./prisma";
import { fallbackCategories, fallbackPages, fallbackProducts, fallbackSlides } from "./fallback";
import { normalizeLegacySlug } from "./paths";
import type { SiteCategory, SiteHeroSlide, SitePage, SiteProduct, SiteProductVariant } from "./types";

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

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
    imagePath: product.imagePath,
    price: toNumber(product.price),
    compareAtPrice: product.compareAtPrice ? toNumber(product.compareAtPrice) : null,
    badge: product.badge,
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

export async function getHomeData() {
  if (!hasDatabaseUrl()) {
    return {
      slides: fallbackSlides,
      categories: fallbackCategories,
      products: fallbackProducts,
      usingFallback: true
    };
  }

  try {
    const [slides, categories, products] = await Promise.all([
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
      })
    ]);

    return {
      slides: slides as SiteHeroSlide[],
      categories: categories as SiteCategory[],
      products: products.map(serializeProduct),
      usingFallback: false
    };
  } catch {
    return {
      slides: fallbackSlides,
      categories: fallbackCategories,
      products: fallbackProducts,
      usingFallback: true
    };
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

export async function getAdminSummary() {
  if (!hasDatabaseUrl()) {
    return {
      products: fallbackProducts.length,
      orders: 0,
      pages: fallbackPages.length,
      dbReady: false
    };
  }

  try {
    const [products, orders, pages] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.page.count()
    ]);

    return { products, orders, pages, dbReady: true };
  } catch {
    return {
      products: fallbackProducts.length,
      orders: 0,
      pages: fallbackPages.length,
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

export async function getAdminOrders() {
  if (!hasDatabaseUrl()) {
    return { orders: [], dbReady: false };
  }

  try {
    const orders = await prisma.order.findMany({
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
