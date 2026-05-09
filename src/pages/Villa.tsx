import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { images, WHATSAPP } from "@/data/villa";
import { Link } from "react-router-dom";

const chapters = [
  {
    n: "01",
    t: "Arrival",
    d: "Just off the expressway, tucked behind some trees. Easy to find, easy to settle in. The market is minutes away whenever you need something.",
    img: images.exterior2,
  },
  {
    n: "02",
    t: "Two comfy bedrooms",
    d: "A 2BHK fully furnished home. Two AC bedrooms with comfortable beds, fresh linens and blackout curtains for proper sleep.",
    img: images.bedroom4,
  },
  {
    n: "03",
    t: "Kitchen & living",
    d: "A proper kitchen — induction, fridge, full crockery. Cook a meal or order in and sprawl on the couch. Whatever feels right.",
    img: images.bedroom2,
  },
  {
    n: "04",
    t: "Clean bathrooms",
    d: "Two clean, well-tiled bathrooms with hot water geysers and good pressure. Simple and well kept.",
    img: images.bath3,
  },
  {
    n: "05",
    t: "Slow evenings",
    d: "Indoor games, a Smart TV, good WiFi and a quiet balcony. Long chats, slow chai, early nights — that kind of weekend.",
    img: images.exterior1,
  },
];

const Villa = () => (
  <Layout>
    <section className="relative pt-40 pb-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">The Villa</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">
            A simple <span className="text-glow text-primary">second home</span> in Lonavala.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Off The Grid is a 2BHK private villa in Lonavala. Comfortable,
            clean and quiet — here's a quick walk-through.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="space-y-32">
        {chapters.map((c, i) => (
          <Reveal key={c.n}>
            <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
                <img src={c.img} alt={c.t} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              </div>
              <div>
                <div className="font-display text-7xl text-primary/40">{c.n}</div>
                <h2 className="mt-2 font-display text-4xl md:text-5xl">{c.t}</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-32 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/20 bg-card p-10 shadow-warm">
          <div>
            <div className="font-display text-3xl">Plan your weekend.</div>
            <p className="mt-2 text-muted-foreground">Check available dates and book in a minute.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/booking" className="rounded-full bg-primary-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-warm hover:scale-105 transition">Check Dates</Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/20 px-7 py-3.5 font-semibold hover:border-primary hover:text-primary transition">WhatsApp</a>
          </div>
        </div>
      </Reveal>
    </section>
  </Layout>
);

export default Villa;