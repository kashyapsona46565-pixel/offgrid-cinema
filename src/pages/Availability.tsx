import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Phone, MessageCircle, RefreshCw } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import BookingWarning from "@/components/site/BookingWarning";
import { propertyList, PHONE, buildWhatsApp, Property, CALL_HOURS, WHATSAPP_HOURS } from "@/data/villa";
import { fetchICalBlocked } from "@/lib/ical";

const fmt = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const PropertyCalendar = ({ property }: { property: Property }) => {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [blocked, setBlocked] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error" | "none">(
    property.icalUrl ? "loading" : "none"
  );

  useEffect(() => {
    if (!property.icalUrl) return;
    let cancelled = false;
    setStatus("loading");
    fetchICalBlocked(property.icalUrl)
      .then((dates) => {
        if (cancelled) return;
        setBlocked(dates);
        setStatus("ok");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [property.icalUrl]);

  const days = useMemo(() => {
    const out: (Date | null)[] = [];
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    for (let i = 0; i < first.getDay(); i++) out.push(null);
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= last; d++) out.push(new Date(month.getFullYear(), month.getMonth(), d));
    return out;
  }, [month]);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const isBlocked = (d: Date) => blocked.includes(fmt(d));
  const isPast = (d: Date) => d < today;

  const wa = buildWhatsApp(property.name, "Please share availability for the dates I'm checking.");

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-warm md:p-8">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">{property.shortName}</div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-display text-lg">
          {month.toLocaleString("en", { month: "long", year: "numeric" })}
        </div>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const past = isPast(d);
          const blk = isBlocked(d);
          return (
            <div
              key={i}
              className={[
                "relative aspect-square rounded-lg text-sm grid place-items-center",
                past && "text-muted-foreground/30 line-through",
                blk && "bg-red-100 text-red-500 line-through",
                !past && !blk && "bg-muted/40 text-foreground/80 hover:bg-primary/10",
              ].filter(Boolean).join(" ")}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-muted" /> Available</div>
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-red-200" /> Booked</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <a href={wa} target="_blank" rel="noreferrer"
           className="flex items-center justify-center gap-2 rounded-full bg-primary-gradient py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02]">
          <MessageCircle className="h-4 w-4" /> WhatsApp Us
        </a>
        <a href={`tel:${PHONE}`}
           className="flex items-center justify-center gap-2 rounded-full border-2 border-primary py-3 text-sm font-semibold text-primary hover:bg-primary/5">
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Call: {CALL_HOURS} · WhatsApp: {WHATSAPP_HOURS}
      </p>
    </div>
  );
};

const Availability = () => (
  <Layout>
    <section className="mx-auto max-w-7xl px-4 pt-36 text-center md:px-6 md:pt-40">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Booking & Enquiry</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">For Booking or Enquiry</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Please reach us on WhatsApp or Call for Booking or Enquiry — we'll be happy to confirm your dates.
        </p>
        <div className="mt-5 flex justify-center">
          <BookingWarning />
        </div>
      </Reveal>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:px-6">
      {propertyList.map((p) => (
        <Reveal key={p.id}>
          <PropertyCalendar property={p} />
        </Reveal>
      ))}
    </section>

    <section className="border-t border-border bg-muted/30 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl">We're Here to Help You Plan</h2>
        <p className="max-w-xl text-muted-foreground">
          Please reach us on WhatsApp or Call for Booking or Enquiry — we usually reply quickly.
        </p>
        <p className="text-xs text-muted-foreground">Call: {CALL_HOURS} · WhatsApp: {WHATSAPP_HOURS}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5">
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <a href={buildWhatsApp("Off The Grid Villas")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02]">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Availability;
