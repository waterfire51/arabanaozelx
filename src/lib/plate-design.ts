export type PlatePrintDesign = {
  text: string;
  textColor: string;
  fontFamily: string;
  align: "left" | "center" | "right";
  leftSymbol: string;
  rightSymbol: string;
};

export type PlateFontOption = {
  id: string;
  label: string;
  family: string;
};

/** Modal önizleme metni */
export const FONT_PREVIEW_SAMPLE = "İSİM SOYİSİM";

/** Plaka önizleme / baskı fontları — public/fonts/plate */
export const PLATE_FONT_OPTIONS: PlateFontOption[] = [
  { id: "ethnocentric", label: "ETHNOCENTRIC", family: '"Ethnocentric", sans-serif' },
  { id: "aviano", label: "AVIANO", family: '"Aviano", serif' },
  { id: "sonsie", label: "SONSIE", family: '"Sonsie", cursive' },
  { id: "sigmar", label: "SIGMAR", family: '"Sigmar", sans-serif' }
];

const LEGACY_PLATE_FONT_ALIASES: Record<string, string> = {
  "orbitron, sans-serif": PLATE_FONT_OPTIONS[0].family,
  '"orbitron", sans-serif': PLATE_FONT_OPTIONS[0].family,
  '"playfair display", serif': PLATE_FONT_OPTIONS[1].family,
  '"sonsie one", cursive': PLATE_FONT_OPTIONS[2].family,
  "sigmar, sans-serif": PLATE_FONT_OPTIONS[3].family
};

export function normalizePlateFontFamily(family: string) {
  const trimmed = family.trim();
  const alias = LEGACY_PLATE_FONT_ALIASES[trimmed.toLowerCase()];
  if (alias) {
    return alias;
  }
  const byId = PLATE_FONT_OPTIONS.find((item) => item.id === trimmed.toLowerCase());
  return byId?.family ?? trimmed;
}

export const PLATE_FONTS = PLATE_FONT_OPTIONS.map((item) => item.family);

export const PLATE_TEXT_COLORS = [
  { label: "Beyaz", value: "white" },
  { label: "Sarı", value: "yellow" },
  { label: "Kırmızı", value: "red" },
  { label: "Yeşil", value: "#28d36b" },
  { label: "Mavi", value: "#43a8ff" }
] as const;

export const PLATE_ALIGN_OPTIONS = [
  { value: "left", label: "Sol" },
  { value: "center", label: "Orta" },
  { value: "right", label: "Sağ" }
] as const;

export function getPlateColorLabel(value: string) {
  return PLATE_TEXT_COLORS.find((item) => item.value === value)?.label ?? value;
}

export function getPlateFontLabel(family: string) {
  return PLATE_FONT_OPTIONS.find((item) => item.family === family)?.label ?? family;
}

/** Siyah plaka üzerinde okunabilirlik; renkli glow yok (eski site ile uyumlu) */
export function plateTextShadow() {
  return "0 1px 2px rgba(0, 0, 0, 0.75)";
}

/** @deprecated plateTextShadow kullanın */
export function plateTextGlow(_color?: string) {
  return plateTextShadow();
}

function pickSymbolPath(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

/** Sipariş JSON'undan plaka tasarımını güvenli okur (eski alan adları dahil) */
export function parsePlateDesignEntry(raw: unknown): PlatePrintDesign | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const entry = raw as Record<string, unknown>;
  const nested =
    entry.symbols && typeof entry.symbols === "object" ? (entry.symbols as Record<string, unknown>) : null;

  const leftSymbol =
    pickSymbolPath(entry, ["leftSymbol", "left_symbol", "leftIcon"]) ||
    (nested ? pickSymbolPath(nested, ["left", "leftSymbol", "left_symbol"]) : "");

  const rightSymbol =
    pickSymbolPath(entry, ["rightSymbol", "right_symbol", "rightIcon", "sagSymbol", "sag_symbol"]) ||
    (nested ? pickSymbolPath(nested, ["right", "rightSymbol", "right_symbol", "sag"]) : "");

  const alignRaw = String(entry.align ?? "center");
  const align = alignRaw === "left" || alignRaw === "right" || alignRaw === "center" ? alignRaw : "center";

  return {
    text: String(entry.text ?? ""),
    textColor: String(entry.textColor ?? entry.text_color ?? "white"),
    fontFamily: normalizePlateFontFamily(
      String(entry.fontFamily ?? entry.font_family ?? PLATE_FONT_OPTIONS[0].family)
    ),
    align,
    leftSymbol,
    rightSymbol
  };
}

export function parsePlateDesigns(raw: unknown): PlatePrintDesign[] {
  if (Array.isArray(raw)) {
    return raw.map(parsePlateDesignEntry).filter((item): item is PlatePrintDesign => item !== null);
  }

  const single = parsePlateDesignEntry(raw);
  return single ? [single] : [];
}

export function getPlateSymbolPath(design: PlatePrintDesign, side: "left" | "right") {
  return side === "left" ? design.leftSymbol : design.rightSymbol;
}
