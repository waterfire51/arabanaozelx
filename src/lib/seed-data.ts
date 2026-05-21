import { contractPages } from "./contract-pages";

export const heroSlides = [
  { imagePath: "slider_gorsel/isiklioto.jpg", title: "Kişiye Özel Oto Plakalık", href: "/plplakalik/otomobil" },
  { imagePath: "slider_gorsel/isiksizoto.webp", title: "Kabartma Plakalık Tasarla", href: "/plakalik/otomobil" },
  { imagePath: "urun_gorsel/kayis-anahtarlik.gif", title: "Kişiye Özel Anahtarlık", href: "/kayisanahtarlik" },
  { imagePath: "urun_gorsel/8.webp", title: "Oto Bel ve Boyun Yastığı", href: "/belyastigi" },
  { imagePath: "urun_gorsel/9.webp", title: "Araç İçi Aksesuarlar", href: "/guneslik" }
];

export const categories = [
  { name: "Plakalık", slug: "plakalik", iconPath: "icon_gorsel/iconplakalik.png" },
  { name: "Motor Plakalık", slug: "motor-plakalik", iconPath: "icon_gorsel/iconmotorplakalik.png" },
  { name: "Kapı Eşiği", slug: "kapi-esigi", iconPath: "icon_gorsel/iconkapiesik.png" },
  { name: "Anahtarlık", slug: "anahtarlik", iconPath: "icon_gorsel/iconanahtarlik.png" },
  { name: "Oto Aksesuar", slug: "oto-aksesuar", iconPath: "icon_gorsel/iconguneslikorganizer.png" },
  { name: "Konfor", slug: "konfor", iconPath: "icon_gorsel/iconboyunyastik.png" }
];

