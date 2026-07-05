import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('customer_token')?.value;

  if (token) {
    try {
      const sessionsCol = collection(db, 'customer_sessions');
      const q = query(sessionsCol, where('token', '==', token));
      const sessionSnapshot = await getDocs(q);

      if (!sessionSnapshot.empty) {
        const sessionDoc = sessionSnapshot.docs[0];
        await deleteDoc(sessionDoc.ref);
      }
    } catch (error) {
      console.error('Error deleting session from DB:', error);
      // Don't block logout if DB operation fails
    }
  }

  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('customer_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
