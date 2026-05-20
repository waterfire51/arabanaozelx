-- CreateEnum
CREATE TYPE "IconSource" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateTable
CREATE TABLE "IconCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IconCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT,
    "source" "IconSource" NOT NULL DEFAULT 'ADMIN',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IconCategory_slug_key" ON "IconCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_filePath_key" ON "Icon"("filePath");

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "IconCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
