'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    discountPercent,
    gstTax,
    packagingFee,
    total,
    promoCode,
    applyPromo,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromo(inputCode);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#1B1816] border-l border-stone-800 shadow-2xl flex flex-col text-[#F4EFE6]"
            >
              {/* Header: YOUR ORDER */}
              <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-[#151312]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#B89A63]" />
                  <div>
                    <h2 className="font-serif text-lg tracking-wider text-[#FAF7F2] uppercase">
                      Your Order
                    </h2>
                    <p className="text-[10px] text-stone-400 tracking-widest uppercase font-mono">
                      {items.length} {items.length === 1 ? 'Dish' : 'Dishes'} Selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center mb-4 text-[#B89A63]">
                      <ShoppingBag className="w-6 h-6 opacity-60" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono block mb-1">
                      CURRENT TRAY
                    </span>
                    <h3 className="font-serif text-2xl text-[#FAF7F2] mb-2 font-light">
                      Your table is waiting, <br />
                      <span className="italic text-[#A9573F]">your order is not.</span>
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xs mb-6 font-light leading-relaxed">
                      Discover our clay-oven tandoor creations, Awadhi dum biryanis, and artisanal breads to compose your order.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-[#A9573F] text-xs uppercase tracking-widest text-white hover:bg-[#934833] transition-colors rounded-[2px] cursor-pointer"
                    >
                      Browse the Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="p-4 bg-[#201D1A] border border-stone-800 rounded-[2px] flex gap-3 group relative"
                    >
                      <div className="relative w-18 h-18 shrink-0 overflow-hidden rounded-[2px] bg-[#12100F]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm text-[#FAF7F2] leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-500 hover:text-[#A9573F] transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#B89A63] mt-0.5 font-mono">₹{item.price}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800">
                          {/* Qty Controls */}
                          <div className="flex items-center border border-stone-700 bg-[#141210] rounded-[2px]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-medium text-[#FAF7F2]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-medium text-[#FAF7F2] font-mono">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-6 bg-[#151312] border-t border-stone-800 space-y-4">
                  {/* Promo code */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Promo Code ('ROYAL15')"
                        className="w-full bg-[#201D1A] border border-stone-800 pl-8 pr-3 py-2 text-xs uppercase tracking-wider text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-stone-600 rounded-[2px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#282420] hover:bg-[#B89A63] hover:text-[#171513] text-xs uppercase tracking-wider text-[#FAF7F2] transition-colors rounded-[2px] cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#FAF7F2]">₹{subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Royal Privilege ({discountPercent}%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="text-[#FAF7F2]">₹{gstTax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Artisanal Warmth Packaging</span>
                      <span className="text-[#FAF7F2]">₹{packagingFee}</span>
                    </div>
                    <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline text-sm font-serif">
                      <span className="text-base text-[#FAF7F2]">Total</span>
                      <span className="text-lg text-[#FAF7F2] font-medium font-sans">₹{total}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-center border border-stone-700 text-xs uppercase tracking-widest text-[#F4EFE6] hover:bg-stone-800/60 transition-colors rounded-[2px] cursor-pointer"
                    >
                      Continue Ordering
                    </button>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-center bg-[#A9573F] hover:bg-[#934833] text-xs uppercase tracking-widest text-white font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg rounded-[2px]"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
