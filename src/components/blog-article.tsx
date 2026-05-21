import Link from "next/link";
import { Calendar, ChevronLeft, User } from "lucide-react";
import type { SiteBlogPost } from "@/lib/types";
import { assetPath } from "@/lib/paths";
import { formatBlogDate } from "@/lib/blog";
import { isBlogHtml, sanitizeBlogHtml } from "@/lib/blog-html";
import { getSiteBaseUrl } from "@/lib/site-url";

export function BlogArticle({ post }: { post: SiteBlogPost }) {
  const cover = post.coverImagePath ? assetPath(post.coverImagePath) : null;
  const base = getSiteBaseUrl();
  const articleUrl = `${base}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: cover,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Arabana Özel"
    },
    mainEntityOfPage: articleUrl
  };

  return (
    <article className="site-container py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#ee3625] hover:underline">
        <ChevronLeft size={16} /> Tüm yazılar
      </Link>

      <div className="site-card overflow-hidden">
        {cover ? (
          <img src={cover} alt="" className="max-h-[420px] w-full object-cover" />
        ) : null}
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={16} />
                {formatBlogDate(post.publishedAt)}
              </span>
            ) : null}
            {post.author ? (
              <span className="inline-flex items-center gap-1.5">
                <User size={16} />
                {post.author}
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl font-black leading-tight text-black sm:text-4xl">{post.title}</h1>
          {post.excerpt ? <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.excerpt}</p> : null}
          {isBlogHtml(post.body) ? (
            <div
              className="prose-blog mt-8 text-base leading-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.body) }}
            />
          ) : (
            <div className="prose-blog mt-8 whitespace-pre-line text-base leading-8 text-gray-700">{post.body}</div>
          )}
        </div>
      </div>
    </article>
  );
}
