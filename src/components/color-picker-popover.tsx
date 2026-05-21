"use client";

import { useEffect, useRef } from "react";
import { getPlateColorLabel, PLATE_TEXT_COLORS } from "@/lib/plate-design";

type ColorPickerPopoverProps = {
  open: boolean;
  value: string;
  onChange: (color: string) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
};

export function ColorPickerPopover({ open, value, onChange, onClose, anchorRef }: ColorPickerPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointer(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || anchorRef.current?.contains(target)) {
        return;
      }
      onClose();
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose, anchorRef]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
      role="listbox"
      aria-label="Yazı rengi seç"
    >
      <p className="border-b border-gray-100 bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600">Renk seçin</p>
      <ul className="py-1">
        {PLATE_TEXT_COLORS.map((color) => {
          const active = value === color.value;
          return (
            <li key={color.value}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-gray-50 ${
                  active ? "bg-[#fff8f7] text-[#c82014]" : "text-gray-800"
                }`}
                onClick={() => {
                  onChange(color.value);
                  onClose();
                }}
              >
                <span
                  className={`h-5 w-5 shrink-0 rounded-full border-2 border-white shadow-sm ${
                    color.value === "white" ? "ring-1 ring-gray-300" : ""
                  }`}
                  style={{ background: color.value }}
                />
                {color.label}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-gray-100 px-3 py-2 text-xs text-gray-500">
        Seçili: <strong className="text-black">{getPlateColorLabel(value)}</strong>
      </p>
    </div>
  );
}
