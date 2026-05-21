"use client";

import { resolveSymbolAssetPath } from "@/lib/icons";
import type { IconNameLookup } from "@/lib/icon-display-name";
import { resolveIconDisplayName } from "@/lib/icon-display-name";
import { CopyTextButton } from "@/components/copy-text-button";
import {
  getPlateColorLabel,
  getPlateFontLabel,
  normalizePlateFontFamily,
  parsePlateDesigns,
  PLATE_FONT_OPTIONS,
  plateTextShadow
} from "@/lib/plate-design";

type OrderDesignPreviewProps = {
  designs: unknown;
  iconNameByPath?: IconNameLookup;
};

export function OrderDesignPreview({ designs: rawDesigns, iconNameByPath = {} }: OrderDesignPreviewProps) {
  const designs = parsePlateDesigns(rawDesigns);

  if (!designs.length) {
    return <span className="text-xs text-gray-400">Tasarım yok</span>;
  }

  return (
    <div className="space-y-2">
      {designs.map((design, index) => {
        const leftIconName = resolveIconDisplayName(design.leftSymbol, iconNameByPath);
        const rightIconName = resolveIconDisplayName(design.rightSymbol, iconNameByPath);
        const fontLabel = getPlateFontLabel(normalizePlateFontFamily(design.fontFamily || PLATE_FONT_OPTIONS[0].family));
        const colorLabel = design.textColor ? getPlateColorLabel(design.textColor) : "—";

        return (
          <div key={index} className="rounded border border-gray-100 bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              {design.leftSymbol ? (
                <img
                  src={resolveSymbolAssetPath(design.leftSymbol)}
                  alt=""
                  className="h-8 w-auto max-w-[72px] object-contain object-left"
                />
              ) : null}
              <span
                className="max-w-[140px] truncate text-xs font-black uppercase"
                style={{
                  color: design.textColor || "#fff",
                  fontFamily: normalizePlateFontFamily(design.fontFamily || PLATE_FONT_OPTIONS[0].family),
                  textShadow: plateTextShadow()
                }}
              >
                {design.text || "—"}
              </span>
              {design.rightSymbol ? (
                <img
                  src={resolveSymbolAssetPath(design.rightSymbol)}
                  alt=""
                  className="h-8 w-auto max-w-[72px] object-contain object-right"
                />
              ) : null}
            </div>

            <div className="mt-2 space-y-1.5 text-[10px] font-semibold text-gray-600">
              <p>
                <span className="text-gray-400">Font:</span> {fontLabel}
                <span className="mx-1.5 text-gray-300">·</span>
                <span className="text-gray-400">Renk:</span> {colorLabel}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex flex-wrap items-center gap-1">
                  <span>
                    <span className="text-gray-400">Sol ikon:</span> {leftIconName}
                  </span>
                  <CopyTextButton text={leftIconName} label="Sol ikon adını kopyala" />
                </span>
                <span className="inline-flex flex-wrap items-center gap-1">
                  <span>
                    <span className="text-gray-400">Sağ ikon:</span> {rightIconName}
                  </span>
                  <CopyTextButton text={rightIconName} label="Sağ ikon adını kopyala" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
