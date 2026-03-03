# Dossier Individuel - Projet Huma

## 📋 Informations générales

**Nom du projet :** Huma - Application de suivi du bien-être et de feedback  
**Équipe :** 2 développeurs
- **Développeur Backend** : [Nom à compléter]
- **Développeur Frontend** : Loris Jacob

**Période :** Février 2026  
**Technologies :**
- **Frontend :** React 18, Vite, React Router 6
- **Backend :** Node.js, Express.js, PostgreSQL
- **Déploiement :** Render.com

---

## 🎯 Présentation du projet

### Contexte

Huma est une application intégrée aux outils de communication existants (Teams, Slack) des organisations (entreprises et écoles). Son objectif est de **favoriser l'expression des étudiants/collaborateurs** et de permettre aux responsables de **suivre anonymement le ressenti collectif**.

### Problématique

Comment permettre aux collaborateurs et étudiants de s'exprimer librement sur leur bien-être tout en garantissant l'anonymat et en fournissant aux responsables des données exploitables pour améliorer l'environnement de travail/d'études ?

### Solution apportée

Une plateforme web intuitive permettant :
- Le suivi quotidien de l'humeur ("météo du jour")
- Une boîte à feedback constructive (remarque + solution)
- Un dashboard anonymisé pour les responsables
- L'idée clé : **prévenir plutôt que guérir**

---

## 🚀 Fonctionnalités du MVP

### 1. Boîte à remarques
- Soumission de feedbacks avec **catégorisation** (Charge/Rythme, Relations, Organisation, etc.)
- Obligation d'accompagner chaque remarque d'une **proposition de solution**
- Anonymat garanti
- Mode anonyme optionnel

**Exemple d'utilisation :**
> **Remarque :** « Les cours finissent toujours en retard, ça me dérange car j'ai un autre cours après. »  
> **Solution suggérée :** « Respecter les horaires ou prévoir une pause de transition. »

### 2. Suivi d'humeur - "Météo du jour"
- Check-in quotidien rapide (processus en 3 étapes)
- Sélection d'une humeur sur une échelle visuelle (0-100)
- Identification des facteurs d'influence (6 catégories)
- Commentaire optionnel
- Données anonymisées et agrégées par équipe

### 3. Dashboard pour les responsables
- Visualisation des tendances globales (pas de données individuelles)
- Graphiques d'évolution de l'humeur collective
- Statistiques par équipe
- Identification des facteurs d'influence dominants
- Outil d'aide à la décision

### 4. Onboarding utilisateur
- Authentification par email (SSO)
- Collecte des informations de base (nom, prénom, rôle)
- Questions de préférences (style de travail, motivations, sources de stress)
- Garantie d'anonymat explicite

---

## 🤖 Perspectives d'intégration IA

### 1. Analyse des remarques
- Classification automatique par thèmes
- Détection de tonalité (positive, neutre, négative)
- Résumé des remarques longues
- Extraction de mots-clés

### 2. Analyse d'humeur
- Détection de patterns temporels
- Identification de signaux faibles (chute progressive du moral)
- Prédiction de tendances
- Alertes automatiques en cas d'anomalie

### 3. Dashboard intelligent
- Génération d'indicateurs clés (indice de bien-être)
- Alertes automatiques sur tendances anormales
- Suggestions d'actions contextuelles

### 4. Éthique et anonymat
- Détection et suppression de données sensibles
- Garantie de l'anonymat et agrégation des données
- Respect du RGPD

---

## 👨‍💻 Mon rôle et contributions (Frontend)

### Responsabilités principales

En tant que développeur frontend, j'ai eu la charge de concevoir et développer l'intégralité de l'interface utilisateur de l'application Huma. Mon travail s'est concentré sur trois axes majeurs :

1. **Architecture et structure de l'application**
2. **Développement des interfaces utilisateur**
3. **Intégration avec l'API backend**

### 1. Architecture technique

#### Structure du projet
```
HUMA-FRONTEND/
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Pages de l'application
│   │   ├── employé/      # Vues collaborateur
│   │   └── manager/      # Vues manager
│   ├── services/         # Couche d'accès à l'API
│   ├── media/            # Assets (images, fonts)
│   └── styles.css        # Styles globaux
├── .env                  # Configuration environnement
└── vite.config.js        # Configuration Vite
```

