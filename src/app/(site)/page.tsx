import { CategoryStrip } from "@/components/category-strip";
import { HeroSlider } from "@/components/hero-slider";
import { ProductGrid } from "@/components/product-grid";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { slides, homeVideo, categories, products, usingFallback } = await getHomeData();

  return (
    <>
      {usingFallback ? (
        <div className="site-container mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı bulunamadı; sayfa seed verisiyle ön izleme modunda çalışıyor.
        </div>
      ) : null}
      <HeroSlider slides={slides} />
      <CategoryStrip categories={categories} homeVideo={homeVideo} />
      <ProductGrid products={products} />
    </>
  );
}
