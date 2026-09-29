'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ChefPhilosophy() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] border-t border-[#B89A63]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Chef Narrative */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-4">
                <span className="w-8 h-[1px] bg-[#B89A63]" />
                <span>MEET THE CULINARY DIRECTOR</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight mb-4">
                Chef Vikramaditya Rathore
              </h2>

              <p className="text-xs uppercase tracking-widest text-[#B89A63] mb-6">
                Culinary Alchemist & Guardian of Ancient Hearth Techniques
              </p>

              {/* Editorial Quote Box */}
              <div className="relative p-6 sm:p-8 bg-[#211E1B] border-l-2 border-[#B89A63] mb-8 shadow-xl">
                <Quote className="w-8 h-8 text-[#B89A63]/30 absolute top-4 right-4" />
                <p className="font-serif italic text-base sm:text-lg text-[#F4EFE6] leading-relaxed relative z-10">
                  “Indian cooking was never meant to be heavy or clumsy. The royal khansamas of Lucknow and Rampur understood the medicinal purity of each spice. When you roast wild cumin with green cardamom and smoke it over aged sal wood, you create poetry that needs no synthetic disguise.”
                </p>
                <span className="block mt-4 text-xs tracking-widest uppercase text-[#B89A63]">
                  — Chef Vikramaditya Rathore
                </span>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light mb-8">
                Trained across ancestral kitchens in Rajasthan, Lucknow, and top European fine dining sanctuaries, Chef Vikramaditya spent seven years collecting lost manuscripts of court gastronomy. At NOOR, he directs a kitchen of 18 dedicated culinary artisans who grind spices fresh twice daily.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button href="/about" variant="outline" size="md">
                  Discover Our Culinary Heritage
                </Button>
                <Button href="/experiences" variant="brass" size="md">
                  Reserve The Tasting Table
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Chef Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-[#B89A63]/30 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Chef Vikramaditya Rathore at the pass"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1A1715]/90 backdrop-blur-xs border border-[#B89A63]/25">
                <span className="text-[10px] uppercase tracking-widest text-[#B89A63] block">
                  CRAFT & DEDICATION
                </span>
                <span className="font-serif text-sm text-[#FAF7F2] block mt-0.5">
                  Over 22 years of royal Indian gastronomy preservation
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
