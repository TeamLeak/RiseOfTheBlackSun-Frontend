// components/grid.tsx
"use client";
import { motion } from "framer-motion";

export const GlowingGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <svg
      className="w-full h-full opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(to right, #1a1a1a 1px, transparent 1px),
          linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {[...Array(50)].map((_, i) => (
        <motion.rect
          key={i}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1.5, 0],
          }}
          fill="#4CAF50"
          height="40"
          initial={{ opacity: 0 }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          width="40"
          x={Math.random() * 100 + "%"}
          y={Math.random() * 100 + "%"}
        />
      ))}
    </svg>
  </div>
);
