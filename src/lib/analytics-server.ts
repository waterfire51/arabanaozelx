import type { AnalyticsEventType } from "@/lib/analytics-types";
import { analyticsPrisma } from "@/lib/prisma-analytics";
import { detectDeviceType, resolveTrafficSourceLabel, type TrafficAttribution } from "@/lib/analytics-traffic";

type RecordEventInput = {
  type: AnalyticsEventType;
  sessionId: string;
  path?: string;
  productId?: string;
  productSlug?: string;
  productName?: string;
  attribution?: TrafficAttribution;
  device?: string;
  userAgent?: string | null;
};

export async function recordAnalyticsEvent(input: RecordEventInput) {
  if (!process.env.DATABASE_URL) {
    return;
  }

  try {
    const { sourceLabel, referrerHost } = resolveTrafficSourceLabel(input.attribution ?? {});
    const device =
      input.device === "mobile" || input.device === "tablet" || input.device === "desktop"
        ? input.device
        : detectDeviceType(input.userAgent);

    await analyticsPrisma().create({
      data: {
        type: input.type,
        sessionId: input.sessionId.slice(0, 64),
        path: input.path?.slice(0, 300),
        productId: input.productId?.slice(0, 64),
        productSlug: input.productSlug?.slice(0, 120),
        productName: input.productName?.slice(0, 200),
        referrer: input.attribution?.referrer?.slice(0, 500),
        referrerHost,
        utmSource: input.attribution?.utmSource?.slice(0, 120),
        utmMedium: input.attribution?.utmMedium?.slice(0, 120),
        utmCampaign: input.attribution?.utmCampaign?.slice(0, 200),
        utmContent: input.attribution?.utmContent?.slice(0, 200),
        sourceLabel,
        device
      }
    });
  } catch {
    // analitik sipariş akışını kesmemeli
  }
}
