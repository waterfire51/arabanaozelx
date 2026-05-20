import { Plus, Save, Trash2 } from "lucide-react";
import { AdminIconUpload } from "@/components/admin-icon-upload";
import { getAdminIconCategories } from "@/lib/data";
import { deleteIcon, deleteIconCategory, saveIconCategory, updateIconMeta } from "../icon-actions";

export const dynamic = "force-dynamic";

export default async function AdminIconsPage() {
  const { categories, dbReady } = await getAdminIconCategories();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Şekil / İkon Yönetimi</h1>
        <p className="text-sm text-gray-600">
          Kategori oluşturun (Araçlar, Takımlar, Anime…), ikon yükleyin. Müşteriler siparişte katalogdan seçer veya özel ikon yükler.
        </p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı gerekli. `npm run prisma:migrate` ve `npm run prisma:seed` çalıştırın.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm">
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni İkon Kategorisi
        </summary>
        <form action={saveIconCategory} className="mt-4 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="id" value="" />
          <label>
            <span className="form-label">Kategori Adı</span>
            <input name="name" className="form-input" placeholder="Anime" required />
          </label>
          <label>
            <span className="form-label">Slug</span>
            <input name="slug" className="form-input" placeholder="anime" required />
          </label>
          <label>
            <span className="form-label">Sıra</span>
            <input name="sortOrder" type="number" className="form-input" defaultValue={categories.length} />
          </label>
          <label className="flex items-center gap-2 font-semibold md:col-span-2">
            <input name="active" type="checkbox" defaultChecked /> Aktif
          </label>
          <button type="submit" className="primary-button w-max md:col-span-2">
            <Save size={16} /> Kaydet
          </button>
        </form>
      </details>

      <div className="grid gap-5">
        {categories.map((category: any) => (
          <section key={category.id} className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-black">{category.name}</h2>
                <p className="text-sm text-gray-500">
                  /{category.slug} · {category._count?.icons ?? category.icons?.length ?? 0} ikon
                </p>
              </div>
              <form action={deleteIconCategory}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className="secondary-button text-red-700">
                  <Trash2 size={16} /> Kategoriyi Sil
                </button>
              </form>
            </div>

            <details className="mb-4">
              <summary className="cursor-pointer text-sm font-bold text-gray-700">Kategori düzenle</summary>
              <form action={saveIconCategory} className="mt-3 grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={category.id} />
                <label>
                  <span className="form-label">Ad</span>
                  <input name="name" className="form-input" defaultValue={category.name} required />
                </label>
                <label>
                  <span className="form-label">Slug</span>
                  <input name="slug" className="form-input" defaultValue={category.slug} required />
                </label>
                <label>
                  <span className="form-label">Sıra</span>
                  <input name="sortOrder" type="number" className="form-input" defaultValue={category.sortOrder} />
                </label>
                <label className="flex items-center gap-2 font-semibold">
                  <input name="active" type="checkbox" defaultChecked={category.active} /> Aktif
                </label>
                <button type="submit" className="primary-button w-max md:col-span-2">
                  <Save size={16} /> Güncelle
                </button>
              </form>
            </details>

            <AdminIconUpload categoryId={category.id} categoryName={category.name} />

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {(category.icons ?? []).map((icon: any) => (
                <div key={icon.id} className="rounded-lg border border-gray-200 p-2">
                  <img src={icon.url} alt={icon.name} className="mx-auto h-14 w-14 object-contain" />
                  <form action={updateIconMeta} className="mt-2 grid gap-1">
                    <input type="hidden" name="id" value={icon.id} />
                    <input name="name" className="form-input text-xs" defaultValue={icon.name} />
                    <input name="sortOrder" type="number" className="form-input text-xs" defaultValue={icon.sortOrder} />
                    <label className="flex items-center gap-1 text-xs font-semibold">
                      <input name="active" type="checkbox" defaultChecked={icon.active} /> Aktif
                    </label>
                    <button type="submit" className="secondary-button text-xs">
                      Kaydet
                    </button>
                  </form>
                  <form action={deleteIcon} className="mt-1">
                    <input type="hidden" name="id" value={icon.id} />
                    <button type="submit" className="w-full text-xs font-bold text-red-600">
                      Sil
                    </button>
                  </form>
                  {icon.source === "CUSTOMER" ? (
                    <span className="mt-1 block text-center text-[10px] font-bold text-blue-600">Müşteri</span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}

        {categories.length === 0 ? (
          <p className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">Henüz ikon kategorisi yok.</p>
        ) : null}
      </div>
    </div>
  );
}
