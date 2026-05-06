import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import TiltCard from "@/components/site/TiltCard";
import {
  Bath, Bed, Tv, Utensils, TreePine, Shield,
  Wifi, Wind, Flame, Coffee, Refrigerator, Lock,
  Car, Music, Gamepad2, ShowerHead, Sparkles, Camera,
} from "lucide-react";

const groups = [
  {
    title: "Bathroom",
    icon: Bath,
    items: [
      { i: ShowerHead, l: "Rain shower" },
      { i: Sparkles, l: "Spa-style tiling" },
      { i: Bath, l: "Hot water geyser" },
    ],
  },
  {
    title: "Bedroom",
    icon: Bed,
    items: [
      { i: Bed, l: "Two AC bedrooms" },
      { i: Wind, l: "Blackout curtains" },
      { i: Sparkles, l: "Premium linens" },
    ],
  },
  {
    title: "Entertainment",
    icon: Tv,
    items: [
      { i: Tv, l: "Smart TV" },
      { i: Wifi, l: "High-speed WiFi" },
      { i: Music, l: "Bluetooth speakers" },
      { i: Gamepad2, l: "Indoor games" },
    ],
  },
  {
    title: "Kitchen",
    icon: Utensils,
    items: [
      { i: Utensils, l: "Full kitchen" },
      { i: Refrigerator, l: "Fridge" },
      { i: Coffee, l: "Coffee & tea" },
    ],
  },
  {
    title: "Outdoor",
    icon: TreePine,
    items: [
      { i: Flame, l: "Rooftop BBQ" },
      { i: TreePine, l: "Garden views" },
      { i: Car, l: "Free parking" },
    ],
  },
  {
    title: "Safety",
    icon: Shield,
    items: [
      { i: Lock, l: "Self check-in" },
      { i: Camera, l: "Exterior cameras" },
      { i: Shield, l: "Smoke alarm" },
    ],
  },
];

const Amenities = () => (
  <Layout>
    <section className="pt-40 pb-16 text-center">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Amenities</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Everything. Nothing extra.</h1>
      </Reveal>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-32 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 0.05}>
          <TiltCard className="glass group h-full rounded-3xl p-8 transition-all hover:shadow-neon">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary shadow-neon">
                <g.icon className="h-6 w-6" />
              </span>
              <div className="font-display text-2xl">{g.title}</div>
            </div>
            <ul className="mt-6 space-y-3">
              {g.items.map((it) => (
                <li key={it.l} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <it.i className="h-4 w-4 text-primary" />
                  {it.l}
                </li>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
      ))}
    </section>
  </Layout>
);

export default Amenities;