#### Choix techniques
- **React 18** : Framework moderne avec hooks pour la gestion d'état
- **React Router 6** : Navigation fluide et gestion des routes
- **Vite** : Build tool rapide et performant
- **CSS Vanilla** : Styling personnalisé sans framework pour un contrôle total
- **Architecture en services** : Séparation de la logique métier et de l'UI

### 2. Développement des interfaces

#### Pages développées

**A. Onboarding (3 étapes)**
- Connexion via email avec authentification API
- Collecte du profil (nom, prénom, rôle manager)
- Questionnaire de préférences (7 questions)
- Design glassmorphism avec animations SVG
- Gestion complète des états de chargement et d'erreur

**B. Check-in "Météo du jour" (3 étapes)**
- Sélection d'humeur avec slider interactif (0-100)
- Choix multi-facteurs avec cartes cliquables
- Commentaire optionnel avec suggestions contextuelles
- Visualisation météo dynamique (5 états : orage, pluie, nuageux, soleil/nuage, soleil)
- Modal en overlay avec design cohérent

**C. Page d'accueil collaborateur**
- Carte de check-in du jour avec aperçu de l'humeur
- Historique des check-ins (30 derniers jours)
- Graphique d'évolution hebdomadaire
- Statistiques d'équipe anonymisées
- Chargement des données depuis l'API avec fallback localStorage

**D. Boîte à feedback**
- Grille de catégories avec compteurs
- Modal de création de feedback avec formulaire complet
- Validation des champs (remarque obligatoire, solution optionnelle)
- Mode anonyme par défaut
- Intégration API pour persistance

**E. Autres pages**
- Page "Moi" : statistiques personnelles et historique
- Page "Équipe" : vue d'ensemble de l'équipe
- Pages Manager : dashboard et analytics (structure créée)

#### Composants réutilisables créés

1. **Card** - Conteneur de contenu stylisé
2. **Modal** - Overlay réutilisable avec gestion du focus
3. **MoodRevealCard** - Affichage de l'humeur du jour
4. **WeeklyChart** - Graphique d'évolution hebdomadaire
5. **TeamScoreCard** - Carte de statistiques d'équipe
6. **MetricCard** - Carte de métrique avec icône
7. **ThemeToggle** - Basculement mode clair/sombre
8. **Navbar** - Navigation principale avec onglets actifs
9. **TagList** - Liste de tags pour les catégories
10. **WordCloud** - Nuage de mots pour les tendances

### 3. Intégration API

#### Architecture de services développée

J'ai conçu une architecture en couche pour gérer toutes les interactions avec le backend :

**`apiClient.js`** - Client HTTP centralisé
- Gestion automatique du token JWT (Bearer)
- Injection du header `Authorization` sur toutes les requêtes authentifiées
- Gestion des erreurs HTTP
- Configuration via variables d'environnement

**Services métier créés :**

1. **`authService.js`** - Authentification
   - `login(email)` - Connexion utilisateur
   - `register(email)` - Inscription
   - `logout()` - Déconnexion
   - `isAuthenticated()` - Vérification d'état

2. **`userService.js`** - Gestion utilisateur
   - `getUserInfo()` - Récupération du profil
   - `updateUserInfo(firstName, lastName)` - Mise à jour nom/prénom
   - `updateOnboarding(data)` - Sauvegarde préférences onboarding

3. **`checkinService.js`** - Check-ins
   - `createCheckin(moodValue, factors, comment)` - Création
   - `checkTodayStatus()` - Vérification du check-in du jour
   - `getCheckinHistory(days)` - Historique
   - `getWeeklySummary()` - Résumé hebdomadaire
   - `getWeeklyFactors()` - Facteurs d'influence
   - Mapping automatique FR ↔ EN pour les causes

4. **`feedbackService.js`** - Feedbacks
   - `createFeedback(category, feedback, solution, isAnonymous)` - Création
   - `getFeedbacks()` - Récupération de l'historique
   - `getCategories()` - Liste des catégories
   - Mapping automatique FR ↔ EN pour les catégories

5. **`teamService.js`** - Équipes
   - `getTeamStats(teamId)` - Statistiques d'équipe
   - `createTeam(name)` - Création d'équipe
   - `addTeamMember(teamId, userId)` - Ajout de membre

