"use client";

import type { AnalyticsEventType } from "@/lib/analytics-types";

const SESSION_KEY = "ao_analytics_session";
const ATTR_KEY = "ao_analytics_attribution";

export type TrackProductPayload = {
  productId?: string;
  productSlug?: string;
  productName?: string;
};

export type TrackPayload = TrackProductPayload & {
  path?: string;
};

function randomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function getAnalyticsSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = randomId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function captureAttributionFromUrl() {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const hasUtm =
    params.has("utm_source") ||
    params.has("utm_medium") ||
    params.has("utm_campaign") ||
    params.has("utm_content");

  if (!hasUtm && document.referrer) {
    const existing = sessionStorage.getItem(ATTR_KEY);
    if (existing) {
      return;
    }
  }

  const payload = {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined
  };

  if (payload.utmSource || payload.referrer) {
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(payload));
  }
}

export function getStoredAttribution() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string | undefined>) : {};
  } catch {
    return {};
  }
}

function detectClientDevice(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") {
    return "desktop";
  }

  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|android.*mobile|blackberry|windows phone/.test(ua) || window.innerWidth < 768) {
    return "mobile";
  }
  return "desktop";
}

const queued: Array<{ type: AnalyticsEventType; payload: TrackPayload }> = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleFlush() {
  if (flushTimer) {
    return;
  }
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushEvents();
  }, 400);
}

async function flushEvents() {
  if (!queued.length) {
    return;
  }

  const batch = queued.splice(0, 20);
  const attribution = getStoredAttribution();

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getAnalyticsSessionId(),
        device: detectClientDevice(),
        attribution,
        events: batch.map((item) => ({
          type: item.type,
          path: item.payload.path ?? window.location.pathname,
          productId: item.payload.productId,
          productSlug: item.payload.productSlug,
          productName: item.payload.productName
        }))
      }),
      keepalive: true
    });
  } catch {
    // sessiz — analitik site akışını bozmamalı
  }

  if (queued.length) {
    scheduleFlush();
  }
}

export function trackAnalytics(type: AnalyticsEventType, payload: TrackPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  queued.push({
    type,
    payload: {
      ...payload,
      path: payload.path ?? window.location.pathname
    }
  });
  scheduleFlush();
}
