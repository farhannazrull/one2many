import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, writeBatch, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const otpCol = collection(db, 'otp_codes');
    const q = query(
      otpCol,
      where('email', '==', email),
      where('code', '==', code),
      where('used', '==', false),
      where('expiresAt', '>', new Date())
    );

    const otpSnapshot = await getDocs(q);

    if (otpSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    const otpDoc = otpSnapshot.docs[0];

    // Mark OTP as used
    const batch = writeBatch(db);
    batch.update(otpDoc.ref, { used: true });
    await batch.commit();

    // Create a session
    const sessionToken = randomBytes(32).toString('hex');
    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const sessionsCol = collection(db, 'customer_sessions');
    await addDoc(sessionsCol, {
      email,
      token: sessionToken,
      expiresAt: sessionExpiresAt,
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('customer_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: sessionExpiresAt,
    });
    
    return response;

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
