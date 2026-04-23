import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  try {
    const body = await request.json();
    const { username, avatar } = body;

      const updateData: Record<string, string> = {};
    if (username) updateData.username = username;
    if (avatar) updateData.avatar = avatar;

    const { data } = await api.patch('/users/me', updateData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error || error.message || 'Update failed',
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}