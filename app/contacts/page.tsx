'use client';
import { useEffect, useState } from 'react';

type Contact = {
  id: number;
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  pays: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Partial<Contact>>({});

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
    if (!form.nom || !form.prenom) return;

    if (form.id) {
      // Modifier
      await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      // Ajouter
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({});
    fetchContacts();
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });    fetchContacts();
  };

  const handleEdit = (contact: Contact) => {
    setForm(contact);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Contacts</h1>

      {/* Formulaire Ajouter/Modifier */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input placeholder="Civilité" value={form.civilite || ''} onChange={e => setForm({ ...form, civilite: e.target.value })} />
        <input placeholder="Nom" value={form.nom || ''} onChange={e => setForm({ ...form, nom: e.target.value })} />
        <input placeholder="Prénom" value={form.prenom || ''} onChange={e => setForm({ ...form, prenom: e.target.value })} />
        <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Téléphone" value={form.telephone || ''} onChange={e => setForm({ ...form, telephone: e.target.value })} />
        <input placeholder="Pays" value={form.pays || ''} onChange={e => setForm({ ...form, pays: e.target.value })} />
        <button type="submit">{form.id ? 'Modifier' : 'Ajouter'}</button>
        {form.id && <button type="button" onClick={() => setForm({})}>Annuler</button>}
      </form>

      {/* Liste des contacts */}
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Civilité</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Pays</th>
            <th>Actions</th>
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
                <button onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
