'use client';

import React from 'react';
import { Home, Compass, MessageCircleHeart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'discover' | 'matches';
  setActiveTab: (tab: 'home' | 'discover' | 'matches') => void;
  matchesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
}) => {
  return (
    <nav className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t-[2px] border-black px-4 py-2">
      <div className="flex items-center justify-around max-w-[400px] mx-auto">
        {/* Home Tab (Placeholder as per requirements) */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-black font-extrabold'
              : 'text-neutral-400 hover:text-neutral-700 font-medium'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'bg-[#FEF08A] border-[2px] border-black shadow-hard-sm'
                : ''
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Discover Tab (Core feature) */}
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all relative ${
            activeTab === 'discover'
              ? 'text-black font-extrabold'
              : 'text-neutral-400 hover:text-neutral-700 font-medium'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'discover'
                ? 'bg-[#FF2E7E] text-white border-[2px] border-black shadow-hard-sm'
                : ''
            }`}
          >
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight">Discover</span>
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all relative ${
            activeTab === 'matches'
              ? 'text-black font-extrabold'
              : 'text-neutral-400 hover:text-neutral-700 font-medium'
          }`}
        >
          <div className="relative">
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'matches'
                  ? 'bg-[#EDE8FF] text-black border-[2px] border-black shadow-hard-sm'
                  : ''
              }`}
            >
              <MessageCircleHeart className="w-5 h-5" />
            </div>

            {matchesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF2E7E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] border-black shadow-sm">
                {matchesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight">Matches</span>
        </button>
      </div>
    </nav>
  );
};
