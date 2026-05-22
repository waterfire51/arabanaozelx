import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteSettingsProvider } from "@/components/site-settings-context";
import { getSiteSettings } from "@/lib/data";
import { resolveSiteBranding, resolveSiteSeo } from "@/lib/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { buildOrganizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const branding = resolveSiteBranding(settings);
  const seo = resolveSiteSeo(settings);
  const base = buildPageMetadata(seo);

  const metadata: Metadata = {
    ...base,
    title: {
      default: settings.defaultMetaTitle,
      template: settings.titleTemplate.includes("%s") ? settings.titleTemplate : `%s | ${settings.siteName}`
    }
  };

  if (branding.faviconUrl) {
    metadata.icons = {
      icon: branding.faviconUrl,
      shortcut: branding.faviconUrl
    };
  }

  if (GOOGLE_SITE_VERIFICATION) {
    metadata.verification = {
      ...metadata.verification,
      google: GOOGLE_SITE_VERIFICATION
    };
  }

  return metadata;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const branding = resolveSiteBranding(settings);
  const organizationJsonLd = buildOrganizationJsonLd(settings);

  return (
    <html lang="tr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {branding.faviconUrl ? <link rel="icon" href={branding.faviconUrl} /> : null}
        {branding.logoUrl ? <link rel="preload" as="image" href={branding.logoUrl} /> : null}
        <link rel="stylesheet" href="/assets/css/vendor.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/plugins.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/inc_all/css/style.css" />
      </head>
      <body>
        <GoogleAnalytics />
        <SiteSettingsProvider branding={branding}>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
