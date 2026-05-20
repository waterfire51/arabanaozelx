# Arabana Özel Next.js

Statik HTML kopyası Next.js App Router yapısına taşındı. Vitrin eski tema assetleriyle çalışır; ürün, sayfa ve sipariş verileri Prisma üzerinden PostgreSQL'e bağlanır. Veritabanı yoksa site seed verisiyle ön izleme modunda açılır.

## Kurulum

```bash
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

`.env` içinde `DATABASE_URL` PostgreSQL bağlantısını ve `ADMIN_PASSWORD` yönetim paneli şifresini belirler.

## Ekranlar

- `/` ana vitrin
- `/plakalik/otomobil` örnek dinamik ürün/tasarım/sipariş ekranı
- `/kargo-takip` sipariş sorgulama
- `/admin` yönetim paneli
- `/admin/products`, `/admin/orders`, `/admin/pages` CRUD ekranları

Varsayılan geliştirme admin şifresi `admin123`.
