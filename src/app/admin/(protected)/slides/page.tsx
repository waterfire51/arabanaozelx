import Link from "next/link";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { AdminVideoUpload } from "@/components/admin-video-upload";
import { assetPath } from "@/lib/assets";
import { getAdminHomeVideo, getAdminSlides } from "@/lib/data";
import { deleteHeroSlide, saveHeroSlide, saveHomeVideo } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSlidesPage() {
  const [{ slides, dbReady }, { homeVideo }] = await Promise.all([getAdminSlides(), getAdminHomeVideo()]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black">Anasayfa — Slider & Video</h1>
          <p className="text-sm text-gray-600">
            Üstteki banner slider ve altındaki tanıtım videosunu buradan yönetin.
          </p>
        </div>
        <Link href="/" target="_blank" className="secondary-button">
          <ExternalLink size={16} /> Anasayfayı Gör
        </Link>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok; liste seed verisinden geliyor. Kayıt için DATABASE_URL ve migrate/seed çalıştırın.
        </div>
      ) : null}

      <section className="mb-8 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">Tanıtım Videosu</h2>
        <p className="mt-1 text-sm text-gray-600">Slider ile kategori şeridi arasında oynayan MP4 video.</p>
        <HomeVideoForm homeVideo={homeVideo} />
      </section>

      <h2 className="mb-3 text-lg font-black text-black">Banner Slider</h2>

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm" open={slides.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni Slider
        </summary>
        <SlideForm />
      </details>

      <div className="grid gap-4">
        {slides.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">Henüz slider yok. Yukarıdan ekleyin.</p>
        ) : null}
        {slides.map((slide, index) => (
          <details key={slide.id ?? `slide-${index}`} className="rounded-lg bg-white p-5 shadow-sm" open={index === 0}>
            <summary className="grid cursor-pointer gap-3 md:grid-cols-[140px_1fr_auto] md:items-center">
              <img
                src={assetPath(slide.imagePath)}
                alt=""
                className="h-20 w-full max-w-[140px] rounded-lg bg-gray-100 object-cover"
              />
              <span>
                <span className="block font-black text-black">{slide.title || "Başlıksız slider"}</span>
                {slide.subtitle ? <span className="block text-sm text-gray-500">{slide.subtitle}</span> : null}
                {slide.href ? (
                  <span className="mt-1 block font-mono text-xs text-gray-400">{slide.href}</span>
                ) : (
                  <span className="mt-1 block text-xs text-gray-400">Link yok</span>
                )}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Sıra {slide.sortOrder ?? index}
                {" · "}
                {(slide as { active?: boolean }).active === false ? (
                  <span className="text-amber-700">Pasif</span>
                ) : (
                  <span className="text-green-700">Yayında</span>
                )}
              </span>
            </summary>
            <SlideForm slide={slide} />
            {slide.id && dbReady ? (
              <form action={deleteHeroSlide} className="mt-3">
                <input type="hidden" name="id" value={slide.id} />
                <button type="submit" className="secondary-button text-red-700">
                  <Trash2 size={16} /> Sil
                </button>
              </form>
            ) : null}
          </details>
        ))}
      </div>
    </div>
  );
}

type SlideRow = {
  id?: string;
  title?: string | null;
  subtitle?: string | null;
  imagePath: string;
  href?: string | null;
  sortOrder?: number;
  active?: boolean;
};

function HomeVideoForm({ homeVideo }: { homeVideo: { videoPath: string; href?: string | null; active?: boolean } }) {
  const isActive = homeVideo.active !== false;

  return (
    <form action={saveHomeVideo} className="mt-5 grid gap-4">
      <AdminVideoUpload defaultPath={homeVideo.videoPath} />

      <label>
        <span className="form-label">Tıklanınca gidilecek link (isteğe bağlı)</span>
        <input
          name="href"
          className="form-input font-mono text-sm"
          defaultValue={homeVideo.href || ""}
          placeholder="https://..."
        />
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="active" defaultChecked={isActive} className="h-4 w-4 accent-[#ee3625]" />
        <span className="text-sm font-semibold text-gray-700">Yayında (anasayfada göster)</span>
      </label>

      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Videoyu Kaydet
      </button>
    </form>
  );
}

function SlideForm({ slide }: { slide?: SlideRow }) {
  const isActive = slide?.active !== false;

  return (
    <form action={saveHeroSlide} className="mt-5 grid gap-5">
      <input type="hidden" name="id" value={slide?.id || ""} />

      <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5">
        <AdminImageUpload
          folder="slider_gorsel"
          variant="slider"
          defaultPath={slide?.imagePath || ""}
          label="Banner görseli"
          hint="Görseli yükleyin, ardından alttaki Kaydet ile slider'ı kaydedin."
        />
      </div>

      <div className="grid gap-4 rounded-xl border border-gray-100 bg-white p-4 md:grid-cols-2 sm:p-5">
        <label>
          <span className="form-label">Başlık (isteğe bağlı)</span>
          <input name="title" className="form-input" defaultValue={slide?.title || ""} placeholder="Kişiye Özel Oto Plakalık" />
        </label>
        <label>
          <span className="form-label">Alt başlık (isteğe bağlı)</span>
          <input name="subtitle" className="form-input" defaultValue={slide?.subtitle || ""} />
        </label>
        <label className="md:col-span-2">
          <span className="form-label">Tıklanınca gidilecek link</span>
          <input
            name="href"
            className="form-input font-mono text-sm"
            defaultValue={slide?.href || ""}
            placeholder="/plakalik/otomobil"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label>
          <span className="form-label">Sıra</span>
          <input name="sortOrder" type="number" className="form-input w-24" defaultValue={slide?.sortOrder ?? 0} min={0} />
        </label>
        <label className="flex items-center gap-2 pb-2">
          <input type="checkbox" name="active" defaultChecked={isActive} className="h-4 w-4 accent-[#ee3625]" />
          <span className="text-sm font-semibold text-gray-700">Yayında (anasayfada göster)</span>
        </label>
      </div>

      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
