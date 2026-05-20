import { notFound } from "next/navigation";
import { PageContent } from "@/components/page-content";
import { ProductDesigner } from "@/components/product-designer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomeData, getPageBySlug, getProductBySlug } from "@/lib/data";
import { normalizeLegacySlug } from "@/lib/paths";

export const dynamic = "force-dynamic";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const cleanSlug = normalizeLegacySlug(slug.join("/"));
  const [{ categories }, product, page] = await Promise.all([getHomeData(), getProductBySlug(cleanSlug), getPageBySlug(cleanSlug)]);

  if (!product && !page) {
    notFound();
  }

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="site-shell">
        {product ? <ProductDesigner product={product} /> : null}
        {page ? <PageContent page={page} /> : null}
        <SiteFooter />
      </main>
    </>
  );
}
