'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Printer,
  ShoppingBag,
  Flame,
  ArrowRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('noor_last_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!urlOrderId || parsed.id === urlOrderId) {
          setOrder(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [urlOrderId]);

  const displayId = order?.id || urlOrderId || 'NOOR-ORD-58291';
  const customerName = order?.customer?.fullName || 'Esteemed Patron';
  const orderType = order?.orderType === 'pickup' ? 'Restaurant Curbside Pickup' : 'Chauffeur Delivery';
  const estimatedTime = order?.estimatedTime || '35–45 Minutes';

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Success Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full border border-[#B89A63] bg-[#221E1B] flex items-center justify-center mx-auto mb-4 text-[#B89A63] shadow-[0_0_30px_rgba(184,154,99,0.3)]">
            <CheckCircle2 className="w-8 h-8 text-[#B89A63]" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2">
            ORDER CONFIRMED & QUEUED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light">
            Your feast is being prepared.
          </h1>
          <p className="mt-2 text-stone-300 text-sm font-light">
            Thank you, {customerName}. Our tandoor ustaads and master chefs have commenced your dishes.
          </p>
        </motion.div>

        {/* Live Preparation Status Progress Bar */}
        <div className="mb-10 p-6 bg-[#1D1A18] border border-[#B89A63]/30">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[#B89A63] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#A9573F]" />
              Live Kitchen Progress
            </span>
            <span className="text-stone-400 font-mono">Est: {estimatedTime}</span>
          </div>

          {/* Stepper Bar */}
          <div className="w-full bg-[#12100F] h-2 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '60%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#B89A63] to-[#A9573F]"
            />
          </div>

          <div className="grid grid-cols-3 text-[11px] text-stone-400 text-center font-light">
            <span className="text-[#FAF7F2] font-medium">1. Order Received</span>
            <span className="text-[#B89A63] font-medium">2. Cooking at Hearth</span>
            <span>3. Out for Dispatch</span>
          </div>
        </div>

        {/* Formal Receipt Box */}
        <div className="bg-[#1C1916] border border-[#B89A63]/25 p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#B89A63]/20 gap-4">
            <div>
              <span className="font-serif text-2xl text-[#FAF7F2] tracking-widest block">NOOR</span>
              <span className="text-[10px] tracking-[0.25em] text-[#B89A63] uppercase block">
                Indian Dining • Diplomatic Enclave
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-stone-400 block">
                Order Reference
              </span>
              <span className="font-mono text-sm text-[#B89A63] font-semibold block">
                {displayId}
              </span>
            </div>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-300 pb-6 border-b border-stone-800">
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px]">
                Service Mode
              </span>
              <span className="text-[#FAF7F2] font-medium mt-0.5 block">{orderType}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px]">
                Estimated Handover
              </span>
              <span className="text-[#B89A63] font-medium mt-0.5 block">{estimatedTime}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px]">
                Payment Status
              </span>
              <span className="text-emerald-400 font-medium mt-0.5 block">Approved (Demo)</span>
            </div>
          </div>

          {/* Itemized Dishes */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-3 pb-6 border-b border-stone-800 text-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#B89A63] block font-semibold">
                Curated Dishes
              </span>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-stone-300">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-mono text-[#FAF7F2]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="space-y-2 text-xs text-stone-300 pb-6 border-b border-[#B89A63]/20">
            {order?.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Privilege Discount</span>
                <span>-₹{order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Restaurant GST (5%)</span>
              <span>₹{order?.gstTax || 120}</span>
            </div>
            <div className="flex justify-between">
              <span>Artisanal Packaging & Warmth Seal</span>
              <span>₹{order?.packagingFee || 45}</span>
            </div>
            <div className="flex justify-between text-base font-serif pt-3 border-t border-stone-800 text-[#FAF7F2]">
              <span>Grand Total</span>
              <span className="text-xl text-[#B89A63] font-sans font-semibold">
                ₹{order?.total || 1485}
              </span>
            </div>
          </div>

          {/* Restaurant Concierge Contact */}
          <div className="text-xs text-stone-400 space-y-1">
            <p>For live updates on your chauffeur dispatch or packaging modifications:</p>
            <p className="text-stone-200">
              Kitchen Dispatch Concierge:{' '}
              <span className="text-[#B89A63] font-mono">+91 11 4982 8800</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/menu"
            className="text-xs uppercase tracking-widest text-[#B89A63] hover:text-[#FAF7F2] transition-colors"
          >
            ← Return to Dining Menu
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#25211E] border border-[#B89A63]/30 hover:border-[#B89A63] text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Print Receipt</span>
            </button>
            <Button href="/book" variant="brass" size="sm">
              Reserve A Table Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-32 text-center text-[#B89A63] text-xs tracking-widest uppercase">
          Loading Order Confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
