import Link from "next/link";
import type { SiteCategory, SiteProduct } from "@/lib/types";
import { assetPath, formatPrice, hrefForSlug } from "@/lib/paths";

const CATEGORY_COPY: Record<string, { intro: string; bullets: string[]; faqs: Array<[string, string]> }> = {
  plakalik: {
    intro:
      "Otomobil plakalık modellerini yazı, renk ve sembol seçenekleriyle kişiselleştirin. Işıklı ve kabartma seçeneklerle aracınıza özel bir görünüm hazırlayın.",
    bullets: ["Kişiye özel yazı ve ikon seçimi", "Takım halinde üretim", "Kapıda ödeme ve hızlı kargo"],
    faqs: [
      ["Kişiye özel plakalık nasıl hazırlanır?", "Ürün sayfasında yazınızı, renginizi ve sağ-sol sembollerinizi seçerek tasarımı canlı önizleme üzerinde hazırlayabilirsiniz."],
      ["Plakalık ölçüleri standart mı?", "Otomobil plakalıkları standart araç ölçülerine uygun şekilde hazırlanır; ürün sayfasındaki açıklamalarda ölçü bilgisi ayrıca belirtilir."]
    ]
  },
  "motor-plakalik": {
    intro:
      "Motosiklet plakalık modellerinde ışıklı ve kabartma seçenekleriyle motorunuza özel tasarım oluşturabilirsiniz.",
    bullets: ["Motor plakalarına uygun tasarım", "Işıklı ve ışıksız seçenekler", "Kişiye özel üretim"],
    faqs: [
      ["Motor plakalık kişiselleştirilebilir mi?", "Evet, ürün sayfasında yazı, renk ve sembol tercihlerinizi seçerek motosikletinize uygun tasarım oluşturabilirsiniz."],
      ["Sipariş sonrası tasarım değişir mi?", "Kişiye özel ürünlerde üretim başlamadan önce destek ekibiyle iletişime geçmeniz gerekir."]
    ]
  },
  "kapi-esigi": {
    intro:
      "Oto kapı eşiği modelleri, aracınıza daha şık ve kişisel bir detay eklemek için tasarlanır. Işıklı ve kabartma seçenekleri inceleyebilirsiniz.",
    bullets: ["Araca özel görünüm", "Işıklı ve kabartma seçenekler", "Takım halinde gönderim"],
    faqs: [
      ["Kapı eşiği ürünleri kaç adet gönderilir?", "Ürün detayında belirtilen takım/adet bilgisine göre gönderilir."],
      ["Kapı eşiği üzerine özel yazı yazılır mı?", "Uygun ürünlerde ürün sayfasındaki tasarım alanından özel yazı ve sembol seçimi yapılabilir."]
    ]
  },
  anahtarlik: {
    intro:
      "Kişiye özel anahtarlık modelleri, araç anahtarlarınıza şık ve kullanışlı bir tamamlayıcı ekler.",
    bullets: ["Hediye için uygun", "Kişiye özel tasarım", "Araç aksesuarlarıyla uyumlu"],
    faqs: [
      ["Anahtarlık kişiye özel yapılır mı?", "Uygun modellerde isim, yazı veya görsel tercihiyle kişiselleştirme yapılabilir."],
      ["Anahtarlık siparişi ne kadar sürede hazırlanır?", "Üretim yoğunluğuna göre değişir; sipariş sonrası süreç destek kanallarından takip edilebilir."]
    ]
  },
  "oto-aksesuar": {
    intro:
      "Araç içi ve dışı oto aksesuar modelleriyle aracınızı daha kullanışlı, düzenli ve dikkat çekici hale getirin.",
    bullets: ["Günlük kullanım için pratik ürünler", "Araç içi düzen ve konfor", "Farklı model seçenekleri"],
    faqs: [
      ["Oto aksesuar ürünleri kişiselleştirilebilir mi?", "Ürün tipine göre kişiselleştirme seçenekleri değişir; uygun ürünlerde tasarım alanı gösterilir."],
      ["Ürünler Türkiye geneline gönderiliyor mu?", "Evet, siparişler kargo ile Türkiye geneline gönderilir."]
    ]
  },
  konfor: {
    intro:
      "Oto konfor ürünleri uzun yol ve günlük sürüşlerde destek sağlayan bel yastığı, boyun yastığı gibi seçeneklerden oluşur.",
    bullets: ["Günlük kullanım ve uzun yol desteği", "Araç içi konfor", "Pratik sipariş süreci"],
    faqs: [
      ["Bel ve boyun yastıkları hangi araçlarda kullanılır?", "Standart araç koltuklarında kullanılabilecek pratik konfor ürünleridir."],
      ["Konfor ürünleri hediye için uygun mu?", "Evet, araç kullananlar için kullanışlı ve pratik hediye seçenekleridir."]
    ]
  }
};

function categoryCopy(category: SiteCategory) {
  return (
    CATEGORY_COPY[category.slug] || {
      intro: `${category.name} kategorisindeki kişiye özel oto aksesuar modellerini inceleyin.`,
      bullets: ["Kişiye özel seçenekler", "Güvenli sipariş", "Hızlı üretim"],
      faqs: [
        [`${category.name} ürünleri nasıl sipariş edilir?`, "Beğendiğiniz ürüne girip seçenekleri belirledikten sonra kargo ve ödeme bilgilerinizi tamamlayabilirsiniz."],
        ["Kapıda ödeme var mı?", "Uygun siparişlerde kapıda ödeme seçeneği sunulur."]
      ]
    }
  );
}

export function CategoryLandingPage({ category, products }: { category: SiteCategory; products: SiteProduct[] }) {
  const copy = categoryCopy(category);

  return (
    <div className="site-container py-8">
      <section className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-[#ee3625]">Kategori</p>
        <h1 className="mt-2 text-3xl font-black text-black">{category.name} Modelleri ve Fiyatları</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">{copy.intro}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {copy.bullets.map((item) => (
            <div key={item} className="rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm font-semibold text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-black">{category.name} Ürünleri</h2>
          <span className="text-sm font-semibold text-gray-500">{products.length} ürün</span>
        </div>
        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            Bu kategoride yayında ürün bulunmuyor.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} href={hrefForSlug(product.slug)} className="product-grid-card">
                {product.badge ? (
                  <span className="mb-2 inline-flex rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                ) : null}
                <div className="mb-3 grid min-h-[170px] place-items-center">
                  <img loading="lazy" width={250} src={assetPath(product.imagePath, product.slug)} alt={product.name} />
                </div>
                <h3 className="min-h-[38px] text-sm font-bold leading-tight text-black">{product.name}</h3>
                {product.shortDescription ? (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{product.shortDescription}</p>
                ) : null}
                <div className="mt-2 text-[13px] font-bold text-red-600">{formatPrice(product.price)}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-black">Sık Sorulan Sorular</h2>
        <div className="mt-4 grid gap-4">
          {copy.faqs.map(([question, answer]) => (
            <div key={question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-black">{question}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
