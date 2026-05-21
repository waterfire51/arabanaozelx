"use client";

import { useState } from "react";
import { resolveSymbolAssetPath } from "@/lib/icons";

/** Geniş yatay ikonlar (takım çubukları vb.) — en-boy oranına göre genişlik açılır */
const WIDE_ASPECT_THRESHOLD = 1.35;

type PlateSymbolProps = {
  symbolPath: string;
  side: "left" | "right";
  title: string;
  onClick: () => void;
};

export function PlateSymbol({ symbolPath, side, title, onClick }: PlateSymbolProps) {
  const [wide, setWide] = useState(false);

  return (
    <button
      type="button"
      className={`plate-symbol plate-symbol-${side}${wide ? " plate-symbol-wide" : ""}`}
      title={title}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <img
        src={resolveSymbolAssetPath(symbolPath)}
        alt=""
        onLoad={(event) => {
          const img = event.currentTarget;
          if (img.naturalWidth < 1 || img.naturalHeight < 1) {
            return;
          }
          const aspect = img.naturalWidth / img.naturalHeight;
          setWide(aspect >= WIDE_ASPECT_THRESHOLD);
        }}
      />
    </button>
  );
}
