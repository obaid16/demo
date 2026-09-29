'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  MapPin,
  CheckCircle2,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import { toast } from 'sonner';

const SEATING_AREAS = [
  {
    id: 'main-salon',
    name: 'The Amber Dining Salon',
    desc: 'Intimate candlelit alcoves surrounded by hand-hammered brass lattices.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'courtyard',
    name: 'Courtyard Lantern Terrace',
    desc: 'Alfresco dining beneath starlit skies with live water fountains and terracotta fire pits.',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'maharaja-suite',
    name: 'The Noor Mahal Private Suite',
    desc: 'Regal private dining chamber with dedicated sommelier and silver-service butler.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hearth-bar',
    name: 'Sigri Hearth & Botanical Counter',
    desc: 'Front-row view of the clay tandoor with crafted single malt and botanical elixirs.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  },
];

const LUNCH_SLOTS = ['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'];
const DINNER_SLOTS = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveReservation } = useReservation();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('main-salon');
  const [timeSlot, setTimeSlot] = useState('8:00 PM');
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'Dinner Service');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dietaryNotes: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Please enter your full name and contact number.');
      return;
    }

    setIsSubmitting(true);

    const seatingObj = SEATING_AREAS.find((s) => s.id === seating);

    const bookingPayload = {
      date,
      timeSlot,
      guests,
      seating: seatingObj ? seatingObj.name : 'The Amber Dining Salon',
      seatingId: seating,
      occasion,
      customer: formData,
    };

    const confirmed = saveReservation(bookingPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Table reserved successfully.');
      router.push(`/booking-confirmation?id=${confirmed.id}`);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2">
            TABLE RESERVATIONS & BANQUETING
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight">
            Reserve Your Table
          </h1>
          <p className="mt-3 text-stone-300 text-xs sm:text-sm font-light">
            We hold tables for 15 minutes past the reserved hour. For private chamber buyouts exceeding 12 guests, our maitre d’ will contact you to coordinate a tailored menu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* STEP 1: Date & Guests */}
          <div className="p-6 sm:p-8 bg-[#1D1A18] border border-[#B89A63]/25 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
              <Calendar className="w-4 h-4 text-[#B89A63]" />
              <span>1. Date & Party Size</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                />
              </div>

              {/* Guest Count Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 text-xs font-semibold transition-all ${
                        guests === num
                          ? 'bg-[#B89A63] text-[#171513] font-bold border border-[#B89A63]'
                          : 'bg-[#141210] text-stone-300 border border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {num} {num === 8 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Seating Salon */}
          <div className="p-6 sm:p-8 bg-[#1D1A18] border border-[#B89A63]/25 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#B89A63]" />
              <span>2. Salon Atmosphere Preference</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SEATING_AREAS.map((area) => (
                <div
                  key={area.id}
                  onClick={() => setSeating(area.id)}
                  className={`relative cursor-pointer border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    seating === area.id
                      ? 'border-[#B89A63] bg-[#26221E] shadow-xl'
                      : 'border-stone-800 bg-[#161412] opacity-80 hover:opacity-100 hover:border-stone-700'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full bg-[#100E0D]">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover"
                    />
                    {seating === area.id && (
                      <div className="absolute top-2 right-2 bg-[#B89A63] text-[#171513] p-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm text-[#FAF7F2] font-medium leading-snug mb-1">
                      {area.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: Time Slot Selection */}
          <div className="p-6 sm:p-8 bg-[#1D1A18] border border-[#B89A63]/25 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
              <Clock className="w-4 h-4 text-[#B89A63]" />
              <span>3. Desired Seating Time</span>
            </div>

            {/* Lunch Service */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#B89A63] block mb-3 font-medium">
                Lunch Service (12:00 PM – 3:30 PM)
              </span>
              <div className="flex flex-wrap gap-2.5">
                {LUNCH_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-4 py-2.5 text-xs tracking-wider transition-all ${
                      timeSlot === slot
                        ? 'bg-[#B89A63] text-[#171513] font-semibold border border-[#B89A63]'
                        : 'bg-[#141210] text-stone-300 border border-stone-800 hover:border-[#B89A63]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Dinner Service */}
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#B89A63] block mb-3 font-medium">
                Dinner Service (7:00 PM – 11:30 PM)
              </span>
              <div className="flex flex-wrap gap-2.5">
                {DINNER_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-4 py-2.5 text-xs tracking-wider transition-all ${
                      timeSlot === slot
                        ? 'bg-[#B89A63] text-[#171513] font-semibold border border-[#B89A63]'
                        : 'bg-[#141210] text-stone-300 border border-stone-800 hover:border-[#B89A63]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: Guest Details & Occasion */}
          <div className="p-6 sm:p-8 bg-[#1D1A18] border border-[#B89A63]/25 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
              <Users className="w-4 h-4 text-[#B89A63]" />
              <span>4. Guest Details & Hospitality Notes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Radhika Kapoor"
                  className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98200 44556"
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
                  onChange={handleInputChange}
                  placeholder="radhika@kapoor.com"
                  className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Special Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                >
                  <option value="Dinner Service">Romantic Dinner / Date Night</option>
                  <option value="Anniversary">Wedding Anniversary</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Executive Dinner">Corporate Executive Dinner</option>
                  <option value="Friday Sufi">Friday Sufi Strings Experience</option>
                  <option value="Chef Tasting">The Royal Dastan Tasting Menu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Dietary Restrictions / Allergens
                </label>
                <input
                  type="text"
                  name="dietaryNotes"
                  value={formData.dietaryNotes}
                  onChange={handleInputChange}
                  placeholder="e.g. Vegetarian only, no shellfish, gluten allergy"
                  className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                Special Requests for Maitre d’ (Optional)
              </label>
              <input
                type="text"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="e.g. Quiet corner table, floral centerpiece, anniversary dessert message"
                className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
              />
            </div>
          </div>

          {/* Submit Action Banner */}
          <div className="p-8 bg-[#211E1B] border border-[#B89A63]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B89A63] font-semibold block">
                Instant Confirmation
              </span>
              <p className="text-stone-300 text-xs sm:text-sm font-light mt-0.5">
                You are requesting a table for {guests} {guests === 1 ? 'guest' : 'guests'} on {date} at {timeSlot}.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-[#B89A63] hover:bg-[#D4BA88] text-[#171513] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Table...</span>
              ) : (
                <>
                  <span>Confirm Table Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-32 text-center text-[#B89A63] text-xs tracking-widest uppercase">
          Loading Reservation Portal...
        </div>
      }
    >
      <BookingFormContent />
    </Suspense>
  );
}
