'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/interfaces/contact';
import { parseCSV } from '../lib/cleaning-csv';
import { cleanCSVData } from '../lib/cleaning-csv';
import { transformContacts } from '../lib/transformation-csv';
import { validateContactForm } from '../lib/validation';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Partial<Contact>>({});
  const [imported, setImported] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('/contacts/api')
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateContactForm(form);
    if (validationError) return setError(validationError);
    setError(null);

    const method = form.id ? 'PUT' : 'POST';
    await fetch('/contacts/api', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({});
    fetchContacts();
  };

  const handleDelete = async (id: number) => {
    await fetch('/contacts/api', {
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
      const rawData = await parseCSV(file);
      const cleaned = cleanCSVData(rawData, contacts);
      setImported(cleaned);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la lecture du fichier CSV.");
    }
  };

  const handleImportSubmit = async () => {
    try {
      const transformed = transformContacts(imported);
      const validContacts = transformed.filter(c => !validateContactForm(c));

      if (validContacts.length === 0) {
        alert("Aucun contact valide à importer.");
        setImported([]);
        return;
      }

      const res = await fetch('/contacts/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validContacts),
      });

      if (res.ok) {
        alert('Contacts importés avec succès');
        setImported([]);
        fetchContacts();
      } else {
        alert('Erreur lors de l’import');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l’import');
    }
  };

  const cancelSubmit = () => {
    setImported([]);
  };

  return {
    contacts,
    form,
    imported,
    error,
    setForm,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleImport,
    handleImportSubmit,
    cancelSubmit,
  };
}
