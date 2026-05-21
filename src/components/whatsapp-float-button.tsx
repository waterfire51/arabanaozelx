"use client";

import { useSiteBranding } from "@/components/site-settings-context";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/site-settings";

export function WhatsAppFloatButton() {
  const { settings } = useSiteBranding();
  const href = buildWhatsAppUrl(settings.contactWhatsapp);

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="site-whatsapp-float fixed bottom-1/2 left-3 z-[100] hidden h-[60px] w-[60px] place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] md:grid"
      aria-label="WhatsApp ile yazın"
      title="WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
