import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "node:crypto";

export const adminCookieName = "arabana_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function adminSessionValue() {
  return createHash("sha256").update(`arabana:${adminPassword()}`).digest("hex");
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === adminSessionValue();
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
