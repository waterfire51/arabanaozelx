import Link from "next/link";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { AdminPageForm } from "@/components/admin-page-form";
import { getAdminGalleryImages, getAdminPages } from "@/lib/data";
import { GALLERY_PAGE_SLUG } from "@/lib/gallery";
import { deleteGalleryImage, saveGalleryImage } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const [{ images, dbReady }, { pages }] = await Promise.all([getAdminGalleryImages(), getAdminPages()]);

  const galleryPage =
    pages.find((p) => p.slug === GALLERY_PAGE_SLUG) ?? {
      slug: GALLERY_PAGE_SLUG,
      title: "Galeri",
      body: "Müşterilerimizden gelen uygulama fotoğrafları.",
      sortOrder: 0
    };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black">Galeri</h1>
          <p className="text-sm text-gray-600">Görselleri yükleyin, sıralayın. Sitede tıklanınca lightbox ile büyür.</p>
        </div>
        <Link href="/galeri" target="_blank" className="secondary-button">
          <ExternalLink size={16} /> Galeri sayfası
        </Link>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok veya GalleryImage tablosu oluşturulmadı.{" "}
          <code className="font-mono">npx prisma migrate deploy</code>
        </div>
      ) : null}

      <section className="mb-8 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">Galeri sayfa metni</h2>
        <p className="mt-1 text-sm text-gray-600">Başlık ve üst açıklama (/galeri).</p>
        <AdminPageForm page={galleryPage} returnTo="/admin/gallery" showSlug={false} />
      </section>

      <h2 className="mb-3 text-lg font-black text-black">Görseller</h2>

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm" open={images.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni Görsel
        </summary>
        <GalleryImageForm />
      </details>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.length === 0 ? (
          <p className="col-span-full rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
            Henüz görsel yok. Yukarıdan ekleyin veya seed çalıştırın.
          </p>
        ) : null}
        {images.map((image, index) => (
          <details key={image.id} className="rounded-lg bg-white p-4 shadow-sm">
            <summary className="cursor-pointer">
              <img
                src={image.url}
                alt=""
                className="mb-3 h-36 w-full rounded-lg object-cover"
              />
              <span className="block text-sm font-bold text-black">{image.caption || "Başlıksız"}</span>
              <span className="text-xs text-gray-500">
                Sıra {image.sortOrder ?? index} · {image.active === false ? "Pasif" : "Yayında"}
              </span>
            </summary>
            <GalleryImageForm image={image} />
            {image.id && !image.id.startsWith("fallback") && dbReady ? (
              <form action={deleteGalleryImage} className="mt-3">
                <input type="hidden" name="id" value={image.id} />
                <button type="submit" className="secondary-button text-red-700">
                  <Trash2 size={16} /> Sil
                </button>
              </form>
            ) : null}
          </details>
        ))}
      </div>
    </div>
  );
}

type GalleryImageRow = {
  id?: string;
  imagePath: string;
  caption?: string | null;
  sortOrder?: number;
  active?: boolean;
};

function GalleryImageForm({ image }: { image?: GalleryImageRow }) {
  return (
    <form action={saveGalleryImage} className="mt-4 grid gap-4">
      <input type="hidden" name="id" value={image?.id?.startsWith("fallback") ? "" : image?.id || ""} />

      <AdminImageUpload
        folder="wp_musteri_gorsel"
        variant="slider"
        inputName="imagePath"
        defaultPath={image?.imagePath || ""}
        label="Görsel"
        hint="JPG, PNG veya WebP. Müşteri galerisi klasörüne kaydedilir."
      />

      <label>
        <span className="form-label">Açıklama (isteğe bağlı)</span>
        <input name="caption" className="form-input" defaultValue={image?.caption || ""} placeholder="Örn. Işıklı plakalık uygulaması" />
      </label>

      <div className="flex flex-wrap gap-4">
        <label>
          <span className="form-label">Sıra</span>
          <input name="sortOrder" type="number" className="form-input w-24" defaultValue={image?.sortOrder ?? 0} />
        </label>
        <label className="flex items-center gap-2 pt-6">
          <input type="checkbox" name="active" defaultChecked={image?.active !== false} className="h-4 w-4" />
          <span className="text-sm font-semibold">Yayında</span>
        </label>
      </div>

      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
