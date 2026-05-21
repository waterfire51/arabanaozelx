"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircle2, ImageIcon, Loader2, Upload, XCircle } from "lucide-react";
import { assetPath, type AssetFolder } from "@/lib/assets";

type Props = {
  slug?: string;
  folder?: AssetFolder;
  defaultPath?: string;
  inputName?: string;
  label?: string;
  hint?: string;
  variant?: "default" | "slider";
  /** true ise dosya yolu metin kutusu gösterilir (ürün sayfası) */
  showPathInput?: boolean;
};

type UploadState = "idle" | "uploading" | "success" | "error";

function uploadWithProgress(formData: FormData, onProgress: (percent: number) => void) {
  return new Promise<{ path?: string; url?: string; storage?: string; error?: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && event.total > 0) {
        const sent = Math.round((event.loaded / event.total) * 88);
        onProgress(Math.min(88, sent));
      }
    });

    xhr.addEventListener("load", () => {
      onProgress(100);
      try {
        const data = JSON.parse(xhr.responseText) as {
          path?: string;
          url?: string;
          storage?: string;
          error?: string;
        };
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
        } else {
          reject(new Error(data.error || "Yükleme başarısız."));
        }
      } catch {
        reject(new Error("Sunucu yanıtı okunamadı."));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Ağ hatası — bağlantıyı kontrol edin.")));
    xhr.addEventListener("abort", () => reject(new Error("Yükleme iptal edildi.")));

    onProgress(2);
    xhr.send(formData);
  });
}

export function AdminImageUpload({
  slug = "",
  folder,
  defaultPath = "",
  inputName = "imagePath",
  label = "Görsel yolu",
  hint,
  variant = "default",
  showPathInput = false
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(defaultPath);
  const [preview, setPreview] = useState(defaultPath ? assetPath(defaultPath, folder ? undefined : slug) : "");
  const [status, setStatus] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const resolvePreview = useCallback(
    (value: string) => assetPath(value, folder ? undefined : slug),
    [folder, slug]
  );

  async function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    const slugField = document.querySelector<HTMLInputElement>('input[name="slug"]');
    const currentSlug = slugField?.value?.trim() || slug;

    if (!folder && !currentSlug) {
      setStatus("error");
      setMessage("Önce slug alanını doldurun veya klasör modunu kullanın.");
      return;
    }

    if (!file.type.startsWith("image/") && file.type !== "image/svg+xml") {
      setStatus("error");
      setMessage("Lütfen bir görsel dosyası seçin (JPG, PNG, WebP, GIF).");
      return;
    }

    setStatus("uploading");
    setMessage("Dosya sunucuya gönderiliyor...");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) {
        formData.append("folder", folder);
      } else {
        formData.append("slug", currentSlug);
      }

      setMessage("Yükleniyor, lütfen bekleyin...");
      const data = await uploadWithProgress(formData, (percent) => {
        setProgress(percent);
        if (percent >= 88) {
          setMessage("Kaydediliyor...");
        }
      });

      if (!data.path) {
        throw new Error("Yanıtta dosya yolu yok.");
      }

      setPath(data.path);
      setPreview(data.url || resolvePreview(data.path));
      setStatus("success");
      setMessage(
        data.storage === "local"
          ? "Görsel siteye kaydedildi (yerel uploads)."
          : "Görsel yüklendi ve yayına hazır."
      );
    } catch (error) {
      setStatus("error");
      setProgress(0);
      setMessage(error instanceof Error ? error.message : "Yükleme başarısız.");
    }
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void handleUpload(file);
    }
  }

  const isSlider = variant === "slider";
  const uploading = status === "uploading";

  return (
    <div className={isSlider ? "admin-upload-slider" : "admin-upload-zone"}>
      <span className="form-label">{label}</span>

      <div
        className={`admin-upload-drop ${dragOver ? "admin-upload-drop-active" : ""} ${uploading ? "admin-upload-drop-busy" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="admin-upload-preview-wrap">
          {preview ? (
            <img src={preview} alt="" className="admin-upload-preview-img" />
          ) : (
            <div className="admin-upload-preview-empty">
              <ImageIcon size={32} className="text-gray-300" />
              <span>Önizleme</span>
            </div>
          )}
        </div>

        <div className="admin-upload-actions">
          <p className="admin-upload-drop-title">Görseli sürükleyip bırakın veya seçin</p>
          <p className="admin-upload-drop-hint">JPG, PNG, WebP, GIF — en fazla 12MB</p>
          <button
            type="button"
            className="primary-button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Yükleniyor..." : "Dosya Seç"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            disabled={uploading}
            onChange={(event) => void handleUpload(event.target.files?.[0] || null)}
          />
        </div>
      </div>

      {uploading ? (
        <div className="admin-upload-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="admin-upload-progress-label">
            <span>{message}</span>
            <span className="font-black text-[#ee3625]">%{progress}</span>
          </div>
          <div className="admin-upload-progress-track">
            <div className="admin-upload-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}

      {status === "success" ? (
        <p className="admin-upload-status admin-upload-status-success">
          <CheckCircle2 size={16} /> {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="admin-upload-status admin-upload-status-error">
          <XCircle size={16} /> {message}
        </p>
      ) : null}

      <input type="hidden" name={inputName} value={path} required />

      {showPathInput ? (
        <label className="mt-2 block">
          <span className="text-xs font-bold text-gray-500">Görsel yolu</span>
          <input
            className="form-input mt-1 font-mono text-xs"
            value={path}
            onChange={(event) => {
              setPath(event.target.value);
              setPreview(resolvePreview(event.target.value));
              setStatus("idle");
              setMessage("");
            }}
          />
        </label>
      ) : null}

      {hint ? <p className="admin-upload-footnote">{hint}</p> : null}
    </div>
  );
}
