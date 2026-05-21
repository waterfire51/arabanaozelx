/** Canlı site kök adresi — .env boşsa ve sunucu tarafında kullanılır */
export const DEFAULT_PUBLIC_SITE_URL = "http://arabanaozel.com";

export function getSiteBaseUrl(options?: { request?: Request }) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  if (options?.request) {
    try {
      return new URL(options.request.url).origin;
    } catch {
      // ignore
    }
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return DEFAULT_PUBLIC_SITE_URL;
}
