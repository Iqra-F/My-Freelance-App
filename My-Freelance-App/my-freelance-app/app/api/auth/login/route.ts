import { db } from '@/app/lib/firebaseAdmin'; // ✅ ADD this
import { createAuthResponse } from '@/app/lib/setAuthCookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Missing credentials' }), { status: 400 });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.error?.message || 'Login failed' }), {
        status: 401,
      });
    }

    // ✅ GET full user data from Firestore
    const userDoc = await db.collection('users').doc(data.localId).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    return createAuthResponse(data.idToken, {
      message: 'Login successful',
      user: {
        uid: data.localId,
        email: data.email,
        fullName: userData?.fullName || '',
        role: userData?.role || 'candidate',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || 'Server error' }), {
      status: 500,
    });
  }
}
