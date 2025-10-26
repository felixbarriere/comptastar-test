import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'BDD/contacts.json');

function readContacts() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeContacts(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const contacts = readContacts();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const newContact = await request.json();
  const contacts = readContacts();

  // Crée un nouvel ID unique
  newContact.id = contacts.length ? Math.max(...contacts.map((c: any) => c.id)) + 1 : 1;

  contacts.push(newContact);
  writeContacts(contacts);

  return NextResponse.json(newContact, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedContact = await request.json();
  const contacts = readContacts();

  const index = contacts.findIndex((c: any) => c.id === updatedContact.id);
  if (index === -1) return NextResponse.json({ error: 'Contact non trouvé' }, { status: 404 });

  contacts[index] = updatedContact;
  writeContacts(contacts);

  return NextResponse.json(updatedContact);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let contacts = readContacts();

  contacts = contacts.filter((c: any) => c.id !== id);
  writeContacts(contacts);

  return NextResponse.json({ success: true });
}
