'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Users, Music, Wine, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: 'The Amber Dining Salon',
    desc: 'Intimate candlelit alcoves surrounded by hand-hammered brass lattices and aged teakwood.',
  },
  {
    icon: Wine,
    title: "The Chef's Tasting Table",
    desc: 'Front-row vantage into the live charcoal sigri with direct commentary from the culinary team.',
  },
  {
    icon: Users,
    title: 'The Maharaja Private Suite',
    desc: 'A discreet haven for milestone banquets and high-level corporate hosting up to 22 guests.',
  },
  {
    icon: Music,
    title: 'Acoustic Sufi Evenings',
    desc: 'Subtle live sitar and classical ragas enhancing the cadence of your four-course dinner.',
  },
];

export default function AtmosphereExperience() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#100E0D] text-[#F4EFE6] overflow-hidden border-t border-[#B89A63]/15">
      {/* Background Cinematic Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80"
          alt="NOOR Amber Dining Room"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-[#100E0D]/80 to-[#100E0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100E0D] via-transparent to-[#100E0D]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#B89A63]" />
            <span>THE AMBIANCE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-[#FAF7F2] leading-tight">
            More than a meal. <br />
            <span className="italic font-normal text-[#B89A63]">An immersive sensory ritual.</span>
          </h2>

          <p className="mt-6 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Every square foot of NOOR was orchestrated to evoke the regal hospitality of India’s grand dining courts. From the mineral scent of smoldering sal embers to the whisper of silk curtains and hand-spun linen, your evening is an unhurried, multi-sensory retreat.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 bg-[#1A1715]/80 backdrop-blur-md border border-[#B89A63]/20 hover:border-[#B89A63] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full border border-[#B89A63]/30 bg-[#24201D] flex items-center justify-center text-[#B89A63] mb-5 group-hover:bg-[#B89A63] group-hover:text-[#171513] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#FAF7F2] mb-2">{item.title}</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Callout Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-[#1E1B18] border border-[#B89A63]/30">
          <div>
            <h4 className="font-serif text-2xl text-[#FAF7F2]">Planning a Private Celebration?</h4>
            <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
              Host intimate anniversaries, milestone birthdays, or executive board dinners in our private suites.
            </p>
          </div>
          <Button href="/experiences" variant="brass" size="md" className="shrink-0">
            View Private Dining Options
          </Button>
        </div>
      </div>
    </section>
  );
}
