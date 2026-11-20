'use client';

import React, { useState } from 'react';
import { MapPin, GraduationCap, Sparkles, User } from 'lucide-react';
import { SafeProfile } from '@/lib/db';

interface CardItemProps {
  profile: SafeProfile;
  isCurrent?: boolean;
}

// Pastel color palette for interest chips matching Coy's playful aesthetic
const PASTEL_BADGE_COLORS = [
  'bg-[#EDE8FF] text-purple-900 border-black',
  'bg-[#FFE4E6] text-rose-950 border-black',
  'bg-[#FEF08A] text-amber-950 border-black',
  'bg-[#E0F2FE] text-sky-950 border-black',
  'bg-[#DCFCE7] text-emerald-950 border-black',
];

export const CardItem: React.FC<CardItemProps> = ({ profile, isCurrent = true }) => {
  const [imageError, setImageError] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  // Derive initials for avatar fallback
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isCollege =
    profile.cityOrCollege.toLowerCase().includes('college') ||
    profile.cityOrCollege.toLowerCase().includes('university') ||
    profile.cityOrCollege.toLowerCase().includes('iit') ||
    profile.cityOrCollege.toLowerCase().includes('bits') ||
    profile.cityOrCollege.toLowerCase().includes('nid') ||
    profile.cityOrCollege.toLowerCase().includes('nift');

  return (
    <div className="relative w-full h-[520px] max-h-[70vh] rounded-[28px] overflow-hidden border-[2.5px] border-black bg-white shadow-hard select-none flex flex-col justify-end">
      {/* Background Image / Fallback */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        {!imageError ? (
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 hover:scale-105"
            onError={() => setImageError(true)}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE8FF] via-[#FFE4E6] to-[#FEF08A] p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-white border-[3px] border-black shadow-hard flex items-center justify-center mb-4">
              <span className="text-3xl font-black text-black">{initials}</span>
            </div>
            <p className="text-sm font-bold text-black">{profile.name}</p>
            <p className="text-xs text-neutral-600 mt-1">{profile.cityOrCollege}</p>
          </div>
        )}

        {/* Gradient dark scrim for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        {/* City or College Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border-[2px] border-black shadow-hard-sm">
          {isCollege ? (
            <GraduationCap className="w-3.5 h-3.5 text-[#FF2E7E]" />
          ) : (
            <MapPin className="w-3.5 h-3.5 text-[#FF2E7E]" />
          )}
          <span className="text-xs font-black text-black truncate max-w-[200px]">
            {profile.cityOrCollege}
          </span>
        </div>

        {/* Verified / Active badge */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF08A] border-[2px] border-black shadow-hard-sm">
          <Sparkles className="w-3 h-3 text-black" />
          <span className="text-[10px] font-black uppercase text-black">Active</span>
        </div>
      </div>

      {/* Bottom Profile Details */}
      <div className="relative z-10 p-5 text-white flex flex-col gap-2.5">
        {/* Name & Age */}
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {profile.name}
          </h2>
          <span className="text-xl sm:text-2xl font-black text-neutral-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {profile.age}
          </span>
        </div>

        {/* Bio */}
        <p
          onClick={() => setShowFullBio(!showFullBio)}
          className={`text-xs sm:text-sm text-neutral-100 font-medium leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
            showFullBio ? '' : 'line-clamp-2'
          } cursor-pointer`}
        >
          {profile.bio}
        </p>

        {/* Interest Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.interests.map((interest, idx) => {
            const colorClass = PASTEL_BADGE_COLORS[idx % PASTEL_BADGE_COLORS.length];
            return (
              <span
                key={interest}
                className={`text-[11px] font-black px-2.5 py-1 rounded-full border-[1.5px] shadow-sm tracking-tight ${colorClass}`}
              >
                {interest}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
