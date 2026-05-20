import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadCustomOrderIcon } from "@/lib/github-assets";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const name = String(formData.get("name") || "Özel İkon").trim();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Sadece PNG, JPG, WEBP veya SVG yükleyebilirsiniz." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Dosya 4MB sınırını aşıyor." }, { status: 400 });
    }

    const uploadId = randomUUID().slice(0, 12);
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadCustomOrderIcon({
      uploadId,
      filename: file.name || "custom-icon.png",
      buffer
    });

    if (process.env.DATABASE_URL) {
      try {
        await prisma.icon.create({
          data: {
            name,
            filePath: result.path,
            mimeType: file.type,
            source: "CUSTOMER",
            active: true
          }
        });
      } catch {
        // GitHub yüklendi; DB kaydı opsiyonel
      }
    }

    return NextResponse.json({
      path: result.path,
      url: result.publicUrl,
      name
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
