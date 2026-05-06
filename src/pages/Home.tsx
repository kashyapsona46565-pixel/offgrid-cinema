import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Tv, Gamepad2, Wind, ArrowRight, Star, Utensils } from "lucide-react";
import Layout from "@/components/site/Layout";
import Particles from "@/components/site/Particles";
import Reveal from "@/components/site/Reveal";
import TiltCard from "@/components/site/TiltCard";
import { images, WHATSAPP } from "@/data/villa";

const highlights = [
  { icon: Tv, label: "Smart TV" },
  { icon: Wifi, label: "WiFi" },
  { icon: Utensils, label: "Full Kitchen" },
  { icon: Gamepad2, label: "Indoor Games" },
  { icon: Wind, label: "AC Bedrooms" },
];

const Home = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.exterior1}
            alt="Off The Grid villa exterior in Lonavala"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-hero" />
          <div className="rain absolute inset-0 opacity-40" />
        </div>
        <Particles count={40} />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Lonavala · India
          </motion.div>

          <h1 className="font-display text-5xl leading-[1.05] md:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.9 }}
              className="block text-foreground"
            >
              A second home
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.9 }}
              className="block shimmer-text"
            >
              in the hills.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            A simple, comfortable 2BHK in Lonavala. Quiet rooms, a real
            kitchen, and easy access to the market — exactly what a weekend
            away should feel like.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/booking"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neon px-7 py-4 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              Check Availability <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-foreground/20 px-7 py-4 text-sm font-semibold backdrop-blur transition-all hover:border-primary hover:text-primary hover:shadow-neon"
            >
              Book on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Scroll
              <div className="h-10 w-[1px] animate-pulse bg-gradient-to-b from-primary to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS MARQUEE */}
      <section className="relative border-y border-border/40 bg-card/30 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-8 px-6">
          {highlights.map((h) => (
            <Reveal key={h.label} delay={0.05}>
              <div className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-all group-hover:border-primary group-hover:shadow-neon">
                  <h.icon className="h-5 w-5" />
                </span>
                {h.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY OFF THE GRID */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <Particles count={15} />
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Why Off The Grid?</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">
            Just a <span className="text-glow text-primary">comfortable home</span>, away from yours.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Quiet & restful",
              d: "Two AC bedrooms, blackout curtains and soft beds. Sleep in, take it slow.",
              img: images.bedroom4,
            },
            {
              t: "A real kitchen",
              d: "Cook a proper meal or chai. Fridge, induction, full crockery — like home.",
              img: images.exterior2,
            },
            {
              t: "Clean & comfortable",
              d: "Spotless bathrooms, hot water, fresh linens. Nothing fancy — just well kept.",
              img: images.bath1,
            },
          ].map((card, i) => (
            <Reveal key={card.t} delay={i * 0.1}>
              <TiltCard className="group relative h-[460px] overflow-hidden rounded-3xl shadow-card">
                <img
                  src={card.img}
                  alt={card.t}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="font-display text-2xl">{card.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{card.d}</p>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/0 transition-all group-hover:ring-primary/40 group-hover:shadow-neon" />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GUEST EXPERIENCE / TESTIMONIALS */}
      <section className="relative bg-card/40 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-primary">Guest Voices</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Honest words from honest stays.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Aanya & Rohit", q: "Felt like our own home. Quiet, clean and very comfortable." },
              { n: "The Mehras", q: "Simple, well-kept villa. Kids loved it. We'll be back." },
              { n: "Kabir", q: "No fuss, no over-the-top promises. Exactly what we needed." },
            ].map((t, i) => (
              <Reveal key={t.n} delay={i * 0.1}>
                <div className="glass h-full rounded-3xl p-7 transition-all hover:shadow-neon">
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-xl leading-relaxed">"{t.q}"</p>
                  <div className="mt-6 text-sm text-muted-foreground">— {t.n}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-secondary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            Weekend slots filling fast
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl md:text-7xl">
            Plan a <span className="text-glow text-primary">slow weekend</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="rounded-full bg-neon px-8 py-4 font-semibold text-primary-foreground shadow-neon pulse-glow transition-transform hover:scale-105"
            >
              Check Availability
            </Link>
            <Link
              to="/gallery"
              className="rounded-full border border-foreground/20 px-8 py-4 font-semibold transition-all hover:border-primary hover:text-primary"
            >
              View Gallery
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Home;