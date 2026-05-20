import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="admin-surface grid min-h-screen place-items-center p-6">
      <form action={login} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <img src="/assets/img/logo.png" alt="Otodark" className="mx-auto mb-6 max-w-[180px]" />
        <h1 className="text-xl font-black text-black">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-gray-600">Ürün, sayfa ve sipariş yönetimi.</p>
        {error ? <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">Şifre hatalı.</div> : null}
        <label className="mt-5 block">
          <span className="form-label">Şifre</span>
          <input name="password" type="password" className="form-input" required autoFocus />
        </label>
        <button type="submit" className="primary-button mt-5 w-full">
          Giriş Yap
        </button>
        <p className="mt-4 text-xs text-gray-500">Varsayılan geliştirme şifresi: admin123. Canlıda .env içinden ADMIN_PASSWORD değiştirilmeli.</p>
      </form>
    </main>
  );
}
