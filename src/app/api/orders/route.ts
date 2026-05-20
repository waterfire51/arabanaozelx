import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function orderNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `OD-${stamp}-${random}`;
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "Sipariş kaydı için PostgreSQL bağlantısı gerekli. DATABASE_URL ve Prisma migrate/seed adımlarını tamamlayın." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const product = body.productId
      ? await prisma.product.findUnique({
          where: { id: String(body.productId) },
          include: { variants: true }
        })
      : await prisma.product.findUnique({
          where: { slug: String(body.productSlug || "") },
          include: { variants: true }
        });

    if (!product) {
      return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
    }

    const selectedVariant =
      product.variants.find((variant) => variant.label === body.variant?.label) ?? product.variants[0];

    if (!selectedVariant) {
      return NextResponse.json({ message: "Ürün varyantı bulunamadı." }, { status: 400 });
    }

    const customer = body.customer ?? {};
    const requiredFields = ["firstName", "lastName", "phone", "address", "city", "district"];
    const missing = requiredFields.some((field) => !String(customer[field] || "").trim());

    if (missing) {
      return NextResponse.json({ message: "Lütfen kargo bilgilerini eksiksiz doldurun." }, { status: 400 });
    }

    const subtotal = Number(selectedVariant.unitPrice);
    const shipmentTotal = Number(selectedVariant.shipmentPrice);
    const total = subtotal + shipmentTotal;
    const orderNo = orderNumber();

    const order = await prisma.order.create({
      data: {
        orderNo,
        customerFirstName: String(customer.firstName),
        customerLastName: String(customer.lastName),
        phone: String(customer.phone),
        city: String(customer.city),
        district: String(customer.district),
        address: String(customer.address),
        note: String(customer.note || "") || null,
        subtotal,
        shipmentTotal,
        total,
        items: {
          create: {
            productId: product.id,
            variantLabel: selectedVariant.label,
            quantity: selectedVariant.quantity,
            unitPrice: selectedVariant.unitPrice,
            total: subtotal,
            design: body.designs ?? []
          }
        }
      }
    });

    return NextResponse.json({ orderNo: order.orderNo });
  } catch {
    return NextResponse.json(
      { message: "Sipariş kaydı için PostgreSQL bağlantısı gerekli. DATABASE_URL ve Prisma migrate/seed adımlarını tamamlayın." },
      { status: 503 }
    );
  }
}
