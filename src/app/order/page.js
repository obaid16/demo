'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Flame,
  Search,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/data/menu';
import { DietaryBadge, SpiceLevelBadge, SignatureBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

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
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium block mb-2">
            ARTISANAL TAKEAWAY & DELIVERY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight">
            Order NOOR to Your Home
          </h1>
          <p className="mt-3 text-stone-300 text-sm sm:text-base font-light">
            Every dish is packed in sustainable earthen terracotta handis and temperature-sealed brass foil packaging to ensure dining-room heat and aromatics at your table.
          </p>
        </div>

        {/* Layout: Menu Items & Floating Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Items Column */}
          <div className="lg:col-span-8">
            {/* Filter Bar */}
            <div className="sticky top-20 z-30 bg-[#171513]/95 backdrop-blur-md pb-4 pt-2 border-b border-[#B89A63]/20 mb-8 space-y-4">
              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#B89A63] text-[#171513] font-semibold'
                        : 'bg-[#201D1A] text-stone-300 hover:text-white border border-[#B89A63]/20'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search + Dietary Toggle */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#B89A63] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by dish name..."
                    className="w-full bg-[#1E1B18] border border-[#B89A63]/30 pl-9 pr-3 py-2 text-xs text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-[#B89A63]"
                  />
                </div>

                <div className="flex items-center border border-[#B89A63]/30 bg-[#1E1B18] p-1 text-xs self-start sm:self-auto">
                  <button
                    onClick={() => setDietary('all')}
                    className={`px-3 py-1 uppercase tracking-wider ${
                      dietary === 'all'
                        ? 'bg-[#B89A63] text-[#171513] font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietary('veg')}
                    className={`px-3 py-1 uppercase tracking-wider ${
                      dietary === 'veg'
                        ? 'bg-emerald-800 text-white font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    Veg
                  </button>
                  <button
                    onClick={() => setDietary('non-veg')}
                    className={`px-3 py-1 uppercase tracking-wider ${
                      dietary === 'non-veg'
                        ? 'bg-amber-900 text-white font-semibold'
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
                  <motion.div
                    layout
                    key={dish.id}
                    className="p-4 sm:p-5 bg-[#1F1C19] border border-[#B89A63]/20 hover:border-[#B89A63]/50 transition-colors flex gap-4 group"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-[#141210] overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {dish.isSignature && (
                        <div className="absolute top-2 left-2 z-10 hidden sm:block">
                          <SignatureBadge text="Chef Pick" />
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
                              <h3 className="font-serif text-base sm:text-xl text-[#FAF7F2] hover:text-[#B89A63] transition-colors leading-tight">
                                {dish.name}
                              </h3>
                            </Link>
                          </div>
                          <span className="font-serif text-base sm:text-lg text-[#B89A63] font-medium shrink-0">
                            ₹{dish.price}
                          </span>
                        </div>

                        {dish.hindiName && (
                          <span className="text-[10px] text-[#B89A63]/80 tracking-widest block font-serif">
                            {dish.hindiName}
                          </span>
                        )}

                        <p className="mt-1.5 text-xs text-stone-300 line-clamp-2 font-light leading-relaxed">
                          {dish.shortDesc}
                        </p>
                      </div>

                      {/* Interactive Controls */}
                      <div className="mt-3 pt-2 border-t border-[#B89A63]/10 flex items-center justify-between">
                        <Link
                          href={`/menu/${dish.id}`}
                          className="text-[11px] uppercase tracking-wider text-stone-400 hover:text-[#B89A63]"
                        >
                          View Details →
                        </Link>

                        {currentQty > 0 ? (
                          <div className="flex items-center border border-[#B89A63]/40 bg-[#171513]">
                            <button
                              onClick={() => updateQuantity(dish.id, currentQty - 1)}
                              className="p-1 sm:p-1.5 text-stone-300 hover:text-white hover:bg-[#282420]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-[#FAF7F2]">
                              {currentQty}
                            </span>
                            <button
                              onClick={() => updateQuantity(dish.id, currentQty + 1)}
                              className="p-1 sm:p-1.5 text-stone-300 hover:text-white hover:bg-[#282420]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(dish, 1)}
                            className="px-3.5 py-1.5 bg-[#2B2622] hover:bg-[#A9573F] text-[#FAF7F2] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sticky Right Column: Order Tray Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-[#1C1916] border border-[#B89A63]/30 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#B89A63]/20 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#B89A63]" />
                  <h2 className="font-serif text-xl text-[#FAF7F2]">Current Tray</h2>
                </div>
                <span className="text-xs uppercase tracking-wider text-[#B89A63] font-mono">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  <p className="text-xs">Select items from the menu to assemble your order.</p>
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
                        <span className="text-[11px] text-stone-400">
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
              <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-[#B89A63]/20">
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
                <div className="flex justify-between text-base font-serif pt-2 border-t border-[#B89A63]/20 text-[#FAF7F2]">
                  <span>Total</span>
                  <span className="text-[#B89A63] font-sans font-semibold">₹{total}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className={`w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all ${
                    items.length > 0
                      ? 'bg-[#A9573F] hover:bg-[#924530] text-white shadow-lg cursor-pointer'
                      : 'bg-[#292420] text-stone-500 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-2.5 text-center border border-[#B89A63]/40 text-xs uppercase tracking-widest text-stone-300 hover:text-white hover:bg-[#B89A63]/10 transition-colors"
                >
                  Open Full Tray
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
