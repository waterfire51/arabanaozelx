import { resolveSymbolAssetPath } from "@/lib/icons";

type Design = {
  text?: string;
  textColor?: string;
  fontFamily?: string;
  align?: string;
  leftSymbol?: string;
  rightSymbol?: string;
};

export function OrderDesignPreview({ designs }: { designs: Design[] }) {
  if (!designs?.length) {
    return <span className="text-xs text-gray-400">Tasarım yok</span>;
  }

  return (
    <div className="space-y-2">
      {designs.map((design, index) => (
        <div key={index} className="flex items-center gap-2 rounded border border-gray-100 bg-gray-50 p-2">
          {design.leftSymbol ? (
            <img src={resolveSymbolAssetPath(design.leftSymbol)} alt="" className="h-8 w-8 object-contain" />
          ) : null}
          <span className="max-w-[120px] truncate text-xs font-semibold">{design.text || "—"}</span>
          {design.rightSymbol ? (
            <img src={resolveSymbolAssetPath(design.rightSymbol)} alt="" className="h-8 w-8 object-contain" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
