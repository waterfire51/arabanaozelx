import { prisma } from "@/lib/prisma";
import { analyticsPrisma } from "@/lib/prisma-analytics";
import { DEVICE_LABELS, EVENT_LABELS } from "@/lib/analytics-traffic";
import type { AnalyticsEventType } from "@/lib/analytics-types";

export type DashboardPeriod = 7 | 30 | 90;

export type AnalyticsDashboardData = {
  periodDays: DashboardPeriod;
  from: string;
  to: string;
  ready: boolean;
  message?: string;
  visitors: number;
  pageViews: number;
  productViews: number;
  cartAdds: number;
  checkoutStarts: number;
  paymentStarts: number;
  ordersComplete: number;
  conversionRate: number;
  funnel: Array<{ key: AnalyticsEventType; label: string; sessions: number; events: number }>;
  topProducts: Array<{ slug: string; name: string; views: number; cartAdds: number; checkouts: number }>;
  trafficSources: Array<{ label: string; host?: string; sessions: number; share: number }>;
  referrers: Array<{ host: string; sessions: number }>;
  devices: Array<{ device: string; label: string; sessions: number; share: number }>;
  topPages: Array<{ path: string; views: number }>;
  recentActivity: Array<{ type: string; label: string; detail: string; at: string }>;
  contentCounts: {
    products: number;
    orders: number;
    pages: number;
    slides: number;
    blogPosts: number;
    galleryImages: number;
  };
};

const FUNNEL_TYPES: AnalyticsEventType[] = [
  "PAGE_VIEW",
  "PRODUCT_VIEW",
  "ADD_TO_CART",
  "CHECKOUT_START",
  "ORDER_COMPLETE"
];

function periodStart(days: DashboardPeriod) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

function pct(part: number, total: number) {
  if (!total) {
    return 0;
  }
  return Math.round((part / total) * 1000) / 10;
}

function emptyDashboard(periodDays: DashboardPeriod, message?: string): AnalyticsDashboardData {
  const from = periodStart(periodDays);
  return {
    periodDays,
    from: from.toISOString(),
    to: new Date().toISOString(),
    ready: false,
    message,
    visitors: 0,
    pageViews: 0,
    productViews: 0,
    cartAdds: 0,
    checkoutStarts: 0,
    paymentStarts: 0,
    ordersComplete: 0,
    conversionRate: 0,
    funnel: FUNNEL_TYPES.map((key) => ({
      key,
      label: EVENT_LABELS[key] ?? key,
      sessions: 0,
      events: 0
    })),
    topProducts: [],
    trafficSources: [],
    referrers: [],
    devices: [],
    topPages: [],
    recentActivity: [],
    contentCounts: { products: 0, orders: 0, pages: 0, slides: 0, blogPosts: 0, galleryImages: 0 }
  };
}

