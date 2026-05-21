"use client";

import { useCallback, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import {
  getPlateSymbolPath,
  parsePlateDesigns,
  type PlatePrintDesign
} from "@/lib/plate-design";

type Props = {
  orderNo: string;
  designs: PlatePrintDesign[] | unknown;
};

type DownloadSide = "left" | "right";

function symbolFilename(orderNo: string, side: DownloadSide, storedPath: string) {
  const base = storedPath.split("/").pop() || "ikon";
  const prefix = side === "left" ? "sol" : "sag";
  return `${orderNo}-${prefix}-${base}`;
}

async function downloadViaApi(storedPath: string, filename: string) {
  const params = new URLSearchParams({
    path: storedPath,
    filename
  });

  const response = await fetch(`/api/admin/icon-download?${params.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("download failed");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
}

export function OrderDesignImageDownload({ orderNo, designs: rawDesigns }: Props) {
  const [loadingSide, setLoadingSide] = useState<DownloadSide | null>(null);
  const [error, setError] = useState("");

  const parsedDesigns = useMemo(() => parsePlateDesigns(rawDesigns), [rawDesigns]);
  const design = parsedDesigns[0];

  const downloadSymbol = useCallback(
    async (side: DownloadSide) => {
      if (!design) {
        setError("Tasarım bulunamadı.");
        return;
      }

      const storedPath = getPlateSymbolPath(design, side);
      if (!storedPath.trim()) {
        setError(side === "left" ? "Sol ikon yolu bulunamadı." : "Sağ ikon yolu bulunamadı.");
        return;
      }

      setError("");
      setLoadingSide(side);

      const filename = symbolFilename(orderNo, side, storedPath);

      try {
        await downloadViaApi(storedPath, filename);
      } catch {
        setError("İndirilemedi. İkon dosyasına erişilemedi.");
      } finally {
        setLoadingSide(null);
      }
    },
    [design, orderNo]
  );

  if (!design) {
    return null;
  }

  const hasRight = Boolean(design.rightSymbol.trim());
  const hasLeft = Boolean(design.leftSymbol.trim());

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="secondary-button min-h-9 flex-1 justify-center gap-1.5 px-3 py-1.5 text-xs sm:flex-none sm:min-w-[140px]"
          disabled={loadingSide !== null || !hasLeft}
          onClick={() => void downloadSymbol("left")}
        >
          {loadingSide === "left" ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          {loadingSide === "left" ? "Hazırlanıyor" : "1. Görseli İndir"}
        </button>
        <button
          type="button"
          className="secondary-button min-h-9 flex-1 justify-center gap-1.5 px-3 py-1.5 text-xs sm:flex-none sm:min-w-[140px]"
          disabled={loadingSide !== null || !hasRight}
          onClick={() => void downloadSymbol("right")}
        >
          {loadingSide === "right" ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          {loadingSide === "right" ? "Hazırlanıyor" : "2. Görseli İndir"}
        </button>
      </div>
      {parsedDesigns.length > 1 ? (
        <p className="text-[10px] font-semibold text-gray-500">Sol/sağ ikonlar 1. takım tasarımından indirilir.</p>
      ) : null}
      {!hasRight ? (
        <p className="text-[10px] font-semibold text-amber-700">Sağ ikon kaydı bulunamadı; siparişte sağ şekil seçilmemiş olabilir.</p>
      ) : null}
      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}
