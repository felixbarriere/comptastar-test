import { validateContactForm } from '@/app/lib/validation';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Contact } from '@/app/interfaces/contact';

export const POST = async (req: Request) => {
  try {
    const newContacts: Partial<Contact>[] = await req.json();

    if (!Array.isArray(newContacts) || newContacts.length === 0) {
      return NextResponse.json({ error: 'Aucun contact à importer' }, { status: 400 });
    }

    const errors: string[] = [];
    const validContacts: Partial<Contact>[] = [];

    newContacts.forEach((c, i) => {
      const err = validateContactForm(c);
      if (err) {
        errors.push(`Ligne ${i + 1} : ${err}`);
      } else {
        validContacts.push(c);
      }
    });

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation échouée', details: errors }, { status: 400 });
    }

    // Lire le JSON existant
    const filePath = path.join(process.cwd(), 'BDD', 'contacts.json');
    const existingData: Contact[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const maxId = existingData.length ? Math.max(...existingData.map(c => c.id)) : 0;

    const updatedContacts: Contact[] = [
      ...existingData,
      ...validContacts.map((c, i) => ({
        id: maxId + i + 1,
        civilite: c.civilite!,
        nom: c.nom!,
        prenom: c.prenom!,
        email: c.email!,
        telephone: c.telephone!,
        pays: c.pays!,
      })),
    ];

    fs.writeFileSync(filePath, JSON.stringify(updatedContacts, null, 2), 'utf8');

    return NextResponse.json({ message: 'Import réussi', count: validContacts.length });
  } catch (err) {
    console.error('Erreur import CSV:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
};
