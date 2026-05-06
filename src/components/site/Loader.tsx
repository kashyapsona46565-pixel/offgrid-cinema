import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Loader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="font-display text-5xl md:text-7xl text-glow text-primary">
                Off The Grid
              </div>
              <div className="mt-3 tracking-[0.5em] text-xs text-muted-foreground uppercase">
                Disconnect to Reconnect
              </div>
              <div className="mx-auto mt-8 h-[2px] w-48 overflow-hidden bg-muted">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="h-full w-full bg-neon"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;