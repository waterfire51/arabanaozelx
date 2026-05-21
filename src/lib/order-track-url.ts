import { getSiteBaseUrl } from "@/lib/site-url";

export { getSiteBaseUrl } from "@/lib/site-url";

export const ORDER_TRACK_PAGE_PATH = "/kargo-takip";

export function normalizeOrderTrackPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Müşterinin SMS’te tıklayacağı takip sayfası (sipariş no + telefon dolu) */
export function buildOrderTrackUrl(orderNo: string, phone: string, baseUrl?: string) {
  const base = (baseUrl ?? getSiteBaseUrl()).replace(/\/$/, "");
  const params = new URLSearchParams({
    orderNo: orderNo.trim(),
    phone: normalizeOrderTrackPhone(phone)
  });
  return `${base}${ORDER_TRACK_PAGE_PATH}?${params.toString()}`;
}

/** SMS paneline yapıştırılacak örnek metin */
export function buildOrderTrackSmsMessage(orderNo: string, phone: string, baseUrl?: string) {
  const url = buildOrderTrackUrl(orderNo, phone, baseUrl);
  return `Arabana Özel: Siparişiniz alındı (${orderNo.trim()}). Sipariş durumunuzu görmek için linke tıklayın: ${url}`;
}
