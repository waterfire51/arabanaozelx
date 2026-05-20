"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { assetPath } from "@/lib/assets";

type Props = {
  slug?: string;
  defaultPath?: string;
  inputName?: string;
};

export function AdminImageUpload({ slug = "", defaultPath = "", inputName = "imagePath" }: Props) {
  const [path, setPath] = useState(defaultPath);
  const [preview, setPreview] = useState(defaultPath ? assetPath(defaultPath, slug) : "");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    const slugField = document.querySelector<HTMLInputElement>('input[name="slug"]');
    const currentSlug = slugField?.value?.trim() || slug;

    if (!currentSlug) {
      setStatus("Önce slug alanını doldurun.");
      return;
    }

    setUploading(true);
    setStatus("Yükleniyor...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", currentSlug);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as { path?: string; url?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız.");
      }

      if (data.path) {
        setPath(data.path);
        setPreview(data.url || assetPath(data.path, currentSlug));
        setStatus("Görsel GitHub assets reposuna yüklendi.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3 rounded-lg border border-dashed border-gray-300 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {preview ? (
          <img src={preview} alt="" className="h-24 w-24 rounded bg-gray-100 object-contain p-2" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded bg-gray-100 text-xs text-gray-500">
            Önizleme
          </div>
        )}
        <label className="primary-button cursor-pointer">
          <Upload size={16} />
          {uploading ? "Yükleniyor..." : "Görsel Yükle"}
          <input
            type="file"
            accept="image/*,video/mp4"
            className="hidden"
            disabled={uploading}
            onChange={(event) => handleUpload(event.target.files?.[0] || null)}
          />
        </label>
      </div>

      <label>
        <span className="form-label">Görsel Yolu (assets repo)</span>
        <input
          name={inputName}
          className="form-input font-mono text-xs"
          value={path}
          onChange={(event) => {
            setPath(event.target.value);
            setPreview(assetPath(event.target.value, slug));
          }}
          required
        />
      </label>

      {status ? <p className="text-sm font-semibold text-gray-600">{status}</p> : null}
      <p className="text-xs text-gray-500">
        Dosyalar GitHub&apos;daki <code>arabanaozelx_assets</code> reposuna slug&apos;a göre klasörlenir (ör.{" "}
        <code>plakalik_gorsel/...</code>).
      </p>
    </div>
  );
}
