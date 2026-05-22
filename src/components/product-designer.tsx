"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, CreditCard, Send } from "lucide-react";
import type { SiteProduct, SiteProductVariant } from "@/lib/types";
import { PlateDesignEditor, type PlateDesign } from "@/components/plate-design-editor";
import { buildOrderTrackUrl } from "@/lib/order-track-url";
import { assetPath, formatPrice } from "@/lib/paths";
import Link from "next/link";
import { DesignApprovalCheckbox, ProductDetailNotices } from "@/components/product-detail-notices";
import { isPlakalikProduct } from "@/lib/product-notices";
import { PLATE_FONT_OPTIONS } from "@/lib/plate-design";
import { PaymentMethodPicker, type CheckoutPaymentMethod } from "@/components/payment-method-picker";
import { PaytrCheckoutModal } from "@/components/paytr-checkout-modal";
import {
  getAnalyticsSessionId,
  getStoredAttribution,
  trackAnalytics
} from "@/lib/analytics-track-client";

type Design = PlateDesign;

const cities = [
  "ADANA",
  "ADIYAMAN",
  "AFYONKARAHİSAR",
  "AĞRI",
  "ANKARA",
  "ANTALYA",
  "İSTANBUL",
  "İZMİR",
  "KONYA",
  "KOCAELİ",
  "BURSA",
  "MERSİN",
  "SAMSUN",
  "TRABZON"
];

function makeDesign(): Design {
  return {
    text: "",
    textColor: "white",
    fontFamily: PLATE_FONT_OPTIONS[0].family,
    align: "center",
    leftSymbol: "figures_gorsel/siyah.svg",
    rightSymbol: "figures_gorsel/siyah.svg"
  };
}

function normalizeDesigns(current: Design[], quantity: number) {
  return Array.from({ length: quantity }, (_, index) => current[index] ?? makeDesign());
}

function VariantButton({
  variant,
  active,
  onSelect
}: {
  variant: SiteProductVariant;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`rounded-lg border p-3 text-right transition ${
        active ? "border-green-600 bg-green-50 shadow-sm" : "border-gray-200 bg-white hover:border-green-500"
      }`}
      onClick={onSelect}
    >
      <span className="block text-sm font-black text-green-600">{variant.label}</span>
      <span className="mt-1 block text-lg font-black text-black">{formatPrice(variant.unitPrice)}</span>
    </button>
  );
}

