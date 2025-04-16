"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  const spinTransition = {
    loop: Number.POSITIVE_INFINITY,
    ease: "linear",
    duration: 1,
  };

  const bounceTransition = {
    y: {
      duration: 0.6,
      yoyo: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <motion.span
          className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-600 border-r-blue-400 border-b-blue-300 border-l-blue-500 opacity-75"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
        <motion.span
          className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-indigo-600 opacity-75"
          animate={{ rotate: -360 }}
          transition={{
            ...spinTransition,
            duration: 1.5,
          }}
        />
      </div>
      <motion.div
        animate={{ y: ["0%", "-15%", "0%"] }}
        transition={bounceTransition}
        className="text-blue-600 font-medium"
      >
        Loading tasks...
      </motion.div>
    </div>
  );
}
