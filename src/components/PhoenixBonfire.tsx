import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  duration: number;
}

export function PhoenixBonfire({ sparkCount, clickTrigger }: { sparkCount: number, clickTrigger: number }) {
  const progress = Math.min(sparkCount / 1000, 1);
  const intensity = 0.5 + progress * 0.5;

  const [particles, setParticles] = useState<Particle[]>([]);

  // Constant background sparks
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: 150 + (Math.random() - 0.5) * 40,
          y: 280,
          tx: 150 + (Math.random() - 0.5) * 150,
          ty: 50 + Math.random() * 100,
          size: 1 + Math.random() * 2.5,
          color: Math.random() > 0.5 ? '#DAAF37' : '#FF8C00',
          duration: 1.5 + Math.random() * 2
        }
      ].slice(-30));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Burst on click
  useEffect(() => {
    if (clickTrigger > 0) {
      const burst = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: 150 + (Math.random() - 0.5) * 60,
        y: 260 + (Math.random() - 0.5) * 20,
        tx: 150 + (Math.random() - 0.5) * 300,
        ty: -40 + Math.random() * 150,
        size: 2 + Math.random() * 4,
        color: Math.random() > 0.3 ? '#DAAF37' : '#FFFFFF',
        duration: 0.8 + Math.random() * 1.5
      }));
      setParticles(prev => [...prev, ...burst].slice(-80));
    }
  }, [clickTrigger]);

  return (
    <div className="relative w-full max-w-[450px] h-[400px] mx-auto flex items-end justify-center pointer-events-none">
      
      {/* Background radial glow that reacts to clicks */}
      <motion.div
        key={`glow-${clickTrigger}`}
        className="absolute bottom-[10%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none mix-blend-screen"
        style={{ backgroundColor: '#D84315' }}
        initial={{ opacity: 0.4 * intensity, scale: 1 }}
        animate={{ 
           opacity: clickTrigger > 0 ? [0.8 * intensity, 0.4 * intensity] : [0.3 * intensity, 0.5 * intensity, 0.3 * intensity], 
           scale: clickTrigger > 0 ? [1.1, 1] : [1, 1.05, 1] 
        }}
        transition={{ duration: clickTrigger > 0 ? 1 : 4, repeat: clickTrigger > 0 ? 0 : Infinity, ease: 'easeOut' }}
      />
      
      {/* Inner intense glow */}
      <motion.div
        key={`glow-inner-${clickTrigger}`}
        className="absolute bottom-[20%] w-[150px] h-[150px] rounded-full blur-[60px] pointer-events-none mix-blend-screen z-10"
        style={{ backgroundColor: '#DAAF37' }}
        initial={{ opacity: 0.2 * intensity, scale: 1 }}
        animate={{ 
           opacity: clickTrigger > 0 ? [0.6 * intensity, 0.2 * intensity] : [0.1 * intensity, 0.3 * intensity, 0.1 * intensity], 
           scale: clickTrigger > 0 ? [1.3, 1] : [1, 1.1, 1] 
        }}
        transition={{ duration: clickTrigger > 0 ? 0.8 : 3, repeat: clickTrigger > 0 ? 0 : Infinity, ease: 'easeOut' }}
      />

      <svg viewBox="0 0 300 350" className="w-full h-full relative z-20 overflow-visible">
         <defs>
            <linearGradient id="flame-outer" x1="0" y1="1" x2="0" y2="0">
               <stop offset="0%" stopColor="#4A0711" />
               <stop offset="40%" stopColor="#9b1b1f" />
               <stop offset="100%" stopColor="#bf360c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flame-mid" x1="0" y1="1" x2="0" y2="0">
               <stop offset="0%" stopColor="#6B0D1A" />
               <stop offset="50%" stopColor="#d84315" />
               <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flame-inner" x1="0" y1="1" x2="0" y2="0">
               <stop offset="0%" stopColor="#ff8f00" />
               <stop offset="50%" stopColor="#ffe082" />
               <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
            <filter id="soft-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
         </defs>

         <motion.g 
           style={{ transformOrigin: '150px 300px' }} 
           animate={{ scale: 0.8 + progress * 0.3 }}
           transition={{ type: 'spring', bounce: 0.5 }}
         >
           
           {/* Particles / Sparks */}
           <AnimatePresence>
              {particles.map(p => (
                 <motion.circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={p.size}
                    fill={p.color}
                    style={{ mixBlendMode: 'screen' }}
                    initial={{ opacity: 1, cx: p.x, cy: p.y, scale: 1 }}
                    animate={{ opacity: 0, cx: p.tx, cy: p.ty, scale: 0 }}
                    transition={{ duration: p.duration, ease: 'easeOut' }}
                    onAnimationComplete={() => {
                       setParticles(prev => prev.filter(particle => particle.id !== p.id));
                    }}
                 />
              ))}
           </AnimatePresence>

           {/* Flames Group */}
           <motion.g 
              style={{ transformOrigin: '150px 300px' }}
              animate={{ 
                 scaleY: clickTrigger > 0 ? [1.1, 1] : [1, 1.05, 1],
                 scaleX: clickTrigger > 0 ? [0.95, 1] : [1, 0.98, 1]
              }}
              transition={{ duration: clickTrigger > 0 ? 0.6 : 2, repeat: clickTrigger > 0 ? 0 : Infinity, ease: "easeInOut" }}
           >
               {/* Outer Flame */}
               <motion.path
                 d="M150 40 C100 140 40 250 150 300 C260 250 200 140 150 40 Z"
                 fill="url(#flame-outer)"
                 filter="url(#soft-blur)"
                 style={{ mixBlendMode: 'screen' }}
                 animate={{
                   d: [
                     "M150 40 C100 140 40 250 150 300 C260 250 200 140 150 40 Z",
                     "M150 20 C80 150 50 260 150 300 C250 260 220 150 150 20 Z",
                     "M150 40 C100 140 40 250 150 300 C260 250 200 140 150 40 Z"
                   ]
                 }}
                 transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
               />
               
               {/* Middle Flame */}
               <motion.path
                 d="M150 90 C120 160 70 240 150 300 C230 240 180 160 150 90 Z"
                 fill="url(#flame-mid)"
                 style={{ mixBlendMode: 'screen' }}
                 animate={{
                   d: [
                     "M150 90 C120 160 70 240 150 300 C230 240 180 160 150 90 Z",
                     "M150 70 C90 170 90 230 150 300 C210 230 210 170 150 70 Z",
                     "M150 90 C120 160 70 240 150 300 C230 240 180 160 150 90 Z"
                   ]
                 }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               />
               
               {/* Inner Flame */}
               <motion.path
                 d="M150 150 C130 210 100 260 150 300 C200 260 170 210 150 150 Z"
                 fill="url(#flame-inner)"
                 style={{ mixBlendMode: 'screen' }}
                 animate={{
                   d: [
                     "M150 150 C130 210 100 260 150 300 C200 260 170 210 150 150 Z",
                     "M150 130 C120 200 110 250 150 300 C190 250 180 200 150 130 Z",
                     "M150 150 C130 210 100 260 150 300 C200 260 170 210 150 150 Z"
                   ]
                 }}
                 transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
               />
           </motion.g>

           {/* Logs - Moved to Front for proper z-depth feeling */}
           <g transform="translate(0, -10)">
             {/* Back logs */}
             <path d="M80 300 L220 300 L200 320 L100 320 Z" fill="#1f0f0e" />
             {/* Front crossing logs */}
             <path d="M50 280 L230 330 L210 350 L30 300 Z" fill="#2d1615" stroke="#110706" strokeWidth="2" />
             <path d="M250 280 L70 330 L90 350 L270 300 Z" fill="#381d1b" stroke="#110706" strokeWidth="2" />
             <path d="M120 280 L180 280 L170 340 L130 340 Z" fill="#4a2522" stroke="#110706" strokeWidth="2" />
             
             {/* Embers on logs */}
             <motion.circle cx="150" cy="330" r="3" fill="#ffb300" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
             <motion.circle cx="90" cy="310" r="2" fill="#ff7a00" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
             <motion.circle cx="210" cy="320" r="2.5" fill="#ff4500" animate={{ opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
           </g>



         </motion.g>
      </svg>
    </div>
  );
}
