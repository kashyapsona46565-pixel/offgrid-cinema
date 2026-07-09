import exterior from "@/assets/real-IMG_20260611_153504.jpg.asset.json";
import bedroomLarge from "@/assets/real-IMG_20260611_153515.jpg.asset.json";
import livingDining from "@/assets/real-IMG_20260611_153522.jpg.asset.json";
import kitchen from "@/assets/real-IMG_20260611_153532.jpg.asset.json";
import bedroomChecked from "@/assets/real-IMG_20260611_153540.jpg.asset.json";
import bathtub from "@/assets/real-IMG_20260611_153551.jpg.asset.json";
import bedroomBlue from "@/assets/real-IMG_20260611_153559.jpg.asset.json";
import bathroom from "@/assets/real-IMG_20260611_153608.jpg.asset.json";

const IMG = {
  exterior: exterior.url,
  bedroomLarge: bedroomLarge.url,
  livingDining: livingDining.url,
  kitchen: kitchen.url,
  bedroomChecked: bedroomChecked.url,
  bathtub: bathtub.url,
  bedroomBlue: bedroomBlue.url,
  bathroom: bathroom.url,
};

// === Owner contact ===
export const PHONE = "+918291572887";
export const PHONE_DISPLAY = "+91 82915 72887";
export const WHATSAPP_NUMBER = "918291572887";
export const CALL_HOURS = "10 AM – 9 PM";
export const WHATSAPP_HOURS = "24/7";

export const buildWhatsApp = (property: string, extra = "") => {
  const base = `Hi, I'd like to enquire about ${property}.`;
  const msg = extra ? `${base}%0A${extra}` : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURI(msg).replace(/%2520/g, "%20")}`;
};

// === Address & verified Google Maps place (CID-anchored) ===
export const ADDRESS_LINE = "Row House No - 7, 8, 9, Khatri Park Co-Op Housing Society, Valvan, Lonavala - 410401";
// Resolved place: OFF THE GRID (cid 12472058479004452436)
export const MAPS_URL = "https://www.google.com/maps?cid=12472058479004452436";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Off+The+Grid+Villas+Khatri+Park+Valvan+Lonavala&cid=12472058479004452436&z=17&output=embed";

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
  icalUrl?: string;
};

const baseHighlights = [
  '40" Smart Android TV',
  "High Speed WiFi",
  "Open Terrace",
  "BBQ Grill",
  "Carrom & Indoor Games",
  "Badminton & Table Tennis",
  "Free Mineral Water",
  "AC Bedrooms",
  "3 Bathrooms",
  "Toiletries",
  "Inverter Backup",
];

const introCommon =
  "A quiet weekend getaway close to the expressway, markets & restaurants. A spacious fully furnished 2-BHK with A/C Bedrooms & a fully functional Kitchen.";

export const properties: Record<PropertyId, Property> = {
  otg1: {
    id: "otg1",
    name: "Off The Grid Villas Lonavala 1",
    shortName: "Off The Grid - 1",
    tagline: "Entire Villa Private · with Bathtub",
    intro: introCommon,
    highlights: [...baseHighlights, "Bathtub"],
    hero: IMG.exterior,
    mosaic: [IMG.livingDining, IMG.bedroomLarge, IMG.kitchen, IMG.bathtub],
    photos: [
      { src: IMG.exterior, label: "Villa Façade", category: "Outdoor" },
      { src: IMG.livingDining, label: "Living & Dining", category: "Living" },
      { src: IMG.bedroomLarge, label: "Master Bedroom", category: "Bedrooms" },
      { src: IMG.bedroomChecked, label: "Second Bedroom", category: "Bedrooms" },
      { src: IMG.bedroomBlue, label: "Guest Bedroom", category: "Bedrooms" },
      { src: IMG.kitchen, label: "Full Kitchen", category: "Kitchen" },
      { src: IMG.bathtub, label: "Bathroom with Bathtub", category: "Bathrooms" },
      { src: IMG.bathroom, label: "Bathroom", category: "Bathrooms" },
    ],
    hasBathtub: true,
    icalUrl: "https://www.airbnb.com/calendar/ical/18594585.ics?t=46e0dfedeb834b09a724f7eb6e708f5f&locale=en-GB",
  },
  otg2: {
    id: "otg2",
    name: "Off The Grid Villas Lonavala 2",
    shortName: "Off The Grid - 2",
    tagline: "Entire Villa Private · Full Kitchen",
    intro: introCommon,
    highlights: [...baseHighlights, "Full Kitchen"],
    hero: IMG.exterior,
    mosaic: [IMG.livingDining, IMG.bedroomChecked, IMG.kitchen, IMG.bathroom],
    photos: [
      { src: IMG.exterior, label: "Villa Façade", category: "Outdoor" },
      { src: IMG.livingDining, label: "Living & Dining", category: "Living" },
      { src: IMG.bedroomChecked, label: "Master Bedroom", category: "Bedrooms" },
      { src: IMG.bedroomBlue, label: "Second Bedroom", category: "Bedrooms" },
      { src: IMG.kitchen, label: "Full Kitchen", category: "Kitchen" },
      { src: IMG.bathroom, label: "Bathroom", category: "Bathrooms" },
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
