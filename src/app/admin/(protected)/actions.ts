"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { migrateLegacyAssetPath, normalizeStoredAssetPath } from "@/lib/assets";
import { slugifyBlogTitle } from "@/lib/blog";
import { isBlogHtml, sanitizeBlogHtml } from "@/lib/blog-html";
import { normalizeLegacySlug } from "@/lib/paths";
import { revalidateSitemap } from "@/lib/sitemap";
import { requireAdmin } from "@/lib/auth";

function boolValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function numberValue(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

type VariantInput = {
  label: string;
  quantity: number;
  unitPrice: number;
  shipmentPrice?: number;
};

function parseVariants(raw: string, fallbackPrice: number): VariantInput[] {
  if (!raw.trim()) {
    return [{ label: "1 Takım", quantity: 1, unitPrice: fallbackPrice, shipmentPrice: 0 }];
  }

  const parsed = JSON.parse(raw) as VariantInput[];
  if (!Array.isArray(parsed) || parsed.length === 0) {
    return [{ label: "1 Takım", quantity: 1, unitPrice: fallbackPrice, shipmentPrice: 0 }];
  }

  return parsed.map((variant) => ({
    label: String(variant.label || "Varyant"),
    quantity: Number(variant.quantity || 1),
    unitPrice: Number(variant.unitPrice || fallbackPrice),
    shipmentPrice: Number(variant.shipmentPrice || 0)
  }));
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const slug = normalizeLegacySlug(String(formData.get("slug") || ""));
  const name = String(formData.get("name") || "");
  const imagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("imagePath") || ""), slug)
  );
  const ogImagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("ogImagePath") || ""), slug)
  );
  const price = numberValue(formData.get("price"));
  const categoryId = String(formData.get("categoryId") || "");
  const variants = parseVariants(String(formData.get("variants") || ""), price);

  const payload = {
    slug,
    name,
    imagePath,
    price,
    badge: String(formData.get("badge") || "") || null,
    shortDescription: String(formData.get("shortDescription") || "") || null,
    description: String(formData.get("description") || "") || null,
    seoBody: String(formData.get("seoBody") || "") || null,
    metaTitle: String(formData.get("metaTitle") || "") || null,
    metaDescription: String(formData.get("metaDescription") || "") || null,
    metaKeywords: String(formData.get("metaKeywords") || "") || null,
    ogImagePath: ogImagePath || null,
    categoryId: categoryId || null,
    active: boolValue(formData.get("active")),
    featured: boolValue(formData.get("featured")),
    customizable: boolValue(formData.get("customizable")),
    sortOrder: numberValue(formData.get("sortOrder"))
  };

  const product = id
    ? await prisma.product.update({ where: { id }, data: payload })
    : await prisma.product.create({ data: payload });

  await prisma.productVariant.deleteMany({ where: { productId: product.id } });
  await prisma.productVariant.createMany({
    data: variants.map((variant, index) => ({
      productId: product.id,
      label: variant.label,
      quantity: variant.quantity,
      unitPrice: variant.unitPrice,
      shipmentPrice: variant.shipmentPrice ?? 0,
      sortOrder: index
    }))
  });

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/products");
  revalidateSitemap();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.product.delete({ where: { id } });
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidateSitemap();
}

export async function savePage(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const slug = normalizeLegacySlug(String(formData.get("slug") || ""));
  const returnTo = String(formData.get("returnTo") || "/admin/pages");
  const payload = {
    slug,
    title: String(formData.get("title") || ""),
    body: String(formData.get("body") || ""),
    status: String(formData.get("status") || "PUBLISHED") as "DRAFT" | "PUBLISHED",
    sortOrder: numberValue(formData.get("sortOrder")),
    metaTitle: String(formData.get("metaTitle") || "") || null,
    metaDescription: String(formData.get("metaDescription") || "") || null,
    metaKeywords: String(formData.get("metaKeywords") || "") || null
  };

  if (!payload.title.trim() || !payload.body.trim()) {
    throw new Error("Başlık ve içerik gerekli.");
  }

  if (id) {
    await prisma.page.update({ where: { id }, data: payload });
  } else {
    await prisma.page.create({ data: payload });
  }

  revalidatePath(`/${slug}`);
  revalidatePath("/admin/pages");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/gallery");
  if (slug === "galeri") {
    revalidatePath("/galeri");
  }
  revalidateSitemap();
  redirect(returnTo.startsWith("/admin") ? returnTo : "/admin/pages");
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const logoPath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("logoPath") || ""))
  );
  const faviconPath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("faviconPath") || ""))
  );
  const ogImagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("ogImagePath") || ""))
  );

  const existing = await prisma.siteSettings.findUnique({ where: { id: "default" } });

  const payload = {
    siteName: String(formData.get("siteName") || "").trim() || "Arabana Özel",
    defaultMetaTitle: String(formData.get("defaultMetaTitle") || "").trim(),
    defaultMetaDescription: String(formData.get("defaultMetaDescription") || "").trim(),
    defaultMetaKeywords: String(formData.get("defaultMetaKeywords") || "") || null,
    titleTemplate: String(formData.get("titleTemplate") || "").trim() || "%s | Arabana Özel",
    logoPath: logoPath || existing?.logoPath || "",
    faviconPath: faviconPath || existing?.faviconPath || "",
    ogImagePath: ogImagePath || existing?.ogImagePath || null,
    contactPhone: String(formData.get("contactPhone") || "") || null,
    contactEmail: String(formData.get("contactEmail") || "") || null,
    contactWhatsapp: String(formData.get("contactWhatsapp") || "").replace(/\D/g, "") || null
  };

  if (!payload.defaultMetaTitle || !payload.defaultMetaDescription) {
    throw new Error("Varsayılan SEO başlık ve açıklama gerekli.");
  }

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...payload },
    update: payload
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  revalidateSitemap();
  redirect("/admin/settings");
}

