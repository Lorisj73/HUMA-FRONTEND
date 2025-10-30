# HUMA Frontend

Projet React minimal initialisé avec Vite.

## Prérequis
- Node.js >= 18
- npm (inclus avec Node)

## Démarrage
```powershell
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# Construire pour la prod
npm run build

# Prévisualiser le build
npm run preview
```

## Structure
- `index.html` — point d'entrée HTML
- `src/main.jsx` — bootstrap React
- `src/App.jsx` — shell d'application (compose les pages/composants)
- `src/pages/` — pages (ex: `Home.jsx`)
- `src/components/` — composants UI réutilisables (ex: `Header.jsx`)
- `src/services/` — accès API, utilitaires côté client (ex: `apiClient.js`)
- `vite.config.js` — config Vite (alias `@` -> `src`)
- `.env.example` — variables d'environnement d'exemple
- `.gitignore` — fichiers à ignorer
- `package.json` — scripts et dépendances

## Configuration API
Copiez `.env.example` en `.env` et adaptez l'URL si besoin :

```env
VITE_API_URL=http://localhost:3000
```

Dans le code, utilisez `import.meta.env.VITE_API_URL` via le client `api` :

```js
import { api } from '@/services/apiClient'
// ex: await api.get('/health')
```
