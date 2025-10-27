import { Contact } from '@/interfaces/contact';

/**
 * Transforme et nettoie une liste de contacts.
 */
export function transformContacts(list: Partial<Contact>[]): Contact[] {
    return list.map((c, index) => ({
      ...c,
      id: c.id ?? index + 1,
      civilite: normalizeCivilite(c.civilite || ''),
      nom: capitalizeFirst(c.nom || ''),
      prenom: capitalizeFirst(c.prenom || ''),
      email: (c.email || '').trim().toLowerCase(),
      telephone: (c.telephone || '').trim(),
      pays: normalizePays(c.pays || ''),
    }));
}

/**
 * Transforme la civilité brute en valeur normalisée.
 */
function normalizeCivilite(raw: string): string {
  const value = raw.trim().toLowerCase();

  if (/^m(\.|onsieur)?$/.test(value) || value.startsWith('mo')) {
    return 'Monsieur';
  }
  if (/^me|^ma(dame|demoiselle)?/.test(value)) {
    return 'Madame';
  }

  return '';
}

/**
 * Transforme le pays : 2 premières lettres en majuscules.
 */
function normalizePays(raw: string): string {
    if (!raw) return '';
  return raw.slice(0, 2).toUpperCase();
}

/**
 * Met en forme un texte avec première lettre majuscule, reste en minuscule.
 */
function capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
