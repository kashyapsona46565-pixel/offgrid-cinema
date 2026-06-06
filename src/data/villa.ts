import exterior1 from "@/assets/exterior-1.jpg";
import exterior2 from "@/assets/exterior-2.jpg";
import bath1 from "@/assets/bath-1.jpg";
import bath2 from "@/assets/bath-2.jpg";
import bath3 from "@/assets/bath-3.jpg";
import bedroom1 from "@/assets/bedroom-1.jpg";
import bedroom2 from "@/assets/bedroom-2.jpg";
import bedroom3 from "@/assets/bedroom-3.jpg";
import bedroom4 from "@/assets/bedroom-4.jpg";
import bedroom5 from "@/assets/bedroom-5.jpg";
import bedroom6 from "@/assets/bedroom-6.jpg";
import bedroom7 from "@/assets/bedroom-7.jpg";
import living1 from "@/assets/living-1.jpg";
import living2 from "@/assets/living-2.jpg";
import living3 from "@/assets/living-3.jpg";
import kitchen1 from "@/assets/kitchen-1.jpg";
import kitchen2 from "@/assets/kitchen-2.jpg";
import kitchen3 from "@/assets/kitchen-3.jpg";

// === Owner contact ===
export const PHONE = "+918291572887";
export const PHONE_DISPLAY = "+91 82915 72887";
export const WHATSAPP_NUMBER = "918291572887";

export const buildWhatsApp = (property: string, extra = "") => {
  const base = `Hi, I'd like to enquire about ${property}.`;
  const msg = extra ? `${base}%0A${extra}` : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURI(msg).replace(/%2520/g, "%20")}`;
};

// === Address (placeholder — owner to confirm exact pin) ===
export const ADDRESS_LINE = "Off The Grid Villas, Near Valvan, Lonavala, Maharashtra 410401";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Off+The+Grid+Villas+Lonavala";
export const MAPS_EMBED =
  "https://maps.google.com/maps?q=Lonavala+Valvan+Maharashtra&z=15&output=embed";

// === Gallery categories ===
export const galleryCategories = [
  "All",
  "Living",
  "Bedrooms",
  "Kitchen",
  "Bathrooms",
  "Outdoor",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

type Photo = { src: string; label: string; category: Exclude<GalleryCategory, "All"> };

// === Two properties ===
export type PropertyId = "otg1" | "otg2";

export type Property = {
  id: PropertyId;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  highlights: string[];
  hero: string;
  mosaic: string[];
  photos: Photo[];
  hasBathtub: boolean;
};

const baseHighlights = [
  '40" Smart Android TV',
  "High Speed Wi-Fi",
  "Free Sheesha (carry your own flavours)",
  "BBQ Grill (coal chargeable)",
  "Badminton · Carrom · Table Tennis · Board & Card Games",
  "Free mineral water (20 litres / night)",
  "Toiletries (soap, shampoo, towels, napkins)",
  "Inverter backup",
  "Air-Conditioned 2BHK · 3 Bathrooms · Open Terrace",
];

const introCommon =
  "A quiet weekend getaway close to the expressway, markets & restaurants. A spacious fully furnished 2-BHK with A/C bedrooms & a fully functional kitchen.";

export const properties: Record<PropertyId, Property> = {
  otg1: {
    id: "otg1",
    name: "Off The Grid Villas Lonavala 1",
    shortName: "Off The Grid - 1",
    tagline: "Private 2BHK villa · with bathtub",
    intro: introCommon,
    highlights: [...baseHighlights, "Bathtub in master bathroom"],
    hero: exterior1,
    mosaic: [living1, bedroom4, kitchen1, bath1],
    photos: [
      { src: exterior1, label: "Villa Façade", category: "Outdoor" },
      { src: living1, label: "Living Lounge", category: "Living" },
      { src: living3, label: "Dining Hall", category: "Living" },
      { src: bedroom1, label: "Master Bedroom", category: "Bedrooms" },
      { src: bedroom4, label: "Marble Suite", category: "Bedrooms" },
      { src: bedroom6, label: "Plaid Suite", category: "Bedrooms" },
      { src: bedroom3, label: "Twilight Suite", category: "Bedrooms" },
      { src: kitchen1, label: "Stocked Pantry", category: "Kitchen" },
      { src: kitchen3, label: "Chef's Corner", category: "Kitchen" },
      { src: bath1, label: "Bathroom with Bathtub", category: "Bathrooms" },
      { src: bath3, label: "Indigo Bath", category: "Bathrooms" },
    ],
    hasBathtub: true,
  },
  otg2: {
    id: "otg2",
    name: "Off The Grid Villas Lonavala 2",
    shortName: "Off The Grid - 2",
    tagline: "Private 2BHK villa · open terrace",
    intro: introCommon,
    highlights: baseHighlights,
    hero: exterior2,
    mosaic: [living2, bedroom5, kitchen2, bath2],
    photos: [
      { src: exterior2, label: "Villa Approach", category: "Outdoor" },
      { src: living2, label: "Living & Dining", category: "Living" },
      { src: bedroom5, label: "Master Suite", category: "Bedrooms" },
      { src: bedroom2, label: "Garden Bedroom", category: "Bedrooms" },
      { src: bedroom7, label: "Indigo Bedroom", category: "Bedrooms" },
      { src: kitchen2, label: "Open Kitchen", category: "Kitchen" },
      { src: bath2, label: "Powder Room", category: "Bathrooms" },
    ],
    hasBathtub: false,
  },
};

export const propertyList: Property[] = [properties.otg1, properties.otg2];

// === Demo blocked dates (per property) ===
const buildBlocked = (offsets: [number, number][]) => {
  const out: string[] = [];
  const today = new Date();
  offsets.forEach(([a, b]) => {
    for (let i = a; i < b; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      out.push(d.toISOString().slice(0, 10));
    }
  });
  return out;
};

export const blockedByProperty: Record<PropertyId, string[]> = {
  otg1: buildBlocked([[3, 6], [14, 17], [25, 28]]),
  otg2: buildBlocked([[5, 9], [18, 21]]),
};
