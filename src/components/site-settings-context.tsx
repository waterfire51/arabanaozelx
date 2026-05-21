"use client";

import { createContext, useContext } from "react";
import type { SiteBranding } from "@/lib/site-settings";
import { emptySiteBranding } from "@/lib/site-settings";

const SiteBrandingContext = createContext<SiteBranding>(emptySiteBranding);

export function SiteSettingsProvider({
  branding,
  children
}: {
  branding: SiteBranding;
  children: React.ReactNode;
}) {
  return <SiteBrandingContext.Provider value={branding}>{children}</SiteBrandingContext.Provider>;
}

export function useSiteBranding() {
  return useContext(SiteBrandingContext);
}

/** @deprecated useSiteBranding().settings */
export function useSiteSettings() {
  return useContext(SiteBrandingContext).settings;
}
