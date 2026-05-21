/** Sözleşme sayfaları — seed ve veritabanı güncellemesi için */

const SELLER = "Arabana Özel";
const ADDRESS = "Fevziçakmak Mah. Okyar Cad. Kobisan 4. San. Sit. A3 Blok No:18/3A Karatay/Konya";
const PHONE = "0(549) 574 20 25";
const EMAIL = "info@arabanaozel.com";

export const contractPages = [
  {
    slug: "sozlesmeler",
    title: "Sözleşmeler",
    metaTitle: "Sözleşmeler | Arabana Özel",
    metaDescription: "Mesafeli satış, gizlilik, KVKK aydınlatma ve iade/iptal metinleri.",
    metaKeywords: "sözleşmeler, mesafeli satış, kvkk, gizlilik, iade",
    body: `${SELLER} üzerinden verilen siparişlerde geçerli yasal metinlere aşağıdaki bağlantılardan ulaşabilirsiniz.

• Gizlilik Sözleşmesi — Kişisel verilerin gizliliği ve kullanımı
• KVKK Aydınlatma Metni — 6698 sayılı Kanun kapsamında bilgilendirme
• Mesafeli Satış Sözleşmesi — Ön bilgilendirme ve satış şartları
• İade ve İptal Sözleşmesi — Cayma hakkı ve kişiye özel ürün istisnaları

Sipariş vermeden önce ilgili metinleri okumanızı öneririz. Sorularınız için ${PHONE} numaralı telefondan veya ${EMAIL} adresinden bize ulaşabilirsiniz.`
  },
  {
    slug: "gizlilik-sozlesmesi",
    title: "Gizlilik Sözleşmesi",
    metaTitle: "Gizlilik Sözleşmesi | Arabana Özel",
    metaDescription: "Arabana Özel gizlilik politikası ve kişisel verilerin korunması.",
    metaKeywords: "gizlilik, kişisel veri, çerez",
    body: `1. GİZLİLİK POLİTİKASININ AMACI

Bu Gizlilik Sözleşmesi, ${SELLER} (${ADDRESS}) tarafından işletilen internet sitesi üzerinden toplanan kişisel verilerin hangi amaçlarla işlendiğini, saklandığını ve korunduğunu açıklar.

2. TOPLANAN VERİLER

Sipariş ve iletişim süreçlerinde ad, soyad, telefon, e-posta, teslimat adresi, sipariş detayı, ödeme yöntemi tercihi, tasarım/onay verileri ve site kullanımına ilişkin teknik log kayıtları (IP, tarayıcı bilgisi, çerezler) işlenebilir.

3. VERİLERİN KULLANIM AMAÇLARI

• Siparişin alınması, üretimi, kargolanması ve teslimi
• Müşteri destek ve şikâyet yönetimi
• Yasal yükümlülüklerin yerine getirilmesi (fatura, kayıt)
• Site güvenliği ve hizmet kalitesinin artırılması
• Açık rızanız olması hâlinde kampanya ve bilgilendirme

4. VERİLERİN PAYLAŞIMI

Kişisel verileriniz; kargo firmaları, ödeme kuruluşları (PayTR vb.), yasal merciler ve zorunlu hallerde hizmet aldığımız teknik altyapı sağlayıcılarıyla, yalnızca hizmetin ifası için gerekli ölçüde paylaşılabilir. Üçüncü taraflara ticari amaçla satılmaz.

5. SAKLAMA SÜRESİ

Veriler, ilgili mevzuatta öngörülen süreler ve işleme amacının gerektirdiği makul süre boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hale getirilir.

6. GÜVENLİK

Verilerinize yetkisiz erişimi önlemek için teknik ve idari tedbirler uygulanır. İnternet üzerinden yapılan iletimlerde mutlak güvenlik garanti edilemez; riskler makul ölçüde minimize edilir.

7. HAKLARINIZ

KVKK kapsamındaki haklarınız için KVKK Aydınlatma Metni ve başvuru kanallarımızı inceleyebilirsiniz. Taleplerinizi ${EMAIL} adresine iletebilirsiniz.

8. ÇEREZLER

Site deneyimini iyileştirmek için zorunlu ve tercihe bağlı çerezler kullanılabilir. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.

9. DEĞİŞİKLİKLER

Bu metin güncellenebilir; güncel sürüm sitede yayımlandığı tarihten itibaren geçerlidir.

İletişim: ${PHONE} · ${EMAIL}`
  },
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    metaTitle: "KVKK Aydınlatma Metni | Arabana Özel",
    metaDescription: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma.",
    metaKeywords: "kvkk, aydınlatma metni, kişisel veri",
    body: `VERİ SORUMLUSU: ${SELLER}
Adres: ${ADDRESS}
Telefon: ${PHONE}
E-posta: ${EMAIL}

6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz aşağıda açıklanan çerçevede işlenmektedir.

1. İŞLENEN KİŞİSEL VERİ KATEGORİLERİ
Kimlik (ad-soyad), iletişim (telefon, e-posta, adres), müşteri işlem (sipariş, tasarım, ödeme bilgisi), işlem güvenliği (log, IP), pazarlama (açık rıza varsa) verileri.

2. İŞLEME AMAÇLARI
Sözleşmenin kurulması ve ifası, faturalandırma, lojistik, müşteri hizmetleri, hukuki yükümlülükler, meşru menfaat kapsamında hizmet geliştirme ve güvenlik.

3. HUKUKİ SEBEPLER
KVKK m.5/2 (sözleşme, hukuki yükümlülük, meşru menfaat) ve gerektiğinde açık rızanız.

4. AKTARIM
Yurt içinde kargo, ödeme hizmeti sağlayıcıları ve yetkili kamu kurumlarına; yurt dışına aktarım yapılıyorsa KVKK’ya uygun şekilde ve gerekli güvencelerle.

5. TOPLAMA YÖNTEMİ
Web sitesi formları, WhatsApp/telefon, e-posta ve otomatik yollarla (çerez, log).

6. İLGİLİ KİŞİ HAKLARI (KVKK m.11)
Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme, silme, itiraz ve zararın giderilmesini talep etme haklarına sahipsiniz.

7. BAŞVURU
Taleplerinizi yazılı olarak veya Kayıtlı Elektronik Posta (KEP)/e-posta ile ${EMAIL} adresine iletebilirsiniz. Başvurular en geç 30 gün içinde sonuçlandırılır.

8. VERİ SORUMLUSU TEMSİLCİSİ
Zorunlu olması hâlinde KVKK Kurulu’na bildirilen temsilci bilgisi sitede güncellenir.`
  },
  {
    slug: "satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    metaTitle: "Mesafeli Satış Sözleşmesi | Arabana Özel",
    metaDescription: "Arabana Özel mesafeli satış sözleşmesi ve ön bilgilendirme.",
    metaKeywords: "mesafeli satış, ön bilgilendirme, sözleşme",
    body: `MESAFELİ SATIŞ SÖZLEŞMESİ

Taraflar:
SATICI: ${SELLER} — ${ADDRESS} — Tel: ${PHONE} — ${EMAIL}
ALICI: Sipariş formunda belirtilen müşteri

1. KONU
İşbu sözleşme, ALICI’nın ${SELLER} internet sitesinden elektronik ortamda sipariş verdiği, kişiye özel veya standart oto aksesuar ürünlerinin satışı ve teslimine ilişkin 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca düzenlenmiştir.

2. ÜRÜN VE BEDEL
Ürün türü, adedi, birim fiyatı, kargo bedeli ve toplam tutar sipariş özetinde ve onay ekranında gösterilir. ALICI, “Tasarımı Onayla” kutusunu işaretleyerek kişiye özel üretim detaylarını kabul etmiş sayılır.

3. ÖDEME
Kredi/banka kartı (PayTR) veya kapıda ödeme seçenekleri sunulabilir. Ödeme onayı veya kapıda ödeme taahhüdü ile sipariş üretime alınır.

4. TESLİMAT
Tahmini üretim ve kargo süreleri sipariş sonrası iletilir; mücbir sebep ve olağanüstü durumlarda gecikme olabilir. Teslimat, ALICI’nın bildirdiği adrese yapılır; kargo takip bilgisi paylaşılır.

5. ALICI YÜKÜMLÜLÜKLERİ
Doğru iletişim ve adres bilgisi vermek, tasarım onayını kontrol etmek, teslimatta ürünü kontrol etmek ve hasarlı/eksik teslimde tutanak tutturmak ALICI’nın sorumluluğundadır.

6. CAYMA HAKKI
ALICI, kişiye özel üretilen ürünlerde (isim, yazı, renk, logo vb. müşteri talimatına göre üretilenler) cayma hakkının yasal istisna kapsamında olabileceğini kabul eder. Standart ürünlerde 14 gün içinde cayma hakkı İade ve İptal Sözleşmesi’ne tabidir.

7. AYIPLI MAL
Ayıplı veya eksik ürünlerde 6502 sayılı Kanun’daki seçimlik haklar saklıdır; derhal ${EMAIL} veya ${PHONE} üzerinden bildirim yapılmalıdır.

8. UYUŞMAZLIK
Tüketici işlemlerinde parasal sınırlara uygun Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.

9. YÜRÜRLÜK
ALICI’nın siparişi onaylaması ile sözleşme kurulmuş sayılır.`
  },
  {
    slug: "iade-ve-ipal-sozlesmesi",
    title: "İade ve İptal Sözleşmesi",
    metaTitle: "İade ve İptal | Arabana Özel",
    metaDescription: "İade, iptal ve cayma hakkı koşulları — kişiye özel ürünler.",
    metaKeywords: "iade, iptal, cayma hakkı, plakalık",
    body: `İADE VE İPTAL SÖZLEŞMESİ

1. GENEL
${SELLER} olarak müşteri memnuniyetini önemsiyoruz. İade ve iptal işlemleri 6502 sayılı Kanun, ilgili yönetmelikler ve aşağıdaki esaslara göre yürütülür.

2. SİPARİŞ İPTALİ (ÜRETİM ÖNCESİ)
Sipariş henüz üretime alınmamışsa ${PHONE} veya ${EMAIL} üzerinden iptal talebi değerlendirilir. Üretime başlanmış siparişlerde iptal mümkün olmayabilir.

3. CAYMA HAKKI (14 GÜN)
Mesafeli sözleşmelerde tüketici, standart (kişiselleştirilmemiş) ürünlerde teslimattan itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilir. Cayma bildirimi yazılı/e-posta ile yapılmalıdır.

4. KİŞİYE ÖZEL ÜRÜN İSTİSNASI
ALICI’nın isteği veya kişisel ihtiyaçları doğrultusunda özelleştirilen ürünler (kişiye özel plakalık, özel yazı/renk/sembol içeren tasarımlar vb.) için Mesafeli Sözleşmeler Yönetmeliği uyarınca cayma hakkı kullanılamayabilir. Bu durum sipariş öncesi “Tasarımı Onayla” ile açıkça kabul edilir.

5. İADE KOŞULLARI
İade kabul edilen ürünler kullanılmamış, orijinal ambalajında ve satılabilir durumda olmalıdır. İade kargo bilgisi tarafımızdan veya ALICI tarafından karşılanabilir; ürün grubuna göre değişir.

6. İADE SÜRECİ
• Talep: ${EMAIL} veya WhatsApp ${PHONE}
• Onay sonrası iade adresi bildirilir
• Ürün depomıza ulaştığında kontrol edilir
• Uygun bulunursa ödeme 14 iş günü içinde iade edilir (kart iadeleri bankaya bağlı gecikebilir)

7. AYIPLI / HATALI ÜRÜN
Üretim hatası, yanlış baskı veya kargo hasarında ücretsiz yeniden üretim veya değişim yapılır. Fotoğraf ve sipariş numarası ile 48 saat içinde bildirim rica edilir.

8. KAPIDA ÖDEME İADESİ
Kapıda ödenen siparişlerde iade, banka hesabına havale/EFT ile yapılabilir; IBAN bilgisi talep edilir.

9. İLETİŞİM
${SELLER} — ${ADDRESS}
Tel: ${PHONE} · ${EMAIL}`
  }
] as const;
