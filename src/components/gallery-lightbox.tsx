"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SiteGalleryImage } from "@/lib/types";

type GalleryLightboxProps = {
  images: SiteGalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

export function GalleryLightbox({ images, initialIndex, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const current = images[index];

  const goPrev = useCallback(() => {
    setIndex((value) => (value <= 0 ? images.length - 1 : value - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((value) => (value >= images.length - 1 ? 0 : value + 1));
  }, [images.length]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  if (!current) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Galeri görseli"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
        aria-label="Kapat"
      >
        <X size={24} />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-6"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Önceki görsel"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Sonraki görsel"
          >
            <ChevronRight size={28} />
          </button>
        </>
      ) : null}

      <figure
        className="relative flex max-h-[90vh] max-w-[min(1100px,100%)] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={current.url}
          alt={current.caption || "Galeri görseli"}
          className="max-h-[calc(90vh-3rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        {current.caption ? (
          <figcaption className="mt-3 text-center text-sm font-medium text-white/90">{current.caption}</figcaption>
        ) : null}
        {images.length > 1 ? (
          <p className="mt-2 text-xs text-white/60">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </figure>
    </div>
  );
}
