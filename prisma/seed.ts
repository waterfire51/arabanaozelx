import { PrismaClient } from "@prisma/client";
import { categories, heroSlides, pages, products } from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { ...category, sortOrder: index },
      create: { ...category, sortOrder: index }
    });
  }

  for (const [index, product] of products.entries()) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug }
    });

    const savedProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        imagePath: product.imagePath,
        price: product.price,
        badge: product.badge,
        customizable: product.customizable ?? true,
        sortOrder: index,
        categoryId: category?.id,
        shortDescription: "Aracınıza özel, hızlı üretim ve kapıda ödeme avantajıyla hazırlanır.",
        description: "Yazı, renk ve sembol tercihlerinizi girerek ürünü kolayca kişiselleştirebilirsiniz."
      },
      create: {
        slug: product.slug,
        name: product.name,
        imagePath: product.imagePath,
        price: product.price,
        badge: product.badge,
        customizable: product.customizable ?? true,
        sortOrder: index,
        categoryId: category?.id,
        shortDescription: "Aracınıza özel, hızlı üretim ve kapıda ödeme avantajıyla hazırlanır.",
        description: "Yazı, renk ve sembol tercihlerinizi girerek ürünü kolayca kişiselleştirebilirsiniz."
      }
    });

    await prisma.productVariant.deleteMany({ where: { productId: savedProduct.id } });

    const base = product.variantBase ?? product.price;
    const variants = [
      { label: "1 Takım", quantity: 1, unitPrice: base, shipmentPrice: 0, sortOrder: 0 },
      { label: "2 Takım", quantity: 2, unitPrice: Math.round(base * 1.8), shipmentPrice: 0, sortOrder: 1 },
      { label: "4 Takım", quantity: 4, unitPrice: Math.round(base * 3.6), shipmentPrice: 0, sortOrder: 2 }
    ];

    await prisma.productVariant.createMany({
      data: variants.map((variant) => ({ ...variant, productId: savedProduct.id }))
    });
  }

  for (const [index, slide] of heroSlides.entries()) {
    await prisma.heroSlide.upsert({
      where: { id: `seed-slide-${index}` },
      update: { ...slide, sortOrder: index },
      create: { id: `seed-slide-${index}`, ...slide, sortOrder: index }
    });
  }

  for (const [index, page] of pages.entries()) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { ...page, sortOrder: index },
      create: { ...page, sortOrder: index }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
