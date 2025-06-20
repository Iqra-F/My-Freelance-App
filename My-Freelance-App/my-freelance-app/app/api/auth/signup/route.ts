// app/api/auth/signup/route.ts
import { auth, db } from '@/app/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, fullName } = body;

  if (!email || !password || !fullName) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      fullName,
      createdAt: new Date().toISOString(),
      role: 'candidate',
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          fullName,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Signup failed' }, { status: 500 });
  }
}
