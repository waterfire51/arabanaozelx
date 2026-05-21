import type { Metadata } from "next";
import { SiteSettingsProvider } from "@/components/site-settings-context";
import { getSiteSettings } from "@/lib/data";
import { resolveSiteBranding, resolveSiteSeo } from "@/lib/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import "./globals.css";

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

  return metadata;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const branding = resolveSiteBranding(settings);

  return (
    <html lang="tr">
      <head>
        {branding.faviconUrl ? <link rel="icon" href={branding.faviconUrl} /> : null}
        {branding.logoUrl ? <link rel="preload" as="image" href={branding.logoUrl} /> : null}
        <link rel="stylesheet" href="/assets/css/vendor.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/plugins.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/inc_all/css/style.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Playfair+Display:wght@700&family=Sonsie+One&family=Sigmar&display=swap"
        />
      </head>
      <body>
        <SiteSettingsProvider branding={branding}>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
