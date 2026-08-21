import Link from "next/link";
import { Box, FileText, ImageIcon, Images, LayoutDashboard, LogOut, Newspaper, Settings, Shapes, ShoppingBag, Tags } from "lucide-react";
import { logout } from "@/app/admin/login/actions";
import { getSiteSettings } from "@/lib/data";
import { brandingAssetUrl, resolveSiteBranding } from "@/lib/site-settings";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Ürünler", icon: Box },
  { href: "/admin/categories", label: "Kategoriler / Menü", icon: Tags },
  { href: "/admin/slides", label: "Anasayfa", icon: Images },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/gallery", label: "Galeri", icon: ImageIcon },
  { href: "/admin/settings", label: "Site Ayarları", icon: Settings },
  { href: "/admin/icons", label: "Şekiller / İkonlar", icon: Shapes },
  { href: "/admin/orders", label: "Siparişler", icon: ShoppingBag },
  { href: "/admin/pages", label: "Diğer Sayfalar", icon: FileText }
];

export async function AdminNav() {
  const settings = await getSiteSettings();
  const { logoUrl, siteName } = resolveSiteBranding(settings);

  return (
    <aside className="border-r border-gray-200 bg-white p-4 md:min-h-screen md:w-64">
      <Link href="/" className="mb-6 flex items-center gap-3">
        {logoUrl ? (
          <img src={logoUrl} alt={siteName} className="h-10 w-auto max-w-[120px] object-contain" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ee3625] text-sm font-black text-white">
            AÖ
          </span>
        )}
        <span className="font-black text-black">{siteName}</span>
      </Link>

      <nav className="grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-lg px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100">
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logout} className="mt-6">
        <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100">
          <LogOut size={18} />
          Çıkış
        </button>
      </form>
    </aside>
  );
}
