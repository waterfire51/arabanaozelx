"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { assetPath } from "@/lib/assets";

type Props = {
  categoryId: string;
  categoryName: string;
  coverPath?: string | null;
};

export function AdminCategoryCoverUpload({ categoryId, categoryName, coverPath }: Props) {
  const [preview, setPreview] = useState(coverPath ? assetPath(coverPath) : "");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("Kapak görseli yükleniyor...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("categoryId", categoryId);

      const response = await fetch("/api/admin/icons/category-cover", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as { coverUrl?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız.");
      }

      if (data.coverUrl) {
        setPreview(data.coverUrl);
      }

      setStatus("Kategori kapağı güncellendi. Modalda görünecek.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-4 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4">
      <p className="mb-2 text-sm font-bold text-black">Kategori kapak görseli</p>
      <p className="mb-3 text-xs text-gray-600">
        Müşteri modalında daire içinde görünür ({categoryName}).
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="icon-category-ring">
          <div className="icon-category-inner h-[72px] w-[72px]">
            {preview ? (
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="grid h-full w-full place-items-center text-xs font-bold text-gray-400">Kapak</span>
            )}
          </div>
        </div>
        <label className="secondary-button cursor-pointer">
          <ImagePlus size={16} />
          {uploading ? "Yükleniyor..." : "Kapak Yükle"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files?.[0] || null)}
          />
        </label>
      </div>
      {status ? <p className="mt-2 text-xs font-semibold text-gray-600">{status}</p> : null}
    </div>
  );
}
