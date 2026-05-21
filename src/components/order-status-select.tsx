"use client";

import { useState } from "react";
import { ORDER_STATUS_OPTIONS, getOrderStatusLabel } from "@/lib/order-status";

export function OrderStatusSelect({
  orderId,
  initialStatus,
  onUpdated
}: {
  orderId: string;
  initialStatus: string;
  onUpdated?: (status: string) => void;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(nextStatus: string) {
    const previous = status;
    setStatus(nextStatus);
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/orders/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: nextStatus })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Güncellenemedi");
      }

      onUpdated?.(nextStatus);
    } catch (err) {
      setStatus(previous);
      setError(err instanceof Error ? err.message : "Güncellenemedi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full min-w-[180px]">
      <label className="form-label">Ürün durumu</label>
      <select
        className="form-input w-full"
        value={status}
        disabled={saving}
        onChange={(event) => handleChange(event.target.value)}
      >
        {ORDER_STATUS_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs font-medium text-gray-500">
        {saving ? "Kaydediliyor…" : getOrderStatusLabel(status)}
      </p>
      {error ? <p className="mt-1 text-xs font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}
