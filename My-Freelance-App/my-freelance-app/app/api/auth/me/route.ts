import { auth, db } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    
    // ⬇️ Fetch full user record from Firestore
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    const userData = userDoc.data();

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      fullName: userData?.fullName || '',
      role: userData?.role || 'candidate',
      message: 'User authenticated',
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid or expired token', error: error.message },
      { status: 403 }
    );
  }
}
