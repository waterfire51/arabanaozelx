import type { MetadataRoute } from "next";
import { revalidatePath } from "next/cache";
import { blogPostHref } from "@/lib/blog";
import { hasDatabaseUrl } from "@/lib/database";
import { fallbackBlogPosts } from "@/lib/fallback-blog";
import { fallbackPages, fallbackProducts } from "@/lib/fallback";
import { hrefForSlug } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { getSiteBaseUrl } from "@/lib/site-url";

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  base: string,
  path: string,
  lastModified: Date,
  options?: { changeFrequency?: SitemapEntry["changeFrequency"]; priority?: number }
): SitemapEntry {
  const normalized = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  const url = `${base.replace(/\/$/, "")}${normalized}`;
  return {
    url,
    lastModified,
    changeFrequency: options?.changeFrequency ?? "weekly",
    priority: options?.priority ?? 0.6
  };
}

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: SitemapEntry["changeFrequency"] }> = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/blog", priority: 0.85, changeFrequency: "daily" },
  { path: "/galeri", priority: 0.75, changeFrequency: "weekly" },
  { path: "/kargo-takip", priority: 0.5, changeFrequency: "monthly" }
];

/** Google / Next sitemap.xml — her istekte veya revalidate sonrası güncel */
export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteBaseUrl();
  const now = new Date();
  const urls: SitemapEntry[] = STATIC_ROUTES.map((route) => entry(base, route.path, now, route));

  if (!hasDatabaseUrl()) {
    for (const product of fallbackProducts.filter((p) => p.active)) {
      urls.push(entry(base, hrefForSlug(product.slug), now, { priority: 0.8, changeFrequency: "weekly" }));
    }
    for (const page of fallbackPages) {
      urls.push(entry(base, hrefForSlug(page.slug), now, { priority: 0.6, changeFrequency: "monthly" }));
    }
    for (const post of fallbackBlogPosts) {
      urls.push(
        entry(base, blogPostHref(post.slug), post.updatedAt ? new Date(post.updatedAt) : now, {
          priority: 0.7,
          changeFrequency: "weekly"
        })
      );
    }
    return dedupeSitemap(urls);
  }

  try {
    const [products, pages, posts] = await Promise.all([
      prisma.product.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true }
      }),
      prisma.page.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true }
      }),
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, publishedAt: true }
      })
    ]);

    for (const product of products) {
      urls.push(
        entry(base, hrefForSlug(product.slug), product.updatedAt, { priority: 0.85, changeFrequency: "weekly" })
      );
    }

    for (const page of pages) {
      urls.push(entry(base, hrefForSlug(page.slug), page.updatedAt, { priority: 0.65, changeFrequency: "monthly" }));
    }

    for (const post of posts) {
      urls.push(
        entry(base, blogPostHref(post.slug), post.updatedAt ?? post.publishedAt ?? now, {
          priority: 0.75,
          changeFrequency: "weekly"
        })
      );
    }
  } catch (error) {
    console.error("[sitemap] Veritabanı okunamadı:", error);
  }

  return dedupeSitemap(urls);
}

function dedupeSitemap(urls: SitemapEntry[]) {
  const seen = new Set<string>();
  return urls.filter((item) => {
    if (seen.has(item.url)) {
      return false;
    }
    seen.add(item.url);
    return true;
  });
}

/** Admin kayıt sonrası sitemap önbelleğini yenile */
export function revalidateSitemap() {
  revalidatePath("/sitemap.xml");
}
