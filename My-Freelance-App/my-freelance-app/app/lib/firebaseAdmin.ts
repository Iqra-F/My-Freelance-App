// app/lib/firebaseAdmin.ts
import admin from 'firebase-admin';
const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
