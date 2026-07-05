import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const sessionToken = randomBytes(32).toString('hex');
    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const sessionsCol = collection(db, 'customer_sessions');
    await addDoc(sessionsCol, {
      email,
      token: sessionToken,
      expiresAt: sessionExpiresAt,
    });

    const response = NextResponse.json({ message: 'Bypass successful' });
    response.cookies.set('customer_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: sessionExpiresAt,
    });

    return response;

  } catch (error) {
    console.error('Error in bypass:', error);
    return NextResponse.json({ error: 'Bypass failed' }, { status: 500 });
  }
}
