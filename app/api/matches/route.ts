import { NextResponse } from 'next/server';
import { getMatches } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const matches = await getMatches('user_me');
    return NextResponse.json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    console.error('Error in GET /api/matches:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
