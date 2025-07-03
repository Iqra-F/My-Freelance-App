// app/api/me/route.ts
import { auth } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    
    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      message: 'User authenticated'
    });
  } catch (error: any) {
return NextResponse.json(
  { message: 'Invalid or expired token', error: error.message },
  { status: 403 }
);
  }
}
