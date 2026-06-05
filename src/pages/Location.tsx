import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { MapPin, Train, Car, ShoppingBag, Utensils, Zap, Mountain } from "lucide-react";
import { MAPS_URL, PHONE, WHATSAPP } from "@/data/villa";

const tips = [
  { i: Train, t: "Railway Station", d: "7–10 minutes from Lonavala railway station." },
  { i: Car, t: "Expressway", d: "2 minutes from the Mumbai–Pune Expressway exit." },
  { i: ShoppingBag, t: "Local Market", d: "Valvan market close by for groceries and BBQ supplies." },
  { i: Utensils, t: "Restaurants", d: "Several options nearby — from 5-stars to dhabas. Zomato delivers across town." },
  { i: Zap, t: "EV Charging", d: "Couple of minutes from Lonavala's electric car charging stations." },
  { i: Mountain, t: "Tourist Spots", d: "Tiger's Leap, Bhushi Dam, Lion's Point — under 30 minutes away." },
];

const Location = () => (
  <Layout>
    <section className="pt-32 pb-10 text-center md:pt-40">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Location</div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl">Lonavala, Maharashtra.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tucked into a quiet society, minutes from the expressway, market & cafes.
        </p>
      </Reveal>
    </section>

    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-border shadow-card">
          <iframe
            title="Off The Grid Lonavala location"
            src="https://maps.google.com/maps?q=Lonavala%2C+Maharashtra&z=13&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>

    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-3">
      {tips.map((tp, i) => (
        <Reveal key={tp.t} delay={i * 0.05}>
          <div className="h-full rounded-3xl border border-border bg-card p-6 transition-all hover:shadow-warm">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <tp.i className="h-5 w-5" />
            </span>
            <div className="mt-5 font-display text-xl">{tp.t}</div>
            <p className="mt-2 text-sm text-foreground/80">{tp.d}</p>
          </div>
        </Reveal>
      ))}
    </section>

    <section className="border-t border-border bg-muted/30 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <MapPin className="h-6 w-6" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl">Exact address after booking</h2>
        <p className="max-w-xl text-muted-foreground">For guest privacy, we share the exact address on booking confirmation.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02]">Get Directions</a>
          <a href={`tel:${PHONE}`} className="rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5">Call</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary">WhatsApp</a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Location;