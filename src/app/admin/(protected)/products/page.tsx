import { Plus, Save, Trash2 } from "lucide-react";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { assetPath } from "@/lib/assets";
import { getAdminCategories, getAdminProducts } from "@/lib/data";
import { formatPrice } from "@/lib/paths";
import { deleteProduct, saveProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [{ products, dbReady }, { categories }] = await Promise.all([getAdminProducts(), getAdminCategories()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Ürünler</h1>
        <p className="text-sm text-gray-600">Ana sayfa ürünleri, ürün sayfaları ve tasarım seçenekleri buradan yönetilir.</p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlı olmadığı için listeler seed verisinden geliyor; kayıt için DATABASE_URL kurulumunu tamamla.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm">
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni Ürün
        </summary>
        <ProductForm categories={categories} />
      </details>

      <div className="grid gap-4">
        {products.map((product) => (
          <details key={product.slug} className="rounded-lg bg-white p-5 shadow-sm">
            <summary className="grid cursor-pointer gap-3 md:grid-cols-[80px_1fr_auto] md:items-center">
              <img src={assetPath(product.imagePath, product.slug)} alt="" className="h-20 w-20 rounded bg-gray-100 object-contain p-2" />
              <span>
                <span className="block font-black text-black">{product.name}</span>
                <span className="text-sm text-gray-500">/{product.slug}</span>
              </span>
              <span className="text-lg font-black text-red-600">{formatPrice(product.price)}</span>
            </summary>
            <ProductForm product={product} categories={categories} />
            {product.id ? (
              <form action={deleteProduct} className="mt-3">
                <input type="hidden" name="id" value={product.id} />
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

function ProductForm({
  product,
  categories
}: {
  product?: any;
  categories: Array<{ id?: string; name: string; slug: string }>;
}) {
  const variants = product?.variants?.length
    ? JSON.stringify(
        product.variants.map((variant: any) => ({
          label: variant.label,
          quantity: variant.quantity,
          unitPrice: variant.unitPrice,
          shipmentPrice: variant.shipmentPrice
        })),
        null,
        2
      )
    : "";

  return (
    <form action={saveProduct} className="mt-5 grid gap-4">
      <input type="hidden" name="id" value={product?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="form-label">Ürün Adı</span>
          <input name="name" className="form-input" defaultValue={product?.name || ""} required />
        </label>
        <label>
          <span className="form-label">Slug</span>
          <input name="slug" className="form-input" defaultValue={product?.slug || ""} required />
        </label>
        <label>
          <span className="form-label">Fiyat</span>
          <input name="price" type="number" className="form-input" defaultValue={product?.price || ""} required />
        </label>
        <label>
          <span className="form-label">Kategori</span>
          <select name="categoryId" className="form-input" defaultValue={product?.category?.id || ""}>
            <option value="">Kategori yok</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.id || ""}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <div className="md:col-span-2">
          <AdminImageUpload
            slug={product?.slug || ""}
            defaultPath={product?.imagePath || "urun_gorsel/1.webp"}
            showPathInput
          />
        </div>
        <label>
          <span className="form-label">Rozet</span>
          <input name="badge" className="form-input" defaultValue={product?.badge || ""} />
        </label>
      </div>

      <label>
        <span className="form-label">Kısa Açıklama</span>
        <input name="shortDescription" className="form-input" defaultValue={product?.shortDescription || ""} />
      </label>
      <label>
        <span className="form-label">Açıklama</span>
        <textarea name="description" className="form-input min-h-[90px]" defaultValue={product?.description || ""} />
      </label>
      <label>
        <span className="form-label">Varyantlar JSON</span>
        <textarea name="variants" className="form-input min-h-[160px] font-mono text-xs" defaultValue={variants} />
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 font-semibold">
          <input name="active" type="checkbox" defaultChecked={product?.active ?? true} /> Aktif
        </label>
        <label className="flex items-center gap-2 font-semibold">
          <input name="featured" type="checkbox" defaultChecked={product?.featured ?? true} /> Ana sayfada göster
        </label>
        <label className="flex items-center gap-2 font-semibold">
          <input name="customizable" type="checkbox" defaultChecked={product?.customizable ?? true} /> Tasarlanabilir
        </label>
        <label className="flex items-center gap-2 font-semibold">
          Sıra <input name="sortOrder" type="number" className="form-input w-24" defaultValue={product?.sortOrder || 0} />
        </label>
      </div>

      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
