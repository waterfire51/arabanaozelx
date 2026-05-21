import { resolveSymbolAssetPath } from "@/lib/icons";
import {
  getPlateColorLabel,
  normalizePlateFontFamily,
  parsePlateDesigns,
  PLATE_FONT_OPTIONS,
  plateTextShadow
} from "@/lib/plate-design";

export function OrderDesignPreview({ designs: rawDesigns }: { designs: unknown }) {
  const designs = parsePlateDesigns(rawDesigns);

  if (!designs.length) {
    return <span className="text-xs text-gray-400">Tasarım yok</span>;
  }

  return (
    <div className="space-y-2">
      {designs.map((design, index) => (
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
          <p className="mt-1 text-[10px] font-semibold text-gray-500">
            Font: <span style={{ fontFamily: design.fontFamily }}>{design.fontFamily || "—"}</span>
            {" · "}
            Renk: {design.textColor ? getPlateColorLabel(design.textColor) : "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
