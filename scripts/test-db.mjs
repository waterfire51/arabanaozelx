import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const hasUrl = Boolean(process.env.DATABASE_URL);
  console.log("DATABASE_URL set:", hasUrl);
  await prisma.$queryRaw`SELECT 1 AS ok`;
  const products = await prisma.product.count();
  console.log("Connection OK, products:", products);
} catch (error) {
  console.error("Connection FAILED:", error?.message ?? error);
} finally {
  await prisma.$disconnect();
}
