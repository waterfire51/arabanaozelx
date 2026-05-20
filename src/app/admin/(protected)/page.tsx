import Link from "next/link";
import { Box, Database, FileText, ShoppingBag } from "lucide-react";
import { getAdminSummary } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const summary = await getAdminSummary();
  const cards = [
    { label: "Ürün", value: summary.products, icon: Box, href: "/admin/products" },
    { label: "Sipariş", value: summary.orders, icon: ShoppingBag, href: "/admin/orders" },
    { label: "Sayfa", value: summary.pages, icon: FileText, href: "/admin/pages" }
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black">Yönetim Özeti</h1>
          <p className="text-sm text-gray-600">Site içeriği PostgreSQL + Prisma üzerinden yönetilir.</p>
        </div>
        <Link href="/" className="secondary-button">
          Siteyi Aç
        </Link>
      </div>

      {!summary.dbReady ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          PostgreSQL bağlantısı yok. `.env` içine DATABASE_URL ekleyip `npm run prisma:migrate` ve `npm run prisma:seed` çalıştırınca panel yazılabilir hale gelir.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="rounded-lg bg-white p-5 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-500">{card.label}</span>
                <Icon size={22} className="text-red-600" />
              </div>
              <div className="mt-4 text-3xl font-black text-black">{card.value}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Database className={summary.dbReady ? "text-green-600" : "text-amber-600"} />
          <div>
            <h2 className="font-black text-black">Veritabanı</h2>
            <p className="text-sm text-gray-600">{summary.dbReady ? "Bağlantı hazır." : "Ön izleme modu aktif."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