#### Mapping des données

J'ai implémenté un système de mapping bidirectionnel pour adapter les labels français de l'interface aux constantes anglaises de l'API :

| Frontend (FR) | Backend (EN) |
|---|---|
| Charge / Rythme | WORKLOAD |
| Relations / Ambiance | RELATIONSHIPS |
| Sens / Motivation | MEANING |
| Organisation / Clarté | ORGANIZATION |
| Reconnaissance | RECOGNITION |
| Équilibre pro/perso | BALANCE |
| Locaux / Matériel | FACILITIES |

#### Gestion de la persistance

- **Token JWT** stocké dans `localStorage` sous `huma_auth_token`
- **Fallback localStorage** pour l'historique si l'API est indisponible
- Synchronisation automatique entre API et stockage local
- Nettoyage lors de la déconnexion

### 4. Défis techniques rencontrés et solutions

#### Défi 1 : Gestion de l'authentification
**Problème :** Synchronisation du token entre les requêtes et gestion de l'expiration.  
**Solution :** Création d'un client API centralisé avec injection automatique du header Authorization et gestion d'erreurs.

#### Défi 2 : Mapping des données FR/EN
**Problème :** L'interface est en français mais l'API utilise des constantes en anglais.  
**Solution :** Création de dictionnaires de mapping bidirectionnels dans les services pour conversion transparente.

#### Défi 3 : Expérience utilisateur fluide
**Problème :** Éviter les temps de chargement visibles et les erreurs bloquantes.  
**Solution :** États de chargement, messages d'erreur contextuels, et fallback sur localStorage.

#### Défi 4 : Design cohérent
**Problème :** Maintenir une cohérence visuelle sur toutes les pages.  
**Solution :** Création de composants réutilisables et utilisation de CSS variables pour le theming.

#### Défi 5 : Intégration API progressive
**Problème :** Le backend était développé en parallèle.  
**Solution :** Développement avec données mockées puis intégration progressive des services API.

### 5. Compétences mobilisées

#### Techniques
- ✅ **React & Hooks** : useState, useEffect, useNavigate
- ✅ **Architecture logicielle** : Séparation des responsabilités (services, composants, pages)
- ✅ **API REST** : Intégration complète avec gestion d'erreurs
- ✅ **Authentification JWT** : Gestion du cycle de vie des tokens
- ✅ **Gestion d'état** : LocalStorage, états React
- ✅ **CSS avancé** : Glassmorphism, animations, responsive design
- ✅ **Routage** : React Router avec navigation conditionnelle

#### Méthodologiques
- ✅ **Travail en équipe** : Coordination avec le développeur backend
- ✅ **Documentation** : Création de documentation technique (API-INTEGRATION.md)
- ✅ **Versioning Git** : Gestion de branches (develop, main)
- ✅ **Débogage** : Utilisation des DevTools, logs réseau
- ✅ **Test manuel** : Vérification de tous les cas d'usage

#### Transversales
- ✅ **Autonomie** : Recherche de solutions et décisions techniques
- ✅ **Rigueur** : Respect des conventions de nommage et structure
- ✅ **Adaptation** : Intégration d'une API développée en parallèle
- ✅ **Communication** : Coordination avec le backend sur les formats de données

---

## 📊 Résultats et métriques

### Fonctionnalités livrées
- ✅ **5 pages** complètes et fonctionnelles
- ✅ **10 composants** réutilisables
- ✅ **5 services API** avec 20+ endpoints intégrés
- ✅ **100%** des flux utilisateur principaux implémentés

### Code produit
- **~3000 lignes** de code JavaScript/JSX
- **~1000 lignes** de CSS
- **Documentation** complète de l'intégration API
- **Architecture** modulaire et maintenable

### Qualité
- ✅ Aucune erreur de compilation
- ✅ Gestion complète des erreurs réseau
- ✅ Interface responsive
- ✅ Expérience utilisateur fluide

---

## 🔄 Collaboration backend/frontend

### Communication et coordination

La collaboration avec le développeur backend a été essentielle au succès du projet :

#### Documentation partagée
- **Postman Collection** : Documentation exhaustive de l'API fournie par le backend
- **Schéma de base de données** : Compréhension des modèles de données
- **README backend** : Instructions de déploiement et configuration

