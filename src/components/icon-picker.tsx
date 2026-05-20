"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronRight, Upload, X } from "lucide-react";
import type { IconCatalogCategory } from "@/lib/icons";
import { resolveSymbolAssetPath } from "@/lib/icons";

type IconPickerModalProps = {
  open: boolean;
  title?: string;
  value: string;
  onChange: (path: string) => void;
  onClose: () => void;
};

function CategoryCircle({
  category,
  selected,
  onSelect
}: {
  category: IconCatalogCategory;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center p-1 transition ${selected ? "rounded-lg bg-[#fff3a3]" : "bg-transparent"}`}
      onClick={onSelect}
      title={category.name}
    >
      <div className="icon-category-ring">
        <div className="icon-category-inner">
          {category.coverUrl ? (
            <img src={category.coverUrl} alt="" className="h-full w-full object-cover" />
          ) : category.icons[0] ? (
            <img src={category.icons[0].url} alt="" className="h-full w-full object-contain p-1" />
          ) : (
            <span className="grid h-full w-full place-items-center text-lg font-black text-gray-300">
              {category.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <span className="mt-1 max-w-[72px] text-center text-[9px] font-black uppercase leading-tight text-black">
        {category.name}
      </span>
    </button>
  );
}

export function IconPickerModal({ open, value, onChange, onClose }: IconPickerModalProps) {
  const [categories, setCategories] = useState<IconCatalogCategory[]>([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/icons");
      const data = (await response.json()) as { categories?: IconCatalogCategory[] };
      const list = data.categories ?? [];
      setCategories(list);
      setActiveSlug(list[0]?.slug || "");
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      if (!loaded) {
        loadCatalog();
      }
    } else {
      setStatus("");
    }
  }, [open, loaded, loadCatalog]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  async function handleCustomUpload(file: File | null) {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("Yükleniyor...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name.replace(/\.[^.]+$/, ""));

      const response = await fetch("/api/icons/custom-upload", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as { path?: string; error?: string };

      if (!response.ok || !data.path) {
        throw new Error(data.error || "Yükleme başarısız.");
      }

      onChange(data.path);
      onClose();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  function selectIcon(path: string) {
    onChange(path);
    onClose();
  }

  if (!open) {
    return null;
  }

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal aria-labelledby="icon-picker-title">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Kapat" />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-5">
          <h2 id="icon-picker-title" className="text-sm font-black uppercase tracking-wide text-black sm:text-base">
            Simge Seçimi Yapınız
          </h2>
          <button type="button" className="text-2xl font-light leading-none text-gray-500 hover:text-black" onClick={onClose} aria-label="Kapat">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="py-12 text-center text-sm text-gray-500">Yükleniyor...</p>
          ) : (
            <>
              <div className="border-b border-gray-100 px-3 py-4 sm:px-4">
                <div className="grid grid-cols-4 gap-1 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                  {categories.map((category) => (
                    <CategoryCircle
                      key={category.slug}
                      category={category}
                      selected={activeSlug === category.slug}
                      onSelect={() => setActiveSlug(category.slug)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-[#f5f5f5] px-3 py-4 sm:px-4">
                <div className="grid grid-cols-5 gap-1 sm:grid-cols-8 md:grid-cols-10">
                  {(activeCategory?.icons ?? []).map((icon) => (
                    <button
                      key={icon.id}
                      type="button"
                      title={icon.name}
                      className={`icon-tile aspect-square transition hover:ring-2 hover:ring-[#fff3a3] ${
                        value === icon.filePath ? "ring-2 ring-[#ffd700]" : ""
                      }`}
                      onClick={() => selectIcon(icon.filePath)}
                    >
                      <img src={icon.url} alt={icon.name} className="h-full w-full object-contain p-1" />
                    </button>
                  ))}
                </div>
                {!activeCategory?.icons.length ? (
                  <p className="py-8 text-center text-sm text-gray-500">Bu kategoride simge yok.</p>
                ) : null}

                <label className="secondary-button mx-auto mt-4 w-full max-w-xs cursor-pointer sm:w-auto">
                  <Upload size={16} />
                  {uploading ? "Yükleniyor..." : "Özel Simge Yükle"}
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => handleCustomUpload(e.target.files?.[0] || null)}
                  />
                </label>
                {status ? <p className="mt-2 text-center text-xs font-semibold text-gray-600">{status}</p> : null}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-200 px-4 py-3">
          <button type="button" className="secondary-button min-w-[100px]" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

type IconPickerProps = {
  label: string;
  value: string;
  onChange: (path: string) => void;
};

export function IconPicker({ label, value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left transition hover:border-red-400 hover:bg-red-50/30"
        onClick={() => setOpen(true)}
      >
        <img src={resolveSymbolAssetPath(value)} alt="" className="h-10 w-10 shrink-0 object-contain" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-gray-500">{label}</span>
          <span className="block text-sm font-semibold text-black">Şekil seç</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-gray-400" />
      </button>

      <IconPickerModal open={open} value={value} onChange={onChange} onClose={() => setOpen(false)} />
    </>
  );
}
