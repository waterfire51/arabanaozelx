import type { Metadata } from "next";
import { assetPath } from "@/lib/assets";
import { getSiteBaseUrl } from "@/lib/site-url";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string | null;
  keywords?: string | null;
  noIndex?: boolean;
  type?: "website" | "article";
};

function resolveAbsoluteImage(base: string, imagePath?: string | null) {
  if (!imagePath) {
    return undefined;
  }
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }
  const resolved = assetPath(imagePath);
  return resolved.startsWith("http") ? resolved : `${base}${resolved}`;
}

export function buildPageMetadata(input: SeoInput): Metadata {
  const base = getSiteBaseUrl();
  const url = `${base}${input.path.startsWith("/") ? input.path : `/${input.path}`}`;
  const resolvedImage = resolveAbsoluteImage(base, input.imagePath);

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords?.split(",").map((k) => k.trim()).filter(Boolean),
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      locale: "tr_TR",
      url,
      title: input.title,
      description: input.description,
      images: resolvedImage ? [{ url: resolvedImage, alt: input.title }] : undefined
    },
    twitter: {
      card: resolvedImage ? "summary_large_image" : "summary",
      title: input.title,
      description: input.description,
      images: resolvedImage ? [resolvedImage] : undefined
    }
  };
}

export function truncateText(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }
  return `${clean.slice(0, max - 1).trim()}…`;
}
