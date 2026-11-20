import { NextResponse } from 'next/server';
import { getFeed } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profiles = await getFeed('user_me');
    return NextResponse.json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error('Error in GET /api/feed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discovery feed' },
      { status: 500 }
    );
  }
}
