import Papa from "papaparse";
import { Contact } from "@/interfaces/contact";

/**
 * Parse les données CSV
 */
export function parseCSV(file: File): Promise<Partial<Contact>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const contacts = results.data.map((row: any, index: number) => ({
          id: index + 1,
          civilite: row["Civilité"]?.trim() || "",
          nom: row["Nom"]?.trim() || "",
          prenom: row["Prénom"]?.trim() || "",
          email: row["Email"]?.trim() || "",
          telephone: row["Téléphone"]?.trim() || "",
          pays: row["Pays"]?.trim() || "",
        }));
        resolve(contacts);
      },
      error: (error) => reject(error),
    });
  });
}

/**
 * Nettoie les données CSV (colonnes, trim)
 */
export function cleanCSVData(
  rawData: Partial<Contact>[],
  existingContacts: Contact[]
): Contact[] {
  let nextId = existingContacts.length
    ? Math.max(...existingContacts.map((c) => c.id)) + 1
    : 1;

  return rawData.map((row) => {
    const civilite = (row.civilite || '').trim();
    const nom = (row.nom || '').trim();
    const prenom = (row.prenom || '').trim();
    const emailRaw = (row.email || '').trim().toLowerCase();
    const telephoneRaw = (row.telephone || '').trim();
    const pays = (row.pays || '').trim();

    return {
      id: nextId++,
      civilite,
      nom,
      prenom,
      email: emailRaw,
      telephone: telephoneRaw,
      pays,
    };
  });
}
