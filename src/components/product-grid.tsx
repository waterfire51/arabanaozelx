import Link from "next/link";
import type { SiteProduct } from "@/lib/types";
import { assetPath, formatPrice, hrefForSlug } from "@/lib/paths";

export function ProductGrid({ products }: { products: SiteProduct[] }) {
  return (
    <section className="site-container py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black">Kişiye Özel Oto Aksesuarlar</h1>
        <Link href="/admin" className="text-xs font-semibold text-red-600">
          Yönet
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {products.map((product) => (
          <Link key={product.slug} href={hrefForSlug(product.slug)} className="product-grid-card">
            {product.badge ? (
              <span className="mb-2 inline-flex rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">{product.badge}</span>
            ) : null}
            <div className="mb-3 grid min-h-[170px] place-items-center">
              <img loading="lazy" width={250} src={assetPath(product.imagePath)} alt={product.name} />
            </div>
            <h2 className="min-h-[38px] text-sm font-bold leading-tight text-black">{product.name}</h2>
            <div className="mt-2 text-[13px] font-bold text-red-600">{formatPrice(product.price)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
