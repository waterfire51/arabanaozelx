import { AdminOrdersPanel } from "@/components/admin-orders-panel";
import { getAdminOrders } from "@/lib/data";
import { fetchIconNameLookup } from "@/lib/icon-display-name";
import { getSiteBaseUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const [{ orders, dbReady }, iconNameByPath] = await Promise.all([getAdminOrders(), fetchIconNameLookup()]);
  const siteBaseUrl = getSiteBaseUrl();

  const serializedOrders = orders.map((order) => ({
    id: order.id,
    orderNo: order.orderNo,
    customerFirstName: order.customerFirstName,
    customerLastName: order.customerLastName,
    phone: order.phone,
    city: order.city,
    district: order.district,
    address: order.address,
    status: order.status,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    total: order.total,
    createdAt: order.createdAt,
    items: order.items?.map((item) => ({
      design: item.design,
      variantLabel: item.variantLabel,
      product: item.product ? { name: item.product.name, slug: item.product.slug } : undefined
    }))
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Siparişler</h1>
        <p className="mt-1 text-sm text-gray-600">
          Sipariş no, müşteri adı veya telefon ile arayın; duruma göre filtreleyin.
        </p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok; siparişler kaydedilemez.
        </div>
      ) : null}

      {dbReady ? (
        <AdminOrdersPanel orders={serializedOrders} siteBaseUrl={siteBaseUrl} iconNameByPath={iconNameByPath} />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">Veritabanı bağlantısı bekleniyor.</div>
      )}
    </div>
  );
}
