import { Suspense } from "react";
import { TrackOrder } from "./track-order";

export function TrackOrderSection() {
  return (
    <Suspense fallback={<p className="mt-6 text-sm text-gray-500">Sipariş sorgulama yükleniyor...</p>}>
      <TrackOrder />
    </Suspense>
  );
}
