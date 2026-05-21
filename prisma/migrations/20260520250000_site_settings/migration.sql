-- AlterTable
ALTER TABLE "Page" ADD COLUMN "metaTitle" TEXT,
ADD COLUMN "metaDescription" TEXT,
ADD COLUMN "metaKeywords" TEXT;

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT 'Arabana Özel',
    "defaultMetaTitle" TEXT NOT NULL DEFAULT 'Arabana Özel | Kişiye Özel Oto Aksesuar',
    "defaultMetaDescription" TEXT NOT NULL DEFAULT 'Kişiye özel oto plakalık, anahtarlık, araç içi aksesuar ve sipariş yönetimi.',
    "defaultMetaKeywords" TEXT,
    "titleTemplate" TEXT NOT NULL DEFAULT '%s | Arabana Özel',
    "logoPath" TEXT NOT NULL DEFAULT 'site_gorsel/logo.png',
    "faviconPath" TEXT NOT NULL DEFAULT 'site_gorsel/ddark.png',
    "ogImagePath" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "contactWhatsapp" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
