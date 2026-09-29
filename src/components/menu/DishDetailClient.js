'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Clock,
  Flame,
  ShieldAlert,
  Wine,
  CheckCircle,
} from 'lucide-react';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import FoodCard from '@/components/menu/FoodCard';
import Button from '@/components/ui/Button';

export default function DishDetailClient({ dish, relatedDishes }) {
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const { addToCart, setIsCartOpen } = useCart();

  const handleAdd = () => {
    addToCart(dish, quantity, specialNote);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-28 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] hover:text-[#FAF7F2] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Menu</span>
          </Link>
        </div>

        {/* Hero Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Cinematic Imagery */}
          <div className="lg:col-span-6 sticky top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#1E1B18] border border-[#B89A63]/30 shadow-2xl"
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/70 via-transparent to-transparent" />

              {dish.isSignature && (
                <div className="absolute top-4 left-4 z-10">
                  <SignatureBadge text="Chef's Crown Signature" />
                </div>
              )}
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3 bg-[#211E1B] border border-[#B89A63]/20">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                  Prep Time
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-[#B89A63]" />
                  {dish.prepTime}
                </span>
              </div>
              <div className="p-3 bg-[#211E1B] border border-[#B89A63]/20">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                  Spice Profile
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium flex items-center justify-center gap-1 mt-1">
                  {dish.spiceLevel === 0 ? 'Delicate / Mild' : `Level ${dish.spiceLevel} of 3`}
                </span>
              </div>
              <div className="p-3 bg-[#211E1B] border border-[#B89A63]/20">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                  Energy
                </span>
                <span className="text-xs text-[#FAF7F2] font-medium mt-1 block">
                  {dish.calories}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Dish Narrative & Order Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Category & Badges */}
              <div className="flex items-center gap-3 mb-3">
                <DietaryBadge isVeg={dish.isVeg} />
                <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium">
                  {dish.category}
                </span>
                {dish.spiceLevel > 0 && <SpiceLevelBadge level={dish.spiceLevel} />}
              </div>

              {/* Title & Hindi Name */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-light leading-tight">
                {dish.name}
              </h1>

              {dish.hindiName && (
                <span className="font-serif text-base text-[#B89A63] tracking-widest block mt-1">
                  {dish.hindiName}
                </span>
              )}

              {/* Price */}
              <div className="mt-4 pb-6 border-b border-[#B89A63]/20 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-[#B89A63] font-medium">
                  ₹{dish.price}
                </span>
                <span className="text-xs text-stone-400 font-light">
                  (Exclusive of 5% restaurant GST)
                </span>
              </div>

              {/* Full Narrative */}
              <div className="py-6 space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                <p>{dish.fullDesc}</p>
              </div>

              {/* Sommelier / Beverage Pairing */}
              {dish.pairing && (
                <div className="p-4 bg-[#211E1B] border border-[#B89A63]/25 mb-6 flex items-start gap-3">
                  <Wine className="w-5 h-5 text-[#B89A63] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B89A63] font-medium block">
                      Recommended Beverage Pairing
                    </span>
                    <span className="text-xs sm:text-sm text-[#FAF7F2] font-light mt-0.5 block">
                      {dish.pairing}
                    </span>
                  </div>
                </div>
              )}

              {/* Ingredients & Provenance */}
              <div className="py-5 border-t border-[#B89A63]/20">
                <h3 className="text-xs uppercase tracking-widest text-[#B89A63] font-semibold mb-3">
                  Key Spices & Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#201D1B] border border-[#B89A63]/20 text-xs text-stone-300 font-light"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens Information */}
              <div className="py-4 border-t border-[#B89A63]/20">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Allergens:{' '}
                    {dish.allergens.length > 0
                      ? dish.allergens.join(', ')
                      : 'None documented. Prepared in a multi-use kitchen.'}
                  </span>
                </div>
              </div>

              {/* Special Instructions Note */}
              <div className="pt-4 mb-6">
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                  Preparation Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Less spicy, dressing on the side..."
                  className="w-full bg-[#1A1715] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] placeholder-stone-600 focus:outline-none focus:border-[#B89A63]"
                />
              </div>

              {/* Quantity & Add to Cart Action */}
              <div className="p-6 bg-[#211E1B] border border-[#B89A63]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-300">
                    Quantity
                  </span>

                  <div className="flex items-center border border-[#B89A63]/40 bg-[#171513]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 text-sm font-medium text-[#FAF7F2]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-4 bg-[#A9573F] hover:bg-[#924530] text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Order — ₹{dish.price * quantity}</span>
                  </button>

                  <Button href="/book" variant="outline" size="md">
                    Reserve Table To Dine
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Dishes "You May Also Like" */}
        {relatedDishes && relatedDishes.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#B89A63]/20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium block mb-2">
                COMPLEMENTARY CREATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2]">
                You May Also Relish
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
