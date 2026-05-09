import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Users, Sparkles } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { blockedDates, WHATSAPP } from "@/data/villa";

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
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Reserve</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Pick your weekend.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Calendar synced with Airbnb. Tap a check-in then a check-out date to lock in your escape.
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
            <p className="mt-3 text-center text-xs text-muted-foreground">Instant reply · Cancellation up to 7 days</p>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Booking;