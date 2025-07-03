import { NextResponse } from 'next/server';

export function createAuthResponse(token: string, body?: any) {
  const response = NextResponse.json(body ?? { message: 'Authenticated' });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
  });

  return response;
}