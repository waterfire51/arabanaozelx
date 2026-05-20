"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { migrateLegacyAssetPath, normalizeStoredAssetPath } from "@/lib/assets";
import { normalizeLegacySlug } from "@/lib/paths";
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
}

export async function savePage(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const slug = normalizeLegacySlug(String(formData.get("slug") || ""));
  const payload = {
    slug,
    title: String(formData.get("title") || ""),
    body: String(formData.get("body") || ""),
    status: String(formData.get("status") || "PUBLISHED") as "DRAFT" | "PUBLISHED",
    sortOrder: numberValue(formData.get("sortOrder"))
  };

  if (id) {
    await prisma.page.update({ where: { id }, data: payload });
  } else {
    await prisma.page.create({ data: payload });
  }

  revalidatePath(`/${slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as "NEW" | "CONFIRMED" | "PRODUCTION" | "SHIPPED" | "CANCELLED";

  if (id) {
    await prisma.order.update({ where: { id }, data: { status } });
  }

  revalidatePath("/admin/orders");
}
