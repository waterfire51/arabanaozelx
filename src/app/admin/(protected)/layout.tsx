import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <main className="admin-surface min-h-screen md:flex">
      <AdminNav />
      <section className="flex-1 p-4 md:p-8">{children}</section>
    </main>
  );
}
