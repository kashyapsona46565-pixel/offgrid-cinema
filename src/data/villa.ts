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

export const images = {
  exterior1, exterior2, bath1, bath2, bath3,
  bedroom1, bedroom2, bedroom3, bedroom4, bedroom5, bedroom6, bedroom7,
  living1, living2, living3, kitchen1, kitchen2, kitchen3,
};

export const gallery = [
  { src: exterior1, label: "Villa Façade" },
  { src: living2, label: "Grand Living & Dining" },
  { src: bedroom5, label: "Master Bedroom" },
  { src: living1, label: "Lounge with Smart TV" },
  { src: bath1, label: "Spa Bath" },
  { src: exterior2, label: "Mountain Approach" },
  { src: kitchen2, label: "Open Kitchen" },
  { src: bedroom2, label: "Garden Bedroom" },
  { src: living3, label: "Marble Dining Hall" },
  { src: bath2, label: "Powder Room" },
  { src: bedroom4, label: "Marble Suite" },
  { src: kitchen1, label: "Stocked Pantry" },
  { src: bath3, label: "Indigo Bath" },
  { src: bedroom6, label: "Plaid Suite" },
  { src: bedroom1, label: "Lounge Bedroom" },
  { src: kitchen3, label: "Chef's Corner" },
  { src: bedroom3, label: "Twilight Suite" },
  { src: bedroom7, label: "Indigo Bedroom" },
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