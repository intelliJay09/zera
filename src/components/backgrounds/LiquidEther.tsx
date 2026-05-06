'use client';

import { motion } from 'framer-motion';

interface LiquidEtherProps {
  className?: string;
}

export default function LiquidEther({ className = '' }: LiquidEtherProps) {
  return (
    <div className={`fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden ${className}`}>
      {/* Single drifting copper glow */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(184,115,51,0.18) 0%, rgba(184,115,51,0.06) 45%, transparent 70%)',
          left: 'calc(50% - 450px)',
          top: 'calc(50% - 450px)',
        }}
        animate={{
          x: [-100, 120, -60, 90, -100],
          y: [-80, 70, -110, 40, -80],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
