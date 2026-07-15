// Photos live in /public/villa/ so they are bundled into the production build
// and served directly by any static host (Hostinger, Netlify, etc.).
// Folder structure mirrors the shared Google Drive:
//   public/villa/otg1/<room>/*.jpg
//   public/villa/otg2/<room>/*.jpg
//   public/villa/outdoor/*.jpg
// To swap an image on Hostinger, replace the file at the same path — done.

const HERO_OTG1 = "/villa/outdoor/exterior.jpg";
const HERO_OTG2 = "/villa/outdoor/exterior-2.jpg";

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

const otg1Photos: Photo[] = [
  { src: "/villa/outdoor/exterior.jpg", label: "Villa Exterior", category: "Outdoor" },
  { src: "/villa/outdoor/exterior-2.jpg", label: "Villa Façade", category: "Outdoor" },
  { src: "/villa/outdoor/copy-of-dsf0093.jpg", label: "Villa Grounds", category: "Outdoor" },
  { src: "/villa/otg1/living-room/img-2551edit.jpg", label: "Living Room · 1", category: "Living" },
  { src: "/villa/otg1/living-room/img-2552edit.jpg", label: "Living Room · 2", category: "Living" },
  { src: "/villa/otg1/living-room/img-2670edit.jpg", label: "Living Room · 3", category: "Living" },
  { src: "/villa/otg1/living-room/img-2672edit.jpg", label: "Living Room · 4", category: "Living" },
  { src: "/villa/otg1/bedroom-1/dsf2740-hdr.jpg", label: "Bedroom 1 · 1", category: "Bedrooms" },
  { src: "/villa/otg1/bedroom-1/dsf2751-hdr.jpg", label: "Bedroom 1 · 2", category: "Bedrooms" },
  { src: "/villa/otg1/bedroom-1/dsf2781-hdr.jpg", label: "Bedroom 1 · 3", category: "Bedrooms" },
  { src: "/villa/otg1/bedroom-2/dsf2608-hdr.jpg", label: "Bedroom 2 · 1", category: "Bedrooms" },
  { src: "/villa/otg1/bedroom-2/dsf2616-hdr.jpg", label: "Bedroom 2 · 2", category: "Bedrooms" },
  { src: "/villa/otg1/kitchen/dsf0006-hdr.jpg", label: "Kitchen · 1", category: "Kitchen" },
  { src: "/villa/otg1/kitchen/dsf0018-hdr.jpg", label: "Kitchen · 2", category: "Kitchen" },
  { src: "/villa/otg1/bathroom-1/img-2666edit.jpg", label: "Bathroom 1", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-2/dsf2808-hdr.jpg", label: "Bathroom 2 · 1", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-2/dsf2832-hdr.jpg", label: "Bathroom 2 · 2", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-2/img-2656-hdr.jpg", label: "Bathroom 2 · 3", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-3/dsf2651-hdr.jpg", label: "Bathroom 3 · 1", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-3/dsf2670-hdr.jpg", label: "Bathroom 3 · 2", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-3/dsf2676-hdr.jpg", label: "Bathroom 3 · 3", category: "Bathrooms" },
  { src: "/villa/otg1/bathroom-3/img-2646edit.jpg", label: "Bathroom 3 · 4", category: "Bathrooms" },
];

const otg2Photos: Photo[] = [
  { src: "/villa/outdoor/exterior-2.jpg", label: "Villa Exterior", category: "Outdoor" },
  { src: "/villa/outdoor/exterior.jpg", label: "Villa Façade", category: "Outdoor" },
  { src: "/villa/outdoor/copy-of-dsf0093.jpg", label: "Villa Grounds", category: "Outdoor" },
  { src: "/villa/otg2/living-room/img-2586edit.jpg", label: "Living Room · 1", category: "Living" },
  { src: "/villa/otg2/living-room/img-2591edit.jpg", label: "Living Room · 2", category: "Living" },
  { src: "/villa/otg2/living-room/img-2593edit.jpg", label: "Living Room · 3", category: "Living" },
  { src: "/villa/otg2/living-room/img-2595edit.jpg", label: "Living Room · 4", category: "Living" },
  { src: "/villa/otg2/bedroom-1/dsf0121-hdr.jpg", label: "Bedroom 1 · 1", category: "Bedrooms" },
  { src: "/villa/otg2/bedroom-1/img-2601edit.jpg", label: "Bedroom 1 · 2", category: "Bedrooms" },
  { src: "/villa/otg2/bedroom-1/img-2603edit.jpg", label: "Bedroom 1 · 3", category: "Bedrooms" },
  { src: "/villa/otg2/bedroom-2/dsf0120-hdr.jpg", label: "Bedroom 2 · 1", category: "Bedrooms" },
  { src: "/villa/otg2/bedroom-2/img-2602edit.jpg", label: "Bedroom 2 · 2", category: "Bedrooms" },
  { src: "/villa/otg2/kitchen/img-2598edit.jpg", label: "Kitchen · 1", category: "Kitchen" },
  { src: "/villa/otg2/kitchen/img-2600edit.jpg", label: "Kitchen · 2", category: "Kitchen" },
  { src: "/villa/otg2/bathroom-1/img-2617edit.jpg", label: "Bathroom 1 · 1", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-1/img-2621edit.jpg", label: "Bathroom 1 · 2", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-2/img-2608edit.jpg", label: "Bathroom 2", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-3/img-20260714-wa0003.jpg", label: "Bathroom 3 · 1", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-3/img-20260714-wa0004.jpg", label: "Bathroom 3 · 2", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-3/img-20260714-wa0005.jpg", label: "Bathroom 3 · 3", category: "Bathrooms" },
  { src: "/villa/otg2/bathroom-3/img-20260714-wa0006.jpg", label: "Bathroom 3 · 4", category: "Bathrooms" },
];

export const properties: Record<PropertyId, Property> = {
  otg1: {
    id: "otg1",
    name: "Off The Grid Villas Lonavala 1",
    shortName: "Off The Grid - 1",
    tagline: "Entire Villa Private · with Bathtub",
    intro: introCommon,
    highlights: [...baseHighlights, "Bathtub"],
    hero: HERO_OTG1,
    mosaic: [
      "/villa/otg1/living-room/img-2551edit.jpg",
      "/villa/otg1/bedroom-1/dsf2740-hdr.jpg",
      "/villa/otg1/kitchen/dsf0006-hdr.jpg",
      "/villa/otg1/bathroom-2/dsf2808-hdr.jpg",
    ],
    photos: otg1Photos,
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
    hero: HERO_OTG2,
    mosaic: [
      "/villa/otg2/living-room/img-2586edit.jpg",
      "/villa/otg2/bedroom-1/dsf0121-hdr.jpg",
      "/villa/otg2/kitchen/img-2598edit.jpg",
      "/villa/otg2/bathroom-1/img-2617edit.jpg",
    ],
    photos: otg2Photos,
    hasBathtub: false,
    icalUrl: "https://www.airbnb.com/calendar/ical/30217589.ics?t=02a0077437b748cf9196907548f408d5&locale=en-GB",
  },
};

export const propertyList: Property[] = [properties.otg1, properties.otg2];
