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
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#1B1816] border-l border-[#B89A63]/20 shadow-2xl flex flex-col text-[#F4EFE6]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#B89A63]/15 flex items-center justify-between bg-[#171513]">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#B89A63]" />
                  <div>
                    <h2 className="font-serif text-xl tracking-wide text-[#F4EFE6]">
                      Your Order Selection
                    </h2>
                    <p className="text-xs text-[#B89A63] tracking-widest uppercase">
                      {items.length} {items.length === 1 ? 'Dish' : 'Dishes'} Selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#D9D2C5] hover:text-[#FAF7F2] hover:bg-[#282420] rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#B89A63]/40 flex items-center justify-center mb-4 text-[#B89A63]">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#FAF7F2] mb-2">Your Tray is Empty</h3>
                    <p className="text-sm text-[#D9D2C5] max-w-xs mb-6">
                      Explore our hand-crafted tandoor, royal biryanis, and culinary creations.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 border border-[#B89A63] text-xs uppercase tracking-widest text-[#B89A63] hover:bg-[#B89A63] hover:text-[#171513] transition-all"
                    >
                      Browse Tasting Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="p-4 bg-[#231F1C] border border-[#B89A63]/15 rounded-sm flex gap-3 group relative"
                    >
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xs bg-[#171513]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base text-[#FAF7F2] leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-500 hover:text-[#A9573F] transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#B89A63] mt-0.5">₹{item.price}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#B89A63]/10">
                          {/* Qty Controls */}
                          <div className="flex items-center border border-[#B89A63]/30 bg-[#171513]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-[#FAF7F2]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-[#282420] text-stone-300 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-medium text-[#FAF7F2]">
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
                <div className="p-6 bg-[#171513] border-t border-[#B89A63]/20 space-y-4">
                  {/* Promo code */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Try 'ROYAL15'"
                        className="w-full bg-[#211E1B] border border-[#B89A63]/25 pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-[#B89A63]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2D2824] hover:bg-[#B89A63] hover:text-[#171513] text-xs uppercase tracking-wider text-[#FAF7F2] transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#D9D2C5]">
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
                      <span>Eco-luxury Packaging</span>
                      <span className="text-[#FAF7F2]">₹{packagingFee}</span>
                    </div>
                    <div className="pt-2 border-t border-[#B89A63]/20 flex justify-between items-baseline text-sm font-serif">
                      <span className="text-base text-[#FAF7F2]">Total Payable</span>
                      <span className="text-lg text-[#B89A63] font-sans font-semibold">₹{total}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-center border border-[#B89A63]/50 text-xs uppercase tracking-widest text-[#F4EFE6] hover:bg-[#B89A63]/10 transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-center bg-[#A9573F] hover:bg-[#924530] text-xs uppercase tracking-widest text-[#FAF7F2] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                    >
                      <span>Checkout</span>
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
