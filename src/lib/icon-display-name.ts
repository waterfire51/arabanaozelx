import { normalizeStoredAssetPath } from "@/lib/assets";
import { prisma } from "@/lib/prisma";
import { seedIcons } from "@/lib/seed-icon-data";

export type IconNameLookup = Record<string, string>;

function registerPath(map: IconNameLookup, path: string, name: string) {
  const clean = normalizeStoredAssetPath(path);
  if (!clean) {
    return;
  }

  map[clean] = name;
  const file = clean.split("/").pop() ?? "";
  if (file) {
    map[file] = name;
    const stem = file.replace(/\.[^.]+$/i, "");
    if (stem) {
      map[stem] = name;
    }
  }
}

/** Veritabanı + seed yedek: dosya yolu → admin panelindeki ikon adı */
export async function fetchIconNameLookup(): Promise<IconNameLookup> {
  const map: IconNameLookup = {};

  for (const icon of seedIcons) {
    registerPath(map, icon.filePath, icon.name);
  }

  if (!process.env.DATABASE_URL) {
    return map;
  }

  try {
    const icons = await prisma.icon.findMany({
      where: { active: true },
      select: { name: true, filePath: true }
    });

    for (const icon of icons) {
      registerPath(map, icon.filePath, icon.name);
    }
  } catch {
    /* seed map yeterli */
  }

  return map;
}

function humanizeFileStem(path: string) {
  const file = path.split("/").pop() ?? path;
  const stem = file.replace(/\.[^.]+$/i, "");
  if (!stem) {
    return "—";
  }

  return stem
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sipariş tasarımındaki sembol yolundan görünen ikon adı */
export function resolveIconDisplayName(symbolPath: string, lookup: IconNameLookup) {
  const clean = normalizeStoredAssetPath(symbolPath);
  if (!clean) {
    return "—";
  }

  if (lookup[clean]) {
    return lookup[clean];
  }

  const file = clean.split("/").pop() ?? "";
  if (file && lookup[file]) {
    return lookup[file];
  }

  const stem = file.replace(/\.[^.]+$/i, "");
  if (stem && lookup[stem]) {
    return lookup[stem];
  }

  if (!clean.includes("/") && lookup[`figures_gorsel/${clean}.svg`]) {
    return lookup[`figures_gorsel/${clean}.svg`];
  }

  return humanizeFileStem(clean);
}
