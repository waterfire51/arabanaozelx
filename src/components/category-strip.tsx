import Link from "next/link";
import type { SiteCategory, SiteHomeVideo } from "@/lib/types";
import { assetPath } from "@/lib/paths";

function categoryHref(slug: string) {
  const map: Record<string, string> = {
    plakalik: "/plakalik/otomobil",
    "motor-plakalik": "/plakalik/motor",
    "kapi-esigi": "/kapiesigi",
    anahtarlik: "/anahtarlik",
    "oto-aksesuar": "/guneslik",
    konfor: "/belyastigi"
  };

  return map[slug] ?? `/${slug}`;
}

export function CategoryStrip({
  categories,
  homeVideo
}: {
  categories: SiteCategory[];
  homeVideo?: SiteHomeVideo | null;
}) {
  const showVideo = homeVideo?.active !== false && Boolean(homeVideo?.videoPath);
  const videoSrc = homeVideo?.videoPath ? assetPath(homeVideo.videoPath) : "";

  const videoBlock = showVideo ? (
    <video autoPlay loop muted playsInline className="mb-4 h-auto w-full rounded-sm object-fill">
      <source src={videoSrc} type="video/mp4" />
    </video>
  ) : null;

  return (
    <section className="bg-[#f8f8f8] pb-4">
      <div className="site-container">
        {showVideo && videoBlock ? (
          homeVideo?.href ? (
            <a href={homeVideo.href} target="_blank" rel="noreferrer" className="block">
              {videoBlock}
            </a>
          ) : (
            videoBlock
          )
        ) : null}

        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={categoryHref(category.slug)}
              className="text-center"
            >
              <span className="mx-auto mb-2 grid h-[60px] w-[60px] place-items-center rounded-full bg-white shadow-[0_5px_20px_rgba(36,36,36,0.05)]">
                <img src={assetPath(category.iconPath)} alt={category.name} className="max-h-10 max-w-10 object-contain" />
              </span>
              <span className="block text-xs font-semibold leading-tight text-black">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
