import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export function SparkButtonArea({ onAddSpark, sparkCount }: { onAddSpark: () => void, sparkCount: number }) {
  const goal = 1000;
  const progress = Math.min(sparkCount / goal, 1);
  const circumference = 2 * Math.PI * 110;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex justify-center items-center my-12 w-[300px] h-[300px] mx-auto">
      {/* Ripple ring from the button on click */}
      <motion.div
        key={`ripple-${sparkCount}`}
        className="absolute inset-0 rounded-full border border-[#DAAF37]/50 pointer-events-none"
        initial={{ opacity: 0.8, scale: 0.65 }}
        animate={{ opacity: 0, scale: 1.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Background glow behind button */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-[#6B0D1A]/20 blur-xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Progress Ring Background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
         <circle
           cx="150" cy="150" r="110"
           fill="transparent"
           stroke="#222"
           strokeWidth="8"
         />
         <motion.circle
           cx="150" cy="150" r="110"
           fill="transparent"
           stroke="#DAAF37"
           strokeWidth="8"
           strokeLinecap="round"
           strokeDasharray={circumference}
           animate={{ strokeDashoffset: offset }}
           transition={{ duration: 1 }}
         />
      </svg>
      
      {/* Progress Label inside ring constraints if you want, but sticking to tooltip under circle */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#E6E6E6]/40 pointer-events-none whitespace-nowrap">
        {Math.floor(progress * 100)}% da União
      </div>

      {/* Button */}
      <motion.button
        onClick={onAddSpark}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-[190px] h-[190px] rounded-full bg-[#6B0D1A] flex flex-col justify-center items-center shadow-[0_0_30px_rgba(107,13,26,0.6)] border-[3px] border-[#DAAF37] z-10 transition-colors hover:bg-[#8e1927] cursor-pointer overflow-hidden group"
      >
         <motion.div 
           className="absolute inset-0 bg-gradient-to-t from-[#DAAF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
         />
         <Flame size={48} className="text-[#DAAF37] mb-2 drop-shadow-[0_0_8px_rgba(218,175,55,1)]" strokeWidth={1.5} />
         <span className="font-bebas text-2xl md:text-3xl text-[#E6E6E6] tracking-widest leading-none">Adicionar</span>
         <span className="font-bebas text-2xl md:text-3xl text-[#DAAF37] tracking-widest leading-none drop-shadow-md">Faísca</span>
      </motion.button>
    </div>
  );
}
