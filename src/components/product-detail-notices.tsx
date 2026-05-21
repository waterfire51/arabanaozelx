"use client";

import { Info } from "lucide-react";
import { getPlakalikNotices, isPlakalikProduct, PLAKALIK_INFO_BANNER } from "@/lib/product-notices";

type DesignApprovalCheckboxProps = {
  approved: boolean;
  onApprovedChange: (value: boolean) => void;
  compact?: boolean;
};

export function DesignApprovalCheckbox({ approved, onApprovedChange, compact }: DesignApprovalCheckboxProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 border-[#ee3625]/20 bg-[#fff8f7] transition hover:border-[#ee3625]/40 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <input
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#ee3625]"
        checked={approved}
        onChange={(event) => onApprovedChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm font-black uppercase tracking-wide text-[#151515]">Tasarımı Onayla</span>
        <span className="mt-1 block text-xs font-medium text-gray-600">
          Ürün bilgilerini okudum; tasarımımı ve koşulları kabul ediyorum.
        </span>
      </span>
    </label>
  );
}

type ProductDetailNoticesProps = {
  productSlug: string;
};

export function ProductDetailNotices({ productSlug }: ProductDetailNoticesProps) {
  if (!isPlakalikProduct(productSlug)) {
    return null;
  }

  const items = getPlakalikNotices(productSlug);

  return (
    <section className="product-notices site-card mt-6 p-4 sm:p-5">
      <h2 className="text-base font-black text-black">Ürün Bilgileri ve Koşullar</h2>

      <div className="product-notices-banner mt-4">
        <Info size={18} className="shrink-0 text-[#1e6fd6]" aria-hidden />
        <p>{PLAKALIK_INFO_BANNER}</p>
      </div>

      <ul className="product-notices-list mt-4">
        {items.map((item, index) => (
          <li key={index} className="product-notices-item">
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
