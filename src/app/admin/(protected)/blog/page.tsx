import Link from "next/link";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { assetPath } from "@/lib/assets";
import { blogPostHref, formatBlogDate } from "@/lib/blog";
import { getAdminBlogPosts } from "@/lib/data";
import { deleteBlogPost, saveBlogPost } from "../actions";

export const dynamic = "force-dynamic";

function toDatetimeLocal(value: string | Date | null | undefined) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().slice(0, 16);
}

export default async function AdminBlogPage() {
  const { posts, dbReady } = await getAdminBlogPosts();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black">Blog Yazıları</h1>
          <p className="text-sm text-gray-600">Yazıları oluşturun, SEO alanlarını doldurun ve yayına alın.</p>
        </div>
        <Link href="/blog" target="_blank" className="secondary-button">
          <ExternalLink size={16} /> Blog sayfası
        </Link>
      </div>

      {!dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok veya BlogPost tablosu henüz oluşturulmadı.{" "}
          <code className="font-mono">npx prisma migrate deploy</code> çalıştırın.
        </div>
      ) : null}

      <details className="mb-6 rounded-lg bg-white p-5 shadow-sm" open={posts.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 font-black text-black">
          <Plus size={18} /> Yeni Blog Yazısı
        </summary>
        <BlogPostForm />
      </details>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">Henüz blog yazısı yok.</p>
        ) : null}
        {posts.map((post) => (
          <details key={post.id ?? post.slug} className="rounded-lg bg-white p-5 shadow-sm">
            <summary className="grid cursor-pointer gap-3 md:grid-cols-[120px_1fr_auto] md:items-center">
              {post.coverImagePath ? (
                <img
                  src={assetPath(post.coverImagePath)}
                  alt=""
                  className="h-20 w-full max-w-[120px] rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-20 max-w-[120px] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                  Kapak yok
                </div>
              )}
              <span>
                <span className="block font-black text-black">{post.title}</span>
                <span className="mt-1 block font-mono text-xs text-gray-400">{blogPostHref(post.slug)}</span>
                {post.publishedAt ? (
                  <span className="mt-1 block text-xs text-gray-500">{formatBlogDate(post.publishedAt)}</span>
                ) : null}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {post.status === "PUBLISHED" ? (
                  <span className="text-green-700">Yayında</span>
                ) : (
                  <span className="text-amber-700">Taslak</span>
                )}
              </span>
            </summary>
            <BlogPostForm post={post} />
            {post.id && dbReady ? (
              <form action={deleteBlogPost} className="mt-3">
                <input type="hidden" name="id" value={post.id} />
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

type BlogPostRow = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body: string;
  coverImagePath?: string | null;
  ogImagePath?: string | null;
  status?: string;
  publishedAt?: string | Date | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  author?: string | null;
};

function BlogPostForm({ post }: { post?: BlogPostRow }) {
  return (
    <form action={saveBlogPost} className="mt-5 grid gap-5">
      <input type="hidden" name="id" value={post?.id || ""} />

      <div className="grid gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-2">
        <label>
          <span className="form-label">Başlık</span>
          <input name="title" className="form-input" defaultValue={post?.title || ""} required placeholder="Yazı başlığı" />
        </label>
        <label>
          <span className="form-label">URL slug</span>
          <input
            name="slug"
            className="form-input font-mono text-sm"
            defaultValue={post?.slug || ""}
            placeholder="kisiye-ozel-plakalik-rehberi"
          />
          <span className="mt-1 block text-xs text-gray-500">Boş bırakırsanız başlıktan otomatik üretilir.</span>
        </label>
        <label className="md:col-span-2">
          <span className="form-label">Kısa özet (liste & SEO)</span>
          <textarea
            name="excerpt"
            className="form-input min-h-[80px]"
            defaultValue={post?.excerpt || ""}
            placeholder="Anasayfa ve arama sonuçlarında görünecek kısa açıklama"
          />
        </label>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <AdminImageUpload
          folder="site_gorsel"
          variant="slider"
          inputName="coverImagePath"
          defaultPath={post?.coverImagePath || ""}
          label="Kapak görseli"
          hint="Blog listesi ve yazı üstünde gösterilir."
        />
      </div>

      <label>
        <span className="form-label">İçerik</span>
        <textarea
          name="body"
          className="form-input min-h-[280px]"
          defaultValue={post?.body || ""}
          required
          placeholder="Yazı metni..."
        />
      </label>

      <div className="rounded-xl border border-[#ee3625]/15 bg-[#fff8f7] p-4 sm:p-5">
        <h3 className="text-sm font-black uppercase tracking-wide text-[#c82014]">SEO Ayarları</h3>
        <p className="mt-1 text-xs text-gray-600">Boş bırakılırsa başlık ve özetten otomatik doldurulur.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="form-label">Meta başlık</span>
            <input name="metaTitle" className="form-input" defaultValue={post?.metaTitle || ""} placeholder="Google başlığı (max ~60 karakter)" />
          </label>
          <label className="md:col-span-2">
            <span className="form-label">Meta açıklama</span>
            <textarea
              name="metaDescription"
              className="form-input min-h-[72px]"
              defaultValue={post?.metaDescription || ""}
              placeholder="Arama sonuçları açıklaması (max ~160 karakter)"
            />
          </label>
          <label className="md:col-span-2">
            <span className="form-label">Anahtar kelimeler</span>
            <input
              name="metaKeywords"
              className="form-input"
              defaultValue={post?.metaKeywords || ""}
              placeholder="plakalık, oto aksesuar, kişiye özel (virgülle)"
            />
          </label>
          <label>
            <span className="form-label">Yazar</span>
            <input name="author" className="form-input" defaultValue={post?.author || "Arabana Özel"} />
          </label>
          <label>
            <span className="form-label">Yayın tarihi</span>
            <input
              name="publishedAt"
              type="datetime-local"
              className="form-input"
              defaultValue={toDatetimeLocal(post?.publishedAt) || toDatetimeLocal(new Date())}
            />
          </label>
        </div>
        <div className="mt-4">
          <AdminImageUpload
            folder="site_gorsel"
            inputName="ogImagePath"
            defaultPath={post?.ogImagePath || ""}
            label="Sosyal paylaşım görseli (Open Graph)"
            hint="Facebook / Twitter önizlemesi. Boşsa kapak görseli kullanılır."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label>
          <span className="form-label">Durum</span>
          <select name="status" className="form-input" defaultValue={post?.status || "DRAFT"}>
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
          </select>
        </label>
      </div>

      <button type="submit" className="primary-button w-max">
        <Save size={16} /> Kaydet
      </button>
    </form>
  );
}
