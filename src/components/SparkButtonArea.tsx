import { memo } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";

export const SparkButtonArea = memo(function SparkButtonArea({
  onAddSpark,
  sparkCount,
}: {
  onAddSpark: () => void;
  sparkCount: number;
}) {
  const goal = 1000;
  const progress = Math.min(sparkCount / goal, 1);
  const circumference = 2 * Math.PI * 110;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex justify-center items-center my-16 w-[300px] h-[300px] mx-auto">
      {/* Subtle pulse behind button on hover/idle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#8C1C2A]/10 blur-[40px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Progress Ring Background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
        <circle
          cx="150"
          cy="150"
          r="110"
          fill="transparent"
          stroke="#222"
          strokeWidth="2"
        />
        <motion.circle
          cx="150"
          cy="150"
          r="110"
          fill="transparent"
          stroke="#E4BA4B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Small subtle text indicating progress */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[#F0F0F0]/30 font-medium whitespace-nowrap">
        {Math.floor(progress * 100)}% DA CHAMA
      </div>

      {/* Button */}
      <motion.button
        onClick={onAddSpark}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative w-[180px] h-[180px] rounded-full bg-[#050505] flex flex-col justify-center items-center border border-[#8C1C2A]/30 z-10 transition-colors hover:border-[#E4BA4B]/50 hover:bg-[#0A0A0A] cursor-pointer overflow-hidden group shadow-[0_0_50px_rgba(140,28,42,0.15)] hover:shadow-[0_0_50px_rgba(228,186,75,0.15)]"
      >
        <motion.div className="absolute inset-0 bg-gradient-to-t from-[#8C1C2A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Flame
          size={40}
          className="text-[#E4BA4B] mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          strokeWidth={1}
        />
        <span className="font-bebas text-2xl text-[#F0F0F0] tracking-[0.2em] leading-none mb-1 opacity-90">
          Adicionar
        </span>
        <span className="font-bebas text-2xl text-[#E4BA4B] tracking-[0.2em] leading-none opacity-80 group-hover:opacity-100 transition-opacity">
          Faísca
        </span>
      </motion.button>
    </div>
  );
});
