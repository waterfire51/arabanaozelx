import { categories, heroSlides, pages, products } from "./seed-data";
import type { SiteCategory, SiteHeroSlide, SiteHomeVideo, SitePage, SiteProduct } from "./types";

export const fallbackHomeVideo: SiteHomeVideo = {
  videoPath: "video/toptan-plakalik-ads-2.mp4",
  href: "/",
  active: true
};

export const fallbackCategories: SiteCategory[] = categories.map((category, index) => ({
  ...category,
  sortOrder: index
}));

export const fallbackSlides: SiteHeroSlide[] = heroSlides.map((slide, index) => ({
  ...slide,
  sortOrder: index
}));

export const fallbackPages: SitePage[] = pages.map((page, index) => ({
  ...page,
  sortOrder: index
}));

export const fallbackProducts: SiteProduct[] = products.map((product, index) => {
  const category = fallbackCategories.find((item) => item.slug === product.categorySlug) ?? null;
  const base = product.variantBase ?? product.price;

  return {
    slug: product.slug,
    name: product.name,
    imagePath: product.imagePath,
    price: product.price,
    badge: product.badge ?? null,
    active: true,
    featured: true,
    customizable: product.customizable ?? true,
    sortOrder: index,
    category,
    shortDescription: "Aracınıza özel, hızlı üretim ve kapıda ödeme avantajıyla hazırlanır.",
    description: "Yazı, renk ve sembol tercihlerinizi girerek ürünü kolayca kişiselleştirebilirsiniz.",
    variants: [
      { label: "1 Takım", quantity: 1, unitPrice: base, shipmentPrice: 0, sortOrder: 0 },
      { label: "2 Takım", quantity: 2, unitPrice: Math.round(base * 1.8), shipmentPrice: 0, sortOrder: 1 },
      { label: "4 Takım", quantity: 4, unitPrice: Math.round(base * 3.6), shipmentPrice: 0, sortOrder: 2 }
    ]
  };
});
