import Link from "next/link";
import { Box, FileText, LayoutDashboard, LogOut, ShoppingBag } from "lucide-react";
import { logout } from "@/app/admin/login/actions";

const links = [
  { href: "/admin", label: "Özet", icon: LayoutDashboard },
  { href: "/admin/products", label: "Ürünler", icon: Box },
  { href: "/admin/orders", label: "Siparişler", icon: ShoppingBag },
  { href: "/admin/pages", label: "Sayfalar", icon: FileText }
];

export function AdminNav() {
  return (
    <aside className="border-r border-gray-200 bg-white p-4 md:min-h-screen md:w-64">
      <Link href="/" className="mb-6 flex items-center gap-3">
        <img src="/assets/img/ddark.png" alt="" className="h-10 w-10 object-contain" />
        <span className="font-black text-black">Arabana Özel</span>
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
