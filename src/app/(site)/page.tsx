import { CategoryStrip } from "@/components/category-strip";
import { HeroSlider } from "@/components/hero-slider";
import { ProductGrid } from "@/components/product-grid";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { slides, homeVideo, categories, products } = await getHomeData();

  return (
    <>
      <HeroSlider slides={slides} />
      <CategoryStrip categories={categories} homeVideo={homeVideo} />
      <ProductGrid products={products} />
    </>
  );
}
