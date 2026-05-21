import type { SiteBlogPost } from "@/lib/types";

export const fallbackBlogPosts: SiteBlogPost[] = [
  {
    slug: "kisiye-ozel-plakalik-nasil-siparis-edilir",
    title: "Kişiye Özel Plakalık Nasıl Sipariş Edilir?",
    excerpt: "Online plakalık tasarımı, yazı seçimi ve kapıda ödeme sürecini adım adım anlatıyoruz.",
    body: "Kişiye özel plakalık siparişi vermek için ürün sayfasına gidin, yazınızı ve simgelerinizi seçin, kargo bilgilerinizi doldurun.\n\nTasarımınızı onayladıktan sonra üretim süreci başlar ve siparişinizi takip edebilirsiniz.",
    coverImagePath: "slider_gorsel/isiklioto.jpg",
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
    metaTitle: "Kişiye Özel Plakalık Sipariş Rehberi",
    metaDescription: "Online plakalık tasarımı ve sipariş süreci hakkında detaylı rehber.",
    metaKeywords: "plakalık, kişiye özel plakalık, oto aksesuar",
    author: "Arabana Özel"
  }
];
