import { NextResponse } from "next/server";
import { analyticsPrisma } from "@/lib/prisma-analytics";
import { detectDeviceType, resolveTrafficSourceLabel } from "@/lib/analytics-traffic";
import { isAnalyticsEventType } from "@/lib/analytics-types";

type IncomingEvent = {
  type: string;
  path?: string;
  productId?: string;
  productSlug?: string;
  productName?: string;
};

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const body = await request.json();
    const sessionId = String(body.sessionId || "").slice(0, 64);
    if (!sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const events: IncomingEvent[] = Array.isArray(body.events) ? body.events.slice(0, 20) : [];
    if (!events.length) {
      return NextResponse.json({ ok: true });
    }

    const attribution = body.attribution ?? {};
    const { sourceLabel, referrerHost } = resolveTrafficSourceLabel({
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      referrer: attribution.referrer
    });

    const headerUa = request.headers.get("user-agent");
    const device =
      body.device === "mobile" || body.device === "tablet" || body.device === "desktop"
        ? body.device
        : detectDeviceType(headerUa);

    const referrer = typeof attribution.referrer === "string" ? attribution.referrer.slice(0, 500) : null;

    await analyticsPrisma().createMany({
      data: events
        .filter((event) => isAnalyticsEventType(event.type))
        .map((event) => ({
          type: event.type,
          sessionId,
          path: event.path ? String(event.path).slice(0, 300) : null,
          productId: event.productId ? String(event.productId).slice(0, 64) : null,
          productSlug: event.productSlug ? String(event.productSlug).slice(0, 120) : null,
          productName: event.productName ? String(event.productName).slice(0, 200) : null,
          referrer,
          referrerHost,
          utmSource: attribution.utmSource ? String(attribution.utmSource).slice(0, 120) : null,
          utmMedium: attribution.utmMedium ? String(attribution.utmMedium).slice(0, 120) : null,
          utmCampaign: attribution.utmCampaign ? String(attribution.utmCampaign).slice(0, 200) : null,
          utmContent: attribution.utmContent ? String(attribution.utmContent).slice(0, 200) : null,
          sourceLabel,
          device
        }))
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
