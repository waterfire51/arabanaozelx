import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContent } from "@/components/page-content";
import { ProductDesigner } from "@/components/product-designer";
import { getPageBySlug, getProductBySlug, getSiteSettings } from "@/lib/data";
import { normalizeLegacySlug } from "@/lib/paths";
import { resolvePageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = normalizeLegacySlug(slug.join("/"));
  const [page, settings] = await Promise.all([getPageBySlug(cleanSlug), getSiteSettings()]);

  if (!page) {
    return {};
  }

  return buildPageMetadata(resolvePageSeo(page, settings));
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const cleanSlug = normalizeLegacySlug(slug.join("/"));
  const [product, page] = await Promise.all([getProductBySlug(cleanSlug), getPageBySlug(cleanSlug)]);

  if (!product && !page) {
    notFound();
  }

  if (product) {
    return <ProductDesigner product={product} />;
  }

  return <PageContent page={page!} />;
}
