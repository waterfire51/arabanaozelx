"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/paths";

type TrackResult = {
  orderNo: string;
  status: string;
  total: number;
  items: Array<{ product: string; variant: string; quantity: number }>;
};

export function TrackOrder() {
  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setResult(null);

    const response = await fetch(`/api/orders/track?orderNo=${encodeURIComponent(orderNo)}&phone=${encodeURIComponent(phone)}`);
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Sipariş bulunamadı.");
      return;
    }

    setResult(data);
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <form onSubmit={submit} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <label>
          <span className="form-label">Sipariş No</span>
          <input className="form-input" value={orderNo} onChange={(event) => setOrderNo(event.target.value)} required />
        </label>
        <label>
          <span className="form-label">Telefon</span>
          <input className="form-input" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <button type="submit" className="primary-button self-end disabled:opacity-60" disabled={loading}>
          <Search size={16} />
          {loading ? "Aranıyor" : "Sorgula"}
        </button>
      </form>

      {message ? <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</div> : null}
      {result ? (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <b className="text-black">{result.orderNo}</b>
              <p className="text-sm text-gray-600">Durum: {result.status}</p>
            </div>
            <b className="text-red-600">{formatPrice(result.total)}</b>
          </div>
          <ul className="mt-3 grid gap-2 text-sm">
            {result.items.map((item, index) => (
              <li key={`${item.product}-${index}`} className="rounded border border-gray-100 p-2">
                {item.product} - {item.variant} ({item.quantity})
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
