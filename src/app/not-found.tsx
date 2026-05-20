import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f9] p-6">
      <div className="otodark-card max-w-md p-6 text-center">
        <img src="/assets/img/ddark.png" alt="" className="mx-auto mb-4 h-20 w-20 object-contain" />
        <h1 className="text-2xl font-black text-black">Sayfa bulunamadı</h1>
        <p className="mt-2 text-gray-600">Aradığınız ürün veya içerik henüz yönetim panelinde yayınlanmamış olabilir.</p>
        <Link href="/" className="primary-button mt-5">
          Anasayfaya Dön
        </Link>
      </div>
    </main>
  );
}
