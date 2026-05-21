import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaytrConfig, verifyPaytrCallbackHash, type PaytrCallbackPayload } from "@/lib/paytr";

export async function POST(request: Request) {
  const config = getPaytrConfig();
  if (!config) {
    return new NextResponse("PAYTR not configured", { status: 500 });
  }

  const formData = await request.formData();
  const payload: PaytrCallbackPayload = {
    merchant_oid: String(formData.get("merchant_oid") ?? ""),
    status: String(formData.get("status") ?? ""),
    total_amount: String(formData.get("total_amount") ?? ""),
    hash: String(formData.get("hash") ?? ""),
    failed_reason_code: formData.get("failed_reason_code")?.toString(),
    failed_reason_msg: formData.get("failed_reason_msg")?.toString()
  };

  if (!payload.merchant_oid || !payload.hash) {
    return new NextResponse("bad request", { status: 400 });
  }

  if (!verifyPaytrCallbackHash(config, payload)) {
    return new NextResponse("PAYTR notification failed: bad hash", { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { paytrMerchantOid: payload.merchant_oid }
  });

  if (!order) {
    return new NextResponse("OK");
  }

  if (order.paymentStatus === "PAID") {
    return new NextResponse("OK");
  }

  if (payload.status === "success") {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED"
      }
    });
  } else {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "FAILED"
      }
    });
  }

  return new NextResponse("OK");
}
