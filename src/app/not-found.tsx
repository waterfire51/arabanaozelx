import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { resolveSiteBranding } from "@/lib/site-settings";

export default async function NotFound() {
  const { logoUrl, siteName } = resolveSiteBranding(await getSiteSettings());

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f9] p-6">
      <div className="site-card max-w-md p-6 text-center">
        {logoUrl ? (
          <img src={logoUrl} alt={siteName} className="mx-auto mb-4 max-h-20 max-w-[180px] object-contain" />
        ) : (
          <p className="mb-4 text-lg font-black text-black">{siteName}</p>
        )}
        <h1 className="text-2xl font-black text-black">Sayfa bulunamadı</h1>
        <p className="mt-2 text-gray-600">Aradığınız ürün veya içerik henüz yönetim panelinde yayınlanmamış olabilir.</p>
        <Link href="/" className="primary-button mt-5">
          Anasayfaya Dön
        </Link>
      </div>
    </main>
  );
}
