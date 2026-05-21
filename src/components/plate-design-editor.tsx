"use client";

import { useRef, useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import { ColorPickerPopover } from "@/components/color-picker-popover";
import { FontPickerModal } from "@/components/font-picker-modal";
import { IconPicker, IconPickerModal } from "@/components/icon-picker";
import { resolveSymbolAssetPath } from "@/lib/icons";
import { plateFrameImagePath } from "@/lib/assets";
import {
  getPlateColorLabel,
  getPlateFontLabel,
  PLATE_ALIGN_OPTIONS,
  normalizePlateFontFamily,
  plateTextShadow
} from "@/lib/plate-design";

export type PlateDesign = {
  text: string;
  textColor: string;
  fontFamily: string;
  align: "left" | "center" | "right";
  leftSymbol: string;
  rightSymbol: string;
};

const MAX_PLATE_TEXT_LENGTH = 24;
const PLATE_TEXT_PLACEHOLDER = "PLAKALIK YAZISI GİR";

function clampPlateText(value: string) {
  return value.slice(0, MAX_PLATE_TEXT_LENGTH);
}

type PlateDesignEditorProps = {
  index: number;
  design: PlateDesign;
  productSlug: string;
  onChange: (patch: Partial<PlateDesign>) => void;
  symbolPicker: { index: number; side: "left" | "right" } | null;
  onOpenSymbolPicker: (side: "left" | "right") => void;
  onCloseSymbolPicker: () => void;
};

export function PlateDesignEditor({
  index,
  design,
  productSlug,
  onChange,
  symbolPicker,
  onOpenSymbolPicker,
  onCloseSymbolPicker
}: PlateDesignEditorProps) {
  const textInputRef = useRef<HTMLInputElement>(null);
  const colorAnchorRef = useRef<HTMLDivElement>(null);
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const isPlaceholder = !design.text.trim();
  const colorLabel = getPlateColorLabel(design.textColor);
  const fontLabel = getPlateFontLabel(normalizePlateFontFamily(design.fontFamily));

  function focusPlateText() {
    textInputRef.current?.focus();
    textInputRef.current?.select();
  }

  return (
    <div className="plate-design-card rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-black text-black">{index + 1}. Takım Tasarım</h2>
        <span className="rounded-full bg-[#ee3625]/10 px-3 py-1 text-xs font-bold text-[#c82014]">Canlı önizleme</span>
      </div>

      <div className="plate-live-preview overflow-hidden rounded-lg ring-1 ring-gray-200">
        <div className="plate-frame-clip">
          <img
            src={plateFrameImagePath(productSlug)}
            alt="Plakalık çerçeve"
            className="plate-frame-img"
            onError={(event) => {
              const img = event.currentTarget;
              if (img.src.endsWith("/assets/image/plakalik.png")) return;
              img.src = "/assets/image/plakalik.png";
            }}
          />
        </div>
        <div
          className="plate-preview cursor-text"
          role="group"
          aria-label="Plakalık yazı alanı"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              focusPlateText();
            }
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) {
              return;
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              focusPlateText();
            }
          }}
        >
          <button
            type="button"
            className="plate-symbol plate-symbol-left"
            title="Sol şekil seç"
            onClick={(event) => {
              event.stopPropagation();
              onOpenSymbolPicker("left");
            }}
          >
            <img src={resolveSymbolAssetPath(design.leftSymbol)} alt="" />
          </button>
          <input
            ref={textInputRef}
            type="text"
            className={`plate-text plate-text-input ${isPlaceholder ? "plate-text-placeholder" : ""}`}
            value={design.text}
            maxLength={MAX_PLATE_TEXT_LENGTH}
            placeholder={PLATE_TEXT_PLACEHOLDER}
            aria-label="Plakalık yazısı"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            onChange={(event) => onChange({ text: clampPlateText(event.target.value) })}
            style={{
              color: isPlaceholder ? "rgba(255,255,255,0.45)" : design.textColor,
              textAlign: design.align,
              fontFamily: normalizePlateFontFamily(design.fontFamily),
              textShadow: isPlaceholder ? "none" : plateTextShadow()
            }}
          />
          <button
            type="button"
            className="plate-symbol plate-symbol-right"
            title="Sağ şekil seç"
            onClick={(event) => {
              event.stopPropagation();
              onOpenSymbolPicker("right");
            }}
          >
            <img src={resolveSymbolAssetPath(design.rightSymbol)} alt="" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        Yazıyı plaka üzerine tıklayarak girin (en fazla {MAX_PLATE_TEXT_LENGTH} karakter)
        {design.text.length > 0 ? (
          <span className="block text-gray-400">
            {design.text.length}/{MAX_PLATE_TEXT_LENGTH}
          </span>
        ) : null}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="plate-tool-btn" onClick={() => setFontModalOpen(true)}>
          Font Seç
          <span className="block text-[10px] font-semibold normal-case text-gray-500">{fontLabel}</span>
        </button>

        <div ref={colorAnchorRef} className="relative">
          <button
            type="button"
            className="plate-tool-btn"
            onClick={() => setColorOpen((current) => !current)}
          >
            <span className="inline-flex items-center gap-1.5">
              Renk Seç
              <ChevronDown size={14} className={colorOpen ? "rotate-180" : ""} />
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold normal-case text-gray-500">
              <span className="plate-color-dot h-3 w-3" style={{ background: design.textColor }} />
              {colorLabel}
            </span>
          </button>
          <ColorPickerPopover
            open={colorOpen}
            value={design.textColor}
            anchorRef={colorAnchorRef}
            onChange={(color) => onChange({ textColor: color })}
            onClose={() => setColorOpen(false)}
          />
        </div>
      </div>

      <div className="mt-4">
        <span className="form-label">Yazı konumu</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLATE_ALIGN_OPTIONS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`plate-align-option ${design.align === item.value ? "plate-align-option-active" : ""}`}
              onClick={() => onChange({ align: item.value })}
            >
              {item.value === "left" ? <AlignLeft size={16} /> : item.value === "center" ? <AlignCenter size={16} /> : <AlignRight size={16} />}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <IconPicker label="Sol Şekil" value={design.leftSymbol} onChange={(path) => onChange({ leftSymbol: path })} />
        <IconPicker label="Sağ Şekil" value={design.rightSymbol} onChange={(path) => onChange({ rightSymbol: path })} />
      </div>

      <p className="mt-3 text-center text-xs text-gray-500">Sol veya sağ şekle tıklayarak ikon seçin</p>

      <FontPickerModal
        open={fontModalOpen}
        value={design.fontFamily}
        onChange={(fontFamily) => onChange({ fontFamily })}
        onClose={() => setFontModalOpen(false)}
      />

      {symbolPicker?.index === index ? (
        <IconPickerModal
          open
          title={symbolPicker.side === "left" ? "Sol Şekil Seç" : "Sağ Şekil Seç"}
          value={symbolPicker.side === "left" ? design.leftSymbol : design.rightSymbol}
          onChange={(path) => onChange(symbolPicker.side === "left" ? { leftSymbol: path } : { rightSymbol: path })}
          onClose={onCloseSymbolPicker}
        />
      ) : null}
    </div>
  );
}
