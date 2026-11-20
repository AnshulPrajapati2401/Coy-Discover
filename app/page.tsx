'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MobileShell } from '@/components/MobileShell';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { CardStack } from '@/components/CardStack';
import { EmptyState } from '@/components/EmptyState';
import { MatchesView } from '@/components/MatchesView';
import { MatchModal } from '@/components/MatchModal';
import { HomePlaceholder } from '@/components/HomePlaceholder';
import { SafeProfile, MutualMatch } from '@/lib/db';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'matches'>('discover');
  const [feedProfiles, setFeedProfiles] = useState<SafeProfile[]>([]);
  const [matches, setMatches] = useState<MutualMatch[]>([]);
  const [matchModalProfile, setMatchModalProfile] = useState<SafeProfile | null>(null);
  const [isLoadingFeed, setIsLoadingFeed] = useState<boolean>(true);
  const [isLoadingMatches, setIsLoadingMatches] = useState<boolean>(true);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Fetch Discover feed
  const loadFeed = useCallback(async () => {
    setIsLoadingFeed(true);
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success && Array.isArray(data.profiles)) {
        setFeedProfiles(data.profiles);
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setIsLoadingFeed(false);
    }
  }, []);

  // Fetch Matches list
  const loadMatches = useCallback(async () => {
    setIsLoadingMatches(true);
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success && Array.isArray(data.matches)) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setIsLoadingMatches(false);
    }
  }, []);

  // Load feed and matches on initial mount
  useEffect(() => {
    loadFeed();
    loadMatches();
  }, [loadFeed, loadMatches]);

  // Handle Swipe (Like or Pass)
  const handleSwipe = async (profile: SafeProfile, action: 'like' | 'pass') => {
    // Optimistically remove from visible stack
    setFeedProfiles((prev) => prev.filter((p) => p.id !== profile.id));

    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId: profile.id,
          action,
        }),
      });

      const data = await res.json();

      if (data.success && data.isMatch && data.matchProfile) {
        // Trigger Match modal
        setMatchModalProfile(data.matchProfile);

        // Update matches list
        setMatches((prev) => [
          {
            profile: data.matchProfile,
            matchedAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error('Error recording swipe:', err);
    }
  };

  // Reset Demo (re-seeds feed and clears swipes/matches)
  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);
    try {
      const res = await fetch('/api/reset', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        await Promise.all([loadFeed(), loadMatches()]);
      }
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <MobileShell>
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
        onReset={handleReset}
        isResetting={isResetting}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[#FAF8F5]">
        {activeTab === 'home' && (
          <HomePlaceholder onGoToDiscover={() => setActiveTab('discover')} />
        )}

        {activeTab === 'discover' && (
          <>
            {isLoadingFeed ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-10 h-10 border-4 border-black border-t-[#FF2E7E] rounded-full animate-spin" />
                <p className="mt-4 text-xs font-bold text-neutral-600">
                  Finding people near you...
                </p>
              </div>
            ) : feedProfiles.length > 0 ? (
              <CardStack
                profiles={feedProfiles}
                onSwipe={handleSwipe}
                isLoading={isResetting}
              />
            ) : (
              <EmptyState
                onReset={handleReset}
                onViewMatches={() => setActiveTab('matches')}
                matchesCount={matches.length}
                isResetting={isResetting}
              />
            )}
          </>
        )}

        {activeTab === 'matches' && (
          <MatchesView
            matches={matches}
            onGoToDiscover={() => setActiveTab('discover')}
            isLoading={isLoadingMatches}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
      />

      {/* "It's a Match!" Celebration Screen */}
      <MatchModal
        matchProfile={matchModalProfile}
        onClose={() => setMatchModalProfile(null)}
        onViewMatches={() => {
          setMatchModalProfile(null);
          setActiveTab('matches');
        }}
      />
    </MobileShell>
  );
}
