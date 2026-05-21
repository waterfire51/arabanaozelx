import { AdminDashboard } from "@/components/admin-dashboard";
import { getAnalyticsDashboard, type DashboardPeriod } from "@/lib/analytics-dashboard";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ days?: string }>;
};

function parsePeriod(raw?: string): DashboardPeriod {
  const value = Number(raw);
  if (value === 7 || value === 90) {
    return value;
  }
  return 30;
}

export default async function AdminDashboardPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const periodDays = parsePeriod(params.days);
  const data = await getAnalyticsDashboard(periodDays);

  return <AdminDashboard data={data} periodDays={periodDays} />;
}
