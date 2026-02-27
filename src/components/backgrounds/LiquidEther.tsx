'use client';

import { motion } from 'framer-motion';

interface LiquidEtherProps {
  className?: string;
}

export default function LiquidEther({ className = '' }: LiquidEtherProps) {
  return (
    <div className={`fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden ${className}`}>
      {/* Copper grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,115,51,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,115,51,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

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
