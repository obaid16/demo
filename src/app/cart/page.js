'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromo,
    gstTax,
    packagingFee,
    total,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromo(inputCode);
  };

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#B89A63]/20 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium block mb-1">
              REVIEW ORDER
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light">
              Your Culinary Tray
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs uppercase tracking-wider text-stone-400 hover:text-[#A9573F] transition-colors"
            >
              Clear Entire Tray
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center bg-[#1D1A18] border border-[#B89A63]/20 max-w-2xl mx-auto p-8">
            <ShoppingBag className="w-12 h-12 text-[#B89A63] mx-auto mb-4 opacity-50" />
            <h2 className="font-serif text-3xl text-[#FAF7F2] mb-3">Your Tray is Currently Empty</h2>
            <p className="text-stone-300 text-sm max-w-md mx-auto mb-8 font-light">
              Discover our clay-oven tandoor creations, Awadhi dum biryanis, and artisanal breads to compose your order.
            </p>
            <Button href="/menu" variant="brass" size="md">
              Explore Menu Repertoire
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items Table List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-[#1F1C19] border border-[#B89A63]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Dish Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 shrink-0 bg-[#141210] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/menu/${item.id}`}
                        className="font-serif text-lg text-[#FAF7F2] hover:text-[#B89A63] transition-colors leading-snug"
                      >
                        {item.name}
                      </Link>
                      <span className="text-xs text-[#B89A63] block mt-0.5">
                        ₹{item.price} each
                      </span>
                      {item.instructions && (
                        <span className="text-[11px] text-stone-400 italic block mt-1">
                          “{item.instructions}”
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-stone-800">
                    <div className="flex items-center border border-[#B89A63]/30 bg-[#141210]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-stone-300 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#FAF7F2]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-stone-300 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-serif text-lg text-[#FAF7F2] min-w-16 text-right font-medium">
                      ₹{item.price * item.quantity}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-500 hover:text-[#A9573F] p-1.5 transition-colors"
                      title="Remove dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-between items-center text-xs">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-1.5 text-[#B89A63] hover:underline uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Add More Dishes</span>
                </Link>
              </div>
            </div>

            {/* Billing Summary Box */}
            <div className="lg:col-span-4 bg-[#1C1916] border border-[#B89A63]/30 p-6 sm:p-8 shadow-2xl">
              <h2 className="font-serif text-2xl text-[#FAF7F2] pb-4 border-b border-[#B89A63]/20 mb-6">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApply} className="mb-6 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo Code ('ROYAL15')"
                    className="w-full bg-[#141210] border border-[#B89A63]/30 pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-[#B89A63]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D2824] hover:bg-[#B89A63] hover:text-[#171513] text-xs uppercase tracking-wider transition-colors text-white font-medium"
                >
                  Apply
                </button>
              </form>

              {/* Price Rows */}
              <div className="space-y-3 text-xs sm:text-sm text-stone-300 pb-6 border-b border-[#B89A63]/20">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#FAF7F2]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({promoCode})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-[#FAF7F2]">₹{gstTax}</span>
                </div>

                <div className="flex justify-between">
                  <span>Artisanal Packaging & Warmth Seal</span>
                  <span className="text-[#FAF7F2]">₹{packagingFee}</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="pt-4 pb-6 flex justify-between items-baseline font-serif">
                <span className="text-lg text-[#FAF7F2]">Total Payable</span>
                <span className="text-2xl text-[#B89A63] font-sans font-semibold">₹{total}</span>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#A9573F] hover:bg-[#924530] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89A63]" />
                <span>Simulated Secure Dining Gateway</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
