import Link from "next/link";
import { Calendar, User } from "lucide-react";
import type { SiteBlogPost } from "@/lib/types";
import { assetPath } from "@/lib/paths";
import { blogPostHref, formatBlogDate } from "@/lib/blog";

export function BlogCard({ post }: { post: SiteBlogPost }) {
  const cover = post.coverImagePath ? assetPath(post.coverImagePath) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-red-200 hover:shadow-md">
      <Link href={blogPostHref(post.slug)} className="block overflow-hidden bg-gray-100">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-48 place-items-center bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-semibold text-gray-400">
            Blog
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
          {post.publishedAt ? (
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} />
              {formatBlogDate(post.publishedAt)}
            </span>
          ) : null}
          {post.author ? (
            <span className="inline-flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
          ) : null}
        </div>
        <h2 className="text-lg font-black leading-snug text-black group-hover:text-[#ee3625]">
          <Link href={blogPostHref(post.slug)}>{post.title}</Link>
        </h2>
        {post.excerpt ? <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p> : null}
        <Link href={blogPostHref(post.slug)} className="mt-4 text-sm font-bold text-[#ee3625] hover:underline">
          Devamını oku →
        </Link>
      </div>
    </article>
  );
}
