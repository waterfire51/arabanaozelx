import { PrismaClient } from "@prisma/client";
import { iconCategories, seedIcons } from "../src/lib/seed-icon-data";
import { fallbackBlogPosts } from "../src/lib/fallback-blog";
import { defaultSiteSettings } from "../src/lib/site-settings";
import { contractPages } from "../src/lib/contract-pages";
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

  const slideCount = await prisma.heroSlide.count();
  if (slideCount === 0) {
    for (const [index, slide] of heroSlides.entries()) {
      await prisma.heroSlide.create({
        data: { ...slide, sortOrder: index, active: true }
      });
    }
  }

  await prisma.homeVideo.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      videoPath: "video/toptan-plakalik-ads-2.mp4",
      href: "/",
      active: true
    }
  });

  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    for (const post of fallbackBlogPosts) {
      await prisma.blogPost.create({
        data: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? null,
          body: post.body,
          coverImagePath: post.coverImagePath ?? null,
          status: "PUBLISHED",
          publishedAt: new Date(),
          metaTitle: post.metaTitle ?? null,
          metaDescription: post.metaDescription ?? null,
          metaKeywords: post.metaKeywords ?? null,
          author: post.author ?? null
        }
      });
    }
  }

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: defaultSiteSettings.siteName,
      defaultMetaTitle: defaultSiteSettings.defaultMetaTitle,
      defaultMetaDescription: defaultSiteSettings.defaultMetaDescription,
      defaultMetaKeywords: defaultSiteSettings.defaultMetaKeywords,
      titleTemplate: defaultSiteSettings.titleTemplate,
      logoPath: defaultSiteSettings.logoPath,
      faviconPath: defaultSiteSettings.faviconPath,
      contactPhone: defaultSiteSettings.contactPhone,
      contactEmail: defaultSiteSettings.contactEmail,
      contactWhatsapp: defaultSiteSettings.contactWhatsapp
    }
  });

  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    for (let index = 0; index < 28; index += 1) {
      const name = String(index + 1).padStart(3, "0");
      await prisma.galleryImage.create({
        data: {
          imagePath: `wp_musteri_gorsel/${name}.jpg`,
          caption: `Müşteri görseli ${index + 1}`,
          sortOrder: index,
          active: true
        }
      });
    }
  }

  for (const [index, page] of pages.entries()) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { ...page, sortOrder: index },
      create: { ...page, sortOrder: index, status: "PUBLISHED" }
    });
  }

  for (const [index, page] of contractPages.entries()) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        body: page.body,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        status: "PUBLISHED"
      },
      create: {
        slug: page.slug,
        title: page.title,
        body: page.body,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        status: "PUBLISHED",
        sortOrder: 10 + index
      }
    });
  }

  for (const [index, iconCategory] of iconCategories.entries()) {
    await prisma.iconCategory.upsert({
      where: { slug: iconCategory.slug },
      update: { ...iconCategory, sortOrder: index },
      create: { ...iconCategory, sortOrder: index }
    });
  }

  for (const [index, icon] of seedIcons.entries()) {
    const category = await prisma.iconCategory.findUnique({
      where: { slug: icon.categorySlug }
    });

    await prisma.icon.upsert({
      where: { filePath: icon.filePath },
      update: {
        name: icon.name,
        categoryId: category?.id,
        source: "ADMIN",
        active: true,
        sortOrder: index
      },
      create: {
        name: icon.name,
        filePath: icon.filePath,
        categoryId: category?.id,
        source: "ADMIN",
        active: true,
        sortOrder: index
      }
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
