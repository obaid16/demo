'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import FoodCard from '@/components/menu/FoodCard';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/data/menu';

export default function MenuBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high'

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Filter and sort items
  const filteredDishes = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Dietary filter
    if (dietaryFilter === 'veg') {
      result = result.filter((item) => item.isVeg);
    } else if (dietaryFilter === 'non-veg') {
      result = result.filter((item) => !item.isVeg);
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
      {/* Category Pills Navigation */}
      <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max border-b border-[#B89A63]/20 pb-4">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-[#171513] bg-[#B89A63] border border-[#B89A63] shadow-md font-semibold'
                    : 'text-stone-300 hover:text-[#FAF7F2] bg-[#211E1B] border border-[#B89A63]/25 hover:border-[#B89A63]/50'
                }`}
              >
                <span>{cat.name}</span>
                {isActive && (
                  <span className="ml-2 text-[11px] opacity-75 font-mono">
                    ({filteredDishes.length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Search + Dietary Filters + Sort */}
      <div className="mb-12 p-4 sm:p-5 bg-[#1B1816] border border-[#B89A63]/25 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#B89A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish or spice..."
            className="w-full bg-[#141210] border border-[#B89A63]/30 pl-10 pr-4 py-2.5 text-xs text-[#FAF7F2] placeholder-stone-500 focus:outline-none focus:border-[#B89A63]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-4">
          {/* Dietary Filter (All / Veg / Non-Veg) */}
          <div className="flex items-center border border-[#B89A63]/30 bg-[#141210] p-1 text-xs">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-[#B89A63] text-[#171513] font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                dietaryFilter === 'non-veg'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-stone-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A63]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141210] border border-[#B89A63]/30 text-xs text-[#FAF7F2] py-2 px-3 focus:outline-none focus:border-[#B89A63]"
            >
              <option value="featured">Featured / Signatures</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredDishes.length === 0 ? (
        <div className="py-20 text-center bg-[#1E1B18] border border-[#B89A63]/20 p-8">
          <Sparkles className="w-8 h-8 text-[#B89A63] mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-2xl text-[#FAF7F2] mb-2">No culinary creations found</h3>
          <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">
            We couldn’t find any dish matching your current filter. Try resetting your search terms.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setDietaryFilter('all');
            }}
            className="px-6 py-2.5 bg-[#B89A63] text-[#171513] text-xs uppercase tracking-widest font-semibold hover:bg-[#D4BA88]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
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
