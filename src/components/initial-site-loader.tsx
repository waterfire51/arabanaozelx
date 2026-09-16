"use client";

import { useEffect, useState } from "react";
import { useSiteBranding } from "@/components/site-settings-context";

export function InitialSiteLoader() {
  const [visible, setVisible] = useState(true);
  const { logoUrl, siteName } = useSiteBranding();

  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setVisible(false));
    });
    const timer = setTimeout(() => setVisible(false), 800);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
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
