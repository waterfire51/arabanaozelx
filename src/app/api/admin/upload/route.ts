import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { ASSET_FOLDERS, githubAssetsToken, type AssetFolder } from "@/lib/assets";
import { uploadLocalAsset } from "@/lib/local-assets";
import { uploadAssetToGithub, uploadProductImage } from "@/lib/github-assets";

const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4"
]);

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase() || "upload.bin";
}

async function uploadToFolder(folder: AssetFolder, filename: string, buffer: Buffer) {
  const safeName = safeFilename(filename);
  const repoPath = `${folder}/${safeName}`;

  if (githubAssetsToken()) {
    try {
      return await uploadAssetToGithub({
        repoPath,
        buffer,
        message: `admin upload: ${repoPath}`
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (!message.includes("GITHUB_TOKEN")) {
        try {
          return await uploadLocalAsset({ folder, filename, buffer });
        } catch {
          throw error;
        }
      }
      throw error;
    }
  }

  return uploadLocalAsset({ folder, filename, buffer });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = String(formData.get("slug") || "").trim();
    const folder = String(formData.get("folder") || "").trim() as AssetFolder;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const mime = file.type || (file.name.endsWith(".mp4") ? "video/mp4" : "");
    if (!ALLOWED_TYPES.has(mime)) {
      return NextResponse.json(
        { error: `Desteklenmeyen dosya türü (${mime || "bilinmiyor"}). JPG, PNG, WebP, GIF veya MP4 kullanın.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Dosya 12MB sınırını aşıyor." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name || "upload.bin";

    let result;

    if (slug) {
      if (githubAssetsToken()) {
        try {
          result = await uploadProductImage({ slug, filename, buffer });
        } catch {
          result = await uploadLocalAsset({ folder: "urun_gorsel", filename, buffer });
        }
      } else {
        result = await uploadLocalAsset({ folder: "urun_gorsel", filename, buffer });
      }
    } else {
      if (!ASSET_FOLDERS.includes(folder)) {
        return NextResponse.json({ error: "Geçerli klasör seçilmedi (ör. slider_gorsel)." }, { status: 400 });
      }

      result = await uploadToFolder(folder, filename, buffer);
    }

    return NextResponse.json({
      path: result.path,
      url: result.publicUrl,
      storage: result.publicUrl.startsWith("/uploads/") ? "local" : "github"
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
