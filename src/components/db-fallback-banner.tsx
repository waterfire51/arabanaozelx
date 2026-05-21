import type { DbFallbackReason } from "@/lib/database";
import { describeDbFallback } from "@/lib/database";

export function DbFallbackBanner({ reason }: { reason: DbFallbackReason }) {
  const { title, detail } = describeDbFallback(reason);

  return (
    <div className="site-container mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
      <p className="font-bold">{title}</p>
      <p className="mt-1 font-medium leading-relaxed">{detail}</p>
      <p className="mt-2 text-xs text-amber-800/90">Sayfa geçici olarak seed (örnek) verisiyle gösteriliyor.</p>
    </div>
  );
}
