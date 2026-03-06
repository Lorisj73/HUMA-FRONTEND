# Dossier Écrit Individuel - Analyse de Gestion de Projet
## Projet Huma - Application de Suivi du Bien-être et Feedback

---

**Candidat :** Loris Jacob  
**Formation :** MBA Développeur Full Stack  
**Promotion :** 2026  
**Date :** Mars 2026

---

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Analyse de l'équipe et méthodes](#2-analyse-de-léquipe-et-méthodes)
3. [Dysfonctionnements détectés](#3-dysfonctionnements-détectés)
4. [Actions correctives proposées](#4-actions-correctives-proposées)
5. [Plan d'amélioration](#5-plan-damélioration)
6. [Conclusion](#conclusion)

---

<div style="page-break-after: always;"></div>

## 1. Présentation du projet

### 1.1. Contexte et objectifs

**Huma** est une application web de suivi du bien-être destinée aux organisations (entreprises et établissements scolaires). L'objectif est de favoriser l'expression des collaborateurs tout en permettant aux responsables de suivre anonymement le ressenti collectif.

**Problématique adressée :**
- Difficulté à mesurer le bien-être réel des équipes
- Manque d'espaces d'expression confidentiels
- Détection tardive des problématiques collectives

**MVP développé en 3 semaines :**
1. **Check-in quotidien** : "Météo du jour" sur échelle 0-100 avec facteurs d'influence
2. **Feedback constructif** : Espace de remarques avec propositions de solutions obligatoires
3. **Dashboard anonymisé** : Visualisation des tendances collectives pour les managers

**Contraintes du projet :**
- Équipe pluridisciplinaire : 6 personnes (1 backend, 1 frontend, 2 directeurs artistiques, 1 UX-UI, 1 marketing)
- Délai serré : 3 semaines
- Première collaboration en équipe aussi large et diversifiée

### 1.2. Méthodologie Agile adaptée

**Approche Scrum simplifiée :**
- Sprints de 3-4 jours (au lieu de 2 semaines)
- Daily stand-ups bi-quotidiens (matin/soir via Discord)
- Backlog géré via GitHub Issues
- Livraisons incrémentales à chaque jalon

**Approche API First :**
- Définition du contrat API en amont via Postman
- Développement parallèle backend/frontend grâce aux mocks
- Tests d'intégration progressifs

**3 jalons clés :**
- **Semaine 1** : Socle technique (auth + architecture + maquettes)
- **Semaine 2** : MVP fonctionnel (3 flux principaux)
- **Semaine 3** : Finalisation (polish UI + sécurité + déploiement)

### 1.3. Stack technique et outils

**Frontend :**
- React 18 + Vite
- React Router, Chart.js
- Design Glassmorphism

**Backend :**
- Node.js + Express
- PostgreSQL
- JWT Authentication

**Outils de collaboration :**
- **Git/GitHub** : Versioning et code review
- **Discord** : Communication quotidienne et pair programming
- **Postman** : Documentation API
- **Figma** : Maquettes et design system (UX-UI)
- **Render.com** : Hébergement backend avec CI/CD

---

<div style="page-break-after: always;"></div>

## 2. Analyse de l'équipe et méthodes

### 2.1. Composition de l'équipe (6 personnes)

**Développeur Backend :**
- Architecture API REST (services/controllers/repositories)
- Base de données PostgreSQL
- Sécurité et authentification JWT
- Déploiement sur Render.com

**Développeur Frontend (moi-même) :**
- Architecture React et routing
- Intégration API et gestion d'état
- Services métier (mapping données FR/EN)
- Responsive design et animations

**Designer UX-UI :**
- Recherche utilisateur et personas
- Maquettes Figma (wireframes + mockups haute fidélité)
- Design system et charte graphique
- Tests utilisateurs sur prototypes

**Directeur Artistique 1 (Identité visuelle) :**
- Charte graphique et identité de marque
- Logo, couleurs, typographies
- Cohérence visuelle globale
- Direction artistique du projet

**Directeur Artistique 2 (Contenu visuel) :**
- Création des assets graphiques (icônes, illustrations)
- Animations et micro-interactions
- Identité visuelle des émotions (météo, mood cards)
- Banque d'images et médias

**Responsable Marketing :**
- Positionnement produit et proposition de valeur
- Étude de marché et concurrence
- Rédaction des contenus (landing page, onboarding)
- Stratégie de lancement et communication

**Responsabilités partagées :**
- Définition du contrat API (Backend + Frontend)
- Validation des maquettes (Frontend + UX-UI + DA)
- Cohérence de la communication (Marketing + DA + UX-UI)
- Tests d'intégration bout-en-bout (Backend + Frontend)
- Documentation technique (Chacun sa partie)

### 2.2. Modes de collaboration

#### Collaboration Backend ↔ Frontend

**Points quotidiens Discord (2x/jour) :**
- Matin 10h : Objectifs du jour + blocages
- Soir 18h : Avancement + synchronisation lendemain

**Sessions pair programming (2-3x/semaine, 1-2h) :**
- Debugging complexe nécessitant les 2 compétences
- Tests d'intégration API
- Résolution de bugs critiques (ex: mapping des causes)

**Communication asynchrone :**
- Discord chat : questions rapides, screenshots d'erreurs
- GitHub Issues : bugs et propositions techniques
- WhatsApp : urgences et changements de planning

**Efficacité constatée : 8/10**
- ✅ Réactivité élevée (réponse < 30 min)
- ✅ Entraide spontanée
- ❌ Documentation partagée insuffisante

#### Collaboration Frontend ↔ UX-UI ↔ Direction Artistique

**Processus de conception :**

1. **Phase de recherche (Semaine 1, jours 1-2) :**
   - **Marketing** : Études de marché, positionnement, personas cibles
   - **UX-UI** : Interviews utilisateurs, parcours utilisateur, user stories
   - **DA1** : Benchmarks visuels, moodboards, tendances design
   - **Frontend** : Veille technique, prototypes composants React
   - **Sync point** : Validation collective de la vision produit et identité

2. **Phase de création identité (Semaine 1, jours 2-3) :**
   - **DA1** : Création charte graphique (logo, couleurs, typos)
   - **DA2** : Création des assets émotionnels (icônes mood, illustrations météo)
   - **Marketing** : Validation positionnement et messages clés
   - **Collaboration** : 2 itérations sur l'identité visuelle avant validation

3. **Phase de maquettage (Semaine 1, jours 3-5) :**
   - **UX-UI** : Wireframes sur Figma → Validation → Mockups haute fidélité
   - **DA1 + DA2** : Validation cohérence avec charte, enrichissement visuel
   - **Frontend** : Développement composants de base (Card, Modal, Charts)
   - **Marketing** : Validation des contenus et wording
   - **Collaboration** : Itérations sur wireframes (3 versions pour onboarding)

4. **Phase d'implémentation (Semaines 2-3) :**
   - **UX-UI** : Livraison progressive des écrans finaux
   - **DA2** : Livraison assets (icônes, images, animations)
   - **Frontend** : Intégration pixel-perfect des maquettes
   - **Marketing** : Rédaction contenus finaux (tooltips, messages d'erreur)
   - **Rituels** : Points hebdomadaires (lundi) pour validation conformité design

**Outils de collaboration :**
- **Figma** : Maquettes, design system, mode "Inspect" pour CSS
- **Discord** : Communication quotidienne, démonstrations
- **Google Drive** : Partage assets, documents marketing
- **Notion** : Brief créatif, charte éditoriale, guidelines

**Exemples de collaboration réussie :**

**Exemple 1 : Design System collaboratif**
- **Contexte** : Risque d'incohérence visuelle avec 6 personnes
- **Solution collaborative** :
  1. **DA1** : Définit charte graphique (couleurs, typos, principes)
  2. **UX-UI** : Traduit en composants Figma réutilisables
  3. **Frontend** : Implémente en variables CSS et composants React
  4. **DA2** : Crée assets conformes au design system
- **Résultat** : UI cohérente, modifications rapides, workflow fluide

**Exemple 2 : Animation MoodRevealCard**
- **Contexte** : Card statique peu engageante selon tests utilisateurs
- **Collaboration** :
  1. **UX-UI** : Identifie problème d'engagement utilisateur
  2. **DA2** : Propose concept d'animation "révélation" progressive
  3. **UX-UI** : Prototype interactif sur Figma
  4. **Frontend** : Implémentation en CSS (transition, transform)
  5. **DA2** : Validation et ajustement timing (0.3s → 0.5s)
- **Résultat** : Animation fluide validée par tests utilisateurs

**Exemple 3 : Wording et tonalité**
- **Contexte** : Besoin de tonalité chaleureuse mais professionnelle
- **Collaboration** :
  1. **Marketing** : Définit ton of voice et principes rédactionnels
  2. **UX-UI** : Rédige micro-copies initiales dans maquettes
  3. **Marketing** : Révise et améliore (ex: "Météo du jour" au lieu de "Check-in")
  4. **Frontend** : Intègre contenus finaux
- **Résultat** : Expérience cohérente et engageante

**Points de friction identifiés :**

**Friction 1 : Coordination des livrables**
- **Problème** : DA2 a livré certains assets (icônes mood) après début d'intégration
- **Conséquence** : Utilisation d'assets temporaires, remplacement tardif
- **Résolution** : Priorisation explicite des assets critiques pour futures itérations

**Friction 2 : Multiplicité des avis**
- **Problème** : 6 personnes = 6 avis différents sur certaines décisions visuelles
- **Conséquence** : Rallongement du processus de validation (ex: logo validé après 5 versions)
- **Résolution** : Désignation d'un "décideur final" (DA1) pour arbitrer

**Friction 3 : Faisabilité technique non validée en amont**
- **Problème** : Maquette dashboard avec graphiques complexes difficile à implémenter
- **Résolution** : Discussion Frontend + UX-UI + DA et simplification (version MVP)
- **Apprentissage** : Validation faisabilité technique AVANT finalisation maquettes

### 2.3. Bilan de la dynamique d'équipe

**Points forts :**
- ✅ Complémentarité des compétences (backend/frontend/UX-UI/DA/marketing)
- ✅ Communication fluide et respectueuse (pas de conflits dans une équipe de 6)
- ✅ Entraide spontanée en cas de blocage
- ✅ Vision commune du produit final malgré profils différents
- ✅ Richesse créative grâce à la diversité des expertises

**Points d'amélioration :**
- ❌ Coordination complexe avec 6 personnes (multiplicité des avis)
- ❌ Planification des dépendances perfectible (DA2 → Frontend, UX-UI → Frontend)
- ❌ Rituels Agile pas assez formalisés (pas de rétrospectives collectives)
- ❌ Documentation technique tardive
- ❌ Processus de décision parfois rallongé (besoin d'arbitre)

**Gestion de la communication à 6 :**
- **Discord** : Canaux thématiques (dev, design, marketing) pour éviter bruit
- **Points d'équipe** : 1x/semaine tous ensemble (lundi matin, 30 min)
- **Points binômes** : Quotidiens selon besoins (Backend-Frontend, UX-UI-DA)
- **Documentation** : Notion centralisé pour décisions et livrables

**Satisfaction globale : 8/10**
- Objectifs atteints dans les délais
- Qualité du produit au-delà des attentes initiales
- Apprentissages riches pour chacun
- Gestion de la complexité d'une équipe à 6 réussie

---

<div style="page-break-after: always;"></div>

## 3. Dysfonctionnements détectés

### 3.1. Synchronisation backend/frontend retardée

**Problème :**
Décalage systématique entre disponibilité des endpoints backend et besoin frontend (attente 12-24h).

**Manifestations :**
- Page onboarding terminée lundi, endpoint disponible mercredi
- Formulaire feedback prêt jeudi, endpoint livré vendredi
- Tests d'intégration repoussés de 2 jours

**Causes :**
- Priorisation non alignée (backend développe endpoints dans ordre différent de frontend)
- Absence de planning partagé détaillé
- Sous-estimation des délais backend

**Impact : 1,5 jour perdu (~7% du temps)**

### 3.2. Coordination UX-UI / DA / Développement insuffisante

**Problème :**
Maquettes et assets livrés après début d'implémentation, nécessitant refactoring visuel.

**Manifestations :**
- Page "Moi" implémentée 2 fois (maquette initiale puis maquette finale après validation DA)
- Dashboard manager simplifié faute de validation faisabilité en amont
- Certains assets (icônes mood, illustrations) livrés tardivement par DA2
- Logo validé après 5 itérations (multiplicité des avis avec 6 personnes)

**Causes :**
- Processus de validation des wireframes trop long (passage par UX-UI → DA1 → DA2 → Marketing)
- DA et Marketing non impliqués dans estimations de faisabilité technique
- Pas de visibilité mutuelle sur les priorités et délais
- Absence de "décideur final" clairement désigné pour arbitrer

**Impact : 1 jour perdu (~5% du temps) + frustration + rallongement décisions**

### 3.3. Gestion Git chaotique

**Problème :**
Erreurs de manipulation Git causant perte de temps et stress.

**Incident majeur :**
- Développement de 5 services sur branche `main` au lieu de `develop`
- Utilisation de `git clean -fd` supprimant fichiers non trackés
- **Perte de 400+ lignes de code, récupération manuelle 3h**

**Autres incidents :**
- 2 commits sur mauvaise branche
- 3 conflits de merge complexes

**Causes :**
- Manque d'expérience Git collaboratif
- Pas de checklist "avant commit"
- Branche `main` non protégée sur GitHub

**Impact : 0,5 jour perdu (~2,5% du temps) + stress élevé**

### 3.4. Absence de tests automatisés

**Problème :**
Projet livré sans tests unitaires ni tests d'intégration automatisés.

**Conséquences :**
- 3 bugs détectés tardivement (existaient depuis semaine 2)
- 6h cumulées de tests manuels répétitifs
- Régression lors de refactoring (bug mapping détecté 2 jours après)
- Incertitude sur robustesse globale

**Causes :**
- Manque de compétences en testing (Jest, Vitest, React Testing Library)
- Tests perçus comme "optionnels" face au délai
- Arbitrage conscient : prioriser fonctionnalités plutôt que tests

**Impact : Qualité/maintenabilité dégradée, dette technique importante**

**Décision justifiée à court terme mais non souhaitable sur projet professionnel.**

### Synthèse

| Dysfonctionnement | Gravité | Temps perdu | Cause principale |
|-------------------|---------|-------------|------------------|
| Synchro backend/frontend | Moyenne | 1,5 jour | Planification |
| Coordination UX-UI/Dev | Moyenne | 1 jour | Processus |
| Gestion Git | Élevée | 0,5 jour | Compétences |
| Tests absents | Critique | - | Culture/Formation |
| **TOTAL** | - | **3 jours** | **~15% du temps** |

**Constat : 15% du temps perdu par dysfonctionnements évitables avec plus d'expérience et de rigueur.**

---

<div style="page-break-after: always;"></div>

## 4. Actions correctives proposées

### 4.1. Kanban partagé avec dépendances (Backend ↔ Frontend)

**Objectif :** Éliminer les décalages de synchronisation backend/frontend.

**Solution :**
Mise en place d'un board Kanban partagé (GitHub Projects ou Trello) avec :

**Colonnes :**
- Backlog → À faire → En cours → Bloqué → Review → Terminé

**Cartes :**
- 🟦 Backend (endpoints API)
- 🟩 Frontend (interfaces UI)
- 🟨 Commun (tests, doc)
- 🟥 UX-UI (maquettes, assets)

**Champs par carte :**
- Responsable
- Deadline souhaitée
- Dépendances (ex: "Frontend Onboarding → Backend POST /users/me/info")
- Statut

**Rituels :**
- Review du board au daily (5 min)
- Mise à jour en temps réel des statuts
- Planning hebdomadaire le lundi

**Bénéfices attendus :**
- ✅ Visibilité claire des priorités pour chacun
- ✅ Anticipation des blocages (carte "En attente de" visible)
- ✅ Possibilité de réprioriser si dépendance critique tarde
- ✅ Réduction de 80% du temps perdu (1,5j → 0,3j)

### 4.2. Design System et validation de faisabilité (UX-UI ↔ DA ↔ Dev)

**Objectif :** Synchroniser design et développement, éviter refactoring visuel, gérer efficacement une équipe créative de 4 personnes (UX-UI + 2 DA + Marketing).

**Action 4.2.1 : Design System formalisé et gouvernance**

**Création collaborative (DA1 + UX-UI + Frontend) :**
1. **DA1** : Définit charte graphique (couleurs, typos, principes visuels)
2. **UX-UI** : Traduit en design system Figma complet
   - Composants réutilisables (buttons, cards, modals, inputs)
   - Règles responsive (breakpoints)
3. **Frontend** : Implémente en code dès semaine 1
   - Variables CSS (`:root`)
   - Composants React de base
4. **DA2** : Crée assets conformes au design system

**Gouvernance du Design System :**
- **Owner** : DA1 (décideur final sur cohérence visuelle)
- **Contributors** : UX-UI (ergonomie), Frontend (faisabilité), DA2 (assets)
- **Process** : Toute modification du DS doit être validée par Owner

**Bénéfices :**
- ✅ Cohérence visuelle garantie malgré 4 profils créatifs
- ✅ Décisions plus rapides (1 décideur final)
- ✅ Développement plus rapide (composants prêts)

**Action 4.2.2 : Validation de faisabilité en amont (équipe élargie)**

**Processus proposé :**

1. **Wireframes (Semaine 1, J1-2) :**
   - **UX-UI** : Crée wireframes basse fidélité
   - **Marketing** : Valide parcours utilisateur et messages
   - **Validation technique** (Frontend + Backend) :
     - Faisabilité animations et interactions
     - Données disponibles dans l'API
     - Complexité vs valeur
   - **Output** : Wireframes validés par tous (go/no-go technique)

2. **Identité visuelle (Semaine 1, J2-3) :**
   - **DA1** : Propose 2-3 directions artistiques
   - **Validation collective** : Choix d'une direction (vote si désaccord)
   - **DA2** : Commence création assets selon direction choisie

3. **Mockups haute fidélité (Semaine 1, J3-5) :**
   - **UX-UI + DA1** : Produisent uniquement après validation wireframes
   - **Marketing** : Révise wording et micro-copies
   - **Frontend** : Feedback sur contraste, accessibilité

4. **Priorisation des assets (Semaine 1, J5) :**
   - **Kanban partagé** : DA2 marque dépendances (ex: "Icônes mood" bloque "Check-in UI")
   - **Livraison progressive** : Assets critiques en priorité

5. **Implémentation (Semaines 2-3) :**
   - Points hebdomadaires (équipe complète) pour validation conformité

**Règle d'or :** Aucun développement frontend avant validation wireframes par technique + créatif

**Bénéfices :**
- ✅ Évite refactoring visuel (économie 1 jour)
- ✅ Designs réalistes et implémentables
- ✅ Assets livrés au bon moment
- ✅ Moins de frustration et d'itérations inutiles

**Action 4.2.3 : Timeline créative synchronisée avec dev**

**Board Kanban étendu incluant toute l'équipe créative :**
- 🟥 Marketing (contenus, wording)
- 🟧 DA1 (charte, validation)
- 🟨 DA2 (assets, illustrations)
- 🟪 UX-UI (maquettes, prototypes)
- 🟩 Frontend (implémentation UI)
- 🟦 Backend (API)

**Dépendances explicites :**
- Marketing "Wording onboarding" → UX-UI "Maquette onboarding"
- DA1 "Charte graphique" → UX-UI "Design system Figma"
- DA2 "Icônes mood" → Frontend "Check-in UI"
- UX-UI "Maquette Dashboard" → Frontend "Dev Dashboard"

**Indicateurs de succès :**
- Zéro refactoring visuel majeur
- 100% des assets livrés avant implémentation
- Décisions créatives < 2 jours (vs 5 jours pour le logo)

### 4.3. Formation Git et protections techniques

**Objectif :** Éliminer erreurs Git et pertes de code.

**Action 4.3.1 : Formation Git approfondie**

**Programme 2 jours :**
- Jour 1 : Fondamentaux (branches, merge, résolution conflits, `status`, `diff`, `log`)
- Jour 2 : Avancé (`stash`, `reset`, `reflog`, `cherry-pick`, `rebase`)

**Ressources :**
- Pro Git Book (gratuit)
- Learn Git Branching (interactif)
- Mentoring par développeur senior

**Action 4.3.2 : Checklist "Avant commit"**

```
☐ 1. Vérifier branche active : git branch
☐ 2. Voir fichiers modifiés : git status
☐ 3. Revoir changements : git diff
☐ 4. Tester le code
☐ 5. Ajouter précisément : git add <fichiers>
☐ 6. Message clair : [type] description
☐ 7. Pull avant push : git pull
☐ 8. Push : git push origin <branche>
```

**Action 4.3.3 : Protections techniques**

**GitHub :**
- Protection branche `main` : interdiction push direct, force Pull Requests
- Code review obligatoire avant merge (même en binôme)

**Git hooks :**
```bash
# .git/hooks/pre-commit
branch=$(git symbolic-ref --short HEAD)
if [ "$branch" = "main" ]; then
  echo "❌ Commit sur main interdit ! Utilise develop."
  exit 1
fi
```

**Bénéfices attendus :**
- ✅ Zéro erreur Git majeure
- ✅ Confiance accrue dans Git
- ✅ Compétence professionnelle transférable

### 4.4. Intégration des tests dès le début

**Objectif :** Garantir qualité et non-régression.

**Action 4.4.1 : Setup tests dès Semaine 1**

**Frontend :**
- Vitest + @testing-library/react
- Tests unitaires sur services (apiClient, authService, etc.)
- Tests composants sur composants réutilisables (Card, Modal, etc.)

**Backend :**
- Jest + Supertest
- Tests unitaires sur services et repositories
- Tests d'intégration sur routes API

**Action 4.4.2 : Definition of Done incluant tests**

```
Fonctionnalité DONE si :
☐ Code fonctionnel
☐ Tests unitaires écrits et passent
☐ Tests d'intégration (si pertinent)
☐ Documenté
☐ Code review passée
```

**Action 4.4.3 : CI/CD avec tests automatisés**

**GitHub Actions :**
```yaml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
      - run: npm run build
```

**Bénéfices :**
- ✅ Détection bugs immédiate
- ✅ Confiance dans le code
- ✅ Refactoring sans peur de casser
- ✅ Documentation vivante (tests comme exemples)

**Coût : +20% temps initial, économisé sur debugging et maintenance**

---

<div style="page-break-after: always;"></div>

## 5. Plan d'amélioration

### 5.1. Compétences à développer (Hard Skills)

**Pour le Frontend (moi-même) :**

1. **Testing automatisé** (Priorité 1)
   - Vitest / Jest : tests unitaires
   - React Testing Library : tests composants
   - Cypress : tests end-to-end
   - **Action** : Formation 3 jours + pratique sur projet personnel

2. **Git avancé** (Priorité 2)
   - Rebase interactif, cherry-pick, reflog
   - Stratégies de merge complexes
   - **Action** : Formation 2 jours + coaching

3. **Performance et optimisation** (Priorité 3)
   - Code splitting, lazy loading
   - Mémoïsation (useMemo, useCallback)
   - Web Vitals
   - **Action** : Veille + refactoring progressif

**Pour l'équipe globale :**

1. **CI/CD et DevOps**
   - GitHub Actions
   - Docker pour environnements cohérents
   - Monitoring et logging
   - **Action** : Workshop collectif 1 jour

2. **Architecture et patterns**
   - Clean Architecture
   - Design patterns (Repository, Factory, Observer)
   - **Action** : Lecture "Clean Code" + code reviews

### 5.2. Soft Skills à renforcer

**Communication :**
- ✅ Déjà efficace mais formaliser davantage (CR de réunion)
- Oser demander clarifications plus tôt
- Feedback constructif régulier

**Organisation :**
- Mieux anticiper les dépendances
- Estimer temps de manière plus réaliste
- Tenir planning à jour

**Travail d'équipe :**
- Rétrospectives formelles hebdomadaires
- Célébrer les victoires (motivation)
- Partager apprentissages (veille tech)

### 5.3. Recommandations pour projets futurs

**Phase de démarrage (Semaine 0-1) :**
- ✅ Design System défini et implémenté AVANT développement
- ✅ Contrat API documenté et validé par tous
- ✅ Setup tests dès jour 1 (pas "plus tard")
- ✅ Kanban board configuré avec dépendances
- ✅ Git hooks et protections de branches en place

**Rituels Agile formalisés :**
- Daily stand-up (10 min, pas plus)
- Planning de sprint (lundi matin)
- Rétrospective de sprint (vendredi soir)
- Demo interne (chaque fin de sprint)

**Code quality gates :**
- Pull Requests obligatoires (même en petite équipe)
- Code review systématique
- Tests automatisés passent avant merge
- Coverage minimum (ex: 70%)

**Documentation continue :**
- README à jour avec setup instructions
- API documentée avec Swagger/OpenAPI
- Décisions architecturales notées (ADR)
- Changelog maintenu

**Communication structurée :**
- Compte-rendu écrit des décisions importantes
- Timeline partagée et visible
- Validation faisabilité UX-UI/Dev en amont

---

<div style="page-break-after: always;"></div>

## Conclusion

### Bilan du projet Huma

Le projet Huma a été un **succès global** malgré les dysfonctionnements identifiés :
- ✅ MVP livré dans les délais (3 semaines)
- ✅ Qualité UI/UX au-delà des attentes
- ✅ Architecture technique solide (malgré absence de tests)
- ✅ Collaboration efficace dans l'ensemble

**Taux de réalisation : 80%**
- Fonctionnalités principales : 100%
- Dashboard manager : version simplifiée
- Tests automatisés : 0% (dette technique)

### Apprentissages clés

**Sur la gestion de projet :**
1. **L'Agile fonctionne en petite équipe** mais nécessite rigueur (rituels formels, rétrospectives)
2. **La planification des dépendances est critique** : un Kanban partagé aurait économisé 15% du temps
3. **La documentation est un investissement**, pas une contrainte

**Sur la collaboration :**
1. **La complémentarité des rôles** (Backend/Frontend/UX-UI/DA/Marketing) est une force si bien coordonnée
2. **Gérer une équipe de 6 personnes** nécessite rituels formels et décideurs clairement identifiés
3. **La communication fréquente** ne suffit pas sans visibilité partagée (Kanban essentiel)
4. **La validation de faisabilité en amont** (Designer + DA + Dev) évite refactoring coûteux
5. **La multiplicité des expertises créatives** enrichit le produit mais rallonge les décisions sans gouvernance claire

**Sur la technique :**
1. **Les tests ne sont pas optionnels** : économie à court terme, dette à long terme
2. **Git requiert formation approfondie** : outil puissant mais dangereux sans maîtrise
3. **L'architecture en couches** (services/controllers) paie rapidement en maintenabilité

### Transférabilité professionnelle

Les compétences développées sur ce projet sont **directement transférables** en entreprise :
- Méthodologie Agile (Scrum adapté)
- Collaboration pluridisciplinaire (Dev/UX-UI)
- Approche API First avec documentation
- Git en équipe
- Architecture frontend moderne (React, services)

Les dysfonctionnements identifiés et corrigés constituent des **apprentissages précieux** qui me permettront d'être plus efficace dès le premier jour en entreprise.

### Actions immédiates post-projet

**Court terme (1 mois) :**
- ✅ Implémenter tests automatisés sur Huma (Vitest configuré)
- Formation Git avancée (certification)
- Refactoring avec code review

**Moyen terme (3 mois) :**
- Projet personnel avec TDD (Test-Driven Development)
- Contribution open-source pour pratiquer PR et code review
- Approfondissement CI/CD

**Long terme (6 mois) :**
- Mentorat d'un junior sur bonnes pratiques
- Partage d'expérience (article blog technique)
- Certification professionnelle (ex: AWS, React Advanced)

---

**Signature :**  
Loris Jacob  
Candidat MBA Développeur Full Stack - Promotion 2026

---

**Annexes disponibles sur demande :**
- Collection Postman de l'API
- Maquettes Figma
- Code source (GitHub)
- Documentation technique complète
