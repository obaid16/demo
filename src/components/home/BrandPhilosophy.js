'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export default function BrandPhilosophy() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Multi-Image Composition */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9 }}
              className="relative z-10 aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden border border-[#B89A63]/25 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Clay oven embers and sigri culinary craft"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/70 via-transparent to-transparent" />
            </motion.div>

            {/* Overlapping Floating Detail Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:block absolute -bottom-8 -right-4 sm:-right-8 z-20 w-64 bg-[#211E1B] p-5 border border-[#B89A63]/30 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-[#B89A63] text-xs font-semibold tracking-wider uppercase mb-1">
                <Flame className="w-4 h-4 text-[#A9573F]" />
                <span>The Live Hearth</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Slow-simmered over dying sal wood charcoal for thirty-six continuous hours.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Narrative Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-4">
                <span className="w-8 h-[1px] bg-[#B89A63]" />
                <span>Our Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-[1.15] mb-6">
                Rooted in India. <br />
                <span className="italic font-normal text-[#B89A63]">Created for today.</span>
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                Too often, commercial Indian dining drowns ancient nuance in heavy cream, excessive cashews, and uniform orange gravies. At NOOR, we return to the aristocratic courts of Lucknow, the hearths of Rampur, and the maritime kitchens of Malabar.
              </p>

              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light mb-8">
                Every curry is cooked from distinct, single-origin hand-ground spice bouquets. Every tandoor skewer is basted with cold-pressed mustard oil and cultured ghee. We marry the uncompromising heritage of Indian culinary craft with the refined aesthetics of contemporary global fine dining.
              </p>

              {/* Three Editorial Metrics */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#B89A63]/20 mb-8">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#B89A63] block">36h</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider block mt-1">
                    Charcoal Simmer
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#B89A63] block">32</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider block mt-1">
                    Potli Spices
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#B89A63] block">100%</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider block mt-1">
                    Single-Origin
                  </span>
                </div>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2] hover:text-[#B89A63] transition-colors group"
                >
                  <span>Read The Noor Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#B89A63]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
