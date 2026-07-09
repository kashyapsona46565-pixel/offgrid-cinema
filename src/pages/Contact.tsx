import { Phone, MessageCircle, MapPin } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";

import { PHONE, PHONE_DISPLAY, buildWhatsApp, ADDRESS_LINE, MAPS_URL, MAPS_EMBED, CALL_HOURS, WHATSAPP_HOURS } from "@/data/villa";
import { useProperty } from "@/context/PropertyContext";

const Contact = () => {
  const { selected } = useProperty();
  const wa = buildWhatsApp(selected.name);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 pt-36 text-center md:px-6 md:pt-40">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Contact Us</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Please message on WhatsApp for booking or Inquiries.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Call: {CALL_HOURS} · WhatsApp: {WHATSAPP_HOURS}</p>
        </Reveal>
      </section>

      {/* Address + Map */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <Reveal>
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Address</div>
              <div className="mt-1 font-display text-lg">{ADDRESS_LINE}</div>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-primary hover:underline">
                Open in Google Maps →
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              title="Off The Grid Villas location"
              src={MAPS_EMBED}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      {/* Contact cards */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 md:grid-cols-2 md:px-6">
        <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 transition-all hover:shadow-warm">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <MessageCircle className="h-6 w-6" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp · {WHATSAPP_HOURS}</div>
            <div className="font-display text-xl">{PHONE_DISPLAY}</div>
          </div>
        </a>
        <a href={`tel:${PHONE}`} className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 transition-all hover:shadow-warm">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Phone className="h-6 w-6" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Call · {CALL_HOURS}</div>
            <div className="font-display text-xl">{PHONE_DISPLAY}</div>
          </div>
        </a>
      </section>
    </Layout>
  );
};

export default Contact;
