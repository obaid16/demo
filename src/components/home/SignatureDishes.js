'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FoodCard from '@/components/menu/FoodCard';
import { MENU_ITEMS } from '@/data/menu';
import Button from '@/components/ui/Button';

export default function SignatureDishes() {
  // Select 5 signature standout dishes
  const signatures = MENU_ITEMS.filter((item) => item.isSignature).slice(0, 5);

  const heroDish = signatures[0]; // Truffle Paneer Tikka
  const secondDish = signatures[1]; // Awadhi Galouti
  const gridDishes = signatures.slice(2, 5); // Butter Chicken, Biryani, Cheesecake

  return (
    <section className="py-24 sm:py-32 bg-[#12100F] text-[#F4EFE6] relative overflow-hidden border-t border-[#B89A63]/15">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#A9573F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#B89A63]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="CULINARY MASTERPIECES"
          title="Signature Creations"
          subtitle="A curated showcase of recipes that define the NOOR ethos — time-honoured techniques, royal lineage, and progressive artistic presentation."
        />

        {/* Asymmetrical Editorial Composition */}
        <div className="space-y-8">
          {/* Top Row: Two Large Featured Horizontal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {heroDish && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <FoodCard dish={heroDish} layout="horizontal" />
              </motion.div>
            )}

            {secondDish && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <FoodCard dish={secondDish} layout="horizontal" />
              </motion.div>
            )}
          </div>

          {/* Bottom Row: Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridDishes.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * idx }}
              >
                <FoodCard dish={dish} layout="vertical" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action to explore full repertoire */}
        <div className="mt-16 text-center">
          <Button href="/menu" variant="outline" size="lg">
            <span>Explore Complete Menu ({MENU_ITEMS.length} Dishes)</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
