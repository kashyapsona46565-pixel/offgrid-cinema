import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { images, WHATSAPP } from "@/data/villa";
import { Link } from "react-router-dom";

const chapters = [
  {
    n: "01",
    t: "Arrival",
    d: "You turn off the expressway and the world drops a notch. The villa unveils itself behind tall trees — a balcony of warm wood, white walls, and the smell of monsoon earth. The market is minutes away, but you won't need it.",
    img: images.exterior2,
  },
  {
    n: "02",
    t: "Two suites, one calm",
    d: "A 2BHK fully furnished retreat. Two AC bedrooms, both styled like quiet hotel suites — marble floors, soft mirrors, blackout drapes. Sleep deeper than you have in months.",
    img: images.bedroom4,
  },
  {
    n: "03",
    t: "Kitchen & living",
    d: "A real kitchen for real meals — induction, fridge, full crockery. Or skip it: order in, sprawl across the couch, and let the hours blur.",
    img: images.bedroom2,
  },
  {
    n: "04",
    t: "Spa-style baths",
    d: "Two beautifully tiled bathrooms with rain showers, geyser, and that rare thing in a rental — pressure. One indigo, one ivory. Both made for long, slow rinses.",
    img: images.bath3,
  },
  {
    n: "05",
    t: "Rooftop, BBQ, sheesha",
    d: "The rooftop is the protagonist. Set up the BBQ, light the sheesha, queue the playlist. Lonavala mist rolls in. Conversations get longer. Time gets shorter.",
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
            A weekend that <span className="text-glow text-primary">edits itself</span> like a film.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Off The Grid is a 2BHK private villa in Lonavala. Below, the full
            story — chapter by chapter — of what living here for 48 hours feels like.
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
        <div className="mt-32 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/30 bg-card p-10 shadow-neon">
          <div>
            <div className="font-display text-3xl">Ready to write your chapter?</div>
            <p className="mt-2 text-muted-foreground">Weekend slots are limited. Lock yours in under 60 seconds.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/booking" className="rounded-full bg-neon px-7 py-3.5 font-semibold text-primary-foreground shadow-neon hover:scale-105 transition">Check Dates</Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/20 px-7 py-3.5 font-semibold hover:border-primary hover:text-primary transition">WhatsApp</a>
          </div>
        </div>
      </Reveal>
    </section>
  </Layout>
);

export default Villa;