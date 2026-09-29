'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';

export default function FoodCard({ dish, layout = 'vertical' }) {
  const { addToCart } = useCart();

  if (layout === 'horizontal') {
    return (
      <div className="group relative bg-[#1E1B18] border border-[#B89A63]/20 hover:border-[#B89A63]/50 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-2/5 min-h-[220px] overflow-hidden bg-[#12100F]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-transparent to-transparent sm:hidden" />
          {dish.isSignature && (
            <div className="absolute top-3 left-3 z-10">
              <SignatureBadge text="Signature" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 sm:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <DietaryBadge isVeg={dish.isVeg} />
                {dish.spiceLevel > 0 && <SpiceLevelBadge level={dish.spiceLevel} />}
              </div>
              <span className="font-serif text-xl text-[#FAF7F2] font-medium">₹{dish.price}</span>
            </div>

            <Link href={`/menu/${dish.id}`} className="group/title">
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] group-hover/title:text-[#B89A63] transition-colors leading-tight flex items-center justify-between">
                <span>{dish.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[#B89A63]" />
              </h3>
            </Link>

            {dish.hindiName && (
              <span className="text-[11px] text-[#B89A63]/80 tracking-widest block font-serif mt-0.5">
                {dish.hindiName}
              </span>
            )}

            <p className="mt-3 text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed font-light">
              {dish.shortDesc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#B89A63]/15 flex items-center justify-between">
            <Link
              href={`/menu/${dish.id}`}
              className="text-xs uppercase tracking-widest text-[#B89A63] hover:text-[#D4BA88] font-medium transition-colors"
            >
              Discover Dish →
            </Link>
            <button
              onClick={() => addToCart(dish, 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D2824] hover:bg-[#A9573F] text-[#FAF7F2] text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
              aria-label={`Add ${dish.name} to order`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#1E1B18] border border-[#B89A63]/20 hover:border-[#B89A63]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
      {/* Top Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#12100F]">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-transparent to-transparent opacity-60" />

        {dish.isSignature && (
          <div className="absolute top-3 left-3 z-10">
            <SignatureBadge text="Signature" />
          </div>
        )}

        <div className="absolute top-3 right-3 z-10">
          <DietaryBadge isVeg={dish.isVeg} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {dish.spiceLevel > 0 ? (
              <SpiceLevelBadge level={dish.spiceLevel} />
            ) : (
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Mild</span>
            )}
            <span className="font-serif text-lg text-[#B89A63] font-semibold">₹{dish.price}</span>
          </div>

          <Link href={`/menu/${dish.id}`} className="group/title block">
            <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] group-hover/title:text-[#B89A63] transition-colors leading-tight">
              {dish.name}
            </h3>
          </Link>

          {dish.hindiName && (
            <span className="text-[11px] text-[#B89A63]/70 tracking-widest block font-serif mt-0.5">
              {dish.hindiName}
            </span>
          )}

          <p className="mt-2 text-xs text-stone-300 line-clamp-2 leading-relaxed font-light">
            {dish.shortDesc}
          </p>
        </div>

        {/* Card Footer with Quick Add */}
        <div className="mt-5 pt-3.5 border-t border-[#B89A63]/15 flex items-center justify-between gap-3">
          <Link
            href={`/menu/${dish.id}`}
            className="text-[11px] uppercase tracking-widest text-stone-400 hover:text-[#FAF7F2] transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(dish, 1)}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#2B2622] hover:bg-[#A9573F] text-[#FAF7F2] text-[11px] uppercase tracking-wider transition-colors duration-200"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
