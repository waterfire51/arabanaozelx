export type ProductNoticeItem = {
  text: string;
  /** Sadece ışıklı plakalık ürünlerinde göster */
  lightedOnly?: boolean;
};

export function isPlakalikProduct(slug: string) {
  return slug.includes("plakalik");
}

export function isLightedPlakalik(slug: string) {
  return slug.startsWith("plplakalik");
}

export const PLAKALIK_INFO_BANNER =
  "Uzun girilen plakalık yazıları baskı alanına sığacak şekilde baskıdan önce ayarlanır.";

export const PLAKALIK_NOTICE_ITEMS: ProductNoticeItem[] = [
  { text: "Ürünler takım olarak gönderilir. Örneğin 1 takım 2 adet" },
  { text: "Baskılı çıtalar ile birlikte çerçeveler de gönderilir." },
  { text: "Plakalık ölçüleri 52.6 x 13.5 cm" },
  {
    text: "Işıklı plakalık ürünlerinde baskı alanı (çıta) boyunca şerit led gönderilir.",
    lightedOnly: true
  },
  {
    text: "Led beyaz renk olarak gönderilir. Yazının ve logonun rengine göre ışık yayar.",
    lightedOnly: true
  },
  {
    text: "Ürün pilli değildir. Aracınıza kablo ile montaj yapmanız gerekiyor.",
    lightedOnly: true
  },
  { text: "Ürünler UV 1440 DPI HD baskı teknolojisiyle üretilmektedir." },
  { text: "Kargo kapalı kutuda, kargo ücreti alıcıya ait olarak gönderilir." },
  {
    text: "Kişiye özel ürünlerde tasarım tamamen size aittir. Yazım hatası, hatalı görsel seçimi veya kötü tasarımdan firmamız sorumlu değildir."
  },
  {
    text: "Tasarım alanına Latin karakter seti dışında yazılan yazılar kabul edilmez, sorumluluk size aittir."
  },
  {
    text: "Kişiye özel ürünlerde iptal/iade değişim hakkı ancak firmamızdan kaynaklı kusurlarda geçerlidir."
  },
  {
    text: "Sipariş vererek yukarıda yazılan tüm maddeleri okuyup onayladığınızı kabul etmiş olursunuz."
  }
];

export function getPlakalikNotices(slug: string) {
  const lighted = isLightedPlakalik(slug);
  return PLAKALIK_NOTICE_ITEMS.filter((item) => !item.lightedOnly || lighted);
}
