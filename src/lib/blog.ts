import type { SiteBlogPost } from "@/lib/types";
import { truncateText } from "@/lib/seo";

export function slugifyBlogTitle(title: string) {
  return title
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatBlogDate(value: string | Date | null | undefined) {
  if (!value) {
    return "";
  }
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function blogPostHref(slug: string) {
  return `/blog/${slug}`;
}

export function resolveBlogSeo(post: SiteBlogPost, siteName = "Arabana Özel") {
  const title = post.metaTitle?.trim() || post.title;
  const description =
    post.metaDescription?.trim() || post.excerpt?.trim() || truncateText(post.body.replace(/\n+/g, " "), 160);
  const imagePath = post.ogImagePath || post.coverImagePath;

  return {
    title: title.includes(siteName) ? title : `${title} | ${siteName}`,
    description,
    path: blogPostHref(post.slug),
    imagePath,
    keywords: post.metaKeywords,
    noIndex: post.status !== "PUBLISHED",
    type: "article" as const
  };
}
