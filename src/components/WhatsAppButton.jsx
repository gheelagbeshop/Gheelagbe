
import { motion, useReducedMotion } from "framer-motion";

const WhatsAppButton = () => {
  const phoneNumber = "8801644945406"; 
  const message = encodeURIComponent(
    "Hello GheeLagbe! I would like to know more about your products."
  );

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-[84px] right-5 z-[9999] sm:bottom-[104px] sm:right-6"
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -7, 0],
            }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Pulse rings */}
      {!shouldReduceMotion && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{
              scale: [1, 1.8],
              opacity: [0.45, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{
              scale: [1, 1.5],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* Tooltip */}
      <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#193B26] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
        Chat with us on WhatsApp
      </div>

      {/* WhatsApp button */}
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with GheeLagbe on WhatsApp"
        title="Chat with us on WhatsApp"
        whileHover={shouldReduceMotion ? {} : { scale: 1.13 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_5px_20px_rgba(37,211,102,0.4)] transition-colors duration-300 hover:bg-[#20BA5A] hover:shadow-[0_8px_28px_rgba(37,211,102,0.55)] sm:h-16 sm:w-16"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 sm:h-9 sm:w-9"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, -8, 8, 0],
                }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.9 11.9 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.42ZM12.07 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.85 9.85 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.91 7.01c0 5.47-4.45 9.92-9.94 9.92Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.26.48 1.69.61.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
