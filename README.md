# Arabana Özel

Next.js App Router e-ticaret sitesi. Ürün görselleri GitHub `arabanaozelx_assets` reposundan servis edilir.

## Kurulum

```bash
npm install
copy .env.example .env.local
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

`.env.local` içinde PostgreSQL (`DATABASE_URL`), admin şifresi ve GitHub assets ayarları tanımlı olmalı.

## Görsel senkronu

```bash
npm run assets:sync
```

Otodark kaynaklı görselleri `arabanaozelx_assets` reposuna yükler.

## Ekranlar

- `/` — ana vitrin
- `/plakalik/otomobil` — ürün / tasarım / sipariş
- `/kargo-takip`, `/galeri`, `/iletisim` — CMS sayfaları
- `/admin` — yönetim paneli (ürün görseli GitHub'a yüklenebilir)
- `/admin/icons` — ikon kategorileri ve şekil yükleme (Araçlar, Takımlar, Anime…)

## Proje yapısı

- `src/` — Next.js uygulaması
- `public/assets/css`, `public/inc_all/css` — vitrin teması stilleri
- `prisma/` — veritabanı şeması
- `scripts/` — asset senkron scripti

## İkon / şekil sistemi

- Admin: `/admin/icons` → kategori CRUD + kategori bazlı ikon yükleme (`ikon_kategori_gorsel/{slug}/`)
- Müşteri: ürün tasarımında katalogdan seçim veya **Özel İkon Yükle** (`ozel_ikon_gorsel/`)
- GitHub assets reposunda saklanır; sipariş `design` JSON alanında tam dosya yolu tutulur

Eski statik HTML mirror dosyaları projeden kaldırıldı.
