'use client';

import React from 'react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'discover' | 'matches';
  setActiveTab: (tab: 'home' | 'discover' | 'matches') => void;
  matchesCount: number;
  onReset: () => void;
  isResetting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
  onReset,
  isResetting = false,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b-[2px] border-black">
      {/* Brand logo: coy. with hot-pink dot */}
      <div
        onClick={() => setActiveTab('discover')}
        className="cursor-pointer select-none flex items-center gap-1 group"
      >
        <span className="text-3xl font-black tracking-tight text-black transition-transform group-hover:scale-105">
          coy<span className="text-[#FF2E7E]">.</span>
        </span>
        <span className="ml-1 text-[10px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">
          Discover
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Reset Demo button */}
        <button
          onClick={onReset}
          disabled={isResetting}
          title="Reset Demo Profiles"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border-[1.5px] border-black bg-[#FAF8F5] hover:bg-neutral-100 active:translate-y-0.5 shadow-hard-sm transition-all text-xs font-bold text-neutral-800 disabled:opacity-50"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          <span className="hidden xs:inline">Reset</span>
        </button>

        {/* Matches pill */}
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[2px] border-black transition-all shadow-hard-sm active:translate-y-0.5 ${
            activeTab === 'matches'
              ? 'bg-[#FF2E7E] text-white'
              : 'bg-[#EDE8FF] text-black hover:bg-[#ded5fc]'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              matchesCount > 0 ? 'fill-current text-[#FF2E7E]' : ''
            } ${activeTab === 'matches' ? 'text-white fill-white' : ''}`}
          />
          <span className="text-xs font-black">{matchesCount}</span>
        </button>
      </div>
    </header>
  );
};
