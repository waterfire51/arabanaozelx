"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CopyOrderTrackLink } from "@/components/copy-order-track-link";
import { OrderStatusSelect } from "@/components/order-status-select";
import { OrderDesignImageDownload } from "@/components/order-design-image-download";
import { OrderDesignPreview } from "@/components/order-design-preview";
import { formatPrice } from "@/lib/paths";
import type { IconNameLookup } from "@/lib/icon-display-name";
import { getOrderStatusLabel, ORDER_STATUS_OPTIONS } from "@/lib/order-status";

export type AdminOrderRow = {
  id: string;
  orderNo: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  status: string;
  paymentMethod?: string;
  paymentStatus?: string;
  total: number;
  createdAt: string | Date;
  items?: Array<{
    design?: unknown;
    product?: { name?: string; slug?: string };
    variantLabel?: string;
  }>;
};

function normalizeQuery(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function matchesOrder(order: AdminOrderRow, query: string) {
  const q = normalizeQuery(query);
  if (!q) {
    return true;
  }

  const qPhone = normalizePhone(query);
  const phone = normalizePhone(order.phone);
  const fullName = `${order.customerFirstName} ${order.customerLastName}`.toLocaleLowerCase("tr-TR");

  return (
    order.orderNo.toLocaleLowerCase("tr-TR").includes(q) ||
    fullName.includes(q) ||
    order.customerFirstName.toLocaleLowerCase("tr-TR").includes(q) ||
    order.customerLastName.toLocaleLowerCase("tr-TR").includes(q) ||
    (qPhone.length >= 3 && phone.includes(qPhone))
  );
}

function formatOrderDate(value: string | Date) {
  return new Date(value).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

type AdminOrdersPanelProps = {
  orders: AdminOrderRow[];
  siteBaseUrl: string;
  iconNameByPath?: IconNameLookup;
};

export function AdminOrdersPanel({ orders, siteBaseUrl, iconNameByPath = {} }: AdminOrdersPanelProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [statusByOrderId, setStatusByOrderId] = useState<Record<string, string>>(() =>
    Object.fromEntries(orders.map((order) => [order.id, order.status]))
  );

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const status = statusByOrderId[order.id] ?? order.status;
      if (statusFilter !== "ALL" && status !== statusFilter) {
        return false;
      }
      return matchesOrder(order, query);
    });
  }, [orders, query, statusFilter, statusByOrderId]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: orders.length };
    for (const order of orders) {
      counts[order.status] = (counts[order.status] ?? 0) + 1;
    }
    return counts;
  }, [orders]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <label className="min-w-0 flex-1">
            <span className="form-label">Ara</span>
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                className="form-input pl-10 pr-10"
                placeholder="Sipariş no, ad, soyad veya telefon..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              {query ? (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setQuery("")}
                  aria-label="Aramayı temizle"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>
          </label>
          <label className="w-full lg:w-[220px]">
            <span className="form-label">Durum filtresi</span>
            <select className="form-input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="ALL">Tümü ({statusCounts.ALL ?? 0})</option>
              {ORDER_STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label} ({statusCounts[status.value] ?? 0})
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs font-medium text-gray-500">
          {filtered.length} / {orders.length} sipariş listeleniyor
          {query ? (
            <span>
              {" "}
              — &quot;<span className="font-semibold text-gray-700">{query}</span>&quot; araması
            </span>
          ) : null}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <p className="text-sm font-bold text-gray-700">
            {orders.length === 0 ? "Henüz sipariş yok." : "Aramanızla eşleşen sipariş bulunamadı."}
          </p>
          {orders.length > 0 && (query || statusFilter !== "ALL") ? (
            <button
              type="button"
              className="secondary-button mx-auto mt-4"
              onClick={() => {
                setQuery("");
                setStatusFilter("ALL");
              }}
            >
              Filtreleri temizle
            </button>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const productName = order.items?.[0]?.product?.name ?? "Ürün";
            const variantLabel = order.items?.[0]?.variantLabel ?? "";
            const designs = order.items?.[0]?.design as unknown[] | undefined;
            const currentStatus = statusByOrderId[order.id] ?? order.status;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-gray-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-black text-black">{order.orderNo}</p>
                    <p className="text-xs text-gray-500">{formatOrderDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-red-600">{formatPrice(order.total)}</p>
                    <span className="inline-block rounded-full bg-white px-2 py-0.5 text-xs font-bold text-gray-700 ring-1 ring-gray-200">
                      {getOrderStatusLabel(currentStatus)}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1fr_auto]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Müşteri</p>
                    <p className="mt-1 font-bold text-black">
                      {order.customerFirstName} {order.customerLastName}
                    </p>
                    <a href={`tel:${order.phone}`} className="mt-1 block text-sm font-semibold text-[#ee3625] hover:underline">
                      {order.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Adres / Ürün</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {productName}
                      {variantLabel ? <span className="text-gray-500"> — {variantLabel}</span> : null}
                    </p>
                    {order.paymentMethod ? (
                      <p className="mt-1 text-xs text-gray-500">
                        Ödeme: {order.paymentMethod === "PAYTR" ? "PayTR" : "Kapıda"}{" "}
                        <span className="text-gray-400">
                          (
                          {order.paymentStatus === "PAID"
                            ? "ödendi/onaylı"
                            : order.paymentStatus === "PENDING"
                              ? "bekliyor"
                              : "başarısız"}
                          )
                        </span>
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm text-gray-600">
                      {order.city} / {order.district}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{order.address}</p>
                  </div>

                  <div className="flex w-full max-w-[200px] flex-col gap-3 lg:ml-auto">
                    <CopyOrderTrackLink orderNo={order.orderNo} phone={order.phone} baseUrl={siteBaseUrl} />
                    <OrderStatusSelect
                      orderId={order.id}
                      initialStatus={currentStatus}
                      onUpdated={(status) => setStatusByOrderId((current) => ({ ...current, [order.id]: status }))}
                    />
                  </div>
                </div>

                {designs?.length ? (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Plaka tasarımı (baskı)</p>
                      <OrderDesignImageDownload
                        orderNo={order.orderNo}
                        designs={designs}
                      />
                    </div>
                    <OrderDesignPreview designs={designs} iconNameByPath={iconNameByPath} />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
