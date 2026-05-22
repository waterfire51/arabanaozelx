/** Canlı site kök adresi - .env boşsa ve sunucu tarafında kullanılır */
export const DEFAULT_PUBLIC_SITE_URL = "https://www.arabanaozel.com";

function normalizePublicSiteUrl(value: string) {
  const clean = value.trim().replace(/\/$/, "");

  if (!clean) {
    return DEFAULT_PUBLIC_SITE_URL;
  }

  try {
    const url = new URL(clean);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "arabanaozel.com") {
      return DEFAULT_PUBLIC_SITE_URL;
    }

    return url.origin.replace(/\/$/, "");
  } catch {
    return clean;
  }
}

export function getSiteBaseUrl(options?: { request?: Request }) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return normalizePublicSiteUrl(fromEnv);
  }

  if (options?.request) {
    try {
      return normalizePublicSiteUrl(new URL(options.request.url).origin);
    } catch {
      // ignore
    }
  }

  if (typeof window !== "undefined") {
    return normalizePublicSiteUrl(window.location.origin);
  }

  return DEFAULT_PUBLIC_SITE_URL;
}
