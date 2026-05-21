import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const file = path.join(process.cwd(), "public", "print", "kalip.pdf");
const bytes = fs.readFileSync(file);
const doc = await PDFDocument.load(bytes);

console.log("pages", doc.getPageCount());
for (const [i, page] of doc.getPages().entries()) {
  const { width, height } = page.getSize();
  console.log(`page ${i + 1}: ${width.toFixed(2)} x ${height.toFixed(2)} pt (${(width / 72 * 25.4).toFixed(1)} x ${(height / 72 * 25.4).toFixed(1)} mm)`);
}
