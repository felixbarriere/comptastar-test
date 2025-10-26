// frontend/lib/validation.ts
import { Contact } from "@/app/interfaces/contact";

export function validateContactForm(form: Partial<Contact>): string | null {
  if (!form.civilite || !form.nom || !form.prenom || !form.email || !form.telephone || !form.pays) {
    return 'Tous les champs sont obligatoires.';
  }

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(form.email)) {
    return "L'adresse e-mail est invalide.";
  }

  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(form.telephone)) {
    return 'Le numéro de téléphone doit contenir uniquement des chiffres.';
  }

  const countryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  if (!countryRegex.test(form.pays)) {
    return 'Le pays ne doit pas contenir de chiffres.';
  }

  return null; // tout est bon ✅
}
