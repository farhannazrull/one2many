import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const ordersCol = collection(db, 'orders');
    const orderSnapshot = await getDocs(ordersCol);
    const orderList = orderSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));
    return NextResponse.json(orderList);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      ...body,
      createdAt: serverTimestamp(),
      status: 'new',
    };
    const ordersCol = collection(db, 'orders');
    const docRef = await addDoc(ordersCol, newOrder);
    return NextResponse.json({ id: docRef.id, ...newOrder });
  } catch (error) {
    console.error("Error creating order: ", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
