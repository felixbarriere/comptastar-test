'use client';

import Link from 'next/link';
import { useContacts } from './hooks/useContacts';
import Header from '../components/Header';


export default function ContactsPage() {
  const {
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
  } = useContacts();

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Header logoSrc="/logo.png" logoAlt="Mon Logo" />
      <div className='contact-container'>
        <h1 className='mg-b-25' style={{ textAlign: 'center', width: "100%" }}>Gestion des Contacts</h1>
        <p>Cette page vous permet d'ajouter, modifier ou supprimer des contacts. Vous pouvez également ajouter une liste existante via le bouton 'Choisir un fichier'.
        </p><br />

        {/* --- Formulaire manuel --- */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <select value={form.civilite || ''} onChange={e => setForm({ ...form, civilite: e.target.value })}>
              <option value="">Civilité</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
            </select>
            <input placeholder="Nom" value={form.nom || ''} onChange={e => setForm({ ...form, nom: e.target.value })} />
            <input placeholder="Prénom" value={form.prenom || ''} onChange={e => setForm({ ...form, prenom: e.target.value })} />
            <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Téléphone" value={form.telephone || ''} onChange={e => setForm({ ...form, telephone: e.target.value })} />
            <input placeholder="Pays" value={form.pays || ''} onChange={e => setForm({ ...form, pays: e.target.value })} />
            <button type="submit">{form.id ? 'Modifier' : 'Ajouter manuellement'}</button>
          </form>
          {error && <p style={{ color: 'white' }}>{error}</p>}


          <div className='mg-t-15'>
            <input type="file" accept=".csv" onChange={handleImport} />
          </div>
        {/* </div> */}


        {/* --- Tableau des données importées --- */}
        {imported.length > 0 && (
          <>
            <h2>Données importées et nettoyées</h2>
            <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Civilité</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Pays</th>
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

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={handleImportSubmit} style={{ display: 'block', marginTop: '0.5rem' }}>
                Transformer et importer dans la base
              </button>
              <button className="cancel" onClick={cancelSubmit} style={{ display: 'block', marginTop: '0.5rem' }}>
                Annuler
              </button>
            </div>
          </>
        )}

        {/* --- Tableau des contacts existants --- */}
        <h2>Vos contacts</h2>
        {contacts.length > 0 ? (
          <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', marginBottom: '2rem' }}>
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
                    <button className="delete" onClick={() => handleDelete(c.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
            Aucun contact enregistré pour le moment.
          </p>
        )}

        <div className="mg-t-15" style={{ textAlign: 'center', width: "100%" }}>
          <Link href="/" className="button">
            Retour à l'accueil
          </Link>
        </div>
      </div>

    </main>
  );
}
