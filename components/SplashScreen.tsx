"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "./GooeyText";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-warm-bg"
        >
          <GooeyText
            texts={[
              "欢迎来到 润禾泽宠",
              "润养本草 恩泽爱宠",
              "药食同源 日常养护",
            ]}
            morphTime={1.2}
            cooldownTime={0.3}
            textClassName="font-brush text-5xl md:text-7xl"
            className="h-32"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            exit={{ opacity: 0 }}
            className="font-serif italic text-lg text-warm-text-dim mt-8"
          >
            Herbal nutrition, honest love.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
