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

export const images = {
  exterior1, exterior2, bath1, bath2, bath3,
  bedroom1, bedroom2, bedroom3, bedroom4, bedroom5,
};

export const gallery = [
  { src: exterior1, label: "Villa Façade" },
  { src: bedroom5, label: "Master Bedroom" },
  { src: bath1, label: "Spa Bath" },
  { src: exterior2, label: "Mountain Approach" },
  { src: bedroom2, label: "Garden Bedroom" },
  { src: bath2, label: "Powder Room" },
  { src: bedroom4, label: "Marble Suite" },
  { src: bath3, label: "Indigo Bath" },
  { src: bedroom1, label: "Lounge Bedroom" },
  { src: bedroom3, label: "Twilight Suite" },
];

export const WHATSAPP =
  "https://wa.me/919999999999?text=Hi%20I'd%20like%20to%20book%20Off%20The%20Grid%20villa";

// Demo blocked dates (would be parsed from Airbnb .ics)
export const blockedDates: string[] = (() => {
  const out: string[] = [];
  const today = new Date();
  const add = (d: Date) => out.push(d.toISOString().slice(0, 10));
  for (let i = 3; i < 6; i++) { const d = new Date(today); d.setDate(d.getDate() + i); add(d); }
  for (let i = 12; i < 15; i++) { const d = new Date(today); d.setDate(d.getDate() + i); add(d); }
  for (let i = 22; i < 25; i++) { const d = new Date(today); d.setDate(d.getDate() + i); add(d); }
  return out;
})();