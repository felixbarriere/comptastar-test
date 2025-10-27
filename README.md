# 📚 Comptastar - Application CRUD Full-Stack

**Comptastar** est une application CRUD full-stack développée avec **Next.js**.  
Elle permet de gérer des contacts via un formulaire manuel ou un import CSV.

---

## 🚀 Installation

### Prérequis

- **Node.js** (version 20.9 ou supérieure)  
- Activer la bonne version via `nvm` :  
```
nvm use 21
```

### Installer et lancer le Frontend

```
git clone https://github.com/felixbarriere/comptastar-test/edit/main/README.md

cd comptastar-test

npm install

npm run dev
```

### Accéder à l'application

Dans votre navigateur :
http://localhost:3000

## Structure de l’application

L’application suit les bonnes pratiques de [Next.js](https://nextjs.org/docs/app/getting-started/project-structure#organizing-your-project)

Organisation générale :
```
app/
├─ page.tsx/                 # Page d'accueil
├─ contacts/
│  ├─ page.tsx               # Page principale de gestion des contacts
│  ├─ hooks/
│  │  └─ useContacts.ts      # Hook personnalisé pour la logique CRUD et le formulaire
│  ├─ lib/
│  │  └─ validation.ts       # Fonctions utilitaires, ex: validation du formulaire
│  └─ api/
│     └─ route.ts            # Routes API pour CRUD contacts
├─ components/
│  └─ Header.tsx             # Composant d’en-tête réutilisable
└─ ...
```

Les éléments communs sont à la racine, et les éléments spécifiques sont regroupés dans des dossiers dédiés (contacts, etc.).

## Utilisation
### Ajout manuel

- Remplissez le formulaire avec les informations du contact.

- Les formats doivent être respectés (numéros, email, etc.).

- Des alertes indiquent les erreurs si les formats sont incorrects.

### Import CSV

- Le fichier CSV doit respecter les formats attendus.

- Seuls les contacts valides seront importés.

- Une alerte confirme l’import des contacts valides et ignore les contacts invalides.


## Tests

L’application utilise Jest pour les tests unitaires.

Pour lancer les tests :

```npm run test```


Les tests vérifient notamment :

- Le fonctionnement du formulaire principal

- La validation des champs

- L’ajout et la gestion des contacts
