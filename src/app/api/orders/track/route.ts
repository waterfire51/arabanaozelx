import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrderStatusLabel } from "@/lib/order-status";
import { normalizeOrderTrackPhone } from "@/lib/order-track-url";

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Sipariş sorgulama için PostgreSQL bağlantısı gerekli." }, { status: 503 });
  }

  const url = new URL(request.url);
  const orderNo = url.searchParams.get("orderNo") || "";
  const phone = url.searchParams.get("phone") || "";

  if (!orderNo || !phone) {
    return NextResponse.json({ message: "Sipariş numarası ve telefon gerekli." }, { status: 400 });
  }

  try {
    const order = await prisma.order.findFirst({
      where: { orderNo },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const phoneMatches =
      order && normalizeOrderTrackPhone(order.phone) === normalizeOrderTrackPhone(phone);

    if (!order || !phoneMatches) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({
      orderNo: order.orderNo,
      status: order.status,
      statusLabel: getOrderStatusLabel(order.status),
      total: Number(order.total),
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        product: item.product.name,
        variant: item.variantLabel,
        quantity: item.quantity
      }))
    });
  } catch {
    return NextResponse.json({ message: "Sipariş sorgulama için PostgreSQL bağlantısı gerekli." }, { status: 503 });
  }
}
