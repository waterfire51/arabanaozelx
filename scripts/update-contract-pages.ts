import { PrismaClient } from "@prisma/client";
import { contractPages } from "../src/lib/contract-pages";

const prisma = new PrismaClient();

async function main() {
  for (const [index, page] of contractPages.entries()) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        body: page.body,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        status: "PUBLISHED"
      },
      create: {
        slug: page.slug,
        title: page.title,
        body: page.body,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        status: "PUBLISHED",
        sortOrder: 10 + index
      }
    });
    console.log(`✓ ${page.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
