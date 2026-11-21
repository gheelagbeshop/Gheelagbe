import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 240);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={scrollToTop}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: [0, -7, 0] }
          }
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{
            opacity: { duration: 0.2 },
            y: shouldReduceMotion
              ? { duration: 0.2 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.13 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
          className="fixed bottom-5 right-5 z-[9998] flex h-12 w-12 items-center justify-center rounded-full border border-[#254D32]/30 bg-[#fffdf2] text-[#254D32] shadow-[0_4px_16px_rgba(25,59,38,0.16)] transition-colors hover:bg-[#E8F0E8] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        >
          <ChevronUp size={25} strokeWidth={2.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
