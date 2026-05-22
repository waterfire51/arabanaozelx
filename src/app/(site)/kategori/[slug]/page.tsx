import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLandingPage } from "@/components/category-landing-page";
import { getCategoryLandingData, getSiteSettings } from "@/lib/data";
import { resolveCategorySeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildCategoryItemListJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [data, settings] = await Promise.all([getCategoryLandingData(slug), getSiteSettings()]);

  if (!data) {
    return {};
  }

  return buildPageMetadata(resolveCategorySeo(data.category, data.products, settings));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryLandingData(slug);

  if (!data) {
    notFound();
  }

  const jsonLd = [
    buildCategoryItemListJsonLd(data.category, data.products),
    buildBreadcrumbJsonLd([
      { name: "Anasayfa", path: "/" },
      { name: data.category.name, path: `/kategori/${data.category.slug}` }
    ])
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryLandingPage category={data.category} products={data.products} />
    </>
  );
}
