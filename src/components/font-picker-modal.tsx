"use client";

import { X } from "lucide-react";
import { FONT_PREVIEW_SAMPLE, normalizePlateFontFamily, PLATE_FONT_OPTIONS } from "@/lib/plate-design";

type FontPickerModalProps = {
  open: boolean;
  value: string;
  onChange: (fontFamily: string) => void;
  onClose: () => void;
};

export function FontPickerModal({ open, value, onChange, onClose }: FontPickerModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal
      aria-labelledby="font-picker-title"
    >
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Kapat" onClick={onClose} />
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl sm:rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-5">
          <h2 id="font-picker-title" className="text-sm font-black uppercase tracking-wide text-black sm:text-base">
            Yazı Karakteri Seçiniz
          </h2>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
            onClick={onClose}
            aria-label="Kapat"
          >
            <X size={22} />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 sm:px-5">
          <div className="grid gap-3">
            {PLATE_FONT_OPTIONS.map((font) => {
              const active = normalizePlateFontFamily(value) === font.family;
              return (
                <button
                  key={font.id}
                  type="button"
                  className={`font-picker-card ${active ? "font-picker-card-active" : ""}`}
                  onClick={() => {
                    onChange(font.family);
                    onClose();
                  }}
                >
                  <span className="font-picker-card-label">{font.label}</span>
                  <span
                    className="font-picker-card-sample"
                    style={{ fontFamily: font.family }}
                  >
                    {FONT_PREVIEW_SAMPLE}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 px-4 py-3">
          <button type="button" className="secondary-button min-w-[100px]" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
