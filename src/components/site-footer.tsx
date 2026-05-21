"use client";

import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { useSiteBranding } from "@/components/site-settings-context";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/site-settings";

const productLinks = [
  ["Işıklı Oto Plakalık", "/plplakalik/otomobil"],
  ["Işıksız Oto Plakalık", "/plakalik/otomobil"],
  ["Işıklı Motor Plakalık", "/plplakalik/motor"],
  ["Işıksız Motor Plakalığı", "/plakalik/motor"],
  ["Oto Boyun Yastığı", "/boyunyastigi"],
  ["Oto Bel Yastığı", "/belyastigi"],
  ["Anahtarlık", "/anahtarlik"],
  ["Direksiyon Kılıfı", "/direksiyonkilifi"],
  ["Bagaj Düzenleme Filesi", "/bagajfile"],
  ["Araç İçi Germe File", "/otofile"]
];

export function SiteFooter() {
  const { logoUrl, siteName, settings } = useSiteBranding();
  const whatsapp = normalizeWhatsAppNumber(settings.contactWhatsapp);
  const whatsappHref = buildWhatsAppUrl(settings.contactWhatsapp);
  const phone = settings.contactPhone || "0(549) 574 20 25";
  const email = settings.contactEmail || "info@arabanaozel.com";

  return (
    <>
      <footer className="fixed bottom-0 left-0 z-[99] hidden w-full justify-between rounded-[60px] bg-white px-10 shadow-[0_2px_10px_rgba(0,0,0,0.16)] max-md:flex">
        <Link href="/" className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600">
          <span>
            <Home className="mx-auto mb-1" size={23} />
            Anasayfa
          </span>
        </Link>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600"
          >
            <span>
              <WhatsAppIcon className="mx-auto mb-1 h-6 w-6 text-[#25D366]" />
              Whatsapp
            </span>
          </a>
        ) : null}
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600">
          <span>
            <Phone className="mx-auto mb-1" size={22} />
            Ara
          </span>
        </a>
      </footer>

      <section className="site-container mt-10 bg-white px-4 py-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            {logoUrl ? <img src={logoUrl} alt={siteName} className="mb-4 max-w-full" /> : null}
            <p>
              <b>Tel:</b> {phone}
            </p>
            <p>
              <b>Mail:</b> {email}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <Link href="/iletisim" className="font-semibold text-[#ee3625] hover:underline">
                İletişim sayfası →
              </Link>
            </p>
          </div>

          <div>
            <b>ÜRÜNLER</b>
            <div className="mt-2 grid gap-1">
              {productLinks.slice(0, 5).map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-red-600">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <b>ÜRÜNLER</b>
            <div className="mt-2 grid gap-1">
              {productLinks.slice(5).map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-red-600">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <b>HIZLI LİNKLER</b>
            <div className="mt-2 grid gap-1">
              <Link href="/kargo-takip" className="hover:text-red-600">
                Kargo Takip
              </Link>
              <Link href="/galeri" className="hover:text-red-600">
                Galeri
              </Link>
              <Link href="/iletisim" className="hover:text-red-600">
                İletişim
              </Link>
              <Link href="/sozlesmeler" className="hover:text-red-600">
                Sözleşmeler
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <img src={assetPath("site_gorsel/visa-master-3d-iyzico.png")} alt="visa master iyzico" className="mx-auto max-w-[260px]" />
          <p className="mt-4">Copyright 2026 © {siteName}</p>
        </div>
      </section>
    </>
  );
}
