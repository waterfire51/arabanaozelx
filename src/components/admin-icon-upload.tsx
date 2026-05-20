"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

type Props = {
  categoryId: string;
  categoryName: string;
};

export function AdminIconUpload({ categoryId, categoryName }: Props) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File | null) {
    if (!file || !categoryId) {
      return;
    }

    setUploading(true);
    setStatus("Yükleniyor...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("categoryId", categoryId);
      formData.append("name", name || file.name.replace(/\.[^.]+$/, ""));

      const response = await fetch("/api/admin/icons/upload", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız.");
      }

      setStatus(`${categoryName} kategorisine ikon eklendi. Sayfa yenileniyor...`);
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Yükleme başarısız.");
      setUploading(false);
    }
  }

  return (
    <div className="mt-3 rounded-lg border border-dashed border-gray-300 p-3">
      <label className="block">
        <span className="form-label">İkon adı (isteğe bağlı)</span>
        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn. Galatasaray" />
      </label>
      <label className="primary-button mt-2 cursor-pointer">
        <Upload size={16} />
        {uploading ? "Yükleniyor..." : "İkon Yükle"}
        <input
          type="file"
          accept="image/*,.svg"
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleUpload(e.target.files?.[0] || null)}
        />
      </label>
      {status ? <p className="mt-2 text-xs font-semibold text-gray-600">{status}</p> : null}
    </div>
  );
}
