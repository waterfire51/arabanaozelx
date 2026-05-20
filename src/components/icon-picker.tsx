"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import type { IconCatalogCategory } from "@/lib/icons";
import { resolveSymbolAssetPath } from "@/lib/icons";

type Props = {
  label: string;
  value: string;
  onChange: (path: string) => void;
};

export function IconPicker({ label, value, onChange }: Props) {
  const [categories, setCategories] = useState<IconCatalogCategory[]>([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/icons")
      .then((res) => res.json())
      .then((data: { categories?: IconCatalogCategory[] }) => {
        const list = data.categories ?? [];
        setCategories(list);
        setActiveSlug(list[0]?.slug || "");
      })
      .finally(() => setLoading(false));
  }, []);

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  async function handleCustomUpload(file: File | null) {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("Özel ikon yükleniyor...");

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
      setStatus("Özel ikon seçildi.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <span className="form-label">{label}</span>

      {value ? (
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-white p-2">
          <img src={resolveSymbolAssetPath(value)} alt="" className="h-12 w-12 object-contain" />
          <span className="break-all font-mono text-[10px] text-gray-500">{value}</span>
        </div>
      ) : null}

      {loading ? (
        <p className="text-xs text-gray-500">İkonlar yükleniyor...</p>
      ) : (
        <>
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  activeSlug === category.slug ? "bg-red-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveSlug(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid max-h-40 grid-cols-4 gap-2 overflow-y-auto rounded-lg bg-white p-2 sm:grid-cols-6">
            {(activeCategory?.icons ?? []).map((icon) => (
              <button
                key={icon.id}
                type="button"
                title={icon.name}
                className={`rounded-lg border p-1 transition hover:border-red-500 ${
                  value === icon.filePath ? "border-red-600 bg-red-50" : "border-gray-200"
                }`}
                onClick={() => onChange(icon.filePath)}
              >
                <img src={icon.url} alt={icon.name} className="mx-auto h-10 w-10 object-contain" />
              </button>
            ))}
            {!activeCategory?.icons.length ? (
              <p className="col-span-full py-4 text-center text-xs text-gray-500">Bu kategoride ikon yok.</p>
            ) : null}
          </div>
        </>
      )}

      <label className="secondary-button mt-3 cursor-pointer">
        <Upload size={14} />
        {uploading ? "Yükleniyor..." : "Özel İkon Yükle"}
        <input
          type="file"
          accept="image/*,.svg"
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleCustomUpload(e.target.files?.[0] || null)}
        />
      </label>

      {status ? <p className="mt-2 text-xs font-semibold text-gray-600">{status}</p> : null}
    </div>
  );
}
