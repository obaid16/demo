'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, Music, Sparkles, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FeaturedExperience() {
  return (
    <section className="py-24 sm:py-32 bg-[#12100F] text-[#F4EFE6] border-t border-[#B89A63]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#1A1715] border border-[#B89A63]/30 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Image Banner */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Friday at Noor Sufi Evening"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1A1715]" />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1.5 bg-[#A9573F] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-md">
                  Signature Evening
                </span>
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-3">
                  <Music className="w-3.5 h-3.5 text-[#B89A63]" />
                  <span>WEEKLY REPERTOIRE</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-light leading-tight mb-4">
                  Friday at NOOR: <br />
                  <span className="italic font-normal text-[#B89A63]">Sufi Strings & Candlelit Dining</span>
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  Every Friday evening, our main salon transforms into a sanctuary of amber glow and classical acoustic resonance. Acclaimed sitar virtuosos and tabla maestros perform timeless ragas as a special 4-course progressive feast is served tableside.
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#B89A63]/20 mb-8 text-xs">
                  <div className="flex items-center gap-2.5 text-stone-300">
                    <Calendar className="w-4 h-4 text-[#B89A63]" />
                    <span>Every Friday Night</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-300">
                    <Clock className="w-4 h-4 text-[#B89A63]" />
                    <span>8:00 PM — Midnight</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-300">
                    <Sparkles className="w-4 h-4 text-[#B89A63]" />
                    <span>4-Course Curated Menu</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#B89A63] font-serif text-sm">
                    <span>₹2,600 / guest</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button href="/book?occasion=Friday%20Sufi" variant="brass" size="md" className="w-full sm:w-auto">
                  Reserve Friday Table
                </Button>
                <Button href="/experiences" variant="outline" size="md" className="w-full sm:w-auto">
                  View All Experiences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
