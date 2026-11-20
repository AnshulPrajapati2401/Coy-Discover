'use client';

import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPass,
  onLike,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-center gap-6 py-2">
      {/* Pass Button (X) */}
      <button
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass profile"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full border-[2.5px] border-black bg-white text-black shadow-hard hover:bg-[#FFE4E6] active:translate-y-1 active:shadow-hard-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        <X className="w-8 h-8 stroke-[3] text-black group-hover:scale-110 transition-transform" />
      </button>

      {/* Subtle indicator hint */}
      <div className="flex flex-col items-center justify-center pointer-events-none opacity-60">
        <Sparkles className="w-4 h-4 text-[#FF2E7E]" />
        <span className="text-[10px] font-bold text-neutral-600 mt-0.5 uppercase tracking-wider">
          Swipe
        </span>
      </div>

      {/* Like Button (Heart) */}
      <button
        onClick={onLike}
        disabled={disabled}
        aria-label="Like profile"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full border-[2.5px] border-black bg-[#FF2E7E] text-white shadow-hard hover:bg-[#E0206B] active:translate-y-1 active:shadow-hard-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        <Heart className="w-8 h-8 fill-white stroke-[2.5] text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
