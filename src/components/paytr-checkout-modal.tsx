"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type PaytrCheckoutModalProps = {
  open: boolean;
  token: string;
  orderNo: string;
  onClose: () => void;
};

export function PaytrCheckoutModal({ open, token, orderNo, onClose }: PaytrCheckoutModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !token) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1100] flex items-stretch justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal aria-labelledby="paytr-title">
      <button type="button" className="absolute inset-0 bg-black/60" aria-label="Kapat" onClick={onClose} />
      <div className="relative flex h-[100dvh] max-h-[100dvh] w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(94dvh,900px)] sm:max-h-[94dvh] sm:rounded-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
          <div>
            <h2 id="paytr-title" className="text-sm font-black text-black sm:text-base">
              Güvenli Ödeme
            </h2>
            <p className="text-xs text-gray-500">Sipariş: {orderNo}</p>
          </div>
          <button
            type="button"
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
            onClick={onClose}
            aria-label="Kapat"
          >
            <X size={22} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden p-0 sm:p-2">
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${token}`}
            id="paytriframe"
            title="PayTR ödeme"
            className="block h-full min-h-0 w-full"
            frameBorder={0}
          />
        </div>
        <p className="shrink-0 border-t border-gray-100 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 text-center text-[11px] text-gray-500">
          Ödeme tamamlandığında siparişiniz otomatik onaylanır.
        </p>
      </div>
    </div>
  );
}
