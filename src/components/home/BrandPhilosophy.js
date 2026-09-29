'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BrandPhilosophy() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F4EFE6] text-[#171513] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 40% Editorial Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#A9573F] font-semibold block mb-4">
                THE NOOR PHILOSOPHY
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#171513] font-light leading-[1.12] mb-6">
                Rooted in India. <br />
                <span className="italic font-normal text-[#A9573F]">Created for today.</span>
              </h2>

              <p className="text-[#5A4638] text-sm sm:text-base leading-relaxed font-light mb-6">
                We believe Indian fine dining requires neither excessive cream nor modern gimmicks. Instead, we return to the patience of the ancient sigri hearth, single-origin hand-pounded spices, and the pure culinary restraint of royal kitchens.
              </p>

              {/* Restrained 3-metric strip */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#171513]/15 mb-8">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#171513] block">36h</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block mt-0.5">
                    Slow Simmer
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#171513] block">32</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block mt-0.5">
                    Potli Spices
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#171513] block">100%</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block mt-0.5">
                    Single-Origin
                  </span>
                </div>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171513] hover:text-[#A9573F] transition-colors group"
                >
                  <span>Our Culinary Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#A9573F]" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 60% Visually-Led Photography */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[16/11] w-full overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80"
                alt="Clay oven embers and sigri culinary craft"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#171513]/90 backdrop-blur-xs text-white max-w-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#B89A63] block font-mono">
                  LIVE HEARTH CRAFT
                </span>
                <p className="font-serif text-xs text-stone-200 mt-1 leading-relaxed">
                  Slow-simmered over dying sal wood charcoal, retaining authentic mineral aromatics.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
