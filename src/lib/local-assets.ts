import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { AssetFolder } from "@/lib/assets";

export function safeUploadFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase() || ".bin";
  const base = path
    .basename(filename, path.extname(filename))
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase()
    .slice(0, 80);
  const stamp = Date.now().toString(36);
  return `${base || "dosya"}-${stamp}${ext}`;
}

/** GitHub token yoksa veya uzak yükleme başarısızsa public/uploads altına kaydeder */
export async function uploadLocalAsset(params: { folder: AssetFolder; filename: string; buffer: Buffer }) {
  const safeName = safeUploadFilename(params.filename);
  const relativePath = `uploads/${params.folder}/${safeName}`;
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, params.buffer);

  const webPath = relativePath.replace(/\\/g, "/");
  return {
    path: webPath,
    publicUrl: `/${webPath}`
  };
}
