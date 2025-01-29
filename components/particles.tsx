// components/particles.tsx
"use client";
import { motion } from "framer-motion";

export const GlowingParticles = ({
  density = 30,
  color = "#4CAF5050",
}: {
  density?: number;
  color?: string;
}) => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(density)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0, 1.5, 0],
          transition: {
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          },
        }}
        className="absolute w-1 h-1 rounded-full"
        initial={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0,
          scale: 0,
        }}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);
