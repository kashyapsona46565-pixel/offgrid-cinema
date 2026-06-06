import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import BookingWarning from "@/components/site/BookingWarning";
import { galleryCategories } from "@/data/villa";
import { useProperty } from "@/context/PropertyContext";

const Gallery = () => {
  const { selected } = useProperty();
  const [open, setOpen] = useState<number | null>(null);
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>("All");

  const items = useMemo(
    () => (cat === "All" ? selected.photos : selected.photos.filter((g) => g.category === cat)),
    [cat, selected]
  );

  const next = () => setOpen((i) => (i === null ? i : (i + 1) % items.length));
  const prev = () => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 pt-36 md:px-6 md:pt-40">
        <Reveal>
          <BookingWarning className="mb-6" />
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Gallery</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{selected.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Switch the property above to see its photos.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
        <div className="mb-6 flex flex-wrap gap-2 md:justify-center">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm transition-all ${
                cat === c
                  ? "border-transparent bg-primary-gradient text-primary-foreground shadow-warm"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {items.map((g, i) => (
            <Reveal key={`${selected.id}-${i}`} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl shadow-warm ${
                  i % 7 === 0 ? "md:row-span-2 md:h-[600px]" : "h-[220px] md:h-[290px]"
                }`}
              >
                <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 text-left text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-display text-lg">{g.label}</div>
                  <div className="text-xs opacity-80">{g.category}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-foreground/90 p-6 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <button className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-background/40 text-background" onClick={() => setOpen(null)} aria-label="Close"><X /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-background/40 text-background"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-background/40 text-background"><ChevronRight /></button>
            <motion.img
              key={open}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}
              src={items[open].src} alt={items[open].label}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-warm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
