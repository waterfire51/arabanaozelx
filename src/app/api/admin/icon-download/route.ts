import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { resolveSymbolAssetPath } from "@/lib/icons";

function safeFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "ikon";
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const path = String(searchParams.get("path") || "").trim();
  const filename = safeFilename(String(searchParams.get("filename") || "ikon"));

  if (!path) {
    return NextResponse.json({ error: "İkon yolu gerekli." }, { status: 400 });
  }

  const url = resolveSymbolAssetPath(path);

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ error: "Görsel bulunamadı." }, { status: 404 });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({ error: "İndirilemedi." }, { status: 502 });
  }
}
