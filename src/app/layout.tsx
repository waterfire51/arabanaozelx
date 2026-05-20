import type { Metadata } from "next";
import { assetPath } from "@/lib/assets";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Arabana Özel | Kişiye Özel Oto Aksesuar",
    template: "%s | Arabana Özel"
  },
  description: "Kişiye özel oto plakalık, anahtarlık, araç içi aksesuar ve sipariş yönetimi."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href={assetPath("site_gorsel/ddark.png")} />
        <link rel="stylesheet" href="/assets/css/vendor.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/plugins.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/inc_all/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
