import { NextRequest, NextResponse } from 'next/server';
import { recordSwipe } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileId, action } = body;

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid profileId' },
        { status: 400 }
      );
    }

    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { success: false, error: 'Action must be "like" or "pass"' },
        { status: 400 }
      );
    }

    const result = await recordSwipe('user_me', profileId, action);

    return NextResponse.json({
      success: true,
      profileId,
      action,
      isMatch: result.isMatch,
      matchProfile: result.matchProfile || null,
    });
  } catch (error: any) {
    console.error('Error in POST /api/swipe:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to record swipe' },
      { status: 500 }
    );
  }
}
