import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';

function isAuthed(req: NextRequest) {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const contactsCol = collection(db, 'contacts');
    const q = query(contactsCol, orderBy('createdAt', 'desc'));
    const contactSnapshot = await getDocs(q);
    const contactList = contactSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to JS Date
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
      };
    });
    return NextResponse.json(contactList);
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
     if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newContact = {
      ...body,
      createdAt: serverTimestamp(),
      status: 'unread',
    };
    const contactsCol = collection(db, 'contacts');
    const docRef = await addDoc(contactsCol, newContact);
    // Return the created document's ID along with the data
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact: ", error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
