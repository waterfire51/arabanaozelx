"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteHeroSlide } from "@/lib/types";
import { assetPath } from "@/lib/paths";

export function HeroSlider({ slides }: { slides: SiteHeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[active];
  const content = (
    <div className="hero-frame">
      <img src={assetPath(slide.imagePath)} alt={slide.title || "Arabana özel ürün"} />
    </div>
  );

  return (
    <section className="bg-[#f8f8f8] py-3">
      <div className="site-container">
        {slide.href ? <Link href={slide.href}>{content}</Link> : content}
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={`${item.imagePath}-${index}`}
              type="button"
              className={`h-3 w-3 rounded-full border-2 ${index === active ? "border-red-500 bg-red-500" : "border-gray-300 bg-white"}`}
              onClick={() => setActive(index)}
              aria-label={`${index + 1}. slayta git`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
