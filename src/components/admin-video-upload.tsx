"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Film, Loader2, Upload, XCircle } from "lucide-react";
import { assetPath } from "@/lib/assets";

type Props = {
  defaultPath?: string;
  inputName?: string;
};

type UploadState = "idle" | "uploading" | "success" | "error";

function uploadWithProgress(formData: FormData, onProgress: (percent: number) => void) {
  return new Promise<{ path?: string; url?: string; storage?: string; error?: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && event.total > 0) {
        onProgress(Math.min(88, Math.round((event.loaded / event.total) * 88)));
      }
    });

    xhr.addEventListener("load", () => {
      onProgress(100);
      try {
        const data = JSON.parse(xhr.responseText) as { path?: string; url?: string; storage?: string; error?: string };
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
        } else {
          reject(new Error(data.error || "Yükleme başarısız."));
        }
      } catch {
        reject(new Error("Sunucu yanıtı okunamadı."));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Ağ hatası.")));
    onProgress(2);
    xhr.send(formData);
  });
}

export function AdminVideoUpload({ defaultPath = "", inputName = "videoPath" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(defaultPath);
  const [preview, setPreview] = useState(defaultPath ? assetPath(defaultPath) : "");
  const [status, setStatus] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    if (file.type !== "video/mp4") {
      setStatus("error");
      setMessage("Yalnızca MP4 video yüklenebilir.");
      return;
    }

    setStatus("uploading");
    setMessage("Video yükleniyor...");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "video");

      const data = await uploadWithProgress(formData, setProgress);

      if (!data.path) {
        throw new Error("Yanıtta dosya yolu yok.");
      }

      setPath(data.path);
      setPreview(data.url || assetPath(data.path));
      setStatus("success");
      setMessage(data.storage === "local" ? "Video siteye kaydedildi." : "Video yüklendi.");
    } catch (error) {
      setStatus("error");
      setProgress(0);
      setMessage(error instanceof Error ? error.message : "Yükleme başarısız.");
    }
  }

  const uploading = status === "uploading";

  return (
    <div className="admin-upload-slider">
      <span className="form-label">Tanıtım videosu (MP4)</span>

      <div className={`admin-upload-drop ${uploading ? "admin-upload-drop-busy" : ""}`}>
        <div className="admin-upload-preview-wrap">
          {preview ? (
            <video src={preview} muted playsInline loop className="admin-upload-preview-img max-h-[160px] object-contain bg-black" />
          ) : (
            <div className="admin-upload-preview-empty">
              <Film size={32} className="text-gray-300" />
              <span>Video önizleme</span>
            </div>
          )}
        </div>

        <div className="admin-upload-actions">
          <p className="admin-upload-drop-title">MP4 dosyası seçin</p>
          <p className="admin-upload-drop-hint">En fazla 12MB</p>
          <button type="button" className="primary-button" disabled={uploading} onClick={() => inputRef.current?.click()}>
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Yükleniyor..." : "Video Seç"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4"
            className="hidden"
            disabled={uploading}
            onChange={(event) => void handleUpload(event.target.files?.[0] || null)}
          />
        </div>
      </div>

      {uploading ? (
        <div className="admin-upload-progress">
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

      <p className="admin-upload-footnote text-xs text-gray-500">
        Video yüklendikten sonra kaydet&apos;e basın. Yol otomatik kaydedilir.
      </p>
    </div>
  );
}
