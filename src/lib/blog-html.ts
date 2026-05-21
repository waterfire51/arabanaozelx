import sanitizeHtml from "sanitize-html";

/** Blog gövdesinde izin verilen HTML etiketleri (h1 yok — sayfa başlığı ayrı) */
export const BLOG_ALLOWED_TAGS = [
  "h2",
  "h3",
  "h4",
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "hr"
] as const;

export function isBlogHtml(body: string) {
  const trimmed = body.trim();
  return /<[a-z][\s\S]*>/i.test(trimmed);
}

/** ChatGPT / editör çıktısını güvenli blog HTML’ine çevirir */
export function sanitizeBlogHtml(html: string) {
  const normalized = html
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  return sanitizeHtml(normalized, {
    allowedTags: [...BLOG_ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank"
      })
    }
  }).trim();
}
