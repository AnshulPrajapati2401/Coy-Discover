'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeProfile } from '@/lib/db';
import { CardItem } from './CardItem';
import { ActionButtons } from './ActionButtons';

interface CardStackProps {
  profiles: SafeProfile[];
  onSwipe: (profile: SafeProfile, action: 'like' | 'pass') => Promise<void>;
  isLoading?: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({
  profiles,
  onSwipe,
  isLoading = false,
}) => {
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeExitDirection, setSwipeExitDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentCardRef = useRef<HTMLDivElement>(null);

  const currentProfile = profiles[0] || null;
  const nextProfile = profiles[1] || null;

  // Reset local state when current profile changes
  useEffect(() => {
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setSwipeExitDirection(null);
    setIsAnimatingOut(false);
  }, [currentProfile?.id]);

  // Execute swipe logic
  const handlePerformSwipe = useCallback(
    async (action: 'like' | 'pass') => {
      if (!currentProfile || isAnimatingOut) return;

      setIsAnimatingOut(true);
      setSwipeExitDirection(action === 'like' ? 'right' : 'left');

      // Wait for exit animation to complete before calling onSwipe
      setTimeout(async () => {
        try {
          await onSwipe(currentProfile, action);
        } finally {
          setIsAnimatingOut(false);
          setSwipeExitDirection(null);
          setDragOffset({ x: 0, y: 0 });
        }
      }, 280);
    },
    [currentProfile, isAnimatingOut, onSwipe]
  );

  // Pointer event handlers for drag / touch gestures
  const onPointerDown = (e: React.PointerEvent) => {
    if (isAnimatingOut || !currentProfile) return;

    // Capture pointer to handle moves outside element bounds
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }

    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isAnimatingOut) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    // Dampen vertical movement to keep swipe focused horizontally
    setDragOffset({
      x: deltaX,
      y: deltaY * 0.35,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isAnimatingOut) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const SWIPE_THRESHOLD = 85;

    if (dragOffset.x > SWIPE_THRESHOLD) {
      handlePerformSwipe('like');
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      handlePerformSwipe('pass');
    } else {
      // Snap back smoothly
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const onPointerCancel = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Compute transform and stamp opacity
  const rotation = dragOffset.x * 0.08;
  const likeOpacity = Math.min(Math.max(dragOffset.x / 75, 0), 1);
  const passOpacity = Math.min(Math.max(-dragOffset.x / 75, 0), 1);

  // Determine transform style
  let cardTransform = '';
  let cardTransition = '';

  if (swipeExitDirection === 'right') {
    cardTransform = 'translate3d(120%, 30px, 0) rotate(24deg)';
    cardTransition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease';
  } else if (swipeExitDirection === 'left') {
    cardTransform = 'translate3d(-120%, 30px, 0) rotate(-24deg)';
    cardTransition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease';
  } else if (isDragging) {
    cardTransform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`;
    cardTransition = 'none';
  } else {
    cardTransform = 'translate3d(0, 0, 0) rotate(0deg)';
    cardTransition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }

  if (!currentProfile) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-4 max-w-full overflow-hidden select-none">
      {/* Cards Stack Container */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[460px]">
        {/* Next Card in Stack (Peek Behind) */}
        {nextProfile && (
          <div
            className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
            style={{
              transform: isDragging
                ? `scale(${Math.min(0.95 + Math.abs(dragOffset.x) * 0.0004, 1)}) translateY(${Math.max(
                    8 - Math.abs(dragOffset.x) * 0.05,
                    0
                  )}px)`
                : 'scale(0.95) translateY(8px)',
              opacity: isDragging ? Math.min(0.85 + Math.abs(dragOffset.x) * 0.001, 1) : 0.85,
            }}
          >
            <CardItem profile={nextProfile} isCurrent={false} />
          </div>
        )}

        {/* Current Interactive Card */}
        <div
          ref={currentCardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{
            transform: cardTransform,
            transition: cardTransition,
            touchAction: 'none',
          }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing will-change-transform"
        >
          {/* Card Component */}
          <CardItem profile={currentProfile} isCurrent={true} />

          {/* Dynamic LIKE Stamp Overlay */}
          <div
            style={{ opacity: swipeExitDirection === 'right' ? 1 : likeOpacity }}
            className="absolute top-8 left-6 z-20 pointer-events-none transition-opacity duration-75"
          >
            <div className="px-4 py-1.5 rounded-2xl border-[3.5px] border-[#10B981] bg-white text-[#10B981] font-black text-2xl tracking-wider uppercase rotate-[-16deg] shadow-hard">
              LIKE
            </div>
          </div>

          {/* Dynamic PASS Stamp Overlay */}
          <div
            style={{ opacity: swipeExitDirection === 'left' ? 1 : passOpacity }}
            className="absolute top-8 right-6 z-20 pointer-events-none transition-opacity duration-75"
          >
            <div className="px-4 py-1.5 rounded-2xl border-[3.5px] border-[#FF2E7E] bg-white text-[#FF2E7E] font-black text-2xl tracking-wider uppercase rotate-[16deg] shadow-hard">
              PASS
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Pass & Like) */}
      <div className="mt-4">
        <ActionButtons
          onPass={() => handlePerformSwipe('pass')}
          onLike={() => handlePerformSwipe('like')}
          disabled={isAnimatingOut || isLoading}
        />
      </div>
    </div>
  );
};
