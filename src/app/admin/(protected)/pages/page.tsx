import { Save } from "lucide-react";
import { getAdminPages } from "@/lib/data";
import { savePage } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const { pages, dbReady } = await getAdminPages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Sayfalar</h1>
        <p className="text-sm text-gray-600">İletişim, sözleşme, galeri ve katalog içerikleri dinamik sayfa olarak yayınlanır.</p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok; içerikler seed ön izlemesi olarak gösteriliyor.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm">
        <summary className="cursor-pointer font-black text-black">Yeni Sayfa</summary>
        <PageForm />
      </details>

      <div className="grid gap-4">
        {pages.map((page) => (
          <details key={page.slug} className="rounded-lg bg-white p-5 shadow-sm">
            <summary className="cursor-pointer">
              <span className="font-black text-black">{page.title}</span>
              <span className="ml-3 text-sm text-gray-500">/{page.slug}</span>
            </summary>
            <PageForm page={page} />
          </details>
        ))}
      </div>
    </div>
  );
}

function PageForm({ page }: { page?: any }) {
  return (
    <form action={savePage} className="mt-5 grid gap-4">
      <input type="hidden" name="id" value={page?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="form-label">Başlık</span>
          <input name="title" className="form-input" defaultValue={page?.title || ""} required />
        </label>
        <label>
          <span className="form-label">Slug</span>
          <input name="slug" className="form-input" defaultValue={page?.slug || ""} required />
        </label>
      </div>
      <label>
        <span className="form-label">İçerik</span>
        <textarea name="body" className="form-input min-h-[220px]" defaultValue={page?.body || ""} required />
      </label>
      <div className="flex flex-wrap gap-4">
        <label>
          <span className="form-label">Durum</span>
          <select name="status" className="form-input" defaultValue={page?.status || "PUBLISHED"}>
            <option value="PUBLISHED">Yayında</option>
            <option value="DRAFT">Taslak</option>
          </select>
        </label>
        <label>
          <span className="form-label">Sıra</span>
          <input name="sortOrder" type="number" className="form-input w-24" defaultValue={page?.sortOrder || 0} />
        </label>
      </div>
      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
