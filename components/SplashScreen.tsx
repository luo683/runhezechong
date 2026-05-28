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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #e8dfd0 0%, #dfd3c0 100%)" }}
        >
          {/* SSR 时立即可见的品牌文字 */}
          <h1 className="font-brush text-5xl sm:text-6xl md:text-8xl text-warm-text tracking-wide mb-6">
            润禾泽宠
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-warm-text-dim/60">
            Herbal nutrition, honest love.
          </p>

          {/* JS 加载后 GooeyText 覆盖在上面做动画 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GooeyText
              texts={[
                "欢迎来到 润禾泽宠",
                "润养本草 恩泽爱宠",
                "药食同源 日常养护",
              ]}
              morphTime={1.2}
              cooldownTime={0.3}
              textClassName="font-brush text-3xl sm:text-5xl md:text-7xl"
              className="h-32"
            />
          </div>

          <p className="font-serif italic text-base sm:text-lg text-warm-text-dim/40 mt-8 relative z-10">
            药食同源 日常养护
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
