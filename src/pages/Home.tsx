import { Link } from "react-router-dom";
import {
  Wifi, Tv, Wind, Utensils, Users, MapPin, Star, Phone, MessageCircle,
  Flame, Gamepad2, Trees, Car, Bath, Share2, Heart,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { images, WHATSAPP, PHONE } from "@/data/villa";
import { toast } from "sonner";

const highlights = [
  { icon: Wifi, label: "High Speed WiFi" },
  { icon: Tv, label: "40\" Smart TV" },
  { icon: Trees, label: "Open Terrace" },
  { icon: Flame, label: "BBQ Grill" },
  { icon: Gamepad2, label: "Indoor Games" },
  { icon: Utensils, label: "Full Kitchen" },
  { icon: Bath, label: "3 Bathrooms" },
  { icon: Wind, label: "AC Bedrooms" },
  { icon: Car, label: "Free Parking" },
  { icon: Users, label: "Sleeps 10" },
];

const share = () => {
  if (navigator.share) {
    navigator.share({ title: "Off The Grid – Lonavala", url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }
};

const Home = () => (
  <Layout>
    {/* HEADER STRIP */}
    <section className="mx-auto max-w-7xl px-4 pt-28 md:px-6 md:pt-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl md:text-5xl">Off The Grid</h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Private 2BHK Vacation Rental in Lonavala
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" /> 4.9 · 120+ stays
              </span>
              <span className="hidden md:inline">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" /> Lonavala, Maharashtra
              </span>
              <span className="hidden md:inline">·</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" /> Up to 10 guests
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button
              onClick={() => toast.success("Saved to favourites")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"
            >
              <Heart className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
      </Reveal>

      {/* AIRBNB-STYLE PHOTO MOSAIC */}
      <Reveal delay={0.1}>
        <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:gap-3">
          <Link
            to="/gallery"
            className="group relative col-span-4 row-span-2 h-[280px] overflow-hidden md:col-span-2 md:h-[520px]"
          >
            <img src={images.exterior1} alt="Villa façade" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </Link>
          {[images.living2, images.bedroom5, images.kitchen2, images.bath1].map((src, i) => (
            <Link
              key={i}
              to="/gallery"
              className={`group relative hidden overflow-hidden md:block ${i % 2 === 0 ? "" : ""}`}
              style={{ height: "256px" }}
            >
              <img src={src} alt="Villa" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {i === 3 && (
                <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold shadow-warm">
                  Show all photos
                </span>
              )}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>

    {/* OVERVIEW + STICKY BOOKING CARD */}
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">Entire townhouse hosted by Off The Grid</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            10 guests · 2 bedrooms · 3 bathrooms · Open terrace · BBQ
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-warm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" />
                </span>
                <div className="text-sm font-medium">{h.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We're calling our place <span className="font-semibold text-foreground">Off The Grid</span> &
              there's a good reason for that. The idea behind this passion project is to encourage
              quality time & conversations with friends & family. It's when being busy just doesn't
              count as an excuse to live.
            </p>
            <p>
              The place has an open-air rooftop where you could grill, smoke a sheesha, or even get
              wet if it's rainy season. There's table tennis, badminton, carrom & quite a few board
              games. A fully functional kitchen with a gas stove, fridge, bone-china crockery and
              basic utensils. Digital detox is encouraged.
            </p>
            <Link to="/villa" className="inline-block border-b border-foreground pb-0.5 text-sm font-semibold hover:text-primary hover:border-primary">
              Read more about the space →
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Sticky booking enquiry */}
      <Reveal delay={0.15}>
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl">₹12,500</span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Excludes refundable deposit of ₹7,000</p>

            <div className="mt-6 space-y-3">
              <a href={`tel:${PHONE}`} className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-background py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/5">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-gradient py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-[1.02]">
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <Link to="/booking" className="block w-full rounded-full border border-border py-3.5 text-center text-sm font-semibold hover:border-primary hover:text-primary">
                Check Dates
              </Link>
            </div>

            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <li>· Check-in 1:00 PM – 9:00 PM</li>
              <li>· Check-out 11:00 AM</li>
              <li>· Self check-in · Free cancellation up to 7 days</li>
            </ul>
          </div>
        </aside>
      </Reveal>
    </section>

    {/* GUEST VOICES */}
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="flex items-baseline gap-2">
            <Star className="h-6 w-6 fill-primary text-primary" />
            <h2 className="font-display text-3xl md:text-4xl">4.9 · 120+ guest reviews</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "Aanya & Rohit", q: "Felt like our own home. Quiet, clean and very comfortable." },
            { n: "The Mehras", q: "Simple, well-kept villa. Kids loved the terrace and games. We'll be back." },
            { n: "Kabir", q: "No fuss, no over-the-top promises. Exactly what we needed for the weekend." },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-warm">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed">"{t.q}"</p>
                <div className="mt-6 text-sm font-semibold">— {t.n}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;