-- Site ayarları: Otodark görselleri ve iletişim
UPDATE "SiteSettings"
SET
  "logoPath" = CASE WHEN "logoPath" LIKE '%ddark%' THEN 'site_gorsel/logo.png' ELSE "logoPath" END,
  "faviconPath" = CASE WHEN "faviconPath" LIKE '%ddark%' THEN 'site_gorsel/logo.png' ELSE "faviconPath" END,
  "contactEmail" = CASE WHEN "contactEmail" ILIKE '%otodark%' THEN 'info@arabanaozel.com' ELSE "contactEmail" END,
  "siteName" = CASE WHEN "siteName" ILIKE '%otodark%' THEN 'Arabana Özel' ELSE "siteName" END,
  "defaultMetaTitle" = REPLACE("defaultMetaTitle", 'Otodark', 'Arabana Özel'),
  "defaultMetaDescription" = REPLACE("defaultMetaDescription", 'otodark', 'arabanaozel'),
  "updatedAt" = NOW()
WHERE "id" = 'default';

-- Katalog sayfası slug
UPDATE "Page"
SET
  "slug" = 'katalog',
  "title" = 'Ürün Kataloğu',
  "body" = REPLACE(REPLACE("body", 'Otodark', 'Arabana Özel'), 'otodark', 'arabanaozel'),
  "updatedAt" = NOW()
WHERE "slug" = 'otodark-katalog';

-- İletişim ve diğer sayfa metinleri
UPDATE "Page"
SET
  "body" = REPLACE(REPLACE("body", 'info@otodark.com', 'info@arabanaozel.com'), 'Otodark', 'Arabana Özel'),
  "title" = REPLACE("title", 'Otodark', 'Arabana Özel'),
  "metaTitle" = REPLACE(COALESCE("metaTitle", ''), 'Otodark', 'Arabana Özel'),
  "metaDescription" = REPLACE(COALESCE("metaDescription", ''), 'otodark', 'arabanaozel'),
  "updatedAt" = NOW()
WHERE "body" ILIKE '%otodark%' OR "title" ILIKE '%otodark%' OR "slug" = 'iletisim';

-- Blog
UPDATE "BlogPost"
SET
  "body" = REPLACE("body", 'otodark', 'arabanaozel'),
  "title" = REPLACE("title", 'Otodark', 'Arabana Özel'),
  "metaTitle" = REPLACE(COALESCE("metaTitle", ''), 'Otodark', 'Arabana Özel'),
  "metaDescription" = REPLACE(COALESCE("metaDescription", ''), 'otodark', 'arabanaozel'),
  "updatedAt" = NOW()
WHERE "body" ILIKE '%otodark%' OR "title" ILIKE '%otodark%';

-- Anasayfa video linki
UPDATE "HomeVideo"
SET "href" = '/', "updatedAt" = NOW()
WHERE "href" ILIKE '%otodark%' OR "href" ILIKE '%plakacim%';
