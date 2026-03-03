# Intégration API HUMA - Documentation

## 📋 Vue d'ensemble

Le frontend HUMA est maintenant connecté au backend via l'API REST. Toutes les données sont synchronisées avec le serveur tout en conservant un fallback sur le localStorage pour une meilleure expérience utilisateur.

## 🔗 Configuration

### Variables d'environnement

Le fichier `.env` contient l'URL de l'API :

```env
VITE_API_URL=https://huma-backend-a0wj.onrender.com
```

Pour le développement local, créez un fichier `.env.local` :

```env
VITE_API_URL=http://localhost:3000
```

## 📂 Structure des Services

```
src/services/
├── apiClient.js          # Client HTTP avec gestion du token
├── authService.js        # Authentification (login/register)
├── userService.js        # Gestion utilisateur (profil, onboarding)
├── checkinService.js     # Check-ins (météo du jour)
├── feedbackService.js    # Feedbacks
└── teamService.js        # Statistiques d'équipe
```

## 🔐 Authentification

### Flux d'authentification

1. **Onboarding Step 1** : L'utilisateur entre son email
2. L'API crée un compte ou connecte l'utilisateur existant
3. Un token JWT est retourné et stocké dans `localStorage`
4. Toutes les requêtes suivantes incluent ce token dans le header `Authorization: Bearer <token>`

### Utilisation

```javascript
import { register, login, logout } from '@/services/authService'

// Inscription/Connexion
const response = await register('user@example.com')
// Le token est automatiquement stocké

// Déconnexion
logout() // Nettoie le token et le localStorage
```

## 👤 Gestion Utilisateur

### Récupérer les informations utilisateur

```javascript
import { getUserInfo, updateUserInfo, updateOnboarding } from '@/services/userService'

// Obtenir les infos
const user = await getUserInfo()

// Mettre à jour nom/prénom
await updateUserInfo('Jean', 'Dupont')

// Sauvegarder l'onboarding
await updateOnboarding({
  workStyle: 'Autonome',
  motivationType: 'Apprentissage',
  stressSource: 'Délais'
})
```

## 📊 Check-ins (Météo du jour)

### Mapping des causes

Le frontend utilise des labels français qui sont mappés vers les constantes du backend :

| Frontend                | Backend          |
|------------------------|------------------|
| Charge / Rythme        | WORKLOAD         |
| Relations / Ambiance   | RELATIONSHIPS    |
| Sens / Motivation      | MEANING          |
| Organisation / Clarté  | ORGANIZATION     |
| Reconnaissance         | RECOGNITION      |
| Équilibre pro/perso    | BALANCE          |

### Utilisation

```javascript
import {
  createCheckin,
  checkTodayStatus,
  getCheckinHistory,
  getWeeklySummary,
  getWeeklyFactors
} from '@/services/checkinService'

// Créer un check-in
await createCheckin(85, [1, 2], 'Super journée!')
// moodValue: 0-100
// selectedOptions: array d'IDs (1-6)
// comment: optionnel

// Vérifier si check-in du jour existe
const today = await checkTodayStatus()

// Historique (30 derniers jours)
const history = await getCheckinHistory(30)

// Résumé hebdomadaire
const summary = await getWeeklySummary('2026-02-24')

// Facteurs d'influence
const factors = await getWeeklyFactors()
```

## 💬 Feedbacks

### Mapping des catégories

| Frontend                    | Backend          |
|----------------------------|------------------|
| Charge / Rythme            | WORKLOAD         |
| Relations / Ambiance       | RELATIONSHIPS    |
| Sens / Motivation          | MEANING          |
| Organisation / Clarté      | ORGANIZATION     |
| Reconnaissance             | RECOGNITION      |
| Équilibre vie pro / perso  | BALANCE          |
| Locaux / Matériel          | FACILITIES       |

### Utilisation

```javascript
import { createFeedback, getFeedbacks, getCategories } from '@/services/feedbackService'

// Créer un feedback
await createFeedback(
  'Charge / Rythme',
  'Le rythme est trop soutenu',
  'Mieux répartir les tâches',
  true // isAnonymous
)

// Récupérer les feedbacks
const feedbacks = await getFeedbacks()

// Liste des catégories
const categories = getCategories()
```

## 👥 Équipe

```javascript
import { getTeamStats, createTeam, addTeamMember } from '@/services/teamService'

// Stats de l'équipe
const stats = await getTeamStats()

// Créer une équipe
const team = await createTeam('Mon Équipe')

// Ajouter un membre
await addTeamMember(teamId, userId)
```

## 🔄 Gestion des erreurs

Tous les services retournent des Promises et gèrent les erreurs :

```javascript
try {
  const data = await createCheckin(85, [1, 2], 'Commentaire')
  console.log('Succès:', data)
} catch (error) {
  console.error('Erreur:', error)
  // error.status contient le code HTTP
  // error.payload contient la réponse d'erreur
}
```

## 📱 Pages intégrées

### ✅ Complètement intégrées

- **Onboarding** (`OnboardingEmployee.jsx`)
  - Authentification (Step 1)
  - Mise à jour du profil (Step 2)
  - Questions onboarding (Step final)

- **Check-in** (`Checkin.jsx`, `CheckinStep2.jsx`, `CheckinStep3.jsx`)
  - Création de check-in complet
  - Sauvegarde en base de données
  - Fallback localStorage

- **Feedbacks** (`FeedbacksEmployee.jsx`)
  - Création de feedbacks
  - Récupération de l'historique

- **Home** (`HomeEmployee.jsx`)
  - Chargement du check-in du jour
  - Historique des check-ins
  - Stats d'équipe

### 🔄 À intégrer

- **MeEmployee.jsx** - Statistiques personnelles
- **Team.jsx** - Vue d'équipe complète
- **Pages Manager** - Vues manager

## 🛠 Fonctionnalités techniques

### Gestion du token

Le token d'authentification est :
- Automatiquement ajouté aux requêtes
- Stocké dans `localStorage` sous `huma_auth_token`
- Persisté entre les sessions
- Nettoyé lors de la déconnexion

### Fallback localStorage

Si l'API échoue, les pages tentent de charger les données depuis le localStorage pour garantir une expérience utilisateur fluide.

### Requêtes sans authentification

Pour les endpoints publics (health, etc.) :

```javascript
const response = await api.get('/health', { requiresAuth: false })
```

## 🚀 Prochaines étapes

1. ✅ Authentification et onboarding
2. ✅ Check-ins
3. ✅ Feedbacks
4. ⏳ Statistiques personnelles (MeEmployee)
5. ⏳ Statistiques d'équipe (Team)
6. ⏳ Vues manager
7. ⏳ Gestion d'erreurs avancée
8. ⏳ Offline mode / Service Worker

## 📝 Notes importantes

- **Anonymat** : Les check-ins et feedbacks sont anonymes côté API
- **Performance** : Les données sont cachées localement pour réduire les appels API
- **Sécurité** : Le token JWT expire, nécessitant une nouvelle authentification
- **CORS** : L'API backend doit autoriser les requêtes depuis le domaine du frontend

## 🐛 Debugging

### Vérifier le token

```javascript
import { getAuthToken } from '@/services/apiClient'
console.log('Token actuel:', getAuthToken())
```

### Tester une requête

```javascript
import { api } from '@/services/apiClient'

// Avec auth
const data = await api.get('/users/me')

// Sans auth
const health = await api.get('/health', { requiresAuth: false })
```

### Logs

Les services loggent les erreurs dans la console. Ouvrez les DevTools (F12) pour voir les détails.