export async function saveHomeVideo(formData: FormData) {
  await requireAdmin();

  const videoPath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("videoPath") || ""))
  );

  if (!videoPath) {
    throw new Error("Video yolu gerekli.");
  }

  await prisma.homeVideo.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      videoPath,
      href: String(formData.get("href") || "") || null,
      active: boolValue(formData.get("active"))
    },
    update: {
      videoPath,
      href: String(formData.get("href") || "") || null,
      active: boolValue(formData.get("active"))
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/slides");
  redirect("/admin/slides");
}

export async function saveHeroSlide(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const imagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("imagePath") || ""))
  );

  if (!imagePath) {
    throw new Error("Slider görsel yolu gerekli.");
  }

  const payload = {
    title: String(formData.get("title") || "") || null,
    subtitle: String(formData.get("subtitle") || "") || null,
    imagePath,
    href: String(formData.get("href") || "") || null,
    sortOrder: numberValue(formData.get("sortOrder")),
    active: boolValue(formData.get("active"))
  };

  if (id) {
    await prisma.heroSlide.update({ where: { id }, data: payload });
  } else {
    await prisma.heroSlide.create({ data: payload });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/slides");
  revalidateSitemap();
  redirect("/admin/slides");
}

export async function deleteHeroSlide(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (id) {
    await prisma.heroSlide.delete({ where: { id } });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/slides");
  revalidateSitemap();
  redirect("/admin/slides");
}

export async function saveGalleryImage(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const imagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("imagePath") || ""))
  );

  if (!imagePath) {
    throw new Error("Görsel yolu gerekli.");
  }

  const payload = {
    imagePath,
    caption: String(formData.get("caption") || "") || null,
    sortOrder: numberValue(formData.get("sortOrder")),
    active: boolValue(formData.get("active"))
  };

  if (id) {
    await prisma.galleryImage.update({ where: { id }, data: payload });
  } else {
    await prisma.galleryImage.create({ data: payload });
  }

  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
  revalidateSitemap();
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (id) {
    await prisma.galleryImage.delete({ where: { id } });
  }

  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
  revalidateSitemap();
  redirect("/admin/gallery");
}

function parsePublishedAt(value: FormDataEntryValue | null, status: string) {
  const raw = String(value || "").trim();
  if (status !== "PUBLISHED") {
    return null;
  }
  if (!raw) {
    return new Date();
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function saveBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  let slug = normalizeLegacySlug(String(formData.get("slug") || ""));
  const title = String(formData.get("title") || "").trim();

  if (!title) {
    throw new Error("Başlık gerekli.");
  }

  if (!slug) {
    slug = slugifyBlogTitle(title);
  }

  const status = String(formData.get("status") || "DRAFT") as "DRAFT" | "PUBLISHED";
  const coverImagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("coverImagePath") || ""))
  );
  const ogImagePath = normalizeStoredAssetPath(
    migrateLegacyAssetPath(String(formData.get("ogImagePath") || ""))
  );

  const rawBody = String(formData.get("body") || "").trim();
  const body = isBlogHtml(rawBody) ? sanitizeBlogHtml(rawBody) : rawBody;

  const payload = {
    slug,
    title,
    excerpt: String(formData.get("excerpt") || "") || null,
    body,
    coverImagePath: coverImagePath || null,
    ogImagePath: ogImagePath || null,
    status,
    publishedAt: parsePublishedAt(formData.get("publishedAt"), status),
    metaTitle: String(formData.get("metaTitle") || "") || null,
    metaDescription: String(formData.get("metaDescription") || "") || null,
    metaKeywords: String(formData.get("metaKeywords") || "") || null,
    author: String(formData.get("author") || "") || null
  };

  if (!payload.body.trim()) {
    throw new Error("İçerik gerekli.");
  }

  if (id) {
    await prisma.blogPost.update({ where: { id }, data: payload });
  } else {
    await prisma.blogPost.create({ data: payload });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  revalidateSitemap();
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (id) {
    const post = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
    await prisma.blogPost.delete({ where: { id } });
    if (post?.slug) {
      revalidatePath(`/blog/${post.slug}`);
    }
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidateSitemap();
  redirect("/admin/blog");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as
    | "NEW"
    | "CONFIRMED"
    | "PRODUCTION"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

  if (id) {
    await prisma.order.update({ where: { id }, data: { status } });
  }

  revalidatePath("/admin/orders");
}
