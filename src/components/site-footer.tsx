import Link from "next/link";
import { Home, MessageCircle, Phone } from "lucide-react";
import { assetPath } from "@/lib/assets";

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
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-[99] hidden w-full justify-between rounded-[60px] bg-white px-10 shadow-[0_2px_10px_rgba(0,0,0,0.16)] max-md:flex">
        <Link href="/" className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600">
          <span>
            <Home className="mx-auto mb-1" size={23} />
            Anasayfa
          </span>
        </Link>
        <a
          href="https://api.whatsapp.com/send?phone=905495742025"
          target="_blank"
          rel="noreferrer"
          className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600"
        >
          <span>
            <MessageCircle className="mx-auto mb-1" size={24} />
            Whatsapp
          </span>
        </a>
        <a href="tel:905495742025" className="grid h-[72px] w-[72px] place-items-center text-center text-xs text-gray-600">
          <span>
            <Phone className="mx-auto mb-1" size={22} />
            Ara
          </span>
        </a>
      </footer>

      <section className="site-container mt-10 bg-white px-4 py-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <img src={assetPath("site_gorsel/logo.png")} alt="Otodark logo" className="mb-4 max-w-full" />
            <p>
              <b>Adres:</b> Fevziçakmak Mah. Okyar Cad. Kobisan 4. San. Sit. A3 Blok No:18/3A Karatay/Konya
            </p>
            <p>
              <b>Tel:</b> 0(549) 574 20 25
            </p>
            <p>
              <b>Mail:</b> info@otodark.com
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
              <Link href="/admin" className="hover:text-red-600">
                Yönetim Paneli
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <img src={assetPath("site_gorsel/visa-master-3d-iyzico.png")} alt="visa master iyzico" className="mx-auto max-w-[260px]" />
          <p className="mt-4">Copyright 2026 © Otodark.com</p>
        </div>
      </section>
    </>
  );
}
