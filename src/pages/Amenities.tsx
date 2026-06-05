import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import {
  Bath, Bed, Tv, Utensils, Shield, Wifi, Wind, Flame, Refrigerator,
  Car, Gamepad2, ShowerHead, MapPin, Trees, Zap, Check,
} from "lucide-react";

const groups = [
  {
    title: "Entertainment",
    icon: Tv,
    items: [
      "40\" Smart Android TV",
      "High-speed WiFi",
      "Free Sheesha (carry your own flavours)",
      "BBQ grill with iron skewers (coal chargeable)",
      "Table Tennis · Badminton · Carrom",
      "Board Games · Card Games",
    ],
  },
  {
    title: "Kitchen & Dining",
    icon: Utensils,
    items: [
      "Gas stove",
      "Refrigerator",
      "Bone-china crockery & cutlery",
      "Basic utensils: pots, pans, tava, tea vessel",
      "20 litres mineral water (included per night)",
      "Barbecue grill",
    ],
  },
  {
    title: "Bedroom & Linen",
    icon: Bed,
    items: [
      "Two AC bedrooms",
      "Bedsheets with duvets",
      "Extra pillows & blankets",
      "Mosquito nets",
      "Clothes storage & hangers",
      "Iron, drying rack (on request)",
    ],
  },
  {
    title: "Bathroom",
    icon: Bath,
    items: [
      "3 bathrooms · 24x7 hot water",
      "Shampoo, body soap, handwash",
      "Toilet paper & towels",
      "Hand napkins",
      "Hairdryer (on request)",
    ],
  },
  {
    title: "Outdoor",
    icon: Trees,
    items: [
      "Open-air terrace",
      "Private balcony off master bedroom",
      "Open backyard",
      "Outdoor plastic chairs & tables",
    ],
  },
  {
    title: "Safety",
    icon: Shield,
    items: [
      "Fire extinguisher",
      "First aid kit",
      "Inverter backup",
      "Private entrance · house in society",
    ],
  },
  {
    title: "Parking",
    icon: Car,
    items: [
      "Free parking on premises",
      "Free on-street parking",
      "EV charging stations nearby",
    ],
  },
  {
    title: "Location & Stays",
    icon: MapPin,
    items: [
      "2 min from Mumbai–Pune Expressway exit",
      "7–10 min from Lonavala railway station",
      "Close to Valvan local market",
      "Long-term stays allowed",
      "Luggage drop-off allowed",
    ],
  },
];

const Amenities = () => (
  <Layout>
    <section className="pt-32 pb-12 text-center md:pt-40">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.4em] text-primary">What this place offers</div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl">Everything you need, nothing you don't.</h1>
      </Reveal>
    </section>

    <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-24 md:grid-cols-2 md:px-6 lg:grid-cols-3">
      {groups.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 0.04}>
          <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all hover:shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <g.icon className="h-5 w-5" />
              </span>
              <div className="font-display text-xl">{g.title}</div>
            </div>
            <ul className="mt-5 space-y-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </section>
  </Layout>
);

export default Amenities;