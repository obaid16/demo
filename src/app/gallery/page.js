'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { GALLERY_ITEMS } from '@/data/gallery';

const CATEGORIES = [
  { id: 'all', label: 'All Photographs' },
  { id: 'cuisine', label: 'Culinary Plating' },
  { id: 'interior', label: 'Salons & Architecture' },
  { id: 'craft', label: 'The Hearth & Craft' },
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

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE VISUAL ARCHIVE"
          title="Atmosphere & Gastronomy"
          subtitle="A photographic chronicle of our live sigri hearth, hand-hammered brass salons, and the quiet theater of tableside service."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIdx(null);
                }}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all ${
                  isActive
                    ? 'bg-[#B89A63] text-[#171513] font-semibold border border-[#B89A63] shadow-md'
                    : 'bg-[#211E1B] text-stone-300 hover:text-white border border-[#B89A63]/20 hover:border-[#B89A63]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden bg-[#1E1B18] border border-[#B89A63]/25 hover:border-[#B89A63] cursor-pointer transition-all duration-500 ${
                  item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-[#100E0D]/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Meta */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-[#171513]/80 border border-[#B89A63]/50 flex items-center justify-center text-[#B89A63]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B89A63] block">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] leading-snug mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 font-light mt-1 line-clamp-2">
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
              className="absolute top-6 right-6 p-3 text-stone-300 hover:text-white bg-[#24201D] border border-[#B89A63]/30 rounded-full z-50 hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white bg-[#24201D]/80 border border-[#B89A63]/30 rounded-full z-50 hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white bg-[#24201D]/80 border border-[#B89A63]/30 rounded-full z-50 hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={filteredItems[selectedIdx].image}
                  alt={filteredItems[selectedIdx].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63]">
                  {filteredItems[selectedIdx].location}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] mt-1">
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
