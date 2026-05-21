import Link from "next/link";
import {
  ArrowRight,
  Box,
  Eye,
  FileText,
  Globe,
  ImageIcon,
  Images,
  Monitor,
  MousePointerClick,
  Newspaper,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users
} from "lucide-react";
import type { AnalyticsDashboardData } from "@/lib/analytics-dashboard";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatRange(from: string, to: string) {
  const f = new Date(from).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
  const t = new Date(to).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  return `${f} – ${t}`;
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "red"
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: typeof Users;
  accent?: "red" | "blue" | "green" | "amber" | "violet";
}) {
  const accents = {
    red: "bg-red-50 text-red-600",
    blue: "bg-sky-50 text-sky-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600"
  };

  return (
    <div className="rounded-2xl border border-[#e8ebf0] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">{label}</p>
          <p className="mt-2 text-3xl font-black tabular-nums text-[#111]">{value}</p>
          {hint ? <p className="mt-1 text-xs text-[#6b7280]">{hint}</p> : null}
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${accents[accent]}`}>
          <Icon size={22} />
        </span>
      </div>
    </div>
  );
}

function BarRow({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
  const width = max ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-[#1f2937]">{label}</span>
        <span className="shrink-0 tabular-nums text-[#6b7280]">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#eef1f5]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#ee3625] to-[#ff6b4a]" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function buildQuickLinks(counts: AnalyticsDashboardData["contentCounts"]) {
  return [
    { href: "/admin/products", label: "Ürünler", icon: Box, value: counts.products },
    { href: "/admin/orders", label: "Siparişler", icon: ShoppingBag, value: counts.orders },
    { href: "/admin/pages", label: "Sayfalar", icon: FileText, value: counts.pages },
    { href: "/admin/slides", label: "Anasayfa", icon: Images, value: counts.slides },
    { href: "/admin/blog", label: "Blog", icon: Newspaper, value: counts.blogPosts },
    { href: "/admin/gallery", label: "Galeri", icon: ImageIcon, value: counts.galleryImages },
    { href: "/admin/settings", label: "Site Ayarları", icon: Settings, value: "—" as const }
  ];
}

export function AdminDashboard({
  data,
  periodDays
}: {
  data: AnalyticsDashboardData;
  periodDays: number;
}) {
  const maxFunnel = Math.max(...data.funnel.map((f) => f.sessions), 1);
  const maxSource = data.trafficSources[0]?.sessions ?? 1;
  const maxDevice = data.devices[0]?.sessions ?? 1;
  const maxProduct = data.topProducts[0]?.views ?? 1;
  const quickLinks = buildQuickLinks(data.contentCounts);

  const periods = [7, 30, 90] as const;

  return (
    <div className="admin-dashboard space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#ee3625]">Analitik</p>
          <h1 className="mt-1 text-2xl font-black text-[#111] md:text-3xl">Site Performansı</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5c6370]">
            Ziyaretçi, ürün görüntüleme, sepete geçiş ve ödeme hunisi. Reklam linklerinize{" "}
            <code className="rounded bg-[#f3f4f6] px-1.5 py-0.5 text-xs">utm_source</code> parametresi ekleyin
            (ör. Instagram: <code className="rounded bg-[#f3f4f6] px-1 text-xs">?utm_source=instagram&utm_medium=paid</code>
            ).
          </p>
          <p className="mt-1 text-xs text-[#9ca3af]">{formatRange(data.from, data.to)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-[#e2e5eb] bg-white p-1 shadow-sm">
            {periods.map((days) => (
              <Link
                key={days}
                href={`/admin?days=${days}`}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  periodDays === days ? "bg-[#111] text-white" : "text-[#525866] hover:bg-[#f4f5f7]"
                }`}
              >
                {days} gün
              </Link>
            ))}
          </div>
          <Link href="/" className="secondary-button">
            Siteyi Aç
          </Link>
        </div>
      </div>

      {!data.ready && data.message ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {data.message}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Benzersiz ziyaretçi" value={data.visitors} hint="Oturum bazlı" icon={Users} accent="blue" />
        <StatCard label="Sayfa görüntüleme" value={data.pageViews} icon={Eye} accent="violet" />
        <StatCard label="Ürün görüntüleme" value={data.productViews} icon={MousePointerClick} accent="amber" />
        <StatCard
          label="Dönüşüm"
          value={`%${data.conversionRate}`}
          hint={`${data.ordersComplete} tamamlanan sipariş`}
          icon={TrendingUp}
          accent="green"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sepete / siparişe geçiş" value={data.cartAdds} icon={ShoppingCart} />
        <StatCard label="Ödeme adımı" value={data.checkoutStarts} icon={ArrowRight} accent="amber" />
        <StatCard label="Online ödeme ekranı" value={data.paymentStarts} icon={Monitor} accent="violet" />
        <StatCard label="Tamamlanan sipariş" value={data.ordersComplete} icon={ShoppingBag} accent="green" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#111]">
            <TrendingUp size={20} className="text-[#ee3625]" />
            Satış hunisi
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">Ziyaretçiden siparişe benzersiz oturum sayıları</p>
          <div className="mt-6 space-y-4">
            {data.funnel.map((step) => (
              <BarRow
                key={step.key}
                label={step.label}
                value={step.sessions}
                max={maxFunnel}
                suffix={step.events !== step.sessions ? `(${step.events} olay)` : undefined}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#111]">
            <Globe size={20} className="text-[#ee3625]" />
            Trafik kaynakları
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">UTM etiketleri ve yönlendiren site / domain</p>
          <div className="mt-6 space-y-4">
            {data.trafficSources.length ? (
              data.trafficSources.map((source) => (
                <BarRow
                  key={source.label}
                  label={source.host ? `${source.label} (${source.host})` : source.label}
                  value={source.sessions}
                  max={maxSource}
                  suffix={`%${source.share}`}
                />
              ))
            ) : (
              <p className="text-sm text-[#9ca3af]">Bu dönemde kayıtlı trafik kaynağı yok.</p>
            )}
          </div>
          {data.referrers.length ? (
            <div className="mt-6 border-t border-[#eef1f5] pt-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#9ca3af]">Yönlendiren domainler</p>
              <ul className="space-y-2 text-sm">
                {data.referrers.map((ref) => (
                  <li key={ref.host} className="flex justify-between font-medium text-[#374151]">
                    <span>{ref.host}</span>
                    <span className="tabular-nums text-[#6b7280]">{ref.sessions} oturum</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-lg font-black text-[#111]">En çok görüntülenen ürünler</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#eef1f5] text-xs font-bold uppercase tracking-wide text-[#9ca3af]">
                  <th className="pb-3 pr-4">Ürün</th>
                  <th className="pb-3 pr-4 text-right">Görüntüleme</th>
                  <th className="pb-3 pr-4 text-right">Sepet / niyet</th>
                  <th className="pb-3 text-right">Ödeme adımı</th>
                </tr>
              </thead>
              <tbody>
                {data.topProducts.length ? (
                  data.topProducts.map((product) => (
                    <tr key={product.slug} className="border-b border-[#f4f5f7] last:border-0">
                      <td className="py-3 pr-4 font-semibold text-[#111]">{product.name}</td>
                      <td className="py-3 pr-4 text-right tabular-nums">{product.views}</td>
                      <td className="py-3 pr-4 text-right tabular-nums">{product.cartAdds}</td>
                      <td className="py-3 text-right tabular-nums">{product.checkouts}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#9ca3af]">
                      Henüz ürün görüntüleme verisi yok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {data.topProducts.length ? (
            <div className="mt-4 space-y-3 md:hidden">
              {data.topProducts.slice(0, 5).map((product) => (
                <BarRow key={product.slug} label={product.name} value={product.views} max={maxProduct} />
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#111]">
            <Smartphone size={20} className="text-[#ee3625]" />
            Cihaz dağılımı
          </h2>
          <div className="mt-6 space-y-4">
            {data.devices.length ? (
              data.devices.map((item) => (
                <BarRow key={item.device} label={item.label} value={item.sessions} max={maxDevice} suffix={`%${item.share}`} />
              ))
            ) : (
              <p className="text-sm text-[#9ca3af]">Cihaz verisi bekleniyor.</p>
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#111]">Popüler sayfalar</h2>
          <ul className="mt-4 space-y-2">
            {data.topPages.length ? (
              data.topPages.map((page) => (
                <li key={page.path} className="flex items-center justify-between rounded-lg bg-[#f8f9fb] px-3 py-2 text-sm">
                  <span className="font-medium text-[#374151]">{page.path}</span>
                  <span className="tabular-nums font-bold text-[#111]">{page.views}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-[#9ca3af]">Sayfa verisi yok.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#e8ebf0] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#111]">Son aktiviteler</h2>
          <ul className="mt-4 max-h-[280px] space-y-3 overflow-y-auto">
            {data.recentActivity.length ? (
              data.recentActivity.map((item, index) => (
                <li key={`${item.at}-${index}`} className="rounded-lg border border-[#eef1f5] px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#111]">{item.label}</span>
                    <span className="shrink-0 text-xs text-[#9ca3af]">{formatDate(item.at)}</span>
                  </div>
                  {item.detail ? <p className="mt-1 text-xs text-[#6b7280]">{item.detail}</p> : null}
                </li>
              ))
            ) : (
              <li className="text-sm text-[#9ca3af]">Henüz olay kaydı yok. Site trafiği geldikçe dolacaktır.</li>
            )}
          </ul>
        </section>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-[#9ca3af]">İçerik yönetimi</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-[#e8ebf0] bg-white p-4 shadow-sm transition hover:border-[#ee3625]/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6b7280]">{link.label}</span>
                  <Icon size={18} className="text-[#ee3625]" />
                </div>
                <p className="mt-3 text-2xl font-black text-[#111]">{link.value}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
