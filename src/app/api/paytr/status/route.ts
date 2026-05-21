import { NextResponse } from "next/server";
import { isPaytrConfigured } from "@/lib/paytr";

export async function GET() {
  return NextResponse.json({ configured: isPaytrConfigured() });
}
