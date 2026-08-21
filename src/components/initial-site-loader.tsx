"use client";

import { useEffect, useState } from "react";
import { useSiteBranding } from "@/components/site-settings-context";

export function InitialSiteLoader() {
  const [visible, setVisible] = useState(true);
  const { logoUrl, siteName } = useSiteBranding();

  useEffect(() => {
    const startedAt = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      const remaining = Math.max(0, 350 - (performance.now() - startedAt));
      timer = setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      timer = setTimeout(() => setVisible(false), 4000);
    }

    return () => {
      window.removeEventListener("load", finish);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="initial-site-loader" role="status" aria-label="Site yükleniyor">
      {logoUrl ? <img src={logoUrl} alt={siteName} className="initial-site-loader-logo" /> : <strong>{siteName}</strong>}
      <span className="initial-site-loader-spinner" aria-hidden="true" />
      <span className="text-sm font-semibold text-gray-600">Site hazırlanıyor…</span>
    </div>
  );
}
