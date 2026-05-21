"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { SiteGalleryImage } from "@/lib/types";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryGrid({ images }: { images: SiteGalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
        Henüz galeri görseli eklenmemiş.
      </p>
    );
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="group relative overflow-hidden rounded-lg bg-gray-100 text-left ring-offset-2 transition hover:ring-2 hover:ring-[#ee3625] focus:outline-none focus:ring-2 focus:ring-[#ee3625]"
            onClick={() => setLightboxIndex(index)}
            aria-label={image.caption || `Galeri görseli ${index + 1}`}
          >
            <img
              src={image.url}
              alt={image.caption || ""}
              className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
              <ZoomIn
                size={32}
                className="text-white opacity-0 drop-shadow transition group-hover:opacity-100"
                aria-hidden
              />
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      ) : null}
    </>
  );
}
