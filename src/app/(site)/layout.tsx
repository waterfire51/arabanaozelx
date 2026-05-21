import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getHomeData();

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="site-shell">{children}</main>
      <SiteFooter />
    </>
  );
}
