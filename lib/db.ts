import fs from 'fs';
import path from 'path';

export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  bio: string;
  cityOrCollege: string;
  interests: string[];
  likedMe: boolean;
}

export type SafeProfile = Omit<Profile, 'likedMe'>;

export interface MatchRecord {
  profileId: string;
  matchedAt: string;
}

export interface MutualMatch {
  profile: SafeProfile;
  matchedAt: string;
}

export interface StoreData {
  profiles: Profile[];
  swipes: Record<string, Record<string, 'like' | 'pass'>>;
  matches: Record<string, MatchRecord[]>;
}

const STORE_PATH = path.join(process.cwd(), 'data', 'store.json');

// Helper to safely strip `likedMe` to enforce strict Coy privacy rules
export function toSafeProfile(profile: Profile): SafeProfile {
  const { likedMe, ...safe } = profile;
  return safe;
}

// Read store from disk
export function getStore(): StoreData {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      throw new Error(`store.json not found at ${STORE_PATH}`);
    }
    const data = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(data) as StoreData;
  } catch (error) {
    console.error('Error reading store.json:', error);
    return {
      profiles: [],
      swipes: {},
      matches: {},
    };
  }
}

// Write store to disk atomically
export function saveStore(store: StoreData): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${STORE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(store, null, 2), 'utf-8');
    fs.renameSync(tempPath, STORE_PATH);
  } catch (error) {
    console.error('Error saving store.json:', error);
    throw error;
  }
}

// GET /feed - Returns profiles that the user has not swiped on yet
export async function getFeed(userId: string = 'user_me'): Promise<SafeProfile[]> {
  const store = getStore();
  const userSwipes = store.swipes[userId] || {};

  // Filter out any profile already swiped by this user
  const unswiped = store.profiles.filter((profile) => !userSwipes[profile.id]);

  // Strip `likedMe` to strictly guard privacy
  return unswiped.map(toSafeProfile);
}

// POST /swipe - Records a like or pass and checks for a mutual match
export async function recordSwipe(
  userId: string = 'user_me',
  profileId: string,
  action: 'like' | 'pass'
): Promise<{ isMatch: boolean; matchProfile?: SafeProfile }> {
  const store = getStore();

  if (!store.swipes[userId]) {
    store.swipes[userId] = {};
  }
  if (!store.matches[userId]) {
    store.matches[userId] = [];
  }

  const profile = store.profiles.find((p) => p.id === profileId);
  if (!profile) {
    throw new Error(`Profile with id "${profileId}" not found`);
  }

  // Record swipe action
  store.swipes[userId][profileId] = action;

  let isMatch = false;
  let matchProfile: SafeProfile | undefined = undefined;

  // Mutual match happens ONLY if user liked AND profile has already liked user
  if (action === 'like' && profile.likedMe) {
    isMatch = true;
    matchProfile = toSafeProfile(profile);

    const alreadyMatched = store.matches[userId].some(
      (m) => m.profileId === profileId
    );

    if (!alreadyMatched) {
      store.matches[userId].unshift({
        profileId,
        matchedAt: new Date().toISOString(),
      });
    }
  }

  saveStore(store);

  return { isMatch, matchProfile };
}

// GET /matches - Returns all mutual matches for the user
export async function getMatches(userId: string = 'user_me'): Promise<MutualMatch[]> {
  const store = getStore();
  const userMatches = store.matches[userId] || [];

  const profileMap = new Map<string, Profile>(
    store.profiles.map((p) => [p.id, p])
  );

  const results: MutualMatch[] = [];

  for (const match of userMatches) {
    const profile = profileMap.get(match.profileId);
    if (profile) {
      results.push({
        profile: toSafeProfile(profile),
        matchedAt: match.matchedAt,
      });
    }
  }

  return results;
}

// POST /reset - Resets swipes and matches for easy demoing
export async function resetDemo(userId: string = 'user_me'): Promise<{ success: boolean; count: number }> {
  const store = getStore();
  store.swipes[userId] = {};
  store.matches[userId] = [];
  saveStore(store);
  return { success: true, count: store.profiles.length };
}
