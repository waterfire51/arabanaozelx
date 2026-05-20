import { getAdminOrders } from "@/lib/data";
import { formatPrice } from "@/lib/paths";
import { updateOrderStatus } from "../actions";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONFIRMED", "PRODUCTION", "SHIPPED", "CANCELLED"];

export default async function AdminOrdersPage() {
  const { orders, dbReady } = await getAdminOrders();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Siparişler</h1>
        <p className="text-sm text-gray-600">Ürün tasarım formundan gelen siparişler burada tutulur.</p>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok; siparişler kaydedilemez.
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Sipariş</th>
              <th className="px-4 py-3">Müşteri</th>
              <th className="px-4 py-3">Adres</th>
              <th className="px-4 py-3">Tutar</th>
              <th className="px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-black text-black">{order.orderNo}</td>
                <td className="px-4 py-3">
                  {order.customerFirstName} {order.customerLastName}
                  <span className="block text-xs text-gray-500">{order.phone}</span>
                </td>
                <td className="px-4 py-3">
                  {order.city}/{order.district}
                  <span className="block max-w-[260px] truncate text-xs text-gray-500">{order.address}</span>
                </td>
                <td className="px-4 py-3 font-black text-red-600">{formatPrice(order.total)}</td>
                <td className="px-4 py-3">
                  <form action={updateOrderStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" className="form-input min-w-[150px]" defaultValue={order.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="secondary-button">
                      Güncelle
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Henüz sipariş yok.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
