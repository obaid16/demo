'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, ArrowUpRight } from 'lucide-react';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';

export default function FoodCard({ dish, layout = 'vertical' }) {
  const { addToCart } = useCart();

  if (layout === 'horizontal') {
    return (
      <div className="group relative bg-[#1B1816] border border-stone-850 hover:border-stone-700 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row h-full rounded-[2px]">
        {/* Dominant Editorial Photography */}
        <Link href={`/menu/${dish.id}`} className="relative w-full sm:w-[45%] min-h-[220px] overflow-hidden bg-[#12100F] block">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, 45vw"
            className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1816]/80 via-transparent to-transparent sm:hidden" />
          {dish.isSignature && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-[#141210]/90 backdrop-blur-sm border border-[#B89A63]/50 text-[#B89A63] text-[9px] uppercase tracking-[0.2em] font-mono rounded-[1px]">
                Signature
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6 sm:p-7 sm:w-[55%] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3">
                <DietaryBadge isVeg={dish.isVeg} />
                {dish.spiceLevel > 0 && <SpiceLevelBadge level={dish.spiceLevel} />}
              </div>
              <span className="font-serif text-lg text-[#FAF7F2] font-normal tracking-wide">
                ₹{dish.price}
              </span>
            </div>

            <Link href={`/menu/${dish.id}`} className="group/title block">
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] group-hover/title:text-[#B89A63] transition-colors leading-tight flex items-center justify-between font-normal">
                <span>{dish.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[#B89A63] shrink-0" />
              </h3>
            </Link>

            {dish.hindiName && (
              <span className="text-[11px] text-[#B89A63]/80 tracking-widest block font-serif mt-0.5">
                {dish.hindiName}
              </span>
            )}

            <p className="mt-2.5 text-xs sm:text-[13px] text-stone-300 line-clamp-2 leading-relaxed font-light">
              {dish.shortDesc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
            <Link
              href={`/menu/${dish.id}`}
              className="text-[11px] uppercase tracking-[0.18em] text-stone-400 hover:text-[#FAF7F2] font-medium transition-colors"
            >
              View Story
            </Link>
            <button
              onClick={() => addToCart(dish, 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-700/80 hover:border-[#A9573F] hover:bg-[#A9573F] text-stone-300 hover:text-white text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-[2px]"
              aria-label={`Add ${dish.name} to order`}
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#1B1816] border border-stone-850 hover:border-stone-700 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full rounded-[2px]">
      {/* Top Editorial Photography */}
      <Link href={`/menu/${dish.id}`} className="relative w-full aspect-[4/3] overflow-hidden bg-[#12100F] block">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1816]/70 via-transparent to-transparent opacity-60" />

        {dish.isSignature && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-[#141210]/90 backdrop-blur-sm border border-[#B89A63]/50 text-[#B89A63] text-[9px] uppercase tracking-[0.2em] font-mono rounded-[1px]">
              Signature
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10">
          <DietaryBadge isVeg={dish.isVeg} />
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {dish.spiceLevel > 0 ? (
              <SpiceLevelBadge level={dish.spiceLevel} />
            ) : (
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">
                Delicate
              </span>
            )}
            <span className="font-serif text-lg text-[#FAF7F2] font-normal">₹{dish.price}</span>
          </div>

          <Link href={`/menu/${dish.id}`} className="group/title block">
            <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] group-hover/title:text-[#B89A63] transition-colors leading-tight font-normal">
              {dish.name}
            </h3>
          </Link>

          {dish.hindiName && (
            <span className="text-[11px] text-[#B89A63]/75 tracking-widest block font-serif mt-0.5">
              {dish.hindiName}
            </span>
          )}

          <p className="mt-2 text-xs sm:text-[13px] text-stone-300 line-clamp-2 leading-relaxed font-light">
            {dish.shortDesc}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-5 pt-3.5 border-t border-stone-800/80 flex items-center justify-between gap-3">
          <Link
            href={`/menu/${dish.id}`}
            className="text-[11px] uppercase tracking-[0.18em] text-stone-400 hover:text-[#FAF7F2] transition-colors"
          >
            Explore
          </Link>
          <button
            onClick={() => addToCart(dish, 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-700/80 hover:border-[#A9573F] hover:bg-[#A9573F] text-stone-300 hover:text-white text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-[2px]"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
