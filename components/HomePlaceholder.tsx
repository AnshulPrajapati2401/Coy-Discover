'use client';

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HomePlaceholderProps {
  onGoToDiscover: () => void;
}

export const HomePlaceholder: React.FC<HomePlaceholderProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-[#EDE8FF] border-[2.5px] border-black shadow-hard flex items-center justify-center mb-5 rotate-[-3deg]">
        <Sparkles className="w-8 h-8 text-[#FF2E7E]" />
      </div>

      <h2 className="text-2xl font-black text-black tracking-tight mb-2">
        Home Tab
      </h2>
      <p className="text-xs text-neutral-500 max-w-[280px] mb-6 leading-relaxed">
        Placeholder tab as requested. The swipe-based matching experience is active in the{' '}
        <span className="font-bold text-black">Discover</span> tab!
      </p>

      <button
        onClick={onGoToDiscover}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2E7E] text-white font-black text-sm border-[2px] border-black shadow-hard hover:bg-[#E0206B] active:translate-y-0.5 active:shadow-hard-sm transition-all"
      >
        <Compass className="w-4 h-4" />
        Open Discover Tab
      </button>
    </div>
  );
};
