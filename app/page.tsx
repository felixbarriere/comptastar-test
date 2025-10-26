import fs from 'fs';
import path from 'path';

type Contact = {
  id: number;
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  pays: string;
};

export default function HomePage() {
  const filePath = path.join(process.cwd(), '../backend/BDD/contacts.json');
  const contacts: Contact[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bienvenue sur la mini-app de gestion de contacts</h1>

      <section>
        <h2>Liste des contacts</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
