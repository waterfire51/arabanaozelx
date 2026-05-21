import Link from "next/link";
import { XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ orderNo?: string }>;
};

export default async function PaymentFailPage({ searchParams }: PageProps) {
  const { orderNo } = await searchParams;

  return (
    <div className="site-container py-10">
      <div className="site-card mx-auto max-w-lg p-6 text-center">
        <XCircle size={48} className="mx-auto text-red-600" />
        <h1 className="mt-4 text-xl font-black text-black">Ödeme Tamamlanamadı</h1>
        <p className="mt-2 text-sm text-gray-600">
          İşlem iptal edildi veya banka tarafından onaylanmadı. Tekrar deneyebilir veya kapıda ödeme seçebilirsiniz.
        </p>
        {orderNo ? <p className="mt-3 font-bold text-black">Sipariş No: {orderNo}</p> : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="primary-button">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
