'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Store,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, gstTax, packagingFee, total, clearCart } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    apartment: '',
    city: 'New Delhi',
    pincode: '110021',
    instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod', 'restaurant'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Please enter your full name and phone number.');
      return;
    }

    if (orderType === 'delivery' && !formData.streetAddress.trim()) {
      toast.error('Please enter your delivery street address.');
      return;
    }

    setIsSubmitting(true);

    const orderId = 'NOOR-ORD-' + Math.floor(10000 + Math.random() * 90000);
    const orderDetails = {
      id: orderId,
      createdAt: new Date().toISOString(),
      orderType,
      items: [...items],
      subtotal,
      discountAmount,
      gstTax,
      packagingFee,
      total,
      paymentMethod,
      customer: formData,
      status: 'Order Placed & Kitchen Notified',
      estimatedTime: orderType === 'delivery' ? '35–45 Minutes' : '20–25 Minutes',
    };

    // Store in localStorage
    try {
      localStorage.setItem('noor_last_order', JSON.stringify(orderDetails));
    } catch (err) {
      console.error(err);
    }

    // Simulate luxury order dispatch
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen text-center">
        <div className="max-w-md mx-auto p-8 bg-[#1D1A18] border border-[#B89A63]/20">
          <h2 className="font-serif text-2xl mb-3">Your order tray is currently empty</h2>
          <p className="text-stone-400 text-xs mb-6">
            Please add dishes from our menu before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-block px-6 py-3 bg-[#B89A63] text-[#171513] text-xs uppercase tracking-widest font-semibold hover:bg-[#D4BA88]"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#B89A63] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Tray</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light">
            Artisanal Dining Checkout
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
            Complete your coordinates to receive your royal repast.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form: Details & Payment */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Dining Mode Toggle */}
            <div className="p-6 bg-[#1D1A18] border border-[#B89A63]/25">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-4">
                1. Service Selection
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 border text-left flex flex-col gap-1 transition-all ${
                    orderType === 'delivery'
                      ? 'border-[#B89A63] bg-[#292420] text-white'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="font-serif text-base text-[#FAF7F2]">Direct Chauffeur Delivery</span>
                  <span className="text-xs font-light text-stone-400">
                    Hand-delivered in temperature-sealed copper boxes (35–45 mins)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 border text-left flex flex-col gap-1 transition-all ${
                    orderType === 'pickup'
                      ? 'border-[#B89A63] bg-[#292420] text-white'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="font-serif text-base text-[#FAF7F2]">Restaurant Curbside Pickup</span>
                  <span className="text-xs font-light text-stone-400">
                    Collect directly from our Chanakyapuri concierge (20–25 mins)
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Customer Contact Details */}
            <div className="p-6 bg-[#1D1A18] border border-[#B89A63]/25">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5">
                2. Patron Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98100 12345"
                    className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vikram@singhania.com"
                    className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Address (if Delivery) */}
            {orderType === 'delivery' && (
              <div className="p-6 bg-[#1D1A18] border border-[#B89A63]/25">
                <h2 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B89A63]" />
                  <span>3. Destination Address</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                      Street Address / Estate Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="e.g. 14, Amrita Shergill Marg, Golf Links"
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                        Apartment / Gate Code / Wing
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="e.g. Penthouse B"
                        className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                      Delivery & Gate Instructions
                    </label>
                    <input
                      type="text"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="e.g. Announce at security desk, hand over to butler"
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Payment Method Selection (Realistic Simulation) */}
            <div className="p-6 bg-[#1D1A18] border border-[#B89A63]/25">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5">
                {orderType === 'delivery' ? '4.' : '3.'} Payment Privilege Selection
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border text-left flex items-center justify-between transition-colors rounded-[2px] cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#B89A63] bg-[#24201D] text-white shadow-sm'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#B89A63]" />
                    <div>
                      <span className="font-serif text-sm text-[#FAF7F2] block">Instant UPI QR / App</span>
                      <span className="text-[11px] text-stone-400">Google Pay, PhonePe, Cred</span>
                    </div>
                  </div>
                  {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-[#B89A63] shrink-0 ml-2" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border text-left flex items-center justify-between transition-colors rounded-[2px] cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#B89A63] bg-[#24201D] text-white shadow-sm'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#B89A63]" />
                    <div>
                      <span className="font-serif text-sm text-[#FAF7F2] block">Credit / Debit Card</span>
                      <span className="text-[11px] text-stone-400">Amex, Visa, Mastercard</span>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-[#B89A63] shrink-0 ml-2" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border text-left flex items-center justify-between transition-colors rounded-[2px] cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#B89A63] bg-[#24201D] text-white shadow-sm'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-[#B89A63]" />
                    <div>
                      <span className="font-serif text-sm text-[#FAF7F2] block">Cash on Delivery</span>
                      <span className="text-[11px] text-stone-400">Exact change appreciated</span>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-[#B89A63] shrink-0 ml-2" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('restaurant')}
                  className={`p-4 border text-left flex items-center justify-between transition-colors rounded-[2px] cursor-pointer ${
                    paymentMethod === 'restaurant'
                      ? 'border-[#B89A63] bg-[#24201D] text-white shadow-sm'
                      : 'border-stone-800 bg-[#161412] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-[#B89A63]" />
                    <div>
                      <span className="font-serif text-sm text-[#FAF7F2] block">Pay at Restaurant</span>
                      <span className="text-[11px] text-stone-400">During curbside collection</span>
                    </div>
                  </div>
                  {paymentMethod === 'restaurant' && <CheckCircle2 className="w-4 h-4 text-[#B89A63] shrink-0 ml-2" />}
                </button>
              </div>

              {/* Realistic Simulated Fields for Selected Payment */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-[#141210] border border-[#B89A63]/20 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white p-1 rounded-xs shrink-0 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-[#171513]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-[#FAF7F2] block">UPI Handle: noor@icici</span>
                    <span className="text-stone-400 text-[11px] block mt-0.5">
                      Your order will be approved instantly in demo mode upon clicking Place Order.
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-[#141210] border border-[#B89A63]/20 text-xs">
                  <div>
                    <label className="block text-stone-400 uppercase tracking-wider text-[10px] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-[#1F1C19] border border-[#B89A63]/30 px-3 py-2 text-stone-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-400 uppercase tracking-wider text-[10px] mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-[#1F1C19] border border-[#B89A63]/30 px-3 py-2 text-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 uppercase tracking-wider text-[10px] mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        className="w-full bg-[#1F1C19] border border-[#B89A63]/30 px-3 py-2 text-stone-200"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Confirmation Summary */}
          <div className="lg:col-span-4 sticky top-28 bg-[#1C1916] border border-[#B89A63]/30 p-6 shadow-2xl">
            <h2 className="font-serif text-2xl text-[#FAF7F2] pb-4 border-b border-[#B89A63]/20 mb-4">
              Order Receipt
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 text-xs">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between py-1.5 border-b border-stone-800">
                  <div className="pr-2">
                    <span className="text-[#FAF7F2] block font-medium">{it.name}</span>
                    <span className="text-[11px] text-stone-400">Qty: {it.quantity}</span>
                  </div>
                  <span className="font-mono text-stone-300">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-stone-300 py-3 border-t border-[#B89A63]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Privilege Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span>₹{gstTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Seal Packaging</span>
                <span>₹{packagingFee}</span>
              </div>
              <div className="flex justify-between text-base font-serif pt-3 border-t border-[#B89A63]/20 text-[#FAF7F2]">
                <span>Total Amount</span>
                <span className="text-xl text-[#B89A63] font-sans font-semibold">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full py-4 bg-[#A9573F] hover:bg-[#924530] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Dispatching Order to Kitchen...</span>
              ) : (
                <>
                  <span>Place Order (₹{total})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Commercial Demo Architecture — No Payment Deducted</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
