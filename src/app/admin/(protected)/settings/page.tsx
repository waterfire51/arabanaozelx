import Link from "next/link";
import { ExternalLink, Save, Settings } from "lucide-react";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { AdminPageForm } from "@/components/admin-page-form";
import { getAdminPages, getSiteSettings } from "@/lib/data";
import { PAGE_LABELS } from "@/components/admin-page-form";
import { brandingAssetUrl, CONTACT_PAGE_SLUG, CONTRACT_PAGE_SLUGS } from "@/lib/site-settings";
import { saveSiteSettings } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, { pages, dbReady }] = await Promise.all([getSiteSettings(), getAdminPages()]);

  const contactPage =
    pages.find((p) => p.slug === CONTACT_PAGE_SLUG) ?? {
      slug: CONTACT_PAGE_SLUG,
      title: PAGE_LABELS[CONTACT_PAGE_SLUG],
      body: "",
      sortOrder: 0
    };

  const contractPages = CONTRACT_PAGE_SLUGS.map((slug) => {
    const found = pages.find((p) => p.slug === slug);
    return found ?? { slug, title: PAGE_LABELS[slug] || slug, body: "", sortOrder: 0 };
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black text-black">
            <Settings size={26} /> Site Ayarları
          </h1>
          <p className="text-sm text-gray-600">
            Logo, favicon, genel SEO, iletişim ve sözleşme sayfalarını buradan yönetin.
          </p>
        </div>
        <Link href="/" target="_blank" className="secondary-button">
          <ExternalLink size={16} /> Siteyi aç
        </Link>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          Veritabanı bağlantısı yok veya migration uygulanmadı.{" "}
          <code className="font-mono">npx prisma migrate deploy</code>
        </div>
      ) : null}

      <section className="mb-8 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">Marka & Görseller</h2>
        <p className="mt-1 text-sm text-gray-600">Header logosu, favicon ve sosyal paylaşım görseli.</p>
        <form action={saveSiteSettings} className="mt-5 grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="form-label">Site adı</span>
              <input name="siteName" className="form-input" defaultValue={settings.siteName} required />
            </label>
            <label>
              <span className="form-label">Sayfa başlık şablonu</span>
              <input
                name="titleTemplate"
                className="form-input font-mono text-sm"
                defaultValue={settings.titleTemplate}
                placeholder="%s | Arabana Özel"
              />
              <span className="mt-1 block text-xs text-gray-500">%s = sayfa başlığı</span>
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <AdminImageUpload
              folder="site_gorsel"
              inputName="logoPath"
              defaultPath={settings.logoPath || ""}
              label="Site logosu"
              hint="Header ve footer."
            />
            <AdminImageUpload
              folder="site_gorsel"
              inputName="faviconPath"
              defaultPath={settings.faviconPath || ""}
              label="Favicon"
              hint="Sekme ikonu."
            />
            <AdminImageUpload
              folder="site_gorsel"
              variant="slider"
              inputName="ogImagePath"
              defaultPath={settings.ogImagePath || ""}
              label="Varsayılan OG görseli"
              hint="Sosyal paylaşım önizlemesi."
            />
          </div>

          <div className="rounded-xl border border-[#ee3625]/15 bg-[#fff8f7] p-4 sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-wide text-[#c82014]">Genel SEO</h3>
            <div className="mt-4 grid gap-4">
              <label>
                <span className="form-label">Varsayılan meta başlık</span>
                <input name="defaultMetaTitle" className="form-input" defaultValue={settings.defaultMetaTitle} required />
              </label>
              <label>
                <span className="form-label">Varsayılan meta açıklama</span>
                <textarea
                  name="defaultMetaDescription"
                  className="form-input min-h-[80px]"
                  defaultValue={settings.defaultMetaDescription}
                  required
                />
              </label>
              <label>
                <span className="form-label">Varsayılan anahtar kelimeler</span>
                <input name="defaultMetaKeywords" className="form-input" defaultValue={settings.defaultMetaKeywords || ""} />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-sm font-black text-black">İletişim bilgileri (header / footer)</h3>
            <p className="mt-1 text-xs text-gray-500">İletişim sayfası metni aşağıda ayrıca düzenlenir.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label>
                <span className="form-label">Telefon (görünen)</span>
                <input name="contactPhone" className="form-input" defaultValue={settings.contactPhone || ""} placeholder="0(549) 574 20 25" />
              </label>
              <label>
                <span className="form-label">E-posta</span>
                <input name="contactEmail" className="form-input" defaultValue={settings.contactEmail || ""} />
              </label>
              <label>
                <span className="form-label">WhatsApp (sadece rakam)</span>
                <input name="contactWhatsapp" className="form-input" defaultValue={settings.contactWhatsapp || ""} placeholder="905495742025" />
              </label>
            </div>
          </div>

          <button type="submit" className="primary-button w-max">
            <Save size={16} /> Site ayarlarını kaydet
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
          {brandingAssetUrl(settings.logoPath) ? (
            <span>
              Logo önizleme:{" "}
              <img src={brandingAssetUrl(settings.logoPath)!} alt="" className="mt-1 inline-block h-8 align-middle" />
            </span>
          ) : null}
          {brandingAssetUrl(settings.faviconPath) ? (
            <span>
              Favicon:{" "}
              <img
                src={brandingAssetUrl(settings.faviconPath)!}
                alt=""
                className="mt-1 inline-block h-8 w-8 align-middle object-contain"
              />
            </span>
          ) : null}
        </div>
      </section>

      <section className="mb-8 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">İletişim Sayfası</h2>
        <p className="mt-1 text-sm text-gray-600">
          <Link href="/iletisim" target="_blank" className="font-semibold text-[#ee3625] hover:underline">
            /iletisim
          </Link>{" "}
          adresindeki içerik.
        </p>
        <AdminPageForm page={contactPage} returnTo="/admin/settings" showSlug={false} />
      </section>

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">Sözleşmeler</h2>
        <p className="mt-1 text-sm text-gray-600">
          <Link href="/sozlesmeler" target="_blank" className="font-semibold text-[#ee3625] hover:underline">
            /sozlesmeler
          </Link>{" "}
          ve alt sözleşme metinleri.
        </p>
        <div className="mt-4 grid gap-4">
          {contractPages.map((page) => (
            <details key={page.slug} className="rounded-lg border border-gray-100 p-4">
              <summary className="cursor-pointer font-bold text-black">
                {page.title}{" "}
                <span className="font-mono text-xs font-normal text-gray-400">/{page.slug}</span>
              </summary>
              <AdminPageForm page={page} returnTo="/admin/settings" showSlug={false} />
            </details>
          ))}
        </div>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        Galeri, kargo takip ve diğer sayfalar için{" "}
        <Link href="/admin/pages" className="font-semibold text-[#ee3625] hover:underline">
          Sayfalar
        </Link>{" "}
        bölümünü kullanın.
      </p>
    </div>
  );
}
