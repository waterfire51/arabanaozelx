"use client";

import { useMemo, useState } from "react";
import { Check, Send } from "lucide-react";
import type { SiteProduct, SiteProductVariant } from "@/lib/types";
import { assetPath, formatPrice } from "@/lib/paths";

type Design = {
  text: string;
  textColor: string;
  fontFamily: string;
  align: "left" | "center" | "right";
  leftSymbol: string;
  rightSymbol: string;
};

const colors = [
  { label: "Beyaz", value: "white" },
  { label: "Sarı", value: "yellow" },
  { label: "Kırmızı", value: "red" },
  { label: "Yeşil", value: "#28d36b" },
  { label: "Mavi", value: "#43a8ff" }
];

const fonts = ["Arial", "Verdana", "Georgia", "Impact", "Trebuchet MS"];

const symbols = [
  { label: "Siyah", value: "siyah" },
  { label: "Kalp", value: "heart_36" },
  { label: "Bayrak", value: "flag_1" },
  { label: "Mercedes", value: "vehicle_mercedes" },
  { label: "Konya", value: "city_konya2" }
];

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
    text: "PLAKALIK YAZISI GİR",
    textColor: "white",
    fontFamily: "Arial",
    align: "center",
    leftSymbol: "siyah",
    rightSymbol: "siyah"
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
      <span className="block text-xs font-semibold text-green-700">Kapıda Ödeme</span>
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
    phone: "",
    address: "",
    city: "KONYA",
    district: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; orderNo?: string } | null>(null);

  const total = useMemo(() => variant.unitPrice + variant.shipmentPrice, [variant]);

  function updateDesign(index: number, patch: Partial<Design>) {
    setDesigns((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        variant,
        designs,
        customer
      })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setResult({ ok: false, message: data.message || "Sipariş kaydedilemedi." });
      return;
    }

    setResult({ ok: true, message: "Siparişiniz alındı.", orderNo: data.orderNo });
  }

  return (
    <div className="site-container py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="otodark-card p-4">
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
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-black text-black">{index + 1}. Takım Tasarım</h2>
                  <span className="text-xs font-semibold text-gray-500">Canlı ön izleme</span>
                </div>

                <div className="plate-preview">
                  <img className="plate-symbol plate-symbol-left" src={assetPath(`figures_gorsel/${design.leftSymbol}.svg`)} alt="" />
                  <div className="plate-text" style={{ color: design.textColor, textAlign: design.align, fontFamily: design.fontFamily }}>
                    {design.text || "PLAKALIK YAZISI"}
                  </div>
                  <img className="plate-symbol plate-symbol-right" src={assetPath(`figures_gorsel/${design.rightSymbol}.svg`)} alt="" />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label>
                    <span className="form-label">Yazı</span>
                    <input className="form-input" value={design.text} onChange={(event) => updateDesign(index, { text: event.target.value })} />
                  </label>
                  <label>
                    <span className="form-label">Yazı Tipi</span>
                    <select className="form-input" value={design.fontFamily} onChange={(event) => updateDesign(index, { fontFamily: event.target.value })}>
                      {fonts.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="form-label">Yazı Rengi</span>
                    <select className="form-input" value={design.textColor} onChange={(event) => updateDesign(index, { textColor: event.target.value })}>
                      {colors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="form-label">Yazı Konumu</span>
                    <select className="form-input" value={design.align} onChange={(event) => updateDesign(index, { align: event.target.value as Design["align"] })}>
                      <option value="left">Sol</option>
                      <option value="center">Orta</option>
                      <option value="right">Sağ</option>
                    </select>
                  </label>
                  <label>
                    <span className="form-label">Sol Şekil</span>
                    <select className="form-input" value={design.leftSymbol} onChange={(event) => updateDesign(index, { leftSymbol: event.target.value })}>
                      {symbols.map((symbol) => (
                        <option key={symbol.value} value={symbol.value}>
                          {symbol.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="form-label">Sağ Şekil</span>
                    <select className="form-input" value={design.rightSymbol} onChange={(event) => updateDesign(index, { rightSymbol: event.target.value })}>
                      {symbols.map((symbol) => (
                        <option key={symbol.value} value={symbol.value}>
                          {symbol.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <form onSubmit={submitOrder} className="otodark-card h-max p-4">
          <h2 className="text-lg font-black text-black">Kargo ve Ödeme Bilgileri</h2>
          <div className="mt-4 rounded-lg bg-blue-600 p-4 text-center font-black text-white">KAPIDA ÖDEME</div>
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
                <input className="form-input" required value={customer.firstName} onChange={(event) => setCustomer({ ...customer, firstName: event.target.value })} />
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
            </div>
          ) : null}

          <button type="submit" disabled={loading} className="primary-button mt-4 w-full disabled:opacity-60">
            <Send size={18} />
            {loading ? "Kaydediliyor" : "Sipariş Ver"}
          </button>
        </form>
      </div>
    </div>
  );
}
