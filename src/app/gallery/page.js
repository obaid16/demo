'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { GALLERY_ITEMS } from '@/data/gallery';

const CATEGORIES = [
  { id: 'all', label: 'All Archive' },
  { id: 'cuisine', label: 'Culinary Plating' },
  { id: 'interior', label: 'Salons & Terraces' },
  { id: 'craft', label: 'The Hearth Craft' },
  { id: 'drinks', label: 'Botanical Elixirs' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = () => {
    setSelectedIdx((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIdx((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // Helper for varied editorial grid spans
  const getGridSpan = (index) => {
    if (activeCategory !== 'all') return 'col-span-1 aspect-[4/3]';
    const mod = index % 7;
    if (mod === 0) return 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto';
    if (mod === 3) return 'md:row-span-2 aspect-[3/4]';
    if (mod === 6) return 'md:col-span-2 aspect-[16/9]';
    return 'col-span-1 aspect-[4/3]';
  };

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE VISUAL ARCHIVE"
          title="Atmosphere & Gastronomy"
          subtitle="A photographic chronicle of our live sigri hearth, hand-hammered brass salons, and the quiet theater of tableside service."
        />

        {/* Minimal Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIdx(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all rounded-[2px] cursor-pointer ${
                  isActive
                    ? 'bg-[#A9573F] text-white font-semibold'
                    : 'bg-[#1C1916] text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Varied Editorial Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden bg-[#1E1B18] border border-stone-800 hover:border-[#B89A63]/60 cursor-pointer transition-all duration-500 rounded-[2px] ${getGridSpan(
                  idx
                )}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-[#100E0D]/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Meta */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex justify-end">
                    <span className="w-7 h-7 rounded-full bg-[#171513]/90 border border-stone-700 flex items-center justify-center text-[#B89A63]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B89A63] block font-mono">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-[#FAF7F2] leading-snug mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-stone-300 font-light mt-0.5 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && filteredItems[selectedIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2.5 text-stone-300 hover:text-white bg-[#221F1C] border border-stone-700 rounded-full z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-2.5 text-stone-300 hover:text-white bg-[#221F1C]/80 border border-stone-700 rounded-full z-50 hover:bg-[#A9573F] transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-2.5 text-stone-300 hover:text-white bg-[#221F1C]/80 border border-stone-700 rounded-full z-50 hover:bg-[#A9573F] transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active Image Box */}
            <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh]">
                <Image
                  src={filteredItems[selectedIdx].image}
                  alt={filteredItems[selectedIdx].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center max-w-lg">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono">
                  {filteredItems[selectedIdx].location}
                </span>
                <h3 className="font-serif text-xl text-[#FAF7F2] mt-0.5">
                  {filteredItems[selectedIdx].title}
                </h3>
                <p className="text-xs text-stone-400 font-light mt-1">
                  {filteredItems[selectedIdx].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
