import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = new Set(["NEW", "CONFIRMED", "PRODUCTION", "SHIPPED", "DELIVERED", "CANCELLED"]);

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Veritabanı bağlantısı yok." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const id = String(body.id || "");
    const status = String(body.status || "");

    if (!id || !VALID_STATUSES.has(status)) {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status: status as never }
    });

    revalidatePath("/admin/orders");

    return NextResponse.json({
      ok: true,
      status: order.status
    });
  } catch {
    return NextResponse.json({ error: "Durum güncellenemedi." }, { status: 500 });
  }
}
