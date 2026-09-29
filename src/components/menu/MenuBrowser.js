'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Sparkles } from 'lucide-react';
import FoodCard from '@/components/menu/FoodCard';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/data/menu';

function CategoryUrlSync({ onCategorySelect }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      onCategorySelect(cat);
    }
  }, [searchParams, onCategorySelect]);
  return null;
}

export default function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg', 'spicy'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high'

  // Filter and sort items
  const filteredDishes = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Dietary & Spice filter
    if (dietaryFilter === 'veg') {
      result = result.filter((item) => item.isVeg);
    } else if (dietaryFilter === 'non-veg') {
      result = result.filter((item) => !item.isVeg);
    } else if (dietaryFilter === 'spicy') {
      result = result.filter((item) => item.spiceLevel >= 2);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          (item.hindiName && item.hindiName.includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
    }

    return result;
  }, [activeCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <CategoryUrlSync onCategorySelect={setActiveCategory} />
      </Suspense>
      {/* Editorial Category Navigation Bar */}
      <div className="mb-10 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
        <nav className="flex items-center gap-1 sm:gap-2 min-w-max pb-3">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#FAF7F2] font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{cat.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#A9573F]"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Minimal Control Bar: Search + Minimal Dietary Filters */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Minimal Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish or flavor..."
            className="w-full bg-[#1A1715] border border-stone-800 pl-9 pr-4 py-2 text-xs text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-[#B89A63]/50 rounded-[2px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Minimal Filters Group */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
          {/* Dietary Filter (All / Veg / Non-Veg / Spicy) */}
          <div className="flex items-center border border-stone-800 bg-[#161412] p-0.5 text-xs rounded-[2px]">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors rounded-[2px] cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-[#292420] text-[#FAF7F2] font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-colors rounded-[2px] cursor-pointer ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-800/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-colors rounded-[2px] cursor-pointer ${
                dietaryFilter === 'non-veg'
                  ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Non-Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('spicy')}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1 transition-colors rounded-[2px] cursor-pointer ${
                dietaryFilter === 'spicy'
                  ? 'bg-[#A9573F]/20 text-[#A9573F] font-semibold border border-[#A9573F]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-[#A9573F]" />
              <span>Spicy</span>
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#161412] border border-stone-800 text-[11px] uppercase tracking-wider text-stone-300 py-1.5 px-3 focus:outline-none focus:border-stone-600 rounded-[2px] cursor-pointer"
          >
            <option value="featured">Featured / Signatures</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredDishes.length === 0 ? (
        <div className="py-20 text-center bg-[#1B1816] border border-stone-800 p-8">
          <Sparkles className="w-6 h-6 text-[#B89A63] mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-2xl text-[#FAF7F2] mb-2">No dishes match your selection</h3>
          <p className="text-stone-400 text-xs max-w-sm mx-auto mb-6">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setDietaryFilter('all');
            }}
            className="px-5 py-2 bg-[#2B2622] text-[#FAF7F2] text-xs uppercase tracking-widest hover:bg-[#A9573F] transition-colors rounded-[2px] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <FoodCard dish={dish} layout="vertical" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
