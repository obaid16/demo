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

        {/* Editorial Asymmetric Composition: Photography + Numbered Editorial List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column: Atmospheric Large Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden border border-stone-800 rounded-[2px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="NOOR Amber Dining Salon evening ambience"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#141210]/90 backdrop-blur-sm border border-stone-800 text-stone-300 text-xs font-light rounded-[2px]">
                <span className="text-[10px] text-[#B89A63] uppercase tracking-widest font-mono block mb-1">
                  THE AMBER SALON
                </span>
                Soft amber candlelight reflected on hand-hammered brass lattices and aged teakwood.
              </div>
            </div>
          </div>

          {/* Right Column: Numbered Architectural Spaces List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="divide-y divide-stone-800">
              {HIGHLIGHTS.map((item, idx) => (
                <div key={item.title} className="py-5 first:pt-0 last:pb-0 group">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#B89A63]/70 font-semibold tracking-wider">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal group-hover:text-[#B89A63] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-[13px] text-stone-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Callout Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 bg-[#171513] border border-stone-800 rounded-[2px]">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal">Planning a Private Celebration?</h4>
            <p className="text-xs text-stone-400 font-light mt-1">
              Host intimate anniversaries, milestone birthdays, or executive board dinners in our private suites.
            </p>
          </div>
          <Button href="/experiences" variant="outline" size="sm" className="shrink-0">
            View Private Dining
          </Button>
        </div>
      </div>
    </section>
  );
}
