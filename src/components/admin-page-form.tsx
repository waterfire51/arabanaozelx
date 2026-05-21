import { ExternalLink, Save } from "lucide-react";
import type { SitePage } from "@/lib/types";
import { savePage } from "@/app/admin/(protected)/actions";

export const PAGE_LABELS: Record<string, string> = {
  iletisim: "İletişim",
  sozlesmeler: "Sözleşmeler (liste)",
  "gizlilik-sozlesmesi": "Gizlilik Sözleşmesi",
  kvkk: "KVKK",
  "satis-sozlesmesi": "Satış Sözleşmesi",
  "iade-ve-ipal-sozlesmesi": "İade ve İptal"
};

type AdminPageFormProps = {
  page?: SitePage;
  returnTo?: string;
  showSlug?: boolean;
};

export function AdminPageForm({ page, returnTo = "/admin/pages", showSlug = true }: AdminPageFormProps) {
  const label = page?.slug ? PAGE_LABELS[page.slug] || page.title : undefined;

  return (
    <form action={savePage} className="mt-5 grid gap-4">
      <input type="hidden" name="id" value={page?.id || ""} />
      <input type="hidden" name="returnTo" value={returnTo} />

      {label ? (
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="form-label">Başlık</span>
          <input name="title" className="form-input" defaultValue={page?.title || ""} required />
        </label>
        {showSlug ? (
          <label>
            <span className="form-label">Slug</span>
            <input name="slug" className="form-input font-mono text-sm" defaultValue={page?.slug || ""} required />
          </label>
        ) : (
          <input type="hidden" name="slug" value={page?.slug || ""} />
        )}
      </div>

      <label>
        <span className="form-label">İçerik</span>
        <textarea name="body" className="form-input min-h-[200px]" defaultValue={page?.body || ""} required />
      </label>

      <div className="rounded-xl border border-[#ee3625]/15 bg-[#fff8f7] p-4">
        <h4 className="text-sm font-black text-[#c82014]">Sayfa SEO</h4>
        <div className="mt-3 grid gap-3">
          <label>
            <span className="form-label">Meta başlık</span>
            <input name="metaTitle" className="form-input" defaultValue={page?.metaTitle || ""} placeholder="Boşsa sayfa başlığı" />
          </label>
          <label>
            <span className="form-label">Meta açıklama</span>
            <textarea
              name="metaDescription"
              className="form-input min-h-[64px]"
              defaultValue={page?.metaDescription || ""}
              placeholder="Boşsa içerikten kısaltılır"
            />
          </label>
          <label>
            <span className="form-label">Anahtar kelimeler</span>
            <input name="metaKeywords" className="form-input" defaultValue={page?.metaKeywords || ""} />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label>
          <span className="form-label">Durum</span>
          <select name="status" className="form-input" defaultValue={page?.status || "PUBLISHED"}>
            <option value="PUBLISHED">Yayında</option>
            <option value="DRAFT">Taslak</option>
          </select>
        </label>
        <label>
          <span className="form-label">Sıra</span>
          <input name="sortOrder" type="number" className="form-input w-24" defaultValue={page?.sortOrder ?? 0} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="primary-button w-max">
          <Save size={16} /> Kaydet
        </button>
        {page?.slug ? (
          <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="secondary-button">
            <ExternalLink size={16} /> Önizle
          </a>
        ) : null}
      </div>
    </form>
  );
}
