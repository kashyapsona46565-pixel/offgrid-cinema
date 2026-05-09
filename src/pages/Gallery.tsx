import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { gallery } from "@/data/villa";

const Gallery = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Layout>
      <section className="pt-40 pb-12 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Gallery</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Frames from the villa.</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl shadow-card ${
                  i % 5 === 0 ? "md:row-span-2 md:h-[640px]" : "h-[280px] md:h-[310px]"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/0 transition-all group-hover:ring-primary/30" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-display text-xl">{g.label}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-foreground/20 hover:border-primary hover:text-primary"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <motion.img
              key={open}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={gallery[open].src}
              alt={gallery[open].label}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-warm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;