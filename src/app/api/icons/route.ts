import { NextResponse } from "next/server";
import { getIconCatalog } from "@/lib/data";

export async function GET() {
  const catalog = await getIconCatalog();
  return NextResponse.json({ categories: catalog });
}
