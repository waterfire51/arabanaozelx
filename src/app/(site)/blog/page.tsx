import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getPublishedBlogPosts } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Arabana Özel",
  description: "Oto aksesuar, kişiye özel plakalık ve araç içi ürünler hakkında ipuçları, rehberler ve haberler.",
  path: "/blog",
  keywords: "oto aksesuar blog, plakalık rehberi, arabana özel blog"
});

export default async function BlogListPage() {
  const { posts } = await getPublishedBlogPosts();

  return (
    <div className="site-container py-8">
      <div className="blog-page-intro mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-[#ee3625]">Blog</p>
        <h1 className="mt-2 text-3xl font-black text-black sm:text-4xl">Oto Aksesuar & Plakalık Rehberi</h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600">
          Ürün kullanımı, tasarım ipuçları ve sipariş süreçleri hakkında güncel yazılar.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Henüz yayınlanmış blog yazısı yok.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id ?? post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
