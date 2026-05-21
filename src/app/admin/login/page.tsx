import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { resolveSiteBranding } from "@/lib/site-settings";
import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const { logoUrl, siteName } = resolveSiteBranding(await getSiteSettings());

  return (
    <main className="admin-surface flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <form
        action={login}
        className="w-full max-w-[400px] rounded-2xl border border-[#e2e5eb] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} className="mb-5 max-h-14 w-auto max-w-[200px] object-contain" />
          ) : (
            <p className="mb-5 text-xl font-black text-black">{siteName}</p>
          )}
          <h1 className="text-2xl font-black tracking-tight text-black">Yönetim Paneli</h1>
          <p className="mt-2 text-sm text-[#5c6370]">Devam etmek için yönetici şifrenizi girin.</p>
        </div>

        {error ? (
          <div
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            role="alert"
          >
            Girdiğiniz şifre doğru değil. Lütfen tekrar deneyin.
          </div>
        ) : null}

        <label className="block">
          <span className="form-label">Şifre</span>
          <input
            name="password"
            type="password"
            className="form-input"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="primary-button mt-6 w-full">
          Giriş Yap
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[#6b7280]">
        <Link href="/" className="font-semibold text-[#171717] underline-offset-2 hover:underline">
          Mağazaya dön
        </Link>
      </p>
    </main>
  );
}
