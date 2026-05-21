"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buildOrderTrackSmsMessage, buildOrderTrackUrl } from "@/lib/order-track-url";

type CopyKind = "url" | "wp";

export function CopyOrderTrackLink({
  orderNo,
  phone,
  baseUrl
}: {
  orderNo: string;
  phone: string;
  baseUrl?: string;
}) {
  const trackUrl = useMemo(() => buildOrderTrackUrl(orderNo, phone, baseUrl), [orderNo, phone, baseUrl]);
  const wpMessage = useMemo(() => buildOrderTrackSmsMessage(orderNo, phone, baseUrl), [orderNo, phone, baseUrl]);
  const [copied, setCopied] = useState<CopyKind | null>(null);

  async function copyText(text: string, kind: CopyKind) {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="flex w-full min-w-[160px] flex-col gap-2">
      <button
        type="button"
        className="secondary-button min-h-9 w-full justify-center gap-1.5 px-3 py-1.5 text-xs"
        onClick={() => copyText(trackUrl, "url")}
      >
        {copied === "url" ? <Check size={14} /> : <Copy size={14} />}
        {copied === "url" ? "Kopyalandı" : "Takip linki"}
      </button>
      <button
        type="button"
        className="secondary-button min-h-9 w-full justify-center gap-1.5 px-3 py-1.5 text-xs"
        onClick={() => copyText(wpMessage, "wp")}
      >
        {copied === "wp" ? <Check size={14} /> : <Copy size={14} />}
        {copied === "wp" ? "Kopyalandı" : "WP mesajı"}
      </button>
    </div>
  );
}
