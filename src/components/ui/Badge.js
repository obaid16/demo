'use client';

import { Sparkles, Flame } from 'lucide-react';

export function DietaryBadge({ isVeg, className = '' }) {
  if (isVeg) {
    return (
      <span
        title="Vegetarian"
        className={`inline-flex items-center justify-center w-4 h-4 border border-emerald-600 p-[2px] rounded-xs bg-emerald-950/20 ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian"
      className={`inline-flex items-center justify-center w-4 h-4 border border-amber-800 p-[2px] rounded-xs bg-amber-950/20 ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-amber-700" />
    </span>
  );
}

export function SpiceLevelBadge({ level = 1, className = '' }) {
  if (level === 0) return null;
  return (
    <div
      title={`Spice Level: ${level} of 3`}
      className={`inline-flex items-center gap-0.5 text-xs text-[#A9573F] ${className}`}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 fill-[#A9573F] text-[#A9573F]" />
      ))}
    </div>
  );
}

export function SignatureBadge({ text = "Chef's Signature", className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase text-[#B89A63] bg-[#B89A63]/10 border border-[#B89A63]/30 rounded-full ${className}`}
    >
      <Sparkles className="w-3 h-3 text-[#B89A63]" />
      <span>{text}</span>
    </span>
  );
}
