"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { normalizeLegacySlug } from "@/lib/paths";

function boolValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function numberValue(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function saveIconCategory(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const slug = normalizeLegacySlug(String(formData.get("slug") || ""));
  const payload = {
    name: String(formData.get("name") || ""),
    slug,
    sortOrder: numberValue(formData.get("sortOrder")),
    active: boolValue(formData.get("active"))
  };

  if (id) {
    await prisma.iconCategory.update({ where: { id }, data: payload });
  } else {
    await prisma.iconCategory.create({ data: payload });
  }

  revalidatePath("/admin/icons");
  revalidatePath("/");
  redirect("/admin/icons");
}

export async function deleteIconCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.iconCategory.delete({ where: { id } });
  }

  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}

export async function deleteIcon(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  if (id) {
    await prisma.icon.delete({ where: { id } });
  }

  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}

export async function updateIconMeta(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) {
    redirect("/admin/icons");
  }

  await prisma.icon.update({
    where: { id },
    data: {
      name: String(formData.get("name") || ""),
      active: boolValue(formData.get("active")),
      sortOrder: numberValue(formData.get("sortOrder"))
    }
  });

  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}
