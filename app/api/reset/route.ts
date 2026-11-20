import { NextResponse } from 'next/server';
import { resetDemo } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await resetDemo('user_me');
    return NextResponse.json({
      success: true,
      message: 'Demo state reset successfully. All profiles restored to feed.',
      totalProfiles: result.count,
    });
  } catch (error: any) {
    console.error('Error in POST /api/reset:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to reset demo state' },
      { status: 500 }
    );
  }
}
