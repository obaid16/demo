import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Our Story & Philosophy — NOOR Indian Dining',
  description: 'The story of NOOR. Reinterpreting royal Awadhi and Kashmiri recipes through 36-hour charcoal slow-cooking, single-origin spices, and refined culinary restraint.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#171513] text-[#F4EFE6] min-h-screen">
      {/* 1. CINEMATIC HERO (Dark) */}
      <section className="pt-36 pb-20 bg-[#100E0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HERITAGE & VISION"
            title="Rooted in History. Refined for Today."
            subtitle="A living archive of India’s forgotten court banquets, elevated by modern culinary precision and uncompromised restraint."
          />

          <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden border border-stone-800 shadow-2xl mt-8 rounded-[2px]">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
              alt="NOOR Indian Dining Atmosphere"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 max-w-lg">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89A63] font-mono block mb-1">
                CHANAKYAPURI · NEW DELHI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light">
                A sanctuary of slow charcoal embers and royal hospitality.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHAPTER I: The Lost Language of Restraint (WARM IVORY SECTION) */}
      <section className="py-24 sm:py-32 bg-[#F4EFE6] text-[#171513]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#A9573F] font-semibold block mb-3 font-mono">
                CHAPTER I · PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#171513] font-light leading-tight mb-6">
                The Lost Art of Culinary Restraint
              </h2>
              <p className="text-[#5A4638] text-sm sm:text-base leading-relaxed font-light mb-5">
                In the royal courts of Awadh and Kashmir, dining was celebrated for fragrance, digestibility, and balance. Dishes were never weighed down with artificial colors or heavy commercial purees.
              </p>
              <p className="text-[#5A4638] text-xs sm:text-sm leading-relaxed font-light mb-8">
                At NOOR, our gravies simmer for thirty-six continuous hours over dying charcoal embers, drawing out the medicinal sweetness of whole spices rather than masking them.
              </p>

              <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#171513]/15">
                <div>
                  <span className="font-serif text-2xl text-[#171513] block">36h</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block font-mono">
                    Simmer
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-[#171513] block">32</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block font-mono">
                    Potli Spices
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-[#171513] block">0%</span>
                  <span className="text-[10px] text-[#5A4638] uppercase tracking-wider block font-mono">
                    Artificial
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] w-full overflow-hidden shadow-2xl rounded-[2px]">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                  alt="Slow simmering copper vessels"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER II: Executive Chef Vikramaditya Rathore (DARK HEARTH SECTION) */}
      <section className="py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-stone-800 shadow-2xl rounded-[2px]">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                  alt="Chef Vikramaditya Rathore at the pass"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-semibold block mb-3 font-mono">
                CHAPTER II · THE GUARDIAN
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-light leading-tight mb-5">
                Chef Vikramaditya Rathore
              </h2>

              <div className="p-6 bg-[#1F1C19] border-l-2 border-[#B89A63] mb-6">
                <p className="font-serif italic text-base sm:text-lg text-stone-200 leading-relaxed font-light">
                  “When you roast wild royal cumin with green cardamom and smoke it over aged sal wood, you unlock an ancestral fragrance that requires no synthetic disguise.”
                </p>
                <span className="block mt-3 text-[10px] tracking-widest uppercase text-[#B89A63] font-mono">
                  — Executive Chef Vikramaditya Rathore
                </span>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                Trained between heritage court kitchens in Mewar and acclaimed international dining rooms, Chef Vikramaditya spent seven years collecting lost manuscripts of Indian court gastronomy.
              </p>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
                At NOOR, every cardamom pod, clove, and cinnamon quill is inspected and ground on stone silbattas twice daily to ensure pure aromatic vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPTER III: Single-Origin Terroir (WARM CREAM SECTION) */}
      <section className="py-24 sm:py-32 bg-[#FAF7F2] text-[#171513] border-t border-[#171513]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#A9573F] font-semibold block mb-2 font-mono">
              CHAPTER III · TERROIR
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171513] font-light leading-tight">
              Single-Origin Spices & Direct Farm Partnerships
            </h2>
            <p className="mt-3 text-[#5A4638] text-xs sm:text-sm font-light leading-relaxed">
              We partner directly with small-holder heritage growers across the subcontinent to procure whole spices in their unadulterated state.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm rounded-[2px]">
              <span className="font-serif text-2xl text-[#171513] block mb-0.5">Pampore</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-3 font-mono">
                Kashmir · Altitude 1,600m
              </span>
              <h3 className="font-serif text-base text-[#171513] mb-1.5 font-medium">Grade-1 Saffron</h3>
              <p className="text-xs text-[#5A4638] font-light leading-relaxed">
                Hand-harvested purple crocus blossoms delivering pure floral aroma and natural golden color.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/80 shadow-sm rounded-[2px]">
              <span className="font-serif text-2xl text-[#171513] block mb-0.5">Tellicherry</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-3 font-mono">
                Malabar Coast, Kerala
              </span>
              <h3 className="font-serif text-base text-[#171513] mb-1.5 font-medium">TGSEB Black Pepper</h3>
              <p className="text-xs text-[#5A4638] font-light leading-relaxed">
                Extra bold vine-ripened berries offering resinous warmth without acrid sharpness.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/80 shadow-sm rounded-[2px]">
              <span className="font-serif text-2xl text-[#171513] block mb-0.5">Nagaur</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-3 font-mono">
                Thar Desert, Rajasthan
              </span>
              <h3 className="font-serif text-base text-[#171513] mb-1.5 font-medium">Sun-Dried Kasuri Methi</h3>
              <p className="text-xs text-[#5A4638] font-light leading-relaxed">
                Wild fenugreek cured in dry desert winds, imparting maple and woodsmoke notes to our curries.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/80 shadow-sm rounded-[2px]">
              <span className="font-serif text-2xl text-[#171513] block mb-0.5">Hooghly</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-3 font-mono">
                West Bengal
              </span>
              <h3 className="font-serif text-base text-[#171513] mb-1.5 font-medium">Fermented Kasundi</h3>
              <p className="text-xs text-[#5A4638] font-light leading-relaxed">
                Stone-ground heirloom queen mustard fermented under terracotta covers for coastal seafood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GRAND INVITATION BANNER (Dark) */}
      <section className="py-24 bg-[#12100F] text-center border-t border-stone-800">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-2 font-mono">
            JOIN US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light mb-4">
            Your table is waiting.
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-md mx-auto mb-8">
            Experience our 9-course Royal Dastan degustation or dine à la carte in the candlelit Amber Salon.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/book" variant="primary" size="md">
              Reserve a Table
            </Button>
            <Button href="/menu" variant="outline" size="md">
              Explore Menu
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
