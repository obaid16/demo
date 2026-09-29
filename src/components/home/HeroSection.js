'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Sparkles, Clock, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[96vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#100E0D]">
      {/* Background Cinematic Food / Dining Image with Multi-Layer Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="NOOR Indian Dining Atmosphere"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms] opacity-35"
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/60 to-[#100E0D]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171513]/90 via-transparent to-[#171513]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#171513]/40 to-[#171513]" />
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-grain opacity-40" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Subtle Location & Heritage Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#B89A63]/30 bg-[#1E1B18]/70 backdrop-blur-md rounded-full text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#B89A63] mb-8"
        >
          <Sparkles className="w-3 h-3 text-[#B89A63]" />
          <span>CHANAKYAPURI, NEW DELHI • CONTEMPORARY INDIAN DINING</span>
        </motion.div>

        {/* Grand Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.16em] text-[#FAF7F2] uppercase leading-none drop-shadow-2xl"
        >
          NOOR
        </motion.h1>

        {/* Editorial Reimagined Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B89A63] mt-4 mb-6 font-normal tracking-wide"
        >
          India, Reimagined.
        </motion.p>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl text-stone-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 text-balance"
        >
          Rooted in centuries of royal Awadhi and Kashmiri heritage. Crafted for the modern palate through 36-hour charcoal slow-cooking, single-origin spices, and refined culinary restraint.
        </motion.p>

        {/* Dual Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Button href="/menu" variant="brass" size="lg" className="w-full sm:w-auto">
            Explore Menu
          </Button>
          <Button href="/book" variant="outline" size="lg" className="w-full sm:w-auto">
            Reserve A Table
          </Button>
        </motion.div>

        {/* Ambient Info Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-[#B89A63]/20 w-full max-w-xl flex flex-wrap items-center justify-between text-xs text-stone-400 font-light gap-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B89A63]" />
            <span>Dinner Service: 7:00 PM – 11:30 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B89A63]" />
            <span>Diplomatic Enclave</span>
          </div>
          <div>
            <span className="text-[#B89A63] font-medium">Valet Parking</span>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#B89A63]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
