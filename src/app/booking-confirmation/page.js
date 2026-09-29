'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  Phone,
  Printer,
  Compass,
} from 'lucide-react';
import Button from '@/components/ui/Button';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get('id');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('noor_active_booking');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!idFromUrl || parsed.id === idFromUrl) {
          setBooking(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [idFromUrl]);

  const reservationId = booking?.id || idFromUrl || 'NOOR-RES-88219';
  const guestName = booking?.customer?.fullName || 'Esteemed Patron';
  const guests = booking?.guests || 2;
  const date = booking?.date || new Date().toISOString().split('T')[0];
  const timeSlot = booking?.timeSlot || '8:00 PM';
  const salon = booking?.seating || 'The Amber Dining Salon';
  const occasion = booking?.occasion || 'Dinner Service';

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
            RESERVATION CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light">
            Your table is waiting.
          </h1>
          <p className="mt-2 text-stone-300 text-sm font-light">
            We look forward to hosting you, {guestName}. A calendar invitation and confirmation SMS have been prepared.
          </p>
        </motion.div>

        {/* Regal Reservation Card */}
        <div className="bg-[#1C1916] border border-[#B89A63]/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute right-0 bottom-0 text-[120px] font-serif text-[#B89A63]/5 select-none pointer-events-none leading-none -mb-8 -mr-8">
            NOOR
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#B89A63]/20 gap-4">
            <div>
              <span className="font-serif text-2xl text-[#FAF7F2] tracking-widest block">NOOR</span>
              <span className="text-[10px] tracking-[0.25em] text-[#B89A63] uppercase block">
                Diplomatic Enclave, Chanakyapuri
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-stone-400 block">
                Booking Reference
              </span>
              <span className="font-mono text-base text-[#B89A63] font-bold block">
                {reservationId}
              </span>
            </div>
          </div>

          {/* 4 Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-[#B89A63]/20 text-xs">
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#B89A63]" />
                Date
              </span>
              <span className="font-serif text-base text-[#FAF7F2]">{date}</span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#B89A63]" />
                Seating Time
              </span>
              <span className="font-serif text-base text-[#B89A63]">{timeSlot}</span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#B89A63]" />
                Party Size
              </span>
              <span className="font-serif text-base text-[#FAF7F2]">
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B89A63]" />
                Occasion
              </span>
              <span className="font-serif text-sm text-[#FAF7F2] truncate block">
                {occasion}
              </span>
            </div>
          </div>

          {/* Atmosphere & Seating Reserved */}
          <div className="py-6 border-b border-[#B89A63]/20 flex items-start gap-4">
            <Compass className="w-5 h-5 text-[#B89A63] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
                Reserved Dining Salon
              </span>
              <span className="font-serif text-lg text-[#FAF7F2] block mt-0.5">
                {salon}
              </span>
              <p className="text-stone-300 font-light mt-1 text-[11px] leading-relaxed">
                Your table is being prepared with personalized linen and silver place settings. If your arrival time changes by more than 15 minutes, please notify our reception concierge.
              </p>
            </div>
          </div>

          {/* Guidelines: Dress Code & Valet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-xs text-stone-400">
            <div>
              <span className="text-[#B89A63] uppercase tracking-wider font-semibold block mb-1">
                Dress Code
              </span>
              <p className="font-light leading-relaxed">
                Smart Elegant. We kindly request guests refrain from athletic wear, beach flip-flops, or sleeveless attire in the evening salons.
              </p>
            </div>
            <div>
              <span className="text-[#B89A63] uppercase tracking-wider font-semibold block mb-1">
                Valet & Arrival
              </span>
              <p className="font-light leading-relaxed">
                Complimentary white-glove valet parking is located at the Heritage Promenade porte-cochère.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/menu"
            className="text-xs uppercase tracking-widest text-[#B89A63] hover:text-[#FAF7F2] transition-colors"
          >
            ← Explore Menu in Advance
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#25211E] border border-[#B89A63]/30 hover:border-[#B89A63] text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Print Confirmation</span>
            </button>
            <Button href="/" variant="brass" size="sm">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-32 text-center text-[#B89A63] text-xs tracking-widest uppercase">
          Loading Booking Confirmation...
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}
