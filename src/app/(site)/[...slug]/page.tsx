import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContent } from "@/components/page-content";
import { ProductDesigner } from "@/components/product-designer";
import { getPageBySlug, getProductBySlug, getSiteSettings } from "@/lib/data";
import { normalizeLegacySlug } from "@/lib/paths";
import { resolvePageSeo, resolveProductSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = normalizeLegacySlug(slug.join("/"));
  const [product, page, settings] = await Promise.all([
    getProductBySlug(cleanSlug),
    getPageBySlug(cleanSlug),
    getSiteSettings()
  ]);

  if (product) {
    return buildPageMetadata(resolveProductSeo(product, settings));
  }

  if (page) {
    return buildPageMetadata(resolvePageSeo(page, settings));
  }

  return {};
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const cleanSlug = normalizeLegacySlug(slug.join("/"));
  const [product, page, settings] = await Promise.all([
    getProductBySlug(cleanSlug),
    getPageBySlug(cleanSlug),
    getSiteSettings()
  ]);

  if (!product && !page) {
    notFound();
  }

  if (product) {
    const jsonLd = [
      buildProductJsonLd(product, settings),
      buildBreadcrumbJsonLd([
        { name: "Anasayfa", path: "/" },
        ...(product.category ? [{ name: product.category.name, path: `/kategori/${product.category.slug}` }] : []),
        { name: product.name, path: `/${product.slug}` }
      ])
    ];

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProductDesigner product={product} />
      </>
    );
  }

  return <PageContent page={page!} />;
}
