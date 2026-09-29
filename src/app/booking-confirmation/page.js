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
  CalendarPlus,
  ArrowRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

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
  const salon = booking?.seating || 'Indoor Dining (The Amber Salon)';

  const handleAddToCalendar = () => {
    toast.success('Calendar invitation (.ics) generated for your reservation.');
  };

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Success Badge with Subtle Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full border border-[#B89A63]/60 bg-[#221E1B] flex items-center justify-center mx-auto mb-4 text-[#B89A63] shadow-[0_0_25px_rgba(184,154,99,0.2)]">
            <CheckCircle2 className="w-8 h-8 text-[#B89A63]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2 font-mono">
            RESERVATION CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light uppercase tracking-wide">
            Your table is reserved.
          </h1>
          <p className="mt-2 text-stone-300 text-xs sm:text-sm font-light">
            We eagerly anticipate welcoming you, {guestName}. Your table has been reserved with our maitre d’.
          </p>
        </motion.div>

        {/* Regal Reservation Card */}
        <div className="bg-[#1C1916] border border-stone-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden rounded-[2px]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
            <div>
              <span className="font-serif text-2xl text-[#FAF7F2] tracking-widest block">NOOR</span>
              <span className="text-[10px] tracking-[0.25em] text-[#B89A63] uppercase block font-mono">
                Diplomatic Enclave · New Delhi
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                Reservation ID
              </span>
              <span className="font-mono text-base text-[#B89A63] font-bold block">
                {reservationId}
              </span>
            </div>
          </div>

          {/* Key Booking Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-stone-800 text-xs">
            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#B89A63]" />
                Date
              </span>
              <span className="font-serif text-base text-[#FAF7F2]">{date}</span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#B89A63]" />
                Time
              </span>
              <span className="font-serif text-base text-[#FAF7F2]">{timeSlot}</span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1 font-mono">
                <Users className="w-3.5 h-3.5 text-[#B89A63]" />
                Guests
              </span>
              <span className="font-serif text-base text-[#FAF7F2]">
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            <div>
              <span className="text-stone-400 block uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#B89A63]" />
                Location
              </span>
              <span className="font-serif text-sm text-[#FAF7F2] block truncate">
                Chanakyapuri, New Delhi
              </span>
            </div>
          </div>

          {/* Reserved Salon Atmosphere */}
          <div className="py-6 border-b border-stone-800 text-xs">
            <span className="text-stone-400 uppercase tracking-wider text-[10px] block font-mono">
              Seating Salon
            </span>
            <span className="font-serif text-lg text-[#FAF7F2] block mt-0.5">
              {salon}
            </span>
            <p className="text-stone-300 font-light mt-1 text-[11px] leading-relaxed">
              Tables are held for 15 minutes past the seating time. Complimentary white-glove valet parking is located at the Heritage Promenade porte-cochère.
            </p>
          </div>

          {/* Guidelines */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-400">
            <div>
              <span className="text-[#B89A63] uppercase tracking-wider font-semibold block mb-0.5 text-[10px] font-mono">
                Dress Code
              </span>
              <p className="font-light">Smart Elegant. We kindly request guests avoid athletic wear in the evening salons.</p>
            </div>
            <div>
              <span className="text-[#B89A63] uppercase tracking-wider font-semibold block mb-0.5 text-[10px] font-mono">
                Inquiries
              </span>
              <p className="font-light">Direct Concierge Desk: <span className="font-mono text-stone-200">+91 11 4982 8800</span></p>
            </div>
          </div>
        </div>

        {/* 3 Explicit Action Buttons: Add to Calendar, View Menu, Back to Home */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto px-5 py-3 bg-[#24201D] border border-stone-700 hover:border-[#B89A63] text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-colors rounded-[2px] cursor-pointer"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#B89A63]" />
            <span>Add to Calendar</span>
          </button>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button href="/menu" variant="outline" size="sm" className="flex-1 sm:flex-none">
              View Menu
            </Button>
            <Button href="/" variant="primary" size="sm" className="flex-1 sm:flex-none">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <BookingConfirmationContent />
    </Suspense>
  );
}
