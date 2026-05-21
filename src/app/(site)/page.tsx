import { CategoryStrip } from "@/components/category-strip";
import { DbFallbackBanner } from "@/components/db-fallback-banner";
import { HeroSlider } from "@/components/hero-slider";
import { ProductGrid } from "@/components/product-grid";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { slides, homeVideo, categories, products, usingFallback, fallbackReason } = await getHomeData();

  return (
    <>
      {usingFallback && fallbackReason ? <DbFallbackBanner reason={fallbackReason} /> : null}
      <HeroSlider slides={slides} />
      <CategoryStrip categories={categories} homeVideo={homeVideo} />
      <ProductGrid products={products} />
    </>
  );
}
