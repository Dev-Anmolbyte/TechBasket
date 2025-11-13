// src/data/variant.js

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: "easeOut",
    },
  },
};

// src/data/variant.js

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  whileHover: {
    scale: 1.03,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.12)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  whileTap: {
    scale: 0.98,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.15,
    },
  },
};

