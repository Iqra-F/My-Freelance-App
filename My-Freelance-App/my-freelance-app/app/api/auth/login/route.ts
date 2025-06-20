// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
  }

  try {
    // Call Firebase Auth REST API to sign in
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.error?.message || 'Login failed' }, { status: 401 });
    }

    // Return user data (and token if needed)
    return NextResponse.json({
      message: 'Login successful',
      user: {
        uid: data.localId,
        email: data.email,
        idToken: data.idToken, // can be used for session
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
