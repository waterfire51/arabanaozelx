-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PAYTR', 'COD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "paytrMerchantOid" TEXT,
ADD COLUMN "customerEmail" TEXT,
ADD COLUMN "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'COD',
ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID';

-- CreateIndex
CREATE UNIQUE INDEX "Order_paytrMerchantOid_key" ON "Order"("paytrMerchantOid");
