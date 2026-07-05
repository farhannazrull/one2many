import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, body);
    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error("Error updating order: ", error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orderRef = doc(db, 'orders', id);
    await deleteDoc(orderRef);
    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error("Error deleting order: ", error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}