export function ProductDesigner({ product }: { product: SiteProduct }) {
  const variants = product.variants.length
    ? product.variants
    : [{ label: "1 Takım", quantity: 1, unitPrice: product.price, shipmentPrice: 0 }];
  const [variant, setVariant] = useState(variants[0]);
  const [designs, setDesigns] = useState<Design[]>(() => normalizeDesigns([], variants[0].quantity));
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "KONYA",
    district: "",
    note: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>("paytr");
  const [paytrAvailable, setPaytrAvailable] = useState(false);
  const [paytrToken, setPaytrToken] = useState<string | null>(null);
  const [paytrOrderNo, setPaytrOrderNo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; orderNo?: string } | null>(null);
  const [symbolPicker, setSymbolPicker] = useState<{ index: number; side: "left" | "right" } | null>(null);
  const [designApproved, setDesignApproved] = useState(false);
  const cartIntentTracked = useRef(false);
  const showPlakalikNotices = isPlakalikProduct(product.slug);

  const productTrack = useMemo(
    () => ({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name
    }),
    [product.id, product.slug, product.name]
  );

  useEffect(() => {
    trackAnalytics("PRODUCT_VIEW", productTrack);
  }, [productTrack]);

  function trackCartIntent() {
    if (cartIntentTracked.current) {
      return;
    }
    cartIntentTracked.current = true;
    trackAnalytics("ADD_TO_CART", productTrack);
  }

  const total = useMemo(() => variant.unitPrice + variant.shipmentPrice, [variant]);

  useEffect(() => {
    fetch("/api/paytr/status")
      .then((response) => response.json())
      .then((data: { configured?: boolean }) => {
        const configured = Boolean(data.configured);
        setPaytrAvailable(configured);
        if (!configured) {
          setPaymentMethod("cod");
        }
      })
      .catch(() => {
        setPaytrAvailable(false);
        setPaymentMethod("cod");
      });
  }, []);

  function updateDesign(index: number, patch: Partial<Design>) {
    setDesigns((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (showPlakalikNotices && !designApproved) {
      setResult({ ok: false, message: "Sipariş için ürün bilgilerini ve tasarım onayını işaretlemeniz gerekir." });
      return;
    }

    if (paymentMethod === "paytr" && !customer.email.trim()) {
      setResult({ ok: false, message: "Online ödeme için e-posta adresinizi girin." });
      return;
    }

    trackCartIntent();
    trackAnalytics("CHECKOUT_START", productTrack);

    setLoading(true);
    setResult(null);
    setPaytrToken(null);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        variant,
        designs,
        paymentMethod,
        customer,
        analyticsSessionId: getAnalyticsSessionId(),
        analyticsAttribution: getStoredAttribution()
      })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setResult({ ok: false, message: data.message || "Sipariş kaydedilemedi." });
      return;
    }

    if (data.paytrToken && data.orderNo) {
      trackAnalytics("PAYMENT_START", productTrack);
      setPaytrOrderNo(data.orderNo);
      setPaytrToken(data.paytrToken);
      return;
    }

    trackAnalytics("ORDER_COMPLETE", productTrack);
    setResult({ ok: true, message: "Siparişiniz alındı. Kapıda ödeme ile teslimatta ödeyeceksiniz.", orderNo: data.orderNo });
  }

  return (
    <div className="site-container py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="site-card p-4">
          <div className="mb-5 grid gap-4 md:grid-cols-[220px_1fr]">
            <div className="grid place-items-center rounded-lg bg-[#f8f9f9] p-4">
              <img src={assetPath(product.imagePath, product.slug)} alt={product.name} className="max-h-[220px] object-contain" />
            </div>
            <div>
              {product.badge ? <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">{product.badge}</span> : null}
              <h1 className="mt-3 text-2xl font-black text-black">{product.name}</h1>
              <p className="mt-2 text-sm text-gray-600">{product.shortDescription}</p>
              <div className="mt-4 text-2xl font-black text-red-600">{formatPrice(product.price)}</div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {variants.map((item) => (
              <VariantButton
                key={item.label}
                variant={item}
                active={variant.label === item.label}
                onSelect={() => {
                  setVariant(item);
                  setDesigns((current) => normalizeDesigns(current, item.quantity));
                }}
              />
            ))}
          </div>

          <div className="mt-6 space-y-6">
            {designs.map((design, index) => (
              <PlateDesignEditor
                key={index}
                index={index}
                design={design}
                productSlug={product.slug}
                onChange={(patch) => updateDesign(index, patch)}
                symbolPicker={symbolPicker}
                onOpenSymbolPicker={(side) => setSymbolPicker({ index, side })}
                onCloseSymbolPicker={() => setSymbolPicker(null)}
              />
            ))}
          </div>
        </section>

        <form onSubmit={submitOrder} className="site-card h-max p-4">
          <h2 className="text-lg font-black text-black">Kargo ve Ödeme Bilgileri</h2>

          <div className="mt-4">
            <PaymentMethodPicker value={paymentMethod} onChange={setPaymentMethod} paytrAvailable={paytrAvailable} />
          </div>

          <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
            <div className="flex justify-between">
              <span>Ürün Fiyatı</span>
              <b>{formatPrice(variant.unitPrice)}</b>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <b>{formatPrice(variant.shipmentPrice)}</b>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base text-red-600">
              <span>Toplam</span>
              <b>{formatPrice(total)}</b>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="form-label">Adı</span>
                <input
                  className="form-input"
                  required
                  value={customer.firstName}
                  onFocus={trackCartIntent}
                  onChange={(event) => setCustomer({ ...customer, firstName: event.target.value })}
                />
              </label>
              <label>
                <span className="form-label">Soyadı</span>
                <input className="form-input" required value={customer.lastName} onChange={(event) => setCustomer({ ...customer, lastName: event.target.value })} />
              </label>
            </div>
            <label>
              <span className="form-label">Telefon</span>
              <input
                className="form-input"
                required
                inputMode="tel"
                minLength={10}
                value={customer.phone}
                placeholder="5301234567"
                onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
              />
            </label>
            {paymentMethod === "paytr" ? (
              <label>
                <span className="form-label">E-posta (ödeme için)</span>
                <input
                  className="form-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={customer.email}
                  placeholder="ornek@email.com"
                  onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                />
              </label>
            ) : null}
            <label>
              <span className="form-label">Açık Adres</span>
              <textarea
                className="form-input min-h-[92px]"
                required
                value={customer.address}
                onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="form-label">İl</span>
                <select className="form-input" value={customer.city} onChange={(event) => setCustomer({ ...customer, city: event.target.value })}>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="form-label">İlçe</span>
                <input className="form-input" required value={customer.district} onChange={(event) => setCustomer({ ...customer, district: event.target.value })} />
              </label>
            </div>
            <label>
              <span className="form-label">Not</span>
              <textarea className="form-input" value={customer.note} onChange={(event) => setCustomer({ ...customer, note: event.target.value })} />
            </label>
          </div>

          {result ? (
            <div className={`mt-4 rounded-lg p-3 text-sm font-semibold ${result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {result.ok ? <Check className="mr-2 inline" size={16} /> : null}
              {result.message}
              {result.orderNo ? <span className="block">Sipariş No: {result.orderNo}</span> : null}
              {result.ok && result.orderNo ? (
                <Link
                  href={buildOrderTrackUrl(result.orderNo, customer.phone)}
                  className="mt-2 inline-block font-bold text-green-800 underline"
                >
                  Sipariş durumunu görüntüle (SMS linki)
                </Link>
              ) : null}
            </div>
          ) : null}

          {showPlakalikNotices ? (
            <div className="mt-4">
              <DesignApprovalCheckbox approved={designApproved} onApprovedChange={setDesignApproved} compact />
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || (showPlakalikNotices && !designApproved) || (paymentMethod === "paytr" && !paytrAvailable)}
            className="primary-button mt-3 w-full disabled:opacity-60"
          >
            {paymentMethod === "paytr" ? <CreditCard size={18} /> : <Send size={18} />}
            {loading
              ? "İşleniyor..."
              : showPlakalikNotices && !designApproved
                ? "Tasarımı Onaylayın"
                : paymentMethod === "paytr"
                  ? "Ödemeye Geç"
                  : "Sipariş Ver (Kapıda Ödeme)"}
          </button>
        </form>
      </div>

      <PaytrCheckoutModal
        open={Boolean(paytrToken)}
        token={paytrToken ?? ""}
        orderNo={paytrOrderNo ?? ""}
        onClose={() => {
          setPaytrToken(null);
          setResult({
            ok: true,
            message: "Ödeme penceresi kapatıldı. Ödeme tamamlandıysa siparişiniz onaylanmıştır.",
            orderNo: paytrOrderNo ?? undefined
          });
        }}
      />

      {product.description || product.seoBody ? (
        <section className="site-card mt-6 p-4 sm:p-5">
          <h2 className="text-base font-black text-black">{product.name} Hakkında</h2>
          {product.description ? (
            <p className="mt-3 text-sm leading-7 text-gray-700">{product.description}</p>
          ) : null}
          {product.seoBody ? (
            <div className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">{product.seoBody}</div>
          ) : null}
        </section>
      ) : null}

      <ProductDetailNotices productSlug={product.slug} />
    </div>
  );
}
