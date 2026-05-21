export type TrafficAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
};

function norm(value: string | null | undefined) {
  const trimmed = String(value ?? "").trim();
  return trimmed || undefined;
}

function hostFromReferrer(referrer?: string) {
  if (!referrer) {
    return undefined;
  }

  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Reklam / organik / direkt trafik kaynağı etiketi */
export function resolveTrafficSourceLabel(attribution: TrafficAttribution): {
  sourceLabel: string;
  referrerHost?: string;
} {
  const utmSource = norm(attribution.utmSource)?.toLowerCase();
  const utmMedium = norm(attribution.utmMedium)?.toLowerCase();
  const utmCampaign = norm(attribution.utmCampaign);
  const referrerHost = hostFromReferrer(attribution.referrer);

  if (utmSource) {
    if (utmSource.includes("instagram") || utmSource === "ig") {
      const suffix = utmCampaign ? ` (${utmCampaign})` : "";
      return { sourceLabel: `Instagram Reklam${suffix}`, referrerHost };
    }
    if (utmSource.includes("facebook") || utmSource === "fb") {
      const suffix = utmCampaign ? ` (${utmCampaign})` : "";
      return { sourceLabel: `Facebook Reklam${suffix}`, referrerHost };
    }
    if (utmSource.includes("google")) {
      const suffix = utmCampaign ? ` (${utmCampaign})` : "";
      const paid = utmMedium === "cpc" || utmMedium === "ppc" || utmMedium === "paid";
      return {
        sourceLabel: paid ? `Google Reklam${suffix}` : `Google (${utmSource})${suffix}`,
        referrerHost
      };
    }
    if (utmMedium === "cpc" || utmMedium === "paid" || utmMedium === "ppc") {
      return { sourceLabel: `${utmSource} Reklam${utmCampaign ? ` (${utmCampaign})` : ""}`, referrerHost };
    }
    return {
      sourceLabel: `UTM: ${utmSource}${utmMedium ? ` / ${utmMedium}` : ""}${utmCampaign ? ` — ${utmCampaign}` : ""}`,
      referrerHost
    };
  }

  if (referrerHost) {
    if (referrerHost.includes("instagram")) {
      return { sourceLabel: "Instagram (organik / link)", referrerHost };
    }
    if (referrerHost.includes("facebook") || referrerHost.includes("fb.")) {
      return { sourceLabel: "Facebook (organik / link)", referrerHost };
    }
    if (referrerHost.includes("google")) {
      return { sourceLabel: "Google Arama (organik)", referrerHost };
    }
    if (referrerHost.includes("t.co") || referrerHost.includes("twitter") || referrerHost.includes("x.com")) {
      return { sourceLabel: "X / Twitter", referrerHost };
    }
    if (referrerHost.includes("youtube")) {
      return { sourceLabel: "YouTube", referrerHost };
    }
    if (referrerHost.includes("tiktok")) {
      return { sourceLabel: "TikTok", referrerHost };
    }
    return { sourceLabel: referrerHost, referrerHost };
  }

  return { sourceLabel: "Direkt / bilinmiyor", referrerHost };
}

export function detectDeviceType(userAgent: string | null | undefined): "mobile" | "tablet" | "desktop" {
  const ua = String(userAgent ?? "").toLowerCase();
  if (!ua) {
    return "desktop";
  }
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|android.*mobile|blackberry|windows phone/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export const DEVICE_LABELS: Record<string, string> = {
  mobile: "Mobil",
  tablet: "Tablet",
  desktop: "Masaüstü"
};

export const EVENT_LABELS: Record<string, string> = {
  PAGE_VIEW: "Sayfa görüntüleme",
  PRODUCT_VIEW: "Ürün görüntüleme",
  ADD_TO_CART: "Sepete / siparişe geçiş",
  CHECKOUT_START: "Ödeme adımı başlangıcı",
  PAYMENT_START: "Online ödeme ekranı",
  ORDER_COMPLETE: "Tamamlanan sipariş"
};
