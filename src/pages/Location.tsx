import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { MapPin, Car, CloudRain, Compass, ShoppingBag, Mountain } from "lucide-react";

const tips = [
  { i: Car, t: "Easy access", d: "Just minutes off the Mumbai–Pune Expressway. ~2hr from Mumbai, ~1hr from Pune." },
  { i: ShoppingBag, t: "Market close", d: "Local market & cafes 5 minutes away for groceries, ice, BBQ supplies." },
  { i: CloudRain, t: "Best season", d: "June–September for misty monsoon magic. October–February for cool sunny escapes." },
  { i: Mountain, t: "Nearby views", d: "Tiger's Leap, Bhushi Dam, Lion's Point — all under 30 minutes." },
  { i: Compass, t: "Pro tip", d: "Drive in before sunset on rainy weekends — visibility drops fast in the ghats." },
];

const Location = () => (
  <Layout>
    <section className="pt-40 pb-12 text-center">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Location</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Tucked into Lonavala.</h1>
      </Reveal>
    </section>

    <section className="mx-auto max-w-7xl px-6">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-border shadow-card">
          <iframe
            title="Off The Grid Lonavala location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.38%2C18.72%2C73.46%2C18.78&layer=mapnik&marker=18.7515,73.4060"
            className="h-[420px] w-full grayscale contrast-125 hue-rotate-180 invert"
            loading="lazy"
          />
        </div>
      </Reveal>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
      {tips.map((tp, i) => (
        <Reveal key={tp.t} delay={i * 0.05}>
          <div className="glass h-full rounded-3xl p-7 transition-all hover:shadow-neon">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary shadow-neon">
              <tp.i className="h-5 w-5" />
            </span>
            <div className="mt-5 font-display text-2xl">{tp.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{tp.d}</p>
          </div>
        </Reveal>
      ))}
      <Reveal delay={0.3}>
        <div className="rounded-3xl bg-neon p-7 text-primary-foreground shadow-neon">
          <MapPin className="h-6 w-6" />
          <div className="mt-4 font-display text-2xl">Lonavala, Maharashtra</div>
          <p className="mt-2 text-sm opacity-80">Exact address shared after booking confirmation for guest privacy.</p>
        </div>
      </Reveal>
    </section>
  </Layout>
);

export default Location;