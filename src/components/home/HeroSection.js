'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Clock, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[96vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#100E0D]">
      {/* Background Cinematic Dining Image with Slow Subtle Ambient Shift */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85"
            alt="NOOR Indian Dining Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        </motion.div>
        {/* Subtle Multi-layer Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#100E0D]/65 to-[#100E0D]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100E0D]/85 via-transparent to-[#100E0D]/85" />
      </div>

      {/* Subtle Fine Grain */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-grain opacity-30" />

      {/* Hero Typography & Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 flex flex-col items-center">
        {/* Editorial Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#B89A63] font-medium mb-5"
        >
          CONTEMPORARY INDIAN DINING
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-serif text-6xl sm:text-8xl md:text-9xl font-light tracking-[0.2em] text-[#FAF7F2] uppercase leading-none drop-shadow-xl"
        >
          NOOR
        </motion.h1>

        {/* Editorial Reimagined Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B89A63] mt-3 sm:mt-4 mb-6 font-normal tracking-wide"
        >
          India, Reimagined.
        </motion.p>

        {/* Short, Restrained Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="max-w-xl text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-10 text-balance"
        >
          Royal Awadhi and Kashmiri recipes reinterpreted with 36-hour charcoal slow-cooking, single-origin spices, and modern culinary restraint.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <Button href="/menu" variant="primary" size="md" className="w-full sm:w-auto">
            Explore Menu
          </Button>
          <Button href="/book" variant="outline" size="md" className="w-full sm:w-auto">
            Reserve a Table
          </Button>
        </motion.div>

        {/* Secondary Supporting Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 sm:mt-18 pt-6 border-t border-stone-800/80 w-full max-w-lg flex items-center justify-between text-[11px] sm:text-xs text-stone-400 font-light"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B89A63]" />
            <span>Diplomatic Enclave · New Delhi</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B89A63]" />
            <span>12:00 PM — 11:30 PM · Daily</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#B89A63]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
