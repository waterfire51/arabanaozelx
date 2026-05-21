import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ORDER_TRACK_PAGE_PATH } from "@/lib/order-track-url";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ orderNo?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { orderNo } = await searchParams;

  return (
    <div className="site-container py-10">
      <div className="site-card mx-auto max-w-lg p-6 text-center">
        <CheckCircle size={48} className="mx-auto text-green-600" />
        <h1 className="mt-4 text-xl font-black text-black">Ödeme İşlemi Tamamlandı</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ödemeniz PayTR üzerinden alındı. Sipariş onayı birkaç saniye içinde sistemimize düşer.
        </p>
        {orderNo ? <p className="mt-3 font-bold text-black">Sipariş No: {orderNo}</p> : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={ORDER_TRACK_PAGE_PATH} className="primary-button">
            Sipariş Takip
          </Link>
          <Link href="/" className="secondary-button">
            Anasayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
