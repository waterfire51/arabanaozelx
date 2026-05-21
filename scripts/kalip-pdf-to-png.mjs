/**
 * kalip.pdf → public/print/kalip.png (baskı şablonu arka planı)
 * node scripts/kalip-pdf-to-png.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = path.join(import.meta.dirname, "..");
const pdfPath = path.join(root, "public", "print", "kalip.pdf");
const outPath = path.join(root, "public", "print", "kalip.png");

const scale = 3;
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await getDocument({ data, useSystemFonts: true }).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale });

const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const ctx = canvas.getContext("2d");

await page.render({
  canvasContext: ctx,
  viewport
}).promise;

fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
console.log(`OK ${outPath} (${viewport.width}x${viewport.height}px)`);
