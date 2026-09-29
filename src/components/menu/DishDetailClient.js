'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Clock,
  Wine,
  ShieldAlert,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import FoodCard from '@/components/menu/FoodCard';
import Button from '@/components/ui/Button';

export default function DishDetailClient({ dish, relatedDishes }) {
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [openSection, setOpenSection] = useState(null); // 'ingredients', 'pairing', 'allergens'
  const { addToCart, setIsCartOpen } = useCart();

  const handleAdd = () => {
    addToCart(dish, quantity, specialNote);
    setIsCartOpen(true);
  };

  const toggleSection = (sec) => {
    setOpenSection((prev) => (prev === sec ? null : sec));
  };

  return (
    <div className="pt-28 pb-28 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#FAF7F2] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Menu</span>
          </Link>
        </div>

        {/* 60% Image / 40% Information Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Dominant Image Hero (60% Desktop) */}
          <div className="lg:col-span-7 sticky top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#1E1B18] border border-stone-800 shadow-2xl"
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/60 via-transparent to-transparent" />

              {dish.isSignature && (
                <div className="absolute top-4 left-4 z-10">
                  <SignatureBadge text="Chef Signature" />
                </div>
              )}
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3 bg-[#1C1916] border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  Prep Time
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-[#B89A63]" />
                  {dish.prepTime}
                </span>
              </div>
              <div className="p-3 bg-[#1C1916] border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  Heat Level
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium flex items-center justify-center gap-1 mt-1">
                  {dish.spiceLevel === 0 ? 'Delicate' : `Level ${dish.spiceLevel} of 3`}
                </span>
              </div>
              <div className="p-3 bg-[#1C1916] border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  Calories
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium mt-1 block">
                  {dish.calories}
                </span>
              </div>
            </div>
          </div>

          {/* 40% Clean Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Category & Badges */}
              <div className="flex items-center gap-2.5 mb-3">
                <DietaryBadge isVeg={dish.isVeg} />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89A63] font-medium">
                  {dish.category}
                </span>
                {dish.spiceLevel > 0 && <SpiceLevelBadge level={dish.spiceLevel} />}
              </div>

              {/* Title & Hindi Name */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light leading-tight">
                {dish.name}
              </h1>

              {dish.hindiName && (
                <span className="font-serif text-sm text-[#B89A63]/80 tracking-widest block mt-1">
                  {dish.hindiName}
                </span>
              )}

              {/* Price */}
              <div className="mt-4 pb-5 border-b border-stone-800 flex items-baseline gap-2">
                <span className="font-serif text-3xl text-[#FAF7F2] font-medium">
                  ₹{dish.price}
                </span>
                <span className="text-[11px] text-stone-400 font-light">
                  (Exclusive of 5% restaurant GST)
                </span>
              </div>

              {/* Story Description */}
              <div className="py-5 text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                <p>{dish.fullDesc}</p>
              </div>

              {/* Collapsible Secondary Information Panels */}
              <div className="border-t border-stone-800 divide-y divide-stone-800/80 mb-6">
                {/* Pairing Accordion */}
                {dish.pairing && (
                  <div>
                    <button
                      onClick={() => toggleSection('pairing')}
                      className="w-full py-3.5 flex items-center justify-between text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Wine className="w-3.5 h-3.5 text-[#B89A63]" />
                        <span>Sommelier & Beverage Pairing</span>
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          openSection === 'pairing' ? 'rotate-180 text-[#B89A63]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openSection === 'pairing' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pb-3 text-xs text-stone-400 font-light pl-6"
                        >
                          {dish.pairing}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Key Spices & Ingredients Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection('ingredients')}
                    className="w-full py-3.5 flex items-center justify-between text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B89A63]" />
                      <span>Key Spices & Ingredients</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openSection === 'ingredients' ? 'rotate-180 text-[#B89A63]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSection === 'ingredients' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-3 text-xs text-stone-400 font-light pl-6"
                      >
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {dish.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-[#201D1A] border border-stone-800 text-[11px] text-stone-300"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Allergens Notice Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection('allergens')}
                    className="w-full py-3.5 flex items-center justify-between text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#B89A63]" />
                      <span>Allergens & Dietary Notes</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openSection === 'allergens' ? 'rotate-180 text-[#B89A63]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSection === 'allergens' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-3 text-xs text-stone-400 font-light pl-6"
                      >
                        {dish.allergens.length > 0
                          ? `Contains: ${dish.allergens.join(', ')}`
                          : 'No major allergens recorded. Prepared in an artisan multi-discipline kitchen.'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Box: Quantity + Add to Order */}
              <div className="p-5 bg-[#1C1916] border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Portion Quantity
                  </span>

                  <div className="flex items-center border border-stone-700 bg-[#141210]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-[#FAF7F2]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 bg-[#A9573F] hover:bg-[#934833] text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer rounded-[2px]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order · ₹{dish.price * quantity}</span>
                  </button>

                  <Button href="/book" variant="outline" size="sm">
                    Book Table
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Dishes "You May Also Like" */}
        {relatedDishes && relatedDishes.length > 0 && (
          <div className="mt-28 pt-16 border-t border-stone-800">
            <div className="max-w-2xl mb-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89A63] font-medium block mb-2 font-mono">
                COMPLEMENTARY RECIPES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light">
                You May Also Relish
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedDishes.map((item) => (
                <FoodCard key={item.id} dish={item} layout="vertical" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
