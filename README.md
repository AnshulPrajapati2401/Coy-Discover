# Coy Discover 💖 — Swipe-Based Discovery Feature

A mobile-first, swipe-based discovery feature built as a standalone implementation for **Coy**, adhering to Coy's signature playful neo-brutalist aesthetic, privacy-first matching engine, and seamless mobile drag interactions.

---

## 📱 Features

1. **Card Swipe Discovery Experience**:
   - **Smooth Drag Gestures**: Drag left to Pass, right to Like with smooth rotation and translation physics.
   - **Dynamic Stamp Badges**: Bold `LIKE` and `PASS` stamps dynamically scale and rotate into view as you drag.
   - **Desktop & Mobile Accessible Buttons**: Dedicated **Pass (X)** and **Like (Heart)** buttons with tactile neo-brutalist press feedback.
   - **Non-Repeating Feed**: Swiped profiles never appear again.
   - **Empty State**: Friendly illustration and summary when all profiles are swiped, with an instant **Reset Demo Profiles** button.

2. **Coy's Core Promise — Privacy-First Mutual Matching**:
   - Matches happen **strictly when both users have liked each other**.
   - **Zero Leakage**: The server-side API strictly strips `likedMe` from all discovery feed (`/feed`) and matches (`/matches`) responses. One-way incoming likes are never revealed.
   - **Celebration Modal ("It's a Match! 🎉")**: Pops up instantly upon a mutual match with celebratory multi-colored confetti bursts, overlapping avatars, and instant navigation to the Matches view.

3. **Curated Seed Data (32 Profiles)**:
   - 32 diverse Indian college & young-adult profiles (IIT Bombay, SRCC Delhi, BITS Pilani, NIFT, Christ University, etc.) with ages, authentic bios, reliable photos, and pastel interest chips.
   - 10 seeded profiles already have `likedMe: true` distributed across the feed, ensuring multiple matches occur seamlessly during any live demo.

4. **Dedicated Views & Tab Navigation**:
   - **Home Tab**: Clean placeholder reflecting Coy's core tab navigation.
   - **Discover Tab**: The core swipe card deck.
   - **Matches Tab**: Dedicated screen listing all mutual connections with matched timestamps and message actions, paired with a live match count badge.

5. **Persistence Across Reloads**:
   - All swipes and mutual matches persist across page reloads in `data/store.json`.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom neo-brutalist theme matching Coy's design system: hot pink `#FF2E7E`, `#111111` bold borders, `shadow-hard`, and soft pastel palettes)
- **Icons**: Lucide React
- **Confetti**: Canvas-Confetti

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd coy-discover
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your mobile browser or desktop browser (centered in a mobile app shell).

### 3. Production Build & Run

```bash
npm run build
npm run start
```

---

## 🔌 Backend API Specification

All endpoints are accessible both directly (e.g. `/feed`) and with the `/api` prefix (e.g. `/api/feed`).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/feed` or `/api/feed` | Returns profiles the logged-in user (`user_me`) has not yet swiped on. `likedMe` is **always omitted**. |
| `POST` | `/swipe` or `/api/swipe` | Records a swipe (`{ "profileId": string, "action": "like" \| "pass" }`). Returns `{ "isMatch": boolean, "matchProfile": SafeProfile \| null }`. |
| `GET` | `/matches` or `/api/matches` | Returns all mutual matches made by the user. |
| `POST` | `/reset` or `/api/reset` | Resets swipes and matches back to pristine state for repeatable demoing. |

### Example cURL Commands

#### 1. Fetch Feed
```bash
curl -s http://localhost:3000/feed
```

#### 2. Swipe Left (Pass)
```bash
curl -s -X POST http://localhost:3000/swipe \
  -H "Content-Type: application/json" \
  -d '{"profileId": "coy_01", "action": "pass"}'
```

#### 3. Swipe Right (Like — Creates Mutual Match with Seeded Profile coy_02)
```bash
curl -s -X POST http://localhost:3000/swipe \
  -H "Content-Type: application/json" \
  -d '{"profileId": "coy_02", "action": "like"}'
```

#### 4. Fetch Mutual Matches
```bash
curl -s http://localhost:3000/matches
```

#### 5. Reset Demo Feed
```bash
curl -s -X POST http://localhost:3000/reset
```

---

## 📁 Repository Structure

```
coy-discover/
├── app/
│   ├── api/
│   │   ├── feed/route.ts      # GET /api/feed
│   │   ├── matches/route.ts   # GET /api/matches
│   │   ├── reset/route.ts     # POST /api/reset
│   │   └── swipe/route.ts     # POST /api/swipe
│   ├── feed/route.ts          # Direct GET /feed
│   ├── matches/route.ts       # Direct GET /matches
│   ├── reset/route.ts         # Direct POST /reset
│   ├── swipe/route.ts         # Direct POST /swipe
│   ├── globals.css            # Tailwind & Neo-brutalist styles
│   ├── layout.tsx             # Root layout & mobile viewport meta
│   └── page.tsx               # Primary mobile app shell & state
├── components/
│   ├── ActionButtons.tsx      # Neo-brutalist Pass & Like buttons
│   ├── BottomNav.tsx          # Fixed bottom tab bar (Home, Discover, Matches)
│   ├── CardItem.tsx           # Profile card with photo, badges & interests
│   ├── CardStack.tsx          # Touch & pointer drag swipe interaction
│   ├── EmptyState.tsx         # All caught up state with Reset action
│   ├── Header.tsx             # Coy brand header with match pill & quick reset
│   ├── HomePlaceholder.tsx    # Blank Home tab placeholder
│   ├── MatchesView.tsx        # Mutual matches listing
│   ├── MatchModal.tsx         # "It's a Match!" celebratory modal + confetti
│   └── MobileShell.tsx        # Mobile device frame (max-w-[430px])
├── data/
│   └── store.json             # Persistent local JSON data store (32 profiles)
├── lib/
│   └── db.ts                  # Safe data-access layer & privacy stripping
├── tailwind.config.ts         # Coy palette, typography & shadows
└── package.json
```
