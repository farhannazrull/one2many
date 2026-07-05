import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('customer_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const sessionsCol = collection(db, 'customer_sessions');
    const q = query(
      sessionsCol,
      where('token', '==', token),
      where('expiresAt', '>', new Date())
    );

    const sessionSnapshot = await getDocs(q);

    if (sessionSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const session = sessionSnapshot.docs[0].data();
    return NextResponse.json({ email: session.email });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
