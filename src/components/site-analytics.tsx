"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  captureAttributionFromUrl,
  getAnalyticsSessionId,
  trackAnalytics
} from "@/lib/analytics-track-client";

export function SiteAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    captureAttributionFromUrl();
    getAnalyticsSessionId();
  }, []);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) {
      return;
    }

    if (lastPath.current === pathname) {
      return;
    }
    lastPath.current = pathname;

    trackAnalytics("PAGE_VIEW", { path: pathname });
  }, [pathname]);

  return null;
}
