'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import { toast } from 'sonner';

const SEATING_OPTIONS = [
  {
    id: 'indoor',
    name: 'Indoor Dining',
    salon: 'The Amber Salon',
    desc: 'Intimate candlelit alcoves surrounded by hand-hammered brass lattices.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Terrace',
    salon: 'Courtyard Lantern Terrace',
    desc: 'Alfresco dining beneath the night sky with live water fountains and terracotta fire pits.',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'private',
    name: 'Private Dining',
    salon: 'The Noor Mahal Suite',
    desc: 'Discreet royal dining chamber with dedicated sommelier and silver-service butler.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bar',
    name: 'Hearth & Bar',
    salon: 'Sigri Counter',
    desc: 'Front-row view of the live clay tandoor with crafted single malts and botanical elixirs.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  },
];

const TIME_SLOTS = [
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
];

function BookingFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveReservation } = useReservation();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('indoor');
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

  useEffect(() => {
    const occ = searchParams.get('occasion');
    if (occ) setOccasion(occ);
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Please enter your full name and contact telephone.');
      return;
    }

    setIsSubmitting(true);

    const seatingObj = SEATING_OPTIONS.find((s) => s.id === seating);

    const bookingPayload = {
      date,
      timeSlot,
      guests,
      seating: seatingObj ? `${seatingObj.name} (${seatingObj.salon})` : 'Indoor Dining',
      seatingId: seating,
      occasion,
      customer: formData,
    };

    const confirmed = saveReservation(bookingPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your table has been reserved.');
      router.push(`/booking-confirmation?id=${confirmed.id}`);
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. Date & Guest Selection */}
      <div className="p-6 sm:p-8 bg-[#1B1816] border border-stone-800 rounded-[2px]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
          <Calendar className="w-4 h-4 text-[#B89A63]" />
          <span>1. Date & Party Size</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-mono">
              Reservation Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#141210] border border-stone-800 px-4 py-3 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]/50 rounded-[2px]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-mono">
              Number of Guests
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 6, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuests(num)}
                  className={`py-3 text-xs font-semibold transition-all rounded-[2px] cursor-pointer ${
                    guests === num
                      ? 'bg-[#A9573F] text-white font-bold border border-[#A9573F]'
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

      {/* 2. Seating Atmosphere (Indoor / Outdoor / Private / Bar) */}
      <div className="p-6 sm:p-8 bg-[#1B1816] border border-stone-800 rounded-[2px]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
          <Users className="w-4 h-4 text-[#B89A63]" />
          <span>2. Seating Atmosphere</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEATING_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSeating(opt.id)}
              className={`relative cursor-pointer border overflow-hidden transition-all duration-300 flex flex-col justify-between rounded-[2px] ${
                seating === opt.id
                  ? 'border-[#B89A63] bg-[#221F1C] shadow-xl'
                  : 'border-stone-800/80 bg-[#161412] opacity-80 hover:opacity-100 hover:border-stone-700'
              }`}
            >
              <div className="relative aspect-[4/3] w-full bg-[#100E0D]">
                <Image
                  src={opt.image}
                  alt={opt.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
                {seating === opt.id && (
                  <div className="absolute top-2.5 right-2.5 bg-[#A9573F] text-white p-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-[#B89A63] font-mono">
                  {opt.salon}
                </div>
                <h3 className="font-serif text-base text-[#FAF7F2] font-medium leading-snug mt-0.5 mb-1">
                  {opt.name}
                </h3>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Desired Seating Time Slot */}
      <div className="p-6 sm:p-8 bg-[#1B1816] border border-stone-800 rounded-[2px]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
          <Clock className="w-4 h-4 text-[#B89A63]" />
          <span>3. Desired Seating Time</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTimeSlot(slot)}
              className={`px-5 py-3 text-xs tracking-wider transition-all rounded-[2px] cursor-pointer ${
                timeSlot === slot
                  ? 'bg-[#A9573F] text-white font-semibold border border-[#A9573F]'
                  : 'bg-[#141210] text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Guest Details & Occasion */}
      <div className="p-6 sm:p-8 bg-[#1B1816] border border-stone-800 rounded-[2px]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-6">
          <Users className="w-4 h-4 text-[#B89A63]" />
          <span>4. Guest Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Full Name *
            </label>
            <input
              type="text"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Radhika Kapoor"
              className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98200 12345"
              className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="radhika@kapoor.com"
              className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Special Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px] cursor-pointer"
            >
              <option value="Dinner Service">Dinner Service / Romantic Evening</option>
              <option value="Anniversary">Wedding Anniversary</option>
              <option value="Birthday">Birthday Celebration</option>
              <option value="Corporate Hosting">Corporate Executive Dinner</option>
              <option value="Friday Sufi Strings">Friday Sufi Strings Experience</option>
              <option value="Royal Dastan Degustation">The Royal Dastan Tasting Table</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Dietary Notes / Allergens
            </label>
            <input
              type="text"
              name="dietaryNotes"
              value={formData.dietaryNotes}
              onChange={handleInputChange}
              placeholder="e.g. Vegetarian, nut allergy, Jain preferences"
              className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
            Special Requests for Maitre d’ (Optional)
          </label>
          <input
            type="text"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="e.g. Quiet corner alcove, anniversary greeting card"
            className="w-full bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-stone-600 rounded-[2px]"
          />
        </div>
      </div>

      {/* Confirmation Action Bar */}
      <div className="p-7 bg-[#1E1B18] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl rounded-[2px]">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#B89A63] font-semibold block font-mono">
            INSTANT TABLE CONFIRMATION
          </span>
          <p className="text-stone-300 text-xs sm:text-sm font-light mt-0.5">
            Table for {guests} {guests === 1 ? 'guest' : 'guests'} on {date} at {timeSlot}.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#A9573F] hover:bg-[#934833] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer disabled:opacity-50 rounded-[2px]"
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
  );
}

export default function BookingPage() {
  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2 font-mono">
            TABLE RESERVATIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight">
            Reserve Your Table
          </h1>
          <p className="mt-3 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            Tables are held for 15 minutes past the reserved seating hour. For buyout banquets exceeding 12 guests, our maitre d’ will coordinate every detail.
          </p>
        </div>

        <Suspense fallback={null}>
          <BookingFormInner />
        </Suspense>
      </div>
    </div>
  );
}
