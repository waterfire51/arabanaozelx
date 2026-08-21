import Link from "next/link";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { getAdminCategories } from "@/lib/data";
import type { SiteCategory } from "@/lib/types";
import { deleteCategory, saveCategory } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const { categories, dbReady } = await getAdminCategories();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black">Kategoriler / Menü</h1>
          <p className="mt-1 text-sm text-gray-600">
            Aktif kategoriler, sıra numarasına göre site menüsünde otomatik gösterilir.
          </p>
        </div>
        <Link href="/" target="_blank" className="secondary-button">
          <ExternalLink size={16} /> Siteyi Gör
        </Link>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı kurulamadı. Kategoriler kaydedilemez.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm" open={categories.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni Kategori
        </summary>
        <CategoryForm sortOrder={categories.length} />
      </details>

      <div className="grid gap-4">
        {categories.map((category, index) => (
          <details key={category.id ?? category.slug} className="rounded-lg bg-white p-5 shadow-sm" open={index === 0}>
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
              <span>
                <span className="font-black text-black">{category.name}</span>
                <span className="ml-2 font-mono text-xs text-gray-400">/kategori/{category.slug}</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Sıra {category.sortOrder ?? index} · {category.active === false ? "Pasif" : "Menüde"}
              </span>
            </summary>
            <CategoryForm category={category} sortOrder={index} />
            {category.id && dbReady ? (
              <form action={deleteCategory} className="mt-3">
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className="secondary-button text-red-700">
                  <Trash2 size={16} /> Kategoriyi Sil
                </button>
                <p className="mt-2 text-xs text-gray-500">Silinen kategorideki ürünler silinmez; kategorisiz kalır.</p>
              </form>
            ) : null}
          </details>
        ))}
      </div>
    </div>
  );
}

function CategoryForm({ category, sortOrder }: { category?: SiteCategory; sortOrder: number }) {
  return (
    <form action={saveCategory} className="mt-5 grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={category?.id || ""} />
      <label>
        <span className="form-label">Kategori adı</span>
        <input name="name" className="form-input" defaultValue={category?.name || ""} required />
      </label>
      <label>
        <span className="form-label">Adres (slug)</span>
        <input name="slug" className="form-input font-mono" defaultValue={category?.slug || ""} placeholder="oto-aksesuar" required />
      </label>
      <label>
        <span className="form-label">Kategori görsel yolu</span>
        <input name="iconPath" className="form-input font-mono" defaultValue={category?.iconPath || ""} placeholder="kategori_gorsel/ornek.webp" />
      </label>
      <label>
        <span className="form-label">Menü sırası</span>
        <input name="sortOrder" type="number" className="form-input" defaultValue={category?.sortOrder ?? sortOrder} />
      </label>
      <label className="flex items-center gap-2 md:col-span-2">
        <input type="checkbox" name="active" defaultChecked={category?.active !== false} className="h-4 w-4 accent-[#ee3625]" />
        <span className="text-sm font-semibold text-gray-700">Aktif (site menüsünde ve kategori alanlarında göster)</span>
      </label>
      <button type="submit" className="primary-button w-max md:col-span-2">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
