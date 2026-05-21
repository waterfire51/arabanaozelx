"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyTextButtonProps = {
  text: string;
  label: string;
  disabled?: boolean;
};

export function CopyTextButton({ text, label, disabled }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!text || text === "—" || disabled) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      className="inline-flex min-h-6 items-center gap-1 rounded border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-bold text-gray-600 transition hover:border-[#ee3625]/40 hover:text-[#c82014] disabled:cursor-not-allowed disabled:opacity-40"
      onClick={() => void copy()}
      disabled={disabled || !text || text === "—"}
      title={label}
      aria-label={label}
    >
      {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}
