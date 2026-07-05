import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

function isAuthed(req: NextRequest) {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_PASSWORD;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = params;
    const body = await request.json();
    const contactRef = doc(db, 'contacts', id);
    await updateDoc(contactRef, body);
    return NextResponse.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error("Error updating contact: ", error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = params;
    const contactRef = doc(db, 'contacts', id);
    await deleteDoc(contactRef);
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error("Error deleting contact: ", error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
