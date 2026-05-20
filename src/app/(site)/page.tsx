import { CategoryStrip } from "@/components/category-strip";
import { HeroSlider } from "@/components/hero-slider";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { slides, categories, products, usingFallback } = await getHomeData();

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="site-shell">
        {usingFallback ? (
          <div className="site-container mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
            PostgreSQL bağlantısı bulunamadı; sayfa seed verisiyle ön izleme modunda çalışıyor.
          </div>
        ) : null}
        <HeroSlider slides={slides} />
        <CategoryStrip categories={categories} />
        <ProductGrid products={products} />
        <SiteFooter />
      </main>
    </>
  );
}
