import Link from "next/link";
import type { SitePage } from "@/lib/types";
import { TrackOrder } from "./track-order";

function Gallery() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: 28 }, (_, index) => {
        const name = String(index + 1).padStart(3, "0");
        return (
          <a key={name} href={`/assets/img/wp-musteri/${name}.jpg`} target="_blank" rel="noreferrer" className="overflow-hidden rounded-lg bg-gray-100">
            <img src={`/assets/img/wp-musteri/${name}.jpg`} alt={`Müşteri görseli ${name}`} className="h-44 w-full object-cover transition hover:scale-105" />
          </a>
        );
      })}
    </div>
  );
}

function Agreements() {
  const links = [
    ["Gizlilik Sözleşmesi", "/gizlilik-sozlesmesi"],
    ["KVKK", "/kvkk"],
    ["Satış Sözleşmesi", "/satis-sozlesmesi"],
    ["İade ve İptal Sözleşmesi", "/iade-ve-ipal-sozlesmesi"]
  ];

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="rounded-lg border border-gray-200 bg-white p-4 font-bold hover:border-red-500 hover:text-red-600">
          {label}
        </Link>
      ))}
    </div>
  );
}

export function PageContent({ page }: { page: SitePage }) {
  return (
    <main className="site-container py-8">
      <article className="otodark-card p-6">
        <h1 className="text-2xl font-black text-black">{page.title}</h1>
        <div className="mt-5 whitespace-pre-line text-base leading-8 text-gray-700">{page.body}</div>
        {page.slug === "galeri" ? <Gallery /> : null}
        {page.slug === "sozlesmeler" ? <Agreements /> : null}
        {page.slug === "kargo-takip" ? (
          <TrackOrder />
        ) : null}
      </article>
    </main>
  );
}
