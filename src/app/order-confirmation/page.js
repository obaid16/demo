'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Printer,
  Flame,
  Phone,
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
  const estimatedTime = '25–30 Minutes';

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Top Success Badge with Calm, Soft Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full border border-[#B89A63]/50 bg-[#221E1B] flex items-center justify-center mx-auto mb-4 text-[#B89A63] shadow-[0_0_25px_rgba(184,154,99,0.2)]">
            <CheckCircle2 className="w-8 h-8 text-[#B89A63]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2 font-mono">
            ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light">
            Your order is being prepared.
          </h1>
          <p className="mt-2 text-stone-300 text-xs sm:text-sm font-light">
            Thank you, {customerName}. The tandoor hearth and prep stations have commenced your order.
          </p>
        </motion.div>

        {/* Calm Progress Strip */}
        <div className="mb-8 p-5 bg-[#1B1816] border border-stone-800 rounded-[2px]">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[#A9573F] uppercase tracking-wider font-semibold flex items-center gap-1.5 font-mono text-[11px]">
              <Flame className="w-3.5 h-3.5 text-[#A9573F]" />
              Kitchen Status
            </span>
            <span className="text-stone-300 font-mono text-[11px]">Est. Time: {estimatedTime}</span>
          </div>

          <div className="w-full bg-[#12100F] h-1.5 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '60%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-[#A9573F]"
            />
          </div>

          <div className="grid grid-cols-3 text-[10px] text-stone-400 text-center font-mono">
            <span className="text-[#FAF7F2]">1. Received</span>
            <span className="text-[#B89A63] font-semibold">2. At the Hearth</span>
            <span>3. Dispatched</span>
          </div>
        </div>

        {/* Minimal Order Receipt */}
        <div className="bg-[#1C1916] border border-stone-800 p-7 sm:p-8 shadow-2xl space-y-6 rounded-[2px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-800">
            <div>
              <span className="font-serif text-xl text-[#FAF7F2] tracking-wider block">NOOR</span>
              <span className="text-[10px] tracking-[0.2em] text-[#B89A63] uppercase block font-mono">
                Indian Dining
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                Order Number
              </span>
              <span className="font-mono text-sm text-[#FAF7F2] font-semibold block">
                {displayId}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 text-xs text-stone-300 pb-5 border-b border-stone-800">
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] font-mono">
                Service Type
              </span>
              <span className="text-[#FAF7F2] font-medium mt-0.5 block">{orderType}</span>
            </div>
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] font-mono">
                Preparation Time
              </span>
              <span className="text-[#B89A63] font-medium mt-0.5 block font-mono">{estimatedTime}</span>
            </div>
          </div>

          {/* Itemized Dishes */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-2.5 pb-5 border-b border-stone-800 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                Order Summary
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

          {/* Total */}
          <div className="flex justify-between items-baseline pt-1 text-[#FAF7F2] font-serif">
            <span className="text-base">Grand Total</span>
            <span className="text-2xl text-[#FAF7F2] font-medium font-sans">
              ₹{order?.total || 1485}
            </span>
          </div>

          {/* Restaurant Contact */}
          <div className="pt-4 border-t border-stone-800/80 text-xs text-stone-400 flex items-center justify-between">
            <span>Kitchen & Dispatch Desk:</span>
            <span className="text-stone-200 font-mono flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#B89A63]" />
              +91 (11) 4982 8800
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/menu"
            className="text-xs uppercase tracking-widest text-[#B89A63] hover:text-[#FAF7F2] transition-colors"
          >
            ← Return to Menu
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-[#25211E] border border-stone-700 hover:border-stone-500 text-xs uppercase tracking-wider text-white flex items-center gap-1.5 transition-colors rounded-[2px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Print Receipt</span>
            </button>
            <Button href="/book" variant="primary" size="sm">
              Reserve a Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
