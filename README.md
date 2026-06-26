# HUMA Frontend

Application web de **suivi du bien-être et des feedbacks employés**, développée en React + Vite.

HUMA permet aux employés de faire des check-ins d'humeur réguliers, de consulter leurs tendances personnelles et d'avoir une vue sur le ressenti de leur équipe. Les managers disposent d'une vue enrichie pour piloter le bien-être collectif.

---

## Fonctionnalités

- **Check-in d'humeur** — flux multi-étapes (humeur, ressentis, feedback texte)
- **Tableau de bord employé** — métriques personnelles, tendances, nuage de mots
- **Vue équipe** — score collectif, évolution hebdomadaire, feedbacks partagés
- **Vue manager** — mêmes pages, avec données agrégées de l'équipe
- **Onboarding** — parcours de bienvenue multi-étapes avec sauvegarde locale
- **Export PDF** — export des données via html2canvas + jspdf
- **Thème clair/sombre** — bascule via CSS variables

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 18.3 |
| Bundler | Vite 6 |
| Routing | React Router v7 |
| Graphiques | Chart.js 4.5 + react-chartjs-2 |
| Styles | Vanilla CSS + CSS variables (pas de framework CSS) |
| Tests | Vitest + happy-dom |
| Export | html2canvas + jspdf |
| Déploiement | Vercel |

---

## Prérequis

- Node.js >= 18
- npm (inclus avec Node)

---

## Démarrage

```powershell
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# Lancer les tests
npm run test

# Construire pour la prod
npm run build

# Prévisualiser le build
npm run preview
```

---

## Structure du projet

```
src/
├── main.jsx                    # Bootstrap React
├── App.jsx                     # Routeur principal (React Router)
├── styles.css                  # Styles globaux + CSS variables
├── components/                 # Composants UI réutilisables
│   ├── checkin/               # Composants du flux check-in
│   ├── Modal.jsx              # Modale de base (Escape, scroll lock)
│   ├── MoodTrendChart.jsx     # Graphique Chart.js avec dégradé
│   ├── WeeklyChart.jsx        # Graphique hebdomadaire
│   └── WordCloud.jsx          # Nuage de mots custom
├── pages/
│   └── employé/               # Pages accessibles aux employés et managers
│       ├── Onboarding.jsx     # Flux onboarding (sauvegarde localStorage)
│       ├── HomeEmployee.jsx   # Tableau de bord
│       ├── MeEmployee.jsx     # Profil / données personnelles
│       ├── Team.jsx           # Vue équipe
│       ├── FeedbacksEmployee.jsx  # Feedbacks
│       ├── CategoryDetail.jsx # Détail par catégorie
│       ├── Checkin.jsx        # Étape 1 du check-in
│       ├── CheckinStep2.jsx   # Étape 2
│       └── CheckinStep3.jsx   # Étape 3
└── services/
    ├── apiClient.js           # Wrapper fetch (VITE_API_URL)
    └── userInsights.js        # Données mock
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Tableau de bord employé |
| `/moi` | Données personnelles |
| `/nous` ou `/mon-equipe` | Vue équipe |
| `/feedbacks` | Feedbacks |
| `/checkin` | Check-in étape 1 |
| `/checkin/step2` | Check-in étape 2 |
| `/checkin/step3` | Check-in étape 3 |
| `/category/:id` | Détail d'une catégorie |

---

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

---

## Conventions de développement

- **Langue UI** : tout le texte affiché à l'utilisateur est en **français**
- **Imports** : utiliser l'alias `@/` pour tous les imports depuis `src/`
- **Styles** : CSS variables pour le thème, inline styles pour les layouts spécifiques
- **État global** : pas de store externe — `useState` + `localStorage` pour la persistance
- **Typage** : JavaScript uniquement (pas de TypeScript)
- **Rôles** : les pages détectent automatiquement le rôle via `localStorage` (`huma_is_manager`)

---

## Base de données

Le schéma PostgreSQL est disponible dans `database.sql`. Tables principales :

- `organizations` / `teams` / `users`
- `mood_checkins` — check-ins d'humeur
- `mood_feelings` — ressentis associés

Clés primaires en UUID, contraintes CHECK pour les énumérations.
