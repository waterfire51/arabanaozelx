import { resolveSymbolAssetPath } from "@/lib/icons";
import { getPlateColorLabel, parsePlateDesigns, plateTextGlow } from "@/lib/plate-design";

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
              <img src={resolveSymbolAssetPath(design.leftSymbol)} alt="" className="h-8 w-8 object-contain" />
            ) : null}
            <span
              className="max-w-[140px] truncate text-xs font-black uppercase"
              style={{
                color: design.textColor || "#fff",
                fontFamily: design.fontFamily || "Arial",
                textShadow: plateTextGlow(design.textColor || "white")
              }}
            >
              {design.text || "—"}
            </span>
            {design.rightSymbol ? (
              <img src={resolveSymbolAssetPath(design.rightSymbol)} alt="" className="h-8 w-8 object-contain" />
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