export async function getAnalyticsDashboard(periodDays: DashboardPeriod = 30): Promise<AnalyticsDashboardData> {
  if (!process.env.DATABASE_URL) {
    return emptyDashboard(periodDays, "PostgreSQL bağlantısı yok. Analitik verileri kaydedilemiyor.");
  }

  const from = periodStart(periodDays);
  const to = new Date();

  try {
    const where = { createdAt: { gte: from } };

    const [
      events,
      contentCounts,
      recentRows
    ] = await Promise.all([
      analyticsPrisma().findMany({
        where,
        select: {
          type: true,
          sessionId: true,
          path: true,
          productSlug: true,
          productName: true,
          sourceLabel: true,
          referrerHost: true,
          device: true,
          createdAt: true
        },
        orderBy: { createdAt: "desc" },
        take: 50000
      }) as Promise<
        Array<{
          type: AnalyticsEventType;
          sessionId: string;
          path: string | null;
          productSlug: string | null;
          productName: string | null;
          sourceLabel: string | null;
          referrerHost: string | null;
          device: string | null;
          createdAt: Date;
        }>
      >,
      Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.page.count(),
        prisma.heroSlide.count(),
        prisma.blogPost.count(),
        prisma.galleryImage.count()
      ]).then(([products, orders, pages, slides, blogPosts, galleryImages]) => ({
        products,
        orders,
        pages,
        slides,
        blogPosts,
        galleryImages
      })),
      analyticsPrisma().findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 12,
        select: {
          type: true,
          productName: true,
          productSlug: true,
          path: true,
          sourceLabel: true,
          device: true,
          createdAt: true
        }
      }) as Promise<
        Array<{
          type: AnalyticsEventType;
          productName: string | null;
          productSlug: string | null;
          path: string | null;
          sourceLabel: string | null;
          device: string | null;
          createdAt: Date;
        }>
      >
    ]);

    const sessionIds = new Set<string>();
    const sessionsByType = new Map<AnalyticsEventType, Set<string>>();
    const countByType = new Map<AnalyticsEventType, number>();

    for (const type of FUNNEL_TYPES) {
      sessionsByType.set(type, new Set());
      countByType.set(type, 0);
    }
    countByType.set("PAYMENT_START", 0);
    sessionsByType.set("PAYMENT_START", new Set());

    const productMap = new Map<
      string,
      { slug: string; name: string; views: number; cartAdds: number; checkouts: number }
    >();
    const sourceSessions = new Map<string, { label: string; host?: string; sessions: Set<string> }>();
    const referrerSessions = new Map<string, Set<string>>();
    const deviceSessions = new Map<string, Set<string>>();
    const pageViews = new Map<string, number>();

    for (const event of events) {
      sessionIds.add(event.sessionId);

      const typeCount = (countByType.get(event.type) ?? 0) + 1;
      countByType.set(event.type, typeCount);

      const typeSessions = sessionsByType.get(event.type) ?? new Set();
      typeSessions.add(event.sessionId);
      sessionsByType.set(event.type, typeSessions);

      if (event.path && event.type === "PAGE_VIEW") {
        pageViews.set(event.path, (pageViews.get(event.path) ?? 0) + 1);
      }

      if (event.productSlug) {
        const key = event.productSlug;
        const row = productMap.get(key) ?? {
          slug: key,
          name: event.productName || key,
          views: 0,
          cartAdds: 0,
          checkouts: 0
        };
        const name = event.productName || row.name;
        if (event.type === "PRODUCT_VIEW") {
          productMap.set(key, { ...row, name, views: row.views + 1 });
        } else if (event.type === "ADD_TO_CART") {
          productMap.set(key, { ...row, name, cartAdds: row.cartAdds + 1 });
        } else if (event.type === "CHECKOUT_START" || event.type === "ORDER_COMPLETE") {
          productMap.set(key, { ...row, name, checkouts: row.checkouts + 1 });
        } else {
          productMap.set(key, { ...row, name });
        }
      }

      if (event.sourceLabel) {
        const srcKey = event.sourceLabel;
        const existing = sourceSessions.get(srcKey);
        if (existing) {
          existing.sessions.add(event.sessionId);
        } else {
          sourceSessions.set(srcKey, {
            label: event.sourceLabel,
            host: event.referrerHost ?? undefined,
            sessions: new Set([event.sessionId])
          });
        }
      }

      if (event.referrerHost) {
        const refSet = referrerSessions.get(event.referrerHost) ?? new Set<string>();
        refSet.add(event.sessionId);
        referrerSessions.set(event.referrerHost, refSet);
      }

      if (event.device) {
        const devSet = deviceSessions.get(event.device) ?? new Set<string>();
        devSet.add(event.sessionId);
        deviceSessions.set(event.device, devSet);
      }
    }

    const visitors = sessionIds.size;
    const checkoutSessions = sessionsByType.get("CHECKOUT_START")?.size ?? 0;
    const orderSessions = sessionsByType.get("ORDER_COMPLETE")?.size ?? 0;

    const trafficSources = [...sourceSessions.values()]
      .map((item) => ({
        label: item.label,
        host: item.host,
        sessions: item.sessions.size,
        share: pct(item.sessions.size, visitors)
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 12);

    const referrers = [...referrerSessions.entries()]
      .map(([host, sessions]) => ({ host, sessions: sessions.size }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 8);

    const devices = [...deviceSessions.entries()]
      .map(([device, sessions]) => ({
        device,
        label: DEVICE_LABELS[device] ?? device,
        sessions: sessions.size,
        share: pct(sessions.size, visitors)
      }))
      .sort((a, b) => b.sessions - a.sessions);

    const topProducts = [...productMap.values()]
      .sort((a, b) => b.views - a.views || b.cartAdds - a.cartAdds)
      .slice(0, 10);

    const topPages = [...pageViews.entries()]
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    const funnel = FUNNEL_TYPES.map((key) => ({
      key,
      label: EVENT_LABELS[key] ?? key,
      sessions: sessionsByType.get(key)?.size ?? 0,
      events: countByType.get(key) ?? 0
    }));

    const recentActivity = recentRows.map((row) => {
      const label = EVENT_LABELS[row.type] ?? row.type;
      const detail = row.productName
        ? row.productName
        : row.path
          ? row.path
          : row.sourceLabel ?? "";
      return {
        type: row.type,
        label,
        detail: [detail, row.sourceLabel, row.device ? DEVICE_LABELS[row.device] : ""].filter(Boolean).join(" · "),
        at: row.createdAt.toISOString()
      };
    });

    return {
      periodDays,
      from: from.toISOString(),
      to: to.toISOString(),
      ready: true,
      visitors,
      pageViews: countByType.get("PAGE_VIEW") ?? 0,
      productViews: countByType.get("PRODUCT_VIEW") ?? 0,
      cartAdds: countByType.get("ADD_TO_CART") ?? 0,
      checkoutStarts: countByType.get("CHECKOUT_START") ?? 0,
      paymentStarts: countByType.get("PAYMENT_START") ?? 0,
      ordersComplete: countByType.get("ORDER_COMPLETE") ?? 0,
      conversionRate: pct(orderSessions, visitors),
      funnel,
      topProducts,
      trafficSources,
      referrers,
      devices,
      topPages,
      recentActivity,
      contentCounts
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("AnalyticsEvent")
        ? "Analitik tablosu henüz yok. Sunucuda `npx prisma migrate deploy` çalıştırın."
        : "Analitik verileri yüklenemedi.";
    return emptyDashboard(periodDays, message);
  }
}
