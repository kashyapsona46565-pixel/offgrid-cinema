import { Phone, MessageCircle, MapPin } from "lucide-react";
import { PHONE, WHATSAPP, MAPS_URL } from "@/data/villa";

export const MobileBar = () => (
  <>
    {/* Floating WhatsApp (all screens) */}
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-110 md:grid"
    >
      <MessageCircle className="h-6 w-6" />
    </a>

    {/* Sticky bottom bar — mobile only */}
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1 p-2">
        <a
          href={`tel:${PHONE}`}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <Phone className="h-5 w-5 text-primary" />
          Call
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-primary-gradient py-2.5 text-xs font-semibold text-primary-foreground shadow-warm"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <MapPin className="h-5 w-5 text-primary" />
          Directions
        </a>
      </div>
    </div>
  </>
);

export default MobileBar;