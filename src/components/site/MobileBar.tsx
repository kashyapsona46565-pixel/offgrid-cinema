import { Phone, MessageCircle } from "lucide-react";
import { PHONE, buildWhatsApp } from "@/data/villa";
import { useProperty } from "@/context/PropertyContext";

export const MobileBar = () => {
  const { selected } = useProperty();
  const wa = buildWhatsApp(selected.name);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-primary py-3 text-sm font-semibold text-primary"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary-gradient py-3 text-sm font-semibold text-primary-foreground shadow-warm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
};

export default MobileBar;
