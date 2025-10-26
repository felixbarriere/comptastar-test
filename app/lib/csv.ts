import Papa from "papaparse";
import { Contact } from "@/app/interfaces/contact";

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
