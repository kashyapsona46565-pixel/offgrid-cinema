import { Link } from "react-router-dom";
import {
  Wifi, Tv, Wind, Utensils, Users, MapPin, Star, Phone, MessageCircle,
  Flame, Gamepad2, Trees, Car, Bath, Share2, Check, Shield, LogIn, LogOut,
  IdCard, CreditCard, CalendarX, ShoppingBag, ChefHat, Bed, ShowerHead,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";

import { PHONE, buildWhatsApp } from "@/data/villa";
import { useProperty } from "@/context/PropertyContext";
import { toast } from "sonner";

const Home = () => {
  const { selected } = useProperty();
  const wa = buildWhatsApp(selected.name);

  const quickHighlights = [
    { icon: Tv, label: '40" Smart Android TV' },
    { icon: Wifi, label: "High Speed Wi-Fi" },
    { icon: Flame, label: "Free Sheesha (get your flavours)" },
    { icon: Gamepad2, label: "Badminton, Carrom, Table Tennis, Board Games, Card Games etc" },
    { icon: Utensils, label: "Free mineral water (20 litres)" },
    { icon: ShowerHead, label: "Toiletries (soaps, shampoos, towels, napkins)" },
    { icon: Shield, label: "Inverter backup" },
    { icon: Wind, label: "Air-Conditioned 2BHK with 3 Bathrooms & Open Terrace" },
    ...(selected.hasBathtub ? [{ icon: Bath, label: "Bath Tub with 1 attached Bathroom" }] : []),
  ];

  const amenityGroups = [
    {
      title: "Entertainment", icon: Tv,
      items: [
        "Board Games",
        "Card Games",
        "Carrom",
        "Badminton",
        "Table Tennis",
        "Free Sheesha with natural coal (carry your own flavours)",
      ],
    },
    {
      title: "Kitchen & Dining", icon: Utensils,
      items: [
        "Stove",
        "Refrigerator",
        "Basic utensils: Pots, pans, tea vessel, milk vessel, tava etc",
        "Bone-china crockery and cutlery",
        "20-litres of mineral water (included in cost)",
        "Barbecue grill & iron skewers",
      ],
    },
    {
      title: "Bedroom & Linen", icon: Bed,
      items: [
        "Bed sheets with duvets",
        "Hangers",
        "Extra pillows and blankets",
        "Iron (on request)",
        "Clothes drying rack",
        "Mosquito net",
        "Clothes storage",
      ],
    },
    {
      title: "Bathroom", icon: Bath,
      items: [
        "24x7 hot running water",
        "Hairdryer (on request)",
        "Handwash",
        "Shampoo",
        "Body soap",
        "Toilet Paper",
        "Towels",
        "Hand napkins",
      ],
    },
    {
      title: "Home Safety", icon: Shield,
      items: ["Fire extinguisher", "First aid kit"],
    },
    {
      title: "Outdoor", icon: Trees,
      items: [
        "Private balcony attached to Master Bedroom",
        "Open air Terrace",
        "Open backyard",
      ],
    },
    {
      title: "Parking & Facilities", icon: Car,
      items: ["Free parking on premises", "Free on-street parking"],
    },
    {
      title: "Services", icon: ShoppingBag,
      items: [
        "Luggage drop-off allowed — for guests' convenience when arriving early or departing late",
        "Long-term stays allowed",
      ],
    },
    {
      title: "Location Features", icon: MapPin,
      items: [
        "Private entrance",
        "House is situated in a society",
        "Close to the railway station — 7-10 mins",
        "Close to the Lonavala express-way exit — 2 mins",
        "Close to the local market of Valvan where all groceries are available",
        "Close to restaurants and strategically located for easy access to tourist spots",
        "Close to electric charging stations of Lonavala — couple of minutes",
      ],
    },
  ];

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: selected.name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-4 pt-36 md:px-6 md:pt-40">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl md:text-5xl">{selected.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">{selected.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" /> 4.8 · Highly rated
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
            <button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </Reveal>

        {/* PHOTO MOSAIC */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:gap-3">
            <Link to="/gallery" className="group relative col-span-4 row-span-2 h-[280px] overflow-hidden md:col-span-2 md:h-[520px]">
              <img src={selected.hero} alt={`${selected.name} façade`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            {selected.mosaic.map((src, i) => (
              <Link key={i} to="/gallery" className="group relative hidden overflow-hidden md:block" style={{ height: "256px" }}>
                <img src={src} alt="Villa" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {i === selected.mosaic.length - 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold shadow-warm">
                    Show all photos
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* OVERVIEW + CTA CARD */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">Entire Villa Private · {selected.shortName}</h2>
            <p className="mt-2 text-sm text-muted-foreground">10 Guests · 2 Bedrooms · 3 Bathrooms · Open Terrace</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {quickHighlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
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
              <p>{selected.intro}</p>
              <p>
                We're calling our place <span className="font-semibold text-foreground">Off The Grid</span> &
                there's a good reason for that. The idea behind this passion project is to encourage quality
                time & conversations with friends & family. It's when being busy just doesn't count as an
                excuse to live.
              </p>
              <p>
                There's high-speed Wi-Fi, a 40" Smart Android TV, table tennis, badminton, carrom & quite a
                few board & card games. Sheesha (carry your own flavours) & a real coal grill for the DIY
                types (coal is chargeable). An open-air rooftop where you can grill, smoke a sheesha, or even
                get wet in the rains. Digital detox is encouraged.
              </p>
              <p>
                Fully furnished kitchen with gas stove, refrigerator, bone-china crockery, cutlery & basic
                utensils. No condiments or food items are provided. Hotel-style amenities: toiletries, towels,
                20 litres of free mineral water per night, 6" foam mattresses & 4" extra mattresses.
              </p>
              <p>
                It's a Villa with a living room with a dining area, kitchen and a Bathroom on the ground floor.
                The Bedrooms are on the first floor with Bathrooms attached. Above that, there is an open-air
                Terrace. About 7–10 minutes from Lonavala railway station and a couple of minutes from EV
                charging stations.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Sticky CTA card — NO PRICE */}
        <Reveal delay={0.15}>
          <aside className="lg:sticky lg:top-40 self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
              <div className="text-xs uppercase tracking-widest text-primary">Enquire & Book</div>
              <div className="mt-2 font-display text-2xl">Talk to us directly</div>
              <p className="mt-2 text-sm text-muted-foreground">
                To check availability or book, please reach us on WhatsApp or call.
              </p>


              <div className="mt-5 space-y-3">
                <a href={wa} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-gradient py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-[1.02]">
                  <MessageCircle className="h-4 w-4" /> Book via WhatsApp
                </a>
                <a href={`tel:${PHONE}`} className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-background py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/5">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <Link to="/availability" className="block w-full rounded-full border border-border py-3.5 text-center text-sm font-semibold hover:border-primary hover:text-primary">
                  Check Availability
                </Link>
              </div>

              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                <li>· Check-in 1:00 PM – 9:00 PM</li>
                <li>· Check-out 11:00 AM</li>
                <li>· Refundable deposit: ₹7,000 before check-in</li>
              </ul>
            </div>
          </aside>
        </Reveal>
      </section>

      {/* AMENITIES (merged into Home) */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-primary">What this place offers</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Amenities</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {amenityGroups.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.04}>
                <div className="h-full rounded-3xl border border-border bg-card p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <g.icon className="h-5 w-5" />
                    </span>
                    <div className="font-display text-xl">{g.title}</div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Food & Meals</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Food Services</h2>
          <p className="mt-3 max-w-3xl text-foreground/80">
            We don't provide cooked meals as part of the booking. The house has a fully functional kitchen
            with stove, fridge, cutlery and basic utensils. No food items or condiments are provided.
            Guests can carry their own food (heat & eat), cook their own meals, eat out at the many nearby
            options (from 5-stars to dhabas), or order in — Zomato delivers across Lonavala.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-foreground/70">
            We'd recommend planning limited cooking — the kitchen has basic utensils and isn't set up for
            large gatherings or full meals.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { i: ChefHat, t: "Cook your own", d: "Carry groceries or heat & eat. Bone-china crockery and basic utensils provided. No condiments." },
            { i: ShoppingBag, t: "Order in / Eat out", d: "Zomato delivers from across Lonavala. Several dhabas to 5-star restaurants close by." },
            { i: Utensils, t: "Caretaker cooking (optional)", d: "Our caretaker offers cooking on her own charges, based on group size. Arrange with her directly post-booking — we don't get involved there." },
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
      </section>

      {/* BOOKING INFO */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">Check-in, Check-out & Booking</h2>
            <p className="mt-2 text-muted-foreground">Please read carefully before booking.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: LogIn, t: "Check-in", d: "1:00 PM – 9:00 PM" },
              { i: LogOut, t: "Check-out", d: "By 11:00 AM" },
              { i: Users, t: "Max guests", d: "10 guests maximum" },
              { i: CreditCard, t: "Refundable deposit", d: "₹7,000 before check-in. Returned in full if there's no damage. Pay in cash on location or digitally — digital refunds within 1–4 hours of checkout." },
              { i: IdCard, t: "ID required", d: "Photo with Address ID — Driving Licence or Aadhar. International guests must share passport copies." },
            ].map((c) => (
              <Reveal key={c.t}>
                <div className="h-full rounded-3xl border border-border bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <c.i className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-display text-xl">{c.t}</div>
                  <p className="mt-2 text-sm text-foreground/80">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Cancellation Policy with examples */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <CalendarX className="h-5 w-5" />
                </span>
                <div className="font-display text-xl">Cancellation Policy</div>
              </div>
              <ul className="mt-5 space-y-5 text-sm text-foreground/80">
                <li>
                  <div className="font-semibold text-foreground">100% Refund — 7 days or more before check-in date</div>
                  <div className="mt-1 text-foreground/70">Example: Your booking is on the 8th January, Saturday. Cancellation must happen before 11:59 PM of 1st January, Saturday.</div>
                </li>
                <li>
                  <div className="font-semibold text-foreground">50% Refund — Between 7 days to 4 days before check-in date</div>
                  <div className="mt-1 text-foreground/70">Example: Your booking is on the 8th January, Saturday. Cancellation must fall between 12:00 AM of 2nd January, Sunday and 11:59 PM of 4th January, Tuesday.</div>
                </li>
                <li>
                  <div className="font-semibold text-foreground">0% Refund — 3 days before check-in date</div>
                  <div className="mt-1 text-foreground/70">Example: Your booking is on the 8th January, Saturday. Cancellation happens after 12:00 AM of 4th January, Wednesday.</div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOUSE RULES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">House Rules</h2>
        </Reveal>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            "No parties or loud music",
            "No commercial shoots or commercial events",
            "Birthday celebrations — please get in touch before booking",
            "No pets allowed",
            "Damages are chargeable",
          ].map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" /> {r}
            </li>
          ))}
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to Book {selected.shortName}?</h2>
          <p className="text-muted-foreground">Reach us on WhatsApp or call — we'll be happy to help.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <Link to="/availability" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
