'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Search,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/data/menu';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';

export default function OrderPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietary, setDietary] = useState('all');
  const [search, setSearch] = useState('');
  const {
    items,
    addToCart,
    updateQuantity,
    subtotal,
    gstTax,
    packagingFee,
    total,
    itemCount,
    setIsCartOpen,
  } = useCart();

  const filtered = MENU_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchDietary =
      dietary === 'all' ||
      (dietary === 'veg' && item.isVeg) ||
      (dietary === 'non-veg' && !item.isVeg);
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchDietary && matchSearch;
  });

  return (
    <div className="pt-32 pb-36 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2 font-mono">
            ARTISANAL TAKEAWAY & DINING
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light leading-tight">
            Order NOOR to Your Table
          </h1>
          <p className="mt-3 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            Every dish is packed in temperature-sealed thermal packaging and sustainable terracotta vessels to preserve aroma and hearth warmth.
          </p>
        </div>

        {/* Layout: Menu Items & Floating Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Items Column */}
          <div className="lg:col-span-8">
            {/* Filter Bar */}
            <div className="sticky top-20 z-30 bg-[#171513]/95 backdrop-blur-md pb-4 pt-2 border-b border-stone-800 mb-8 space-y-4">
              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-[2px] cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#A9573F] text-white font-semibold'
                        : 'bg-[#1F1C19] text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search + Dietary Toggle */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by dish name..."
                    className="w-full bg-[#1A1715] border border-stone-800 pl-9 pr-3 py-1.5 text-xs text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-stone-600 rounded-[2px]"
                  />
                </div>

                <div className="flex items-center border border-stone-800 bg-[#161412] p-0.5 text-xs self-start sm:self-auto rounded-[2px]">
                  <button
                    onClick={() => setDietary('all')}
                    className={`px-3 py-1 uppercase tracking-wider text-[11px] rounded-[2px] cursor-pointer ${
                      dietary === 'all'
                        ? 'bg-[#292420] text-[#FAF7F2] font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietary('veg')}
                    className={`px-3 py-1 uppercase tracking-wider text-[11px] rounded-[2px] cursor-pointer ${
                      dietary === 'veg'
                        ? 'bg-emerald-950/80 text-emerald-300 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    Veg
                  </button>
                  <button
                    onClick={() => setDietary('non-veg')}
                    className={`px-3 py-1 uppercase tracking-wider text-[11px] rounded-[2px] cursor-pointer ${
                      dietary === 'non-veg'
                        ? 'bg-amber-950/80 text-amber-300 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            {/* Dishes Listing */}
            <div className="space-y-4">
              {filtered.map((dish) => {
                const cartEntry = items.find((i) => i.id === dish.id);
                const currentQty = cartEntry ? cartEntry.quantity : 0;

                return (
                  <div
                    key={dish.id}
                    className="p-4 sm:p-5 bg-[#1C1916] border border-stone-800/80 hover:border-stone-700 transition-colors flex gap-4 group rounded-[2px]"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-[#12100F] overflow-hidden rounded-[2px]">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {dish.isSignature && (
                        <div className="absolute top-1.5 left-1.5 z-10 hidden sm:block">
                          <SignatureBadge text="Signature" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <DietaryBadge isVeg={dish.isVeg} />
                            {dish.spiceLevel > 0 && <SpiceLevelBadge level={dish.spiceLevel} />}
                            <Link href={`/menu/${dish.id}`}>
                              <h3 className="font-serif text-base sm:text-lg text-[#FAF7F2] hover:text-[#B89A63] transition-colors leading-tight">
                                {dish.name}
                              </h3>
                            </Link>
                          </div>
                          <span className="font-serif text-base text-[#FAF7F2] font-medium shrink-0">
                            ₹{dish.price}
                          </span>
                        </div>

                        {dish.hindiName && (
                          <span className="text-[10px] text-[#B89A63]/75 tracking-widest block font-serif mt-0.5">
                            {dish.hindiName}
                          </span>
                        )}

                        <p className="mt-1.5 text-xs text-stone-300 line-clamp-2 font-light leading-relaxed">
                          {dish.shortDesc}
                        </p>
                      </div>

                      {/* Interactive Controls */}
                      <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <Link
                          href={`/menu/${dish.id}`}
                          className="text-[10px] uppercase tracking-wider text-stone-400 hover:text-[#B89A63]"
                        >
                          Story Details →
                        </Link>

                        {currentQty > 0 ? (
                          <div className="flex items-center border border-stone-700 bg-[#141210] rounded-[2px]">
                            <button
                              onClick={() => updateQuantity(dish.id, currentQty - 1)}
                              className="p-1 sm:p-1.5 text-stone-300 hover:text-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-[#FAF7F2]">
                              {currentQty}
                            </span>
                            <button
                              onClick={() => updateQuantity(dish.id, currentQty + 1)}
                              className="p-1 sm:p-1.5 text-stone-300 hover:text-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(dish, 1)}
                            className="px-3.5 py-1.5 bg-[#A9573F] hover:bg-[#934833] text-[#FAF7F2] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer rounded-[2px]"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Right Column: Order Tray Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="bg-[#1C1916] border border-stone-800 p-6 shadow-2xl rounded-[2px]">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#B89A63]" />
                  <h2 className="font-serif text-lg text-[#FAF7F2]">Current Tray</h2>
                </div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                  {itemCount} {itemCount === 1 ? 'Dish' : 'Dishes'}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-10 text-center text-stone-400">
                  <p className="font-serif text-sm text-[#FAF7F2] mb-1">Your tray is empty</p>
                  <p className="text-[11px] font-light">Select creations from the menu to assemble your order.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-6 scrollbar-none">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between text-xs py-2 border-b border-stone-800/80"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="font-medium text-[#FAF7F2] block truncate">
                          {it.name}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {it.quantity} × ₹{it.price}
                        </span>
                      </div>
                      <div className="font-mono text-stone-200">
                        ₹{it.price * it.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#FAF7F2]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-[#FAF7F2]">₹{gstTax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Seal</span>
                  <span className="text-[#FAF7F2]">₹{packagingFee}</span>
                </div>
                <div className="flex justify-between text-base font-serif pt-2 border-t border-stone-800 text-[#FAF7F2]">
                  <span>Total</span>
                  <span className="text-xl text-[#FAF7F2] font-medium">₹{total}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className={`w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all rounded-[2px] ${
                    items.length > 0
                      ? 'bg-[#A9573F] hover:bg-[#934833] text-white shadow-lg cursor-pointer'
                      : 'bg-[#25211E] text-stone-500 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-2.5 text-center border border-stone-700 text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors rounded-[2px] cursor-pointer"
                >
                  Open Full Tray
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Order Bar for Mobile */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#171513]/95 backdrop-blur-md border-t border-stone-800 lg:hidden shadow-2xl">
          <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                {itemCount} {itemCount === 1 ? 'Dish' : 'Dishes'} Selected
              </span>
              <span className="font-serif text-lg text-[#FAF7F2] font-semibold">
                Total: ₹{total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-3.5 py-2.5 bg-[#25211E] border border-stone-700 text-[#FAF7F2] text-xs uppercase tracking-wider rounded-[2px] cursor-pointer"
              >
                Tray
              </button>
              <Link
                href="/checkout"
                className="px-5 py-2.5 bg-[#A9573F] hover:bg-[#934833] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 rounded-[2px] cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