export const products = [
  { slug: "plplakalik/otomobil", name: "Işıklı Otomobil Plakalığı (2 Adet)", price: 350, imagePath: "plakalik_gorsel/otomobil-isikli-1.webp", categorySlug: "plakalik", badge: "Popüler", variantBase: 350 },
  { slug: "plakalik/otomobil", name: "Kabartma Otomobil Plakalığı (2 Adet)", price: 250, imagePath: "plakalik_gorsel/otomobil-isiksiz-1.webp", categorySlug: "plakalik", variantBase: 250 },
  { slug: "plplakalik/motor", name: "Işıklı Motosiklet Plakalığı", price: 350, imagePath: "motor_plakalik_gorsel/motor-plakalik-isikli.webp", categorySlug: "motor-plakalik", badge: "Yeni", variantBase: 350 },
  { slug: "plakalik/motor", name: "Kabartma Motosiklet Plakalığı", price: 250, imagePath: "motor_plakalik_gorsel/motor-plakalik-isiksiz.webp", categorySlug: "motor-plakalik", variantBase: 250 },
  { slug: "belyastigi", name: "Ortopedik Bel Yastığı", price: 191, imagePath: "urun_gorsel/8.webp", categorySlug: "konfor", badge: "İndirim", customizable: true },
  { slug: "boyunyastigi", name: "Oto Boyun Yastığı", price: 151, imagePath: "urun_gorsel/7.webp", categorySlug: "konfor" },
  { slug: "aynadark", name: "Ayna Süsü", price: 91, imagePath: "urun_gorsel/ayna-sus-3.gif", categorySlug: "oto-aksesuar" },
  { slug: "kayisanahtarlik", name: "Deri Kayış Anahtarlık", price: 121, imagePath: "urun_gorsel/kayis-anahtarlik.gif", categorySlug: "anahtarlik" },
  { slug: "panjurarmasi", name: "Işıklı Panjur Arması", price: 131, imagePath: "urun_gorsel/isikli-panjur-armasi.gif", categorySlug: "oto-aksesuar" },
  { slug: "qr-numaratik", name: "Dijital Numaratik", price: 131, imagePath: "urun_gorsel/qr-dijital-numaratik.webp", categorySlug: "oto-aksesuar" },
  { slug: "ruhsatkabi", name: "Ruhsat Kabı", price: 171, imagePath: "urun_gorsel/ruhsat-kabi-urun.webp", categorySlug: "oto-aksesuar" },
  { slug: "showroom", name: "Dekor Showroom Plaka", price: 250, imagePath: "plakalik_gorsel/plakalik_2.webp", categorySlug: "plakalik" },
  { slug: "plkapiesigi", name: "Işıklı Oto Kapı Eşiği (2 Adet)", price: 251, imagePath: "kapiesigi_gorsel/5.webp", categorySlug: "kapi-esigi" },
  { slug: "kapiesigi", name: "Kabartma Oto Kapı Eşiği (2 Adet)", price: 201, imagePath: "kapiesigi_gorsel/6.webp", categorySlug: "kapi-esigi" },
  { slug: "anahtarlik", name: "Kişiye Özel Anahtarlık", price: 121, imagePath: "urun_gorsel/11.webp", categorySlug: "anahtarlik" },
  { slug: "direksiyonkilifi", name: "Direksiyon Kılıfı", price: 121, imagePath: "urun_gorsel/18.webp", categorySlug: "oto-aksesuar" },
  { slug: "guneslik", name: "Oto Güneşlik Organizer", price: 121, imagePath: "urun_gorsel/9.webp", categorySlug: "oto-aksesuar" },
  { slug: "bagajfile", name: "Bagaj Düzenleme Filesi", price: 91, imagePath: "urun_gorsel/10.webp", categorySlug: "oto-aksesuar" },
  { slug: "otofile", name: "Araç İçi Germe File", price: 91, imagePath: "urun_gorsel/12.webp", categorySlug: "oto-aksesuar" },
  { slug: "kopekbaligi", name: "Köpek Balığı Oto Tavan Anteni", price: 121, imagePath: "urun_gorsel/13.webp", categorySlug: "oto-aksesuar" },
  { slug: "baliksirti", name: "Balık Sırtı Oto Tavan Süsü (5 Adet)", price: 61, imagePath: "urun_gorsel/14.webp", categorySlug: "oto-aksesuar" },
  { slug: "kulluk", name: "Oto Küllük ve Bardak Tutacağı (3 Adet)", price: 91, imagePath: "urun_gorsel/15.webp", categorySlug: "oto-aksesuar" },
  { slug: "yelpaze", name: "Mangal Yelpazesi (5 Adet)", price: 141, imagePath: "urun_gorsel/20.webp", categorySlug: "oto-aksesuar" },
  { slug: "spoiler", name: "Kişiye Özel Spoiler", price: 161, imagePath: "urun_gorsel/3.webp", categorySlug: "oto-aksesuar" },
  { slug: "camsuyu", name: "Oto Cam Suyu Tableti (5 Adet)", price: 91, imagePath: "urun_gorsel/17.webp", categorySlug: "oto-aksesuar" },
  { slug: "buzkazici", name: "Buz Kazıcı (5 Adet)", price: 111, imagePath: "urun_gorsel/21.webp", categorySlug: "oto-aksesuar" },
  { slug: "kaydirmaztutucu", name: "Kaydırmaz Tutucu", price: 81, imagePath: "urun_gorsel/22.webp", categorySlug: "oto-aksesuar" }
];

export const pages = [
  {
    slug: "iletisim",
    title: "İletişim",
    body: "Adres: Fevziçakmak Mah. Okyar Cad. Kobisan 4. San. Sit. A3 Blok No:18/3A Karatay/Konya\n\nTelefon ve WhatsApp: 0(549) 574 20 25\n\nE-posta: info@arabanaozel.com"
  },
  {
    slug: "kargo-takip",
    title: "Kargo Takip",
    body: "Sipariş numaranız ve telefonunuzla üretim/kargo durumunu takip edebilirsiniz."
  },
  {
    slug: "galeri",
    title: "Galeri",
    body: "Müşterilerimizden gelen uygulama fotoğrafları."
  },
  ...contractPages.map((page) => ({
    slug: page.slug,
    title: page.title,
    body: page.body,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    metaKeywords: page.metaKeywords
  })),
  {
    slug: "musteri-memnuniyet",
    title: "Müşteri Memnuniyeti",
    body: "Üretimden teslimata kadar siparişlerinizi takip ediyor, destek taleplerinize hızlı dönüş yapıyoruz."
  },
  {
    slug: "katalog",
    title: "Ürün Kataloğu",
    body: "Ürün kataloğu yönetim panelinden güncellenebilir ürün listesiyle dinamik olarak hazırlanır."
  },
];
