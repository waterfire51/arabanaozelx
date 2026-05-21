import { getPublishedGalleryImages } from "@/lib/data";
import { GalleryGrid } from "./gallery-grid";

export async function GallerySection() {
  const { images } = await getPublishedGalleryImages();
  return <GalleryGrid images={images} />;
}
