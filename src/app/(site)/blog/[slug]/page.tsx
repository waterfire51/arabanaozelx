import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { resolveBlogSeo } from "@/lib/blog";
import { getBlogPostBySlug, getSiteSettings } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getBlogPostBySlug(slug), getSiteSettings()]);

  if (!post) {
    return { title: "Yazı bulunamadı" };
  }

  return buildPageMetadata(resolveBlogSeo(post, settings.siteName));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getBlogPostBySlug(slug), getSiteSettings()]);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} settings={settings} />;
}
