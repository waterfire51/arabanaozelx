import { assetPath } from "@/lib/assets";
import type { SiteGalleryImage } from "@/lib/types";

export const GALLERY_PAGE_SLUG = "galeri";

export function fallbackGalleryImages(): SiteGalleryImage[] {
  return Array.from({ length: 28 }, (_, index) => {
    const name = String(index + 1).padStart(3, "0");
    const imagePath = `wp_musteri_gorsel/${name}.jpg`;
    return {
      id: `fallback-${name}`,
      imagePath,
      caption: `Müşteri görseli ${index + 1}`,
      sortOrder: index,
      active: true,
      url: assetPath(imagePath)
    };
  });
}

export function serializeGalleryImage(row: {
  id: string;
  imagePath: string;
  caption: string | null;
  sortOrder: number;
  active: boolean;
}): SiteGalleryImage {
  return {
    id: row.id,
    imagePath: row.imagePath,
    caption: row.caption,
    sortOrder: row.sortOrder,
    active: row.active,
    url: assetPath(row.imagePath)
  };
}
