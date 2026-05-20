"use client";

import Link from "next/link";
import { BookOpen, Home, Menu, Phone, Rss, Truck, X } from "lucide-react";
import { useState } from "react";
import type { SiteCategory } from "@/lib/types";

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

type SiteHeaderProps = {
  categories?: SiteCategory[];
};

const keywordLinks = [
  { label: "Plakalık", href: "/plakalik/otomobil" },
  { label: "Kapı Eşiği", href: "/kapiesigi" },
  { label: "Kemer Kılıf", href: "/boyunyastigi" },
  { label: "Oto Anten", href: "/kopekbaligi" },
  { label: "Anahtarlık", href: "/anahtarlik" },
  { label: "Bagaj Filesi", href: "/bagajfile" },
  { label: "Oto Cam Suyu", href: "/camsuyu" },
  { label: "Motosiklet Plakalık", href: "/plakalik/motor" }
];

const menuLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Kargo Takip", href: "/kargo-takip" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Sözleşmeler", href: "/sozlesmeler" },
  { label: "Yönetim Paneli", href: "/admin" }
];

export function SiteHeader({ categories = [] }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-[999] w-full border-b border-[#f1f1f1] bg-white">
        <div className="site-container flex h-[78px] items-center justify-between gap-4 max-md:h-[66px]">
          <Link href="/" aria-label="Anasayfa" className="flex items-center">
            <img src="/assets/img/logo.png" alt="Otodark" className="h-auto w-[118px] max-md:w-[96px]" />
          </Link>

          <div className="hidden flex-1 justify-center gap-2 lg:flex">
            {keywordLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-red-500 hover:text-red-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link className="legacy-header-icon max-md:hidden" href="/blog" title="Blog">
              <Rss size={19} />
            </Link>
            <Link className="legacy-header-icon" href="/kargo-takip" title="Sipariş Takip">
              <Truck size={20} />
            </Link>
            <Link className="legacy-header-icon max-md:hidden" href="/otodark-katalog" title="Katalog">
              <BookOpen size={20} />
            </Link>
            <a className="legacy-header-icon" href="tel:905495742025" title="Bizi Arayın">
              <Phone size={20} />
            </a>
            <button
              type="button"
              className="legacy-header-icon"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Menü"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className="hidden bg-[#f8f8f8] px-4 py-3 lg:block">
          <div className="site-container flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={categoryHref(category.slug)}
                className="rounded border border-gray-200 bg-white px-2 py-1 text-[13px] text-gray-700 hover:text-red-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div
        className={`fixed right-0 top-[78px] z-[9999] h-screen w-[280px] max-w-full bg-gradient-to-b from-[#f1f1f1] to-[#f2f8ff] p-10 shadow-[-5px_0_15px_rgba(0,0,0,0.16)] transition-transform duration-300 max-md:top-[66px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="text-center">
          <img src="/assets/img/ddark.png" alt="Dark Otomotiv" className="mx-auto mb-3 h-16 w-16 rounded-full object-contain" />
          <p className="font-semibold text-[#06142d]">
            Dark Otomotiv <span className="block text-xs font-normal">www.otodark.com</span>
          </p>
        </div>

        <nav className="mt-8 max-h-[420px] overflow-y-auto">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 border-b-2 border-white px-2 py-4 text-[#06142d] hover:text-red-600"
              onClick={() => setOpen(false)}
            >
              <Home size={16} />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <a
        href="https://wa.me/905495742025?text=Merhaba,%20yard%C4%B1mc%C4%B1%20olabilir%20misiniz?"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-1/2 left-3 z-[100] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#25d366] text-center text-[24px] font-black text-white shadow-lg"
        aria-label="WhatsApp"
      >
        W
      </a>
    </>
  );
}
