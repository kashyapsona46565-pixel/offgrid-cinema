import { useMemo, useState } from "react";
import {
  ChevronLeft, ChevronRight, Users, Sparkles, LogIn, LogOut, IdCard,
  CreditCard, CalendarX, Utensils, ShoppingBag, ChefHat, Phone, MessageCircle,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { blockedDates, WHATSAPP, PHONE } from "@/data/villa";

const fmt = (d: Date) => d.toISOString().slice(0, 10);
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const Booking = () => {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const days = useMemo(() => {
    const out: (Date | null)[] = [];
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const startPad = first.getDay();
    for (let i = 0; i < startPad; i++) out.push(null);
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= last; d++) out.push(new Date(month.getFullYear(), month.getMonth(), d));
    return out;
  }, [month]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBlocked = (d: Date) => blockedDates.includes(fmt(d));
  const isPast = (d: Date) => d < today;

  const onPick = (d: Date) => {
    if (isPast(d) || isBlocked(d)) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(d);
      setCheckOut(null);
    } else if (d > checkIn) {
      setCheckOut(d);
    } else {
      setCheckIn(d);
    }
  };

  const inRange = (d: Date) => checkIn && checkOut && d > checkIn && d < checkOut;

  const nights = checkIn && checkOut ? Math.round((+checkOut - +checkIn) / (1000 * 60 * 60 * 24)) : 0;
  const nightly = 12500;
  const cleaning = 1500;
  const total = nights * nightly + (nights ? cleaning : 0);

  const buildWa = () => {
    const ci = checkIn ? fmt(checkIn) : "—";
    const co = checkOut ? fmt(checkOut) : "—";
    const msg = `Hi! I'd like to book Off The Grid villa.%0ACheck-in: ${ci}%0ACheck-out: ${co}%0AGuests: ${guests}%0AEstimate: ₹${total}`;
    return `https://wa.me/919999999999?text=${msg}`;
  };

  return (
    <Layout>
      <section className="pt-40 pb-12 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Booking</div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">Check dates & confirm via WhatsApp.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tap a check-in then a check-out date. We'll confirm availability on WhatsApp or call.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-32 lg:grid-cols-[1.4fr_1fr]">
        {/* Calendar */}
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="font-display text-2xl">
                {month.toLocaleString("en", { month: "long", year: "numeric" })}
              </div>
              <button
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-wider text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="py-2">{d}</div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {days.map((d, i) => {
                if (!d) return <div key={i} />;
                const blocked = isBlocked(d);
                const past = isPast(d);
                const sel = (checkIn && isSameDay(d, checkIn)) || (checkOut && isSameDay(d, checkOut));
                const range = inRange(d);
                return (
                  <button
                    key={i}
                    disabled={blocked || past}
                    onClick={() => onPick(d)}
                    className={[
                      "relative aspect-square rounded-xl text-sm transition-all",
                      past && "text-muted-foreground/30 cursor-not-allowed line-through",
                      blocked && "bg-destructive/10 text-destructive/60 cursor-not-allowed line-through",
                      !blocked && !past && !sel && !range && "hover:bg-primary/15 hover:text-primary",
                      sel && "bg-primary-gradient text-primary-foreground shadow-warm font-semibold",
                      range && "bg-primary/15 text-primary",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary-gradient" /> Selected</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary/15" /> In stay</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-destructive/30" /> Blocked</div>
            </div>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal delay={0.1}>
          <div className="sticky top-28 glass rounded-3xl p-8 shadow-card">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Estimate
            </div>
            <div className="mt-4 font-display text-4xl">
              ₹{nightly.toLocaleString()} <span className="text-base font-sans text-muted-foreground">/ night</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border p-4">
                <div className="text-xs uppercase text-muted-foreground">Check-in</div>
                <div className="mt-1 font-medium">{checkIn ? checkIn.toDateString() : "—"}</div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="text-xs uppercase text-muted-foreground">Check-out</div>
                <div className="mt-1 font-medium">{checkOut ? checkOut.toDateString() : "—"}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl border border-border p-4">
              <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-primary" /> Guests</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="h-8 w-8 rounded-full border border-border hover:border-primary">−</button>
                <span className="w-6 text-center font-medium">{guests}</span>
                <button onClick={() => setGuests(Math.min(8, guests + 1))} className="h-8 w-8 rounded-full border border-border hover:border-primary">+</button>
              </div>
            </div>

            {nights > 0 && (
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>₹{nightly.toLocaleString()} × {nights} nights</span><span>₹{(nightly * nights).toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Cleaning</span><span>₹{cleaning.toLocaleString()}</span></div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <a
              href={buildWa()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-primary-gradient py-4 text-center font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.02]"
            >
              Book via WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="mt-2 block w-full rounded-full border-2 border-primary py-3.5 text-center text-sm font-semibold text-primary hover:bg-primary/5">
              Or Call Now
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">Free cancellation up to 7 days</p>
          </div>
        </Reveal>
      </section>

      {/* BOOKING INFO CARDS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">Booking information</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to know before you arrive.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: LogIn, t: "Check-in", d: "1:00 PM – 9:00 PM. Self check-in." },
            { i: LogOut, t: "Check-out", d: "By 11:00 AM." },
            { i: Users, t: "Max guests", d: "10 guests maximum." },
            { i: CreditCard, t: "Refundable deposit", d: "₹7,000 before check-in. Returned in full if there's no damage. Cash or digital (refunded 1–4 hrs after checkout)." },
            { i: IdCard, t: "ID requirement", d: "Photo with Address ID — Driving Licence or Aadhar. International guests must share passport copies." },
            { i: CalendarX, t: "Cancellation policy", d: "100% refund 7+ days before · 50% between 7–4 days · 0% within 3 days of check-in." },
          ].map((c) => (
            <Reveal key={c.t}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-warm">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <c.i className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-xl">{c.t}</div>
                <p className="mt-2 text-sm text-foreground/80">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOD & MEALS */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">Food & meals</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              We don't cook meals as part of the booking. The kitchen is functional — basic utensils,
              fridge and stove. Pick whatever works for you.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { i: ChefHat, t: "Cook your own", d: "Carry groceries or heat & eat. Bone-china crockery and basic utensils provided. No condiments." },
              { i: ShoppingBag, t: "Order in", d: "Zomato delivers across Lonavala. Several dhabas to 5-star restaurants close by." },
              { i: Utensils, t: "Caretaker cooking (optional)", d: "Our caretaker offers cooking on her own charges, based on group size. Arrange with her directly." },
            ].map((c) => (
              <Reveal key={c.t}>
                <div className="h-full rounded-3xl border border-border bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary/15 text-secondary">
                    <c.i className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-display text-xl">{c.t}</div>
                  <p className="mt-2 text-sm text-foreground/80">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE RULES + FAQ */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">House rules</h2>
          <ul className="mt-6 space-y-3 text-sm text-foreground/80">
            {[
              "No parties or loud music",
              "No commercial shoots or events",
              "Birthday celebrations — please get in touch before booking",
              "No pets allowed",
              "Damages are chargeable",
            ].map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">FAQs</h2>
          <div className="mt-6 space-y-3">
            {[
              { q: "Is BBQ coal included?", a: "BBQ grill and skewers are free. Coal is chargeable on site." },
              { q: "Is sheesha provided?", a: "Free sheesha with natural coal. Please carry your own flavours." },
              { q: "Is parking available?", a: "Yes — free parking on premises and free on-street parking." },
              { q: "How far is the railway station?", a: "About 7–10 minutes by car. Expressway exit is 2 minutes." },
              { q: "Can I check in early or drop luggage?", a: "Yes, luggage drop-off is allowed if you arrive early or depart late." },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-foreground/80">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Still have questions?</h2>
          <p className="text-muted-foreground">Call or WhatsApp — we'll get back to you in minutes.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;