"use client";

import { Banknote, CreditCard } from "lucide-react";

export type CheckoutPaymentMethod = "paytr" | "cod";

type PaymentMethodPickerProps = {
  value: CheckoutPaymentMethod;
  onChange: (value: CheckoutPaymentMethod) => void;
  paytrAvailable: boolean;
};

export function PaymentMethodPicker({ value, onChange, paytrAvailable }: PaymentMethodPickerProps) {
  return (
    <div className="grid gap-2">
      <span className="form-label">Ödeme Yöntemi</span>
      <button
        type="button"
        className={`flex items-start gap-3 rounded-lg border-2 p-3 text-left transition ${
          value === "paytr" ? "border-[#ee3625] bg-[#fff8f7]" : "border-gray-200 bg-white hover:border-gray-300"
        } ${!paytrAvailable ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={!paytrAvailable}
        onClick={() => paytrAvailable && onChange("paytr")}
      >
        <CreditCard size={22} className="mt-0.5 shrink-0 text-[#ee3625]" />
        <span>
          <span className="block text-sm font-black text-black">PayTR — Kredi / Banka Kartı</span>
          <span className="mt-0.5 block text-xs text-gray-600">Güvenli online ödeme (3D Secure)</span>
          {!paytrAvailable ? (
            <span className="mt-1 block text-xs font-semibold text-amber-700">Yapılandırma bekleniyor (PAYTR_* env)</span>
          ) : null}
        </span>
      </button>
      <button
        type="button"
        className={`flex items-start gap-3 rounded-lg border-2 p-3 text-left transition ${
          value === "cod" ? "border-green-600 bg-green-50" : "border-gray-200 bg-white hover:border-gray-300"
        }`}
        onClick={() => onChange("cod")}
      >
        <Banknote size={22} className="mt-0.5 shrink-0 text-green-700" />
        <span>
          <span className="block text-sm font-black text-black">Kapıda Ödeme</span>
          <span className="mt-0.5 block text-xs text-gray-600">Teslimatta nakit veya kart ile ödeme</span>
        </span>
      </button>
    </div>
  );
}
