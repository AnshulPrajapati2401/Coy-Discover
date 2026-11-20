'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, MapPin, GraduationCap, Compass, Sparkles } from 'lucide-react';
import { MutualMatch } from '@/lib/db';

interface MatchesViewProps {
  matches: MutualMatch[];
  onGoToDiscover: () => void;
  isLoading?: boolean;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  onGoToDiscover,
  isLoading = false,
}) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-black border-t-[#FF2E7E] rounded-full animate-spin" />
        <p className="mt-4 text-xs font-bold text-neutral-600">Loading your matches...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-20 h-20 rounded-3xl bg-[#FFE4E6] border-[2.5px] border-black shadow-hard flex items-center justify-center mb-5 rotate-3">
          <Heart className="w-10 h-10 text-[#FF2E7E] fill-[#FF2E7E]" />
        </div>

        <h3 className="text-2xl font-black text-black tracking-tight mb-2">
          No matches yet
        </h3>
        <p className="text-xs text-neutral-500 max-w-[280px] mb-6 leading-relaxed">
          Coy only reveals mutual connections. When someone you like likes you back, they&apos;ll appear here!
        </p>

        <button
          onClick={onGoToDiscover}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2E7E] text-white font-black text-sm border-[2px] border-black shadow-hard hover:bg-[#E0206B] active:translate-y-0.5 active:shadow-hard-sm transition-all"
        >
          <Compass className="w-4 h-4" />
          Start Swiping in Discover
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto no-overscroll">
      {/* Top Banner */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b-[2px] border-black/10">
        <div>
          <h2 className="text-xl font-black text-black tracking-tight">Mutual Matches</h2>
          <p className="text-[11px] text-neutral-500 font-medium">
            People who liked you back on Coy
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#EDE8FF] border-[1.5px] border-black font-black text-xs text-black shadow-hard-sm">
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </span>
      </div>

      {/* Matches Grid / List */}
      <div className="flex flex-col gap-3 pb-6">
        {matches.map(({ profile, matchedAt }) => {
          const formattedDate = new Date(matchedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={profile.id}
              className="group p-3.5 rounded-2xl bg-white border-[2px] border-black shadow-hard hover:bg-[#FAF8F5] transition-all flex items-center gap-3.5"
            >
              {/* Profile Avatar */}
              <div className="relative w-16 h-16 rounded-2xl border-[2px] border-black overflow-hidden flex-shrink-0 bg-neutral-200 shadow-hard-sm">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#10B981] border border-black" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className="font-black text-base text-black truncate">
                    {profile.name}, {profile.age}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-bold whitespace-nowrap">
                    {formattedDate}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 truncate mt-0.5">
                  {profile.cityOrCollege}
                </p>

                {/* Interest tags */}
                <div className="flex items-center gap-1 mt-1.5 overflow-hidden">
                  {profile.interests.slice(0, 2).map((interest) => (
                    <span
                      key={interest}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-black/40 text-neutral-700 truncate"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 2 && (
                    <span className="text-[9px] font-bold text-neutral-400">
                      +{profile.interests.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Chat / Say hi action */}
              <button
                onClick={() =>
                  setSelectedChat(
                    selectedChat === profile.id ? null : profile.id
                  )
                }
                className={`p-2.5 rounded-xl border-[2px] border-black shadow-hard-sm active:translate-y-0.5 transition-all flex-shrink-0 ${
                  selectedChat === profile.id
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#FF2E7E] text-white hover:bg-[#E0206B]'
                }`}
                title="Message"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
