import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      where: {
        orderNo,
        phone
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({
      orderNo: order.orderNo,
      status: order.status,
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
