import { SiteAnalytics } from "@/components/site-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InitialSiteLoader } from "@/components/initial-site-loader";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getHomeData();

  return (
    <>
      <InitialSiteLoader />
      <SiteAnalytics />
      <SiteHeader categories={categories} />
      <main className="site-shell">{children}</main>
      <SiteFooter />
    </>
  );
}
