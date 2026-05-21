import Link from "next/link";
import { AdminPageForm } from "@/components/admin-page-form";
import { getAdminPages } from "@/lib/data";
import { GALLERY_PAGE_SLUG } from "@/lib/gallery";
import { CONTACT_PAGE_SLUG, CONTRACT_PAGE_SLUGS } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

const MANAGED_ELSEWHERE = new Set([CONTACT_PAGE_SLUG, GALLERY_PAGE_SLUG, ...CONTRACT_PAGE_SLUGS]);

export default async function AdminPagesPage() {
  const { pages, dbReady } = await getAdminPages();
  const otherPages = pages.filter((page) => !MANAGED_ELSEWHERE.has(page.slug));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Diğer Sayfalar</h1>
        <p className="text-sm text-gray-600">
          Kargo takip ve katalog sayfaları. Galeri{" "}
          <Link href="/admin/gallery" className="font-semibold text-[#ee3625] hover:underline">
            Galeri paneli
          </Link>
          , iletişim ve sözleşmeler{" "}
          <Link href="/admin/settings" className="font-semibold text-[#ee3625] hover:underline">
            Site Ayarları
          </Link>{" "}
          altındadır.
        </p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok; içerikler seed ön izlemesi olarak gösteriliyor.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm">
        <summary className="cursor-pointer font-black text-black">Yeni Sayfa</summary>
        <AdminPageForm />
      </details>

      <div className="grid gap-4">
        {otherPages.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">Liste dışı sayfa yok.</p>
        ) : null}
        {otherPages.map((page) => (
          <details key={page.slug} className="rounded-lg bg-white p-5 shadow-sm">
            <summary className="cursor-pointer">
              <span className="font-black text-black">{page.title}</span>
              <span className="ml-3 text-sm text-gray-500">/{page.slug}</span>
            </summary>
            <AdminPageForm page={page} />
          </details>
        ))}
      </div>
    </div>
  );
}
