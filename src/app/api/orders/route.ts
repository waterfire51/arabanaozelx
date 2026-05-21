import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildPaytrMerchantOid,
  buildPaytrUserBasket,
  getClientIp,
  getPaytrConfig,
  isPaytrConfigured,
  requestPaytrIframeToken
} from "@/lib/paytr";
import { getSiteBaseUrl } from "@/lib/site-url";
import { parsePlateDesigns } from "@/lib/plate-design";

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
    const paymentMethod = body.paymentMethod === "paytr" ? "PAYTR" : "COD";

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

    const email = String(customer.email || "").trim();
    if (paymentMethod === "PAYTR" && !email) {
      return NextResponse.json({ message: "Kredi kartı ödemesi için e-posta adresi gereklidir." }, { status: 400 });
    }

    if (paymentMethod === "PAYTR" && !isPaytrConfigured()) {
      return NextResponse.json(
        { message: "Online ödeme şu an yapılandırılmamış. Kapıda ödeme seçeneğini kullanın veya site yöneticisine başvurun." },
        { status: 503 }
      );
    }

    const designs = parsePlateDesigns(body.designs);
    const tooLongText = designs.some((design) => design.text.length > 24);

    if (tooLongText) {
      return NextResponse.json({ message: "Plakalık yazısı en fazla 24 karakter olabilir." }, { status: 400 });
    }

    const subtotal = Number(selectedVariant.unitPrice);
    const shipmentTotal = Number(selectedVariant.shipmentPrice);
    const total = subtotal + shipmentTotal;
    const orderNo = orderNumber();
    const paytrMerchantOid = paymentMethod === "PAYTR" ? buildPaytrMerchantOid(orderNo) : null;

    const order = await prisma.order.create({
      data: {
        orderNo,
        paytrMerchantOid,
        customerFirstName: String(customer.firstName),
        customerLastName: String(customer.lastName),
        customerEmail: email || null,
        phone: String(customer.phone),
        city: String(customer.city),
        district: String(customer.district),
        address: String(customer.address),
        note: String(customer.note || "") || null,
        paymentMethod,
        paymentStatus: paymentMethod === "PAYTR" ? "PENDING" : "PAID",
        status: "NEW",
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
            design: designs
          }
        }
      }
    });

    if (paymentMethod === "PAYTR") {
      const config = getPaytrConfig();
      if (!config || !paytrMerchantOid) {
        return NextResponse.json({ message: "PayTR yapılandırması eksik." }, { status: 503 });
      }

      const base = getSiteBaseUrl({ request });
      const paymentAmountKurus = Math.round(total * 100);
      const userName = `${order.customerFirstName} ${order.customerLastName}`.slice(0, 60);
      const userAddress = `${order.address}, ${order.district}/${order.city}`.slice(0, 400);
      const userPhone = order.phone.replace(/\D/g, "").slice(0, 20);

      try {
        const paytrToken = await requestPaytrIframeToken({
          merchantOid: paytrMerchantOid,
          email,
          paymentAmountKurus,
          userIp: getClientIp(request),
          userName,
          userAddress,
          userPhone,
          userBasket: buildPaytrUserBasket(product.name, total, selectedVariant.quantity),
          merchantOkUrl: `${base}/odeme/basarili?orderNo=${encodeURIComponent(order.orderNo)}`,
          merchantFailUrl: `${base}/odeme/hata?orderNo=${encodeURIComponent(order.orderNo)}`
        });

        return NextResponse.json({
          orderNo: order.orderNo,
          paymentMethod: "paytr",
          paytrToken
        });
      } catch (error) {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "FAILED", status: "CANCELLED" }
        });
        return NextResponse.json(
          { message: error instanceof Error ? error.message : "Ödeme formu açılamadı." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      orderNo: order.orderNo,
      paymentMethod: "cod"
    });
  } catch {
    return NextResponse.json(
      { message: "Sipariş kaydı için PostgreSQL bağlantısı gerekli. DATABASE_URL ve Prisma migrate/seed adımlarını tamamlayın." },
      { status: 503 }
    );
  }
}
