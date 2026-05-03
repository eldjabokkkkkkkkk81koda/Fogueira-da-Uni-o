import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export const PhoenixBonfire = memo(function PhoenixBonfire({
  sparkCount,
  clickTrigger,
}: {
  sparkCount: number;
  clickTrigger: number;
}) {
  const progress = Math.min(sparkCount / 1000, 1);
  // As sparkCount increases, the flame gets larger and more intense.
  const scaleIntensity = 0.8 + progress * 0.4;

  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Smooth minimalist upward particles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: 100 + Math.random() * 100, // centered around 150
          y: 280,
          size: 1 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
        };
        return [...prev, newSparkle].slice(-25);
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Burst on click
  useEffect(() => {
    if (clickTrigger > 0) {
      const burst = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: 120 + Math.random() * 60,
        y: 260 + Math.random() * 20,
        size: 2 + Math.random() * 3,
        opacity: 0.6 + Math.random() * 0.4,
        duration: 1 + Math.random() * 1.5,
      }));
      setSparkles((prev) => [...prev, ...burst].slice(-40));
    }
  }, [clickTrigger]);

  return (
    <div className="relative w-full max-w-[400px] h-[400px] mx-auto flex items-end justify-center pointer-events-none select-none">
      {/* Deep minimalist glow */}
      <motion.div
        key={`ambient-glow-${clickTrigger}`}
        className="absolute bottom-[20%] w-[300px] h-[300px] rounded-full blur-[90px] pointer-events-none mix-blend-screen"
        style={{ backgroundColor: "#8C1C2A" }}
        initial={{ opacity: 0.2, scale: 1 }}
        animate={{
          opacity: clickTrigger > 0 ? [0.6, 0.2] : [0.2, 0.3, 0.2],
          scale: clickTrigger > 0 ? [1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: clickTrigger > 0 ? 1 : 4,
          repeat: clickTrigger > 0 ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Core glow */}
      <motion.div
        key={`core-glow-${clickTrigger}`}
        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full blur-[50px] pointer-events-none mix-blend-screen z-10"
        style={{ backgroundColor: "#E4BA4B" }}
        initial={{ opacity: 0.1, scale: 1 }}
        animate={{
          opacity: clickTrigger > 0 ? [0.5, 0.1] : [0.1, 0.2, 0.1],
          scale: clickTrigger > 0 ? [1.2, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: clickTrigger > 0 ? 0.8 : 3,
          repeat: clickTrigger > 0 ? 0 : Infinity,
          ease: "easeOut",
        }}
      />

      <svg
        viewBox="0 0 300 400"
        className="w-full h-full relative z-20 overflow-visible"
      >
        <defs>
          <linearGradient id="flame-grad-1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3A0B12" />
            <stop offset="40%" stopColor="#8C1C2A" />
            <stop offset="100%" stopColor="#E4BA4B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flame-grad-2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8C1C2A" />
            <stop offset="60%" stopColor="#E4BA4B" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          style={{ transformOrigin: "150px 320px" }}
          animate={{ scale: scaleIntensity }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          {/* Abstract minimalist flames */}
          <motion.g
            style={{ transformOrigin: "150px 320px" }}
            animate={{
              scaleY: clickTrigger > 0 ? [1.05, 1] : [1, 1.02, 1],
              scaleX: clickTrigger > 0 ? [0.98, 1] : [1, 0.99, 1],
            }}
            transition={{
              duration: clickTrigger > 0 ? 0.6 : 3,
              repeat: clickTrigger > 0 ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Left Flame Silhouette */}
            <motion.path
              d="M150 100 C110 180 80 250 150 320 C200 250 170 180 150 100 Z"
              fill="url(#flame-grad-1)"
              style={{ mixBlendMode: "screen", opacity: 0.8 }}
              animate={{
                d: [
                  "M150 100 C 110 180, 80 250, 150 320 C 180 260, 170 200, 150 100 Z",
                  "M150 80  C 100 180, 70 260, 150 320 C 190 260, 180 200, 150 80 Z",
                  "M150 100 C 110 180, 80 250, 150 320 C 180 260, 170 200, 150 100 Z",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right Flame Silhouette */}
            <motion.path
              d="M150 120 C130 190 110 260 150 320 C200 260 190 190 150 120 Z"
              fill="url(#flame-grad-1)"
              style={{ mixBlendMode: "screen", opacity: 0.9 }}
              animate={{
                d: [
                  "M150 120 C 130 190, 110 260, 150 320 C 200 260, 190 190, 150 120 Z",
                  "M150 100 C 120 190, 100 250, 150 320 C 210 250, 200 190, 150 100 Z",
                  "M150 120 C 130 190, 110 260, 150 320 C 200 260, 190 190, 150 120 Z",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Center Glowing Core */}
            <motion.path
              d="M150 160 C135 220 125 270 150 320 C175 270 165 220 150 160 Z"
              fill="url(#flame-grad-2)"
              filter="url(#glow-blur)"
              style={{ mixBlendMode: "screen" }}
              animate={{
                d: [
                  "M150 160 C 135 220, 125 270, 150 320 C 175 270, 165 220, 150 160 Z",
                  "M150 140 C 130 210, 120 280, 150 320 C 180 280, 170 210, 150 140 Z",
                  "M150 160 C 135 220, 125 270, 150 320 C 175 270, 165 220, 150 160 Z",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          {/* Upward Minimalist Sparks */}
          <AnimatePresence>
            {sparkles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#E4BA4B"
                style={{ mixBlendMode: "screen" }}
                initial={{ opacity: 0, cx: p.x, cy: p.y, scale: 0 }}
                animate={{
                  opacity: [0, p.opacity, 0],
                  cy: p.y - 120 - Math.random() * 80,
                  scale: [0, 1, 0.5],
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                onAnimationComplete={() => {
                  setSparkles((prev) =>
                    prev.filter((particle) => particle.id !== p.id),
                  );
                }}
              />
            ))}
          </AnimatePresence>
        </motion.g>
      </svg>
    </div>
  );
});
