"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { normalizeOrderTrackPhone } from "@/lib/order-track-url";
import { ORDER_STATUS_FLOW, getOrderStatusLabel, getOrderStatusStepIndex } from "@/lib/order-status";
import { formatPrice } from "@/lib/paths";

type TrackResult = {
  orderNo: string;
  status: string;
  statusLabel: string;
  total: number;
  items: Array<{ product: string; variant: string; quantity: number }>;
};

export function TrackOrder() {
  const searchParams = useSearchParams();
  const autoQueried = useRef(false);

  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);

  const runTrack = useCallback(async (nextOrderNo: string, nextPhone: string) => {
    const cleanOrderNo = nextOrderNo.trim();
    const cleanPhone = normalizeOrderTrackPhone(nextPhone);

    if (!cleanOrderNo || !cleanPhone) {
      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null);

    const response = await fetch(
      `/api/orders/track?orderNo=${encodeURIComponent(cleanOrderNo)}&phone=${encodeURIComponent(cleanPhone)}`
    );
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Sipariş bulunamadı.");
      return;
    }

    setResult({
      ...data,
      statusLabel: data.statusLabel || getOrderStatusLabel(data.status)
    });
  }, []);

  useEffect(() => {
    const fromUrlOrderNo = searchParams.get("orderNo")?.trim() ?? "";
    const fromUrlPhone = searchParams.get("phone")?.trim() ?? "";

    if (fromUrlOrderNo) {
      setOrderNo(fromUrlOrderNo);
    }
    if (fromUrlPhone) {
      setPhone(fromUrlPhone);
    }

    if (!fromUrlOrderNo || !fromUrlPhone || autoQueried.current) {
      return;
    }

    autoQueried.current = true;
    void runTrack(fromUrlOrderNo, fromUrlPhone);
  }, [searchParams, runTrack]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runTrack(orderNo, phone);
  }

  const activeStep = result?.status === "CANCELLED" ? -1 : result ? getOrderStatusStepIndex(result.status) : -1;

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <form onSubmit={submit} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <label>
          <span className="form-label">Sipariş No</span>
          <input className="form-input" value={orderNo} onChange={(event) => setOrderNo(event.target.value)} required />
        </label>
        <label>
          <span className="form-label">Telefon</span>
          <input
            className="form-input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            inputMode="tel"
            required
          />
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
              <p className="mt-1 text-sm font-bold text-black">Durum: {result.statusLabel}</p>
            </div>
            <b className="text-red-600">{formatPrice(result.total)}</b>
          </div>

          {result.status === "CANCELLED" ? (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">Sipariş iptal edildi.</p>
          ) : (
            <ol className="mt-4 grid gap-2 sm:grid-cols-5">
              {ORDER_STATUS_FLOW.map((step, index) => {
                const done = activeStep >= index;
                const current = activeStep === index;

                return (
                  <li
                    key={step.value}
                    className={`rounded-lg border px-2 py-2 text-center text-xs font-bold leading-tight ${
                      current
                        ? "border-green-600 bg-green-50 text-green-800"
                        : done
                          ? "border-green-200 bg-green-50/60 text-green-700"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}
                  >
                    {step.label}
                  </li>
                );
              })}
            </ol>
          )}

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
