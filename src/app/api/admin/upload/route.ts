import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { ASSET_FOLDERS, type AssetFolder } from "@/lib/assets";
import { uploadAssetToGithub, uploadProductImage } from "@/lib/github-assets";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4"
]);

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = String(formData.get("slug") || "");
    const folder = String(formData.get("folder") || "") as AssetFolder;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Desteklenmeyen dosya türü." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Dosya 8MB sınırını aşıyor." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name || "upload.bin";

    let result;

    if (slug) {
      result = await uploadProductImage({ slug, filename, buffer });
    } else {
      if (!ASSET_FOLDERS.includes(folder)) {
        return NextResponse.json({ error: "Slug veya geçerli klasör gerekli." }, { status: 400 });
      }

      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
      const repoPath = `${folder}/${safeName}`;
      result = await uploadAssetToGithub({
        repoPath,
        buffer,
        message: `admin upload: ${repoPath}`
      });
    }

    return NextResponse.json({
      path: result.path,
      url: result.publicUrl
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
