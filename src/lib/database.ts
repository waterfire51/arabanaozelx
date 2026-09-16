/** Uygulama için PostgreSQL bağlantı dizesi (migrate URL değil) */
export function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim() || process.env.PRISMA_DATABASE_URL?.trim() || "";
  return url;
}

export function hasDatabaseUrl() {
  return Boolean(getDatabaseUrl());
}

/** Vercel/serverless: instance başına tek bağlantı */
export function prismaDatasourceUrl() {
  const base = getDatabaseUrl();
  if (!base) {
    return base;
  }

  try {
    const url = new URL(base);
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
    const isSupabasePooler = url.hostname.endsWith(".pooler.supabase.com");

    // Supabase'in transaction pooler'ı serverless çalıştırma modeline daha
    // uygundur. 5432 session pooler, yoğun Next.js prefetch trafiğinde tek
    // bağlantıyı kolayca kilitliyordu.
    if (isSupabasePooler) {
      url.port = "6543";
      url.searchParams.set("pgbouncer", "true");
    }

    if (isServerless || isSupabasePooler) {
      url.searchParams.set("connection_limit", "5");
      url.searchParams.set("pool_timeout", "10");
    }

    return url.toString();
  } catch {
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
    if (!isServerless) return base;
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}connection_limit=5&pool_timeout=10`;
  }
}

export type DbFallbackReason = "missing_url" | "connection_error";

export function describeDbFallback(reason: DbFallbackReason, error?: unknown) {
  if (reason === "missing_url") {
    return {
      title: "PostgreSQL bağlantısı tanımlı değil",
      detail:
        "Yerelde .env veya .env.local içine DATABASE_URL ekleyin. Canlıda (Vercel) Project → Settings → Environment Variables bölümüne Prisma Postgres **uygulama** bağlantı dizesini yapıştırın (migrate URL değil)."
    };
  }

  const message = error instanceof Error ? error.message : String(error ?? "");
  const tooMany =
    /too many connections/i.test(message) || /prisma_migration/i.test(message);

  if (tooMany) {
    return {
      title: "Veritabanı bağlantı limiti aşıldı",
      detail:
        "DATABASE_URL büyük ihtimalle Prisma **migrate** bağlantısı. Prisma Console → projeniz → Connect → **uygulama / pooled** URL’yi kopyalayıp .env ve Vercel’e yapıştırın. Yerelde `npm run dev` kapatıp `npx prisma migrate deploy` çalıştırın."
    };
  }

  return {
    title: "PostgreSQL bağlantısı kurulamadı",
    detail:
      "Bağlantı dizesini ve Prisma migrate durumunu kontrol edin. Geliştirme ortamında sunucu konsolunda ayrıntılı hata görünür."
  };
}
