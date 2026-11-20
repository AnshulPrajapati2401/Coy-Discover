'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { SafeProfile } from '@/lib/db';

interface MatchModalProps {
  matchProfile: SafeProfile | null;
  onClose: () => void;
  onViewMatches: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchProfile,
  onClose,
  onViewMatches,
}) => {
  useEffect(() => {
    if (!matchProfile) return;

    // Trigger celebratory confetti burst
    const end = Date.now() + 1000;
    const colors = ['#FF2E7E', '#FEF08A', '#EDE8FF', '#10B981', '#111111'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [matchProfile]);

  if (!matchProfile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[360px] rounded-[32px] border-[3px] border-black bg-white p-6 shadow-hard-lg text-center animate-pop-in">
        {/* Decorative spark badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] border-[2px] border-black shadow-hard-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span className="text-[11px] font-black uppercase text-black tracking-wider">
            Mutual Match!
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-black tracking-tight mb-1">
          It&apos;s a Match<span className="text-[#FF2E7E]">!</span>
        </h2>
        <p className="text-xs text-neutral-600 mb-6 font-medium">
          You and <span className="font-bold text-black">{matchProfile.name}</span> liked each other!
        </p>

        {/* Overlapping Avatars */}
        <div className="flex items-center justify-center -space-x-4 mb-6 relative">
          {/* User avatar ("You") */}
          <div className="w-20 h-20 rounded-full border-[3px] border-black overflow-hidden bg-[#EDE8FF] shadow-hard-sm flex items-center justify-center z-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Central Heart badge */}
          <div className="w-10 h-10 rounded-full bg-[#FF2E7E] border-[2px] border-black flex items-center justify-center z-20 shadow-hard-sm animate-heartbeat">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>

          {/* Matched Profile avatar */}
          <div className="w-20 h-20 rounded-full border-[3px] border-black overflow-hidden bg-[#FFE4E6] shadow-hard-sm flex items-center justify-center z-10">
            <img
              src={matchProfile.photo}
              alt={matchProfile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Matched Profile mini card */}
        <div className="p-3 rounded-2xl bg-[#FAF8F5] border-[2px] border-black mb-6 text-left">
          <div className="flex items-baseline justify-between">
            <span className="font-black text-sm text-black">
              {matchProfile.name}, {matchProfile.age}
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium truncate mt-0.5">
            {matchProfile.cityOrCollege}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {matchProfile.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-black text-neutral-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Coy Privacy Reminder */}
        <p className="text-[10px] text-neutral-400 mb-5 leading-tight">
          🔒 Coy Privacy Promise: Identities are revealed strictly when both users match mutually.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onViewMatches}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#FF2E7E] text-white font-black text-sm border-[2.5px] border-black shadow-hard hover:bg-[#E0206B] active:translate-y-0.5 active:shadow-hard-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>View All Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-full bg-white text-black font-bold text-xs border-[2px] border-black shadow-hard-sm hover:bg-neutral-50 active:translate-y-0.5 transition-all"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
};
