import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadCategoryCover } from "@/lib/github-assets";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const categoryId = String(formData.get("categoryId") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: "Kategori gerekli." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Desteklenmeyen dosya türü." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Dosya 4MB sınırını aşıyor." }, { status: 400 });
    }

    const category = await prisma.iconCategory.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json({ error: "Kategori bulunamadı." }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadCategoryCover({
      categorySlug: category.slug,
      filename: file.name || "kapak.webp",
      buffer
    });

    const updated = await prisma.iconCategory.update({
      where: { id: categoryId },
      data: { coverPath: upload.path }
    });

    return NextResponse.json({
      coverPath: updated.coverPath,
      coverUrl: upload.publicUrl
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
