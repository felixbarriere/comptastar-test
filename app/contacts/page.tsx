'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Contact } from '@/app/interfaces/contact';
import { parseCSV } from '@/app/lib/csv';
import { validateContactForm } from '@/app/lib/validation';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Partial<Contact>>({});
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateContactForm(form);
    if (validationError) return setError(validationError);
    setError(null);

    const method = form.id ? 'PUT' : 'POST';
    await fetch('/api/contacts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({});
    fetchContacts();
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchContacts();
  };

  const handleEdit = (c: Contact) => setForm(c);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await parseCSV(file);
      setImported(parsed as Contact[]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la lecture du fichier CSV.");
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestion des Contacts</h1>

      {/* --- Formulaire --- */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={form.civilite || ''} onChange={e => setForm({ ...form, civilite: e.target.value })}>
            <option value="">Civilité</option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
            <option value="Mademoiselle">Mademoiselle</option>
            </select>
            <input placeholder="Nom" value={form.nom || ''} onChange={e => setForm({ ...form, nom: e.target.value })} />
            <input placeholder="Prénom" value={form.prenom || ''} onChange={e => setForm({ ...form, prenom: e.target.value })} />
            <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Téléphone" value={form.telephone || ''} onChange={e => setForm({ ...form, telephone: e.target.value })} />
            <input placeholder="Pays" value={form.pays || ''} onChange={e => setForm({ ...form, pays: e.target.value })} />

            <button type="submit">{form.id ? 'Modifier' : 'Ajouter manuellement'}</button>
        </form>

      
        {/* --- Import CSV --- */}
        <input type="file" accept=".csv" onChange={handleImport} />
      </div>

      {/* --- Tableau import CSV --- */}
      {imported.length > 0 && (
        <>
          <h2>Données importées</h2>
          <table border={1} cellPadding={5} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Civilité</th>
                <th style={{ textAlign: 'left' }}>Nom</th>
                <th style={{ textAlign: 'left' }}>Prénom</th>
                <th style={{ textAlign: 'left' }}>Email</th>
                <th style={{ textAlign: 'left' }}>Téléphone</th>
                <th style={{ textAlign: 'left' }}>Pays</th>
              </tr>
            </thead>
            <tbody>
              {imported.map((c, i) => (
                <tr key={i}>
                  <td>{c.civilite}</td>
                  <td>{c.nom}</td>
                  <td>{c.prenom}</td>
                  <td>{c.email}</td>
                  <td>{c.telephone}</td>
                  <td>{c.pays}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {imported.length > 0 && (
            <button
                onClick={async () => {
                    try {
                        const res = await fetch('/api/contacts/import', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(imported),
                        });
                        if (res.ok) {
                            alert('Contacts importés avec succès');
                            setImported([]); // vider la liste importée
                            fetchContacts(); // recharger les contacts existants
                        } else {
                            alert('Erreur lors de l’import');
                        }
                    } catch (err) {
                        console.error(err);
                        alert('Erreur lors de l’import');
                    }
                }}

            >
                Importer dans la base
            </button>
          )}
        </>
      )}



      {error && <p style={{ color: 'white' }}>{error}</p>}


      {/* --- Tableau principal --- */}
      <h2>Contacts enregistrés</h2>
      <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th style={{ textAlign: 'left' }}>Civilité</th>
            <th style={{ textAlign: 'left' }}>Nom</th>
            <th style={{ textAlign: 'left' }}>Prénom</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th style={{ textAlign: 'left' }}>Téléphone</th>
            <th style={{ textAlign: 'left' }}>Pays</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.civilite}</td>
              <td>{c.nom}</td>
              <td>{c.prenom}</td>
              <td>{c.email}</td>
              <td>{c.telephone}</td>
              <td>{c.pays}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Modifier</button>
                <button className="delete" onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {/* <button type="submit">{form.id ? 'Modifier' : 'Ajouter'}</button> */}
      <div>
        <Link href="/" className="button">
            Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
