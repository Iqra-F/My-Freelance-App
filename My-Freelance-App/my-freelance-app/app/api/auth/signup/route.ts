import { auth, db } from '@/app/lib/firebaseAdmin';
import { NextRequest } from 'next/server';
import { createAuthResponse } from '@/app/lib/setAuthCookie';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, fullName, role } = body;

  if (!email || !password || !fullName || !role) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
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
      role: role || 'Employee', 
    });

    // Auto-login after signup
    const loginRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      return new Response(
        JSON.stringify({ message: loginData.error?.message || 'Login after signup failed' }),
        { status: 500 }
      );
    }

    return createAuthResponse(loginData.idToken, {
      message: 'User created and logged in successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        fullName,
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || 'Signup failed' }), {
      status: 500,
    });
  }
}