#### Adaptations mutuelles
- **Format des données** : Harmonisation des structures JSON
- **Naming conventions** : Choix des noms de champs (snake_case backend, camelCase frontend)
- **Gestion des erreurs** : Codes HTTP et messages d'erreur standardisés
- **Authentification** : Mise en place du système JWT Bearer

#### Points de synchronisation
- Validation des endpoints au fur et à mesure du développement
- Ajustements des formats de requête/réponse
- Debugging collaboratif via les logs réseau
- Tests d'intégration avec le backend déployé

---

## 🚀 Prochaines étapes

### Fonctionnalités à développer

1. **Dashboard Manager**
   - Visualisations avancées des données d'équipe
   - Filtres par période et par équipe
   - Export de rapports

2. **Page "Moi" enrichie**
   - Graphiques d'évolution personnelle
   - Insights sur les patterns d'humeur
   - Historique complet

3. **Intégration IA**
   - Suggestions automatiques basées sur l'humeur
   - Détection de patterns
   - Classification automatique des feedbacks

4. **Optimisations**
   - Mise en cache des requêtes
   - Pagination pour les listes longues
   - Mode offline avec Service Worker
   - Tests unitaires (Jest, React Testing Library)

### Améliorations techniques
- Ajout de TypeScript pour la sûreté du typage
- Implémentation de tests E2E (Cypress)
- Optimisation des performances (lazy loading, code splitting)
- Amélioration de l'accessibilité (ARIA, navigation clavier)

---

## 📚 Documentation technique produite

1. **API-INTEGRATION.md**
   - Guide complet d'utilisation des services
   - Documentation des endpoints
   - Exemples de code
   - Guide de débogage

2. **INTEGRATION-SUMMARY.md**
   - Résumé des modifications apportées
   - Liste des fichiers créés/modifiés
   - Prochaines étapes

3. **README.md** (mise à jour)
   - Instructions d'installation
   - Configuration des variables d'environnement
   - Commandes de développement

4. **DOSSIER-INDIVIDUEL.md** (ce document)
   - Présentation complète de mon travail
   - Démonstration des compétences

---

## 🎓 Apprentissages et points clés

### Ce que j'ai appris

1. **Architecture logicielle**
   - Importance de la séparation des responsabilités
   - Avantages d'une architecture en couches
   - Patterns de conception (Service Layer, Repository)

2. **Intégration API**
   - Gestion du cycle de vie d'un token JWT
   - Gestion des erreurs réseau et retry logic
   - Stratégies de fallback pour la résilience

3. **React avancé**
   - Optimisation des re-renders
   - Gestion d'états complexes
   - Hooks personnalisés

4. **Travail d'équipe**
   - Communication asynchrone efficace
   - Documentation comme outil de collaboration
   - Importance des conventions communes

### Ce que je referais différemment

1. **Tests** : Écrire des tests unitaires dès le début du projet
2. **TypeScript** : Utiliser TypeScript pour éviter les erreurs de typage
3. **Composants** : Créer un design system plus tôt
4. **Git** : Utiliser des branches feature plus granulaires

### Ce dont je suis fier

1. ✅ **Architecture propre** et maintenable
2. ✅ **Code modulaire** et réutilisable
3. ✅ **Documentation exhaustive** pour faciliter la reprise
4. ✅ **Intégration complète** de l'API avec gestion d'erreurs
5. ✅ **Interface intuitive** et agréable à utiliser

---

## 📝 Conclusion

Le projet Huma m'a permis de développer des compétences techniques solides en développement frontend, notamment en React, architecture logicielle et intégration API. J'ai pu mettre en pratique les bonnes pratiques de développement (séparation des responsabilités, gestion d'erreurs, documentation) tout en collaborant efficacement avec un développeur backend.

Le résultat est une application web fonctionnelle et maintenable, avec une architecture prête pour les évolutions futures (IA, analytics avancés, optimisations). Ce projet démontre ma capacité à concevoir et développer une interface utilisateur complète, de l'authentification à la visualisation de données, tout en garantissant une expérience utilisateur fluide.

---

**Document rédigé par :** Loris Jacob  
**Date :** 25 février 2026  
**Projet :** Huma - Application de suivi du bien-être et de feedback
