'use client';

import React from 'react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  onViewMatches: () => void;
  matchesCount: number;
  isResetting?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  onViewMatches,
  matchesCount,
  isResetting = false,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Decorative Badge */}
      <div className="w-20 h-20 rounded-3xl bg-[#FEF08A] border-[2.5px] border-black shadow-hard flex items-center justify-center mb-5 rotate-[-4deg]">
        <Sparkles className="w-10 h-10 text-black" />
      </div>

      {/* Main Title */}
      <h3 className="text-2xl font-black text-black tracking-tight mb-2">
        You&apos;re all caught up!
      </h3>
      <p className="text-xs text-neutral-600 max-w-[280px] mb-5 leading-relaxed">
        You&apos;ve swiped through all available profiles in this area. New students and young adults join Coy every day!
      </p>

      {/* Match stat badge */}
      {matchesCount > 0 && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EDE8FF] border-[2px] border-black shadow-hard-sm mb-6">
          <Heart className="w-4 h-4 text-[#FF2E7E] fill-[#FF2E7E]" />
          <span className="text-xs font-black text-black">
            You made {matchesCount} mutual {matchesCount === 1 ? 'match' : 'matches'}!
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        {matchesCount > 0 && (
          <button
            onClick={onViewMatches}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#FF2E7E] text-white font-black text-sm border-[2.5px] border-black shadow-hard hover:bg-[#E0206B] active:translate-y-0.5 active:shadow-hard-sm transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>View Your Matches ({matchesCount})</span>
          </button>
        )}

        <button
          onClick={onReset}
          disabled={isResetting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white text-black font-extrabold text-sm border-[2px] border-black shadow-hard hover:bg-[#FAF8F5] active:translate-y-0.5 active:shadow-hard-sm transition-all disabled:opacity-50"
        >
          <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          <span>Reset Demo Profiles</span>
        </button>
      </div>
    </div>
  );
};
