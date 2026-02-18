'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header/Header';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Old TV static noise animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Create authentic TV static - high contrast black/white pixels
      for (let i = 0; i < data.length; i += 4) {
        // Random value - either very bright or very dark for high contrast
        const value = Math.random() > 0.5 ? 255 : 0;
        data[i] = value;     // Red
        data[i + 1] = value; // Green
        data[i + 2] = value; // Blue
        data[i + 3] = Math.random() * 80 + 30; // Variable opacity (30-110)
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(drawNoise);
    };

    drawNoise();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* Hide global header and render our own with light variant */}
      <style jsx global>{`
        body > div:first-of-type > header {
          display: none;
        }
      `}</style>

      <Header variant="light" />

      <main className="relative min-h-screen flex items-center justify-center bg-near-black px-6 py-32 overflow-hidden">
      {/* Old TV Static Noise Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-[#0a0a0a] to-near-black opacity-90" />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(184, 115, 51, 0.03) 2px, rgba(184, 115, 51, 0.03) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto w-full text-center">
        {/* Glitching 404 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative inline-block"
            animate={{
              x: [0, -2, 2, -2, 0],
              skewX: [0, -2, 2, -2, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          >
            <span
              className="text-9xl sm:text-[12rem] lg:text-[14rem] font-bold font-display text-copper-500 tracking-tighter leading-none"
              style={{
                textShadow: '2px 2px 0 rgba(184, 115, 51, 0.3), -2px -2px 0 rgba(184, 115, 51, 0.3)',
              }}
            >
              404
            </span>
            {/* Glitch layers */}
            <span
              className="absolute inset-0 text-9xl sm:text-[12rem] lg:text-[14rem] font-bold font-display text-cyan-500 tracking-tighter leading-none opacity-70 mix-blend-screen"
              style={{
                clipPath: 'inset(0 0 80% 0)',
                transform: 'translateX(-3px)',
              }}
              aria-hidden="true"
            >
              404
            </span>
            <span
              className="absolute inset-0 text-9xl sm:text-[12rem] lg:text-[14rem] font-bold font-display text-red-500 tracking-tighter leading-none opacity-70 mix-blend-screen"
              style={{
                clipPath: 'inset(80% 0 0 0)',
                transform: 'translateX(3px)',
              }}
              aria-hidden="true"
            >
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Glitching Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-brand-header mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span
            animate={{
              opacity: [1, 0.8, 1, 0.8, 1],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            SIGNAL DISRUPTED.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontFamily: 'monospace' }}
        >
          ERROR: The requested endpoint does not exist in the Zera infrastructure.
          <br />
          <span className="text-copper-500">→ Redirecting to safe coordinates...</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center whitespace-nowrap gap-3 px-6 sm:px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white font-medium text-sm tracking-brand-label uppercase transition-all duration-300 w-full sm:w-auto min-h-[48px] hover:shadow-lg hover:shadow-copper-500/30"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Return to Home
            <Home className="w-4 h-4" strokeWidth={2} />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-center whitespace-nowrap gap-3 px-6 sm:px-8 py-4 bg-white/5 hover:bg-white/10 border border-copper-500/30 hover:border-copper-500 text-white font-medium text-sm tracking-brand-label uppercase transition-all duration-300 w-full sm:w-auto min-h-[48px]"
          >
            Report Issue
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xs text-white/40 uppercase tracking-wider mb-4" style={{ fontFamily: 'monospace' }}>
            Quick Access
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-copper-500 hover:text-copper-400 transition-colors duration-200 uppercase tracking-wide"
            >
              Intelligence Briefings
            </Link>
            <Link
              href="/booking"
              data-gtm-event="cta_book_strategy"
              data-gtm-location="not_found"
              className="text-sm font-medium text-copper-500 hover:text-copper-400 transition-colors duration-200 uppercase tracking-wide"
            >
              Strategy Session
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-copper-500 hover:text-copper-400 transition-colors duration-200 uppercase tracking-wide"
            >
              Growth Systems
            </Link>
          </nav>
        </motion.div>
      </div>
    </main>
    </>
  );
}
