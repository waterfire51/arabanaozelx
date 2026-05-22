"use client";

import Link from "next/link";
import { BookOpen, FileText, Home, ImageIcon, Menu, Phone, Rss, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { SiteCategory } from "@/lib/types";
import { useSiteBranding } from "@/components/site-settings-context";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";

function categoryHref(slug: string) {
  return `/kategori/${slug}`;
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
  { label: "Anasayfa", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: Rss },
  { label: "Kargo Takip", href: "/kargo-takip", icon: Truck },
  { label: "Galeri", href: "/galeri", icon: ImageIcon },
  { label: "İletişim", href: "/iletisim", icon: Phone },
  { label: "Sözleşmeler", href: "/sozlesmeler", icon: FileText }
] as const;

export function SiteHeader({ categories = [] }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { logoUrl, siteName, settings } = useSiteBranding();
  const phone = settings.contactWhatsapp?.replace(/\D/g, "") || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mobileMenu =
    mounted &&
    createPortal(
      <>
        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-[10000] bg-black/40 lg:hidden"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <aside
          id="site-mobile-menu"
          aria-hidden={!open}
          className={`fixed right-0 top-[66px] z-[10001] flex h-[calc(100vh-66px)] w-[280px] max-w-[calc(100vw-2rem)] flex-col bg-gradient-to-b from-[#f1f1f1] to-[#f2f8ff] p-8 shadow-[-5px_0_15px_rgba(0,0,0,0.16)] transition-transform duration-300 lg:hidden md:top-[78px] md:h-[calc(100vh-78px)] ${
            open ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        >
          <div className="text-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                width={140}
                height={64}
                decoding="sync"
                className="mx-auto mb-3 h-16 w-auto max-w-[140px] object-contain"
              />
            ) : null}
            <p className="font-semibold text-[#06142d]">{siteName}</p>
          </div>

          <nav className="mt-6 flex-1 overflow-y-auto">
            {menuLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 border-b-2 border-white px-2 py-4 text-[#06142d] hover:text-red-600"
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </>,
      document.body
    );

  return (
    <>
      <header className="site-header left-0 top-0 z-[999] w-full border-b border-[#f1f1f1] bg-white">
        <div className="site-container flex h-[78px] items-center justify-between gap-4 max-md:h-[66px]">
          <Link href="/" aria-label="Anasayfa" className="flex items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                width={118}
                height={40}
                decoding="sync"
                fetchPriority="high"
                className="h-auto w-[118px] max-md:w-[96px]"
              />
            ) : (
              <span className="text-lg font-black text-black">{siteName}</span>
            )}
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
            <Link className="legacy-header-icon max-md:hidden" href="/katalog" title="Katalog">
              <BookOpen size={20} />
            </Link>
            {phone ? (
              <a className="legacy-header-icon" href={`tel:+${phone.startsWith("90") ? phone : `90${phone}`}`} title="Bizi Arayın">
                <Phone size={20} />
              </a>
            ) : null}
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

      {mobileMenu}

      <WhatsAppFloatButton />
    </>
  );
}
