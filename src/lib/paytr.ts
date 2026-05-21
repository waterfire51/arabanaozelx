import { createHmac } from "crypto";

const PAYTR_TOKEN_URL = "https://www.paytr.com/odeme/api/get-token";

export type PaytrConfig = {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: boolean;
};

export type PaytrTokenInput = {
  merchantOid: string;
  email: string;
  paymentAmountKurus: number;
  userIp: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  userBasket: string;
  merchantOkUrl: string;
  merchantFailUrl: string;
};

export type PaytrCallbackPayload = {
  merchant_oid: string;
  status: string;
  total_amount: string;
  hash: string;
  failed_reason_code?: string;
  failed_reason_msg?: string;
};

export function getPaytrConfig(): PaytrConfig | null {
  const merchantId = process.env.PAYTR_MERCHANT_ID?.trim();
  const merchantKey = process.env.PAYTR_MERCHANT_KEY?.trim();
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT?.trim();

  if (!merchantId || !merchantKey || !merchantSalt) {
    return null;
  }

  return {
    merchantId,
    merchantKey,
    merchantSalt,
    testMode: process.env.PAYTR_TEST_MODE === "1"
  };
}

export function isPaytrConfigured() {
  return getPaytrConfig() !== null;
}

/** PayTR merchant_oid: alfanumerik */
export function buildPaytrMerchantOid(orderNo: string) {
  const clean = orderNo.replace(/[^a-zA-Z0-9]/g, "");
  return clean || `OD${Date.now()}`;
}

export function buildPaytrUserBasket(productName: string, totalTl: number, quantity = 1) {
  const basket = [[productName.slice(0, 120), totalTl.toFixed(2), quantity]];
  return Buffer.from(JSON.stringify(basket)).toString("base64");
}

function createPaytrTokenHash(
  config: PaytrConfig,
  input: {
    userIp: string;
    merchantOid: string;
    email: string;
    paymentAmountKurus: number;
    userBasket: string;
    noInstallment: number;
    maxInstallment: number;
    currency: string;
    testMode: number;
  }
) {
  const hashStr = `${config.merchantId}${input.userIp}${input.merchantOid}${input.email}${input.paymentAmountKurus}${input.userBasket}${input.noInstallment}${input.maxInstallment}${input.currency}${input.testMode}`;
  return createHmac("sha256", config.merchantKey).update(`${hashStr}${config.merchantSalt}`).digest("base64");
}

export function verifyPaytrCallbackHash(config: PaytrConfig, payload: PaytrCallbackPayload) {
  const hashStr = `${payload.merchant_oid}${config.merchantSalt}${payload.status}${payload.total_amount}`;
  const token = createHmac("sha256", config.merchantKey).update(hashStr).digest("base64");
  return token === payload.hash;
}

export async function requestPaytrIframeToken(input: PaytrTokenInput) {
  const config = getPaytrConfig();
  if (!config) {
    throw new Error("PayTR yapılandırması eksik.");
  }

  const noInstallment = 0;
  const maxInstallment = 0;
  const currency = "TL";
  const testMode = config.testMode ? 1 : 0;

  const paytr_token = createPaytrTokenHash(config, {
    userIp: input.userIp,
    merchantOid: input.merchantOid,
    email: input.email,
    paymentAmountKurus: input.paymentAmountKurus,
    userBasket: input.userBasket,
    noInstallment,
    maxInstallment,
    currency,
    testMode
  });

  const body = new URLSearchParams({
    merchant_id: config.merchantId,
    user_ip: input.userIp,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount: String(input.paymentAmountKurus),
    paytr_token,
    user_basket: input.userBasket,
    debug_on: config.testMode ? "1" : "0",
    no_installment: String(noInstallment),
    max_installment: String(maxInstallment),
    user_name: input.userName,
    user_address: input.userAddress,
    user_phone: input.userPhone,
    merchant_ok_url: input.merchantOkUrl,
    merchant_fail_url: input.merchantFailUrl,
    timeout_limit: "30",
    currency,
    test_mode: String(testMode),
    lang: "tr"
  });

  const response = await fetch(PAYTR_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store"
  });

  const raw = await response.text();
  let data: { status?: string; token?: string; reason?: string };

  try {
    data = JSON.parse(raw) as { status?: string; token?: string; reason?: string };
  } catch {
    throw new Error("PayTR yanıtı okunamadı.");
  }

  if (data.status !== "success" || !data.token) {
    throw new Error(data.reason || "PayTR ödeme formu oluşturulamadı.");
  }

  return data.token;
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "127.0.0.1";
  }
  return request.headers.get("x-real-ip")?.trim() || "127.0.0.1";
}
