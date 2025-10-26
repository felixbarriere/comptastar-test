'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { validateContactForm } from '@/app/lib/validation';
import { Contact } from "@/app/interfaces/contact";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Partial<Contact>>({});
  const [error, setError] = useState<string | null>(null);

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
    if (validationError) {
      setError(validationError);
      return;
    }

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

  const handleEdit = (contact: Contact) => {
    setForm(contact);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestion des Contacts</h1>

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

        <button type="submit" style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none' }}>
          {form.id ? 'Modifier' : 'Ajouter'}
        </button>

        {form.id && (
          <button type="button" onClick={() => setForm({})} style={{ backgroundColor: 'gray', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none' }}>
            Annuler
          </button>
        )}
      </form>

      {error && <p style={{ color: 'white' }}>{error}</p>}

      <table border={1} cellPadding={5} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                <button onClick={() => handleEdit(c)} style={{ marginRight: '0.5rem' }}>Modifier</button>
                <button onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          color: 'white',
          backgroundColor: '#0070f3',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}
