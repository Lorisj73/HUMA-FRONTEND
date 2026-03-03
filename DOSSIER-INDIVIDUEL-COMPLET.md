# Dossier Écrit Individuel - Analyse de Gestion de Projet
## Projet Huma - Application de Suivi du Bien-être et Feedback

---

**Candidat :** Loris Jacob  
**Formation :** MBA Développeur Full Stack  
**Promotion :** 2026  
**Date de soutenance :** [À compléter]  
**Entreprise/Organisme :** [À compléter]

---

## Sommaire

1. [Présentation de la gestion de projet](#1-présentation-de-la-gestion-de-projet) ....................... 3
   1.1. Contexte et objectifs du projet ..................................................... 3
   1.2. Méthodologies de gestion utilisées ................................................ 4
   1.3. Outils de gestion et de collaboration .............................................. 5
   1.4. Justification des choix méthodologiques ........................................... 6

2. [Analyse du fonctionnement de l'équipe](#2-analyse-du-fonctionnement-de-léquipe) ........................ 8
   2.1. Composition et répartition des rôles .............................................. 8
   2.2. Modes de communication et outils .................................................. 9
   2.3. Processus de décision et validation .............................................. 10
   2.4. Rythmes de travail et jalons ..................................................... 11
   2.5. Interactions et collaboration .................................................... 12

3. [Critique et recul sur la gestion](#3-critique-et-recul-sur-la-gestion) ............................... 13
   3.1. Points forts de la gestion ....................................................... 13
   3.2. Axes d'amélioration identifiés ................................................... 14
   3.3. Évaluation des résultats face aux objectifs ...................................... 15
   3.4. Justification des décisions stratégiques ......................................... 16
   3.5. Analyse de la coordination globale ............................................... 17

4. [Détection des dysfonctionnements](#4-détection-des-dysfonctionnements) ................................. 18
   4.1. Dysfonctionnement n°1 : Synchronisation backend/frontend ......................... 18
   4.2. Dysfonctionnement n°2 : Gestion des branches Git ................................. 19
   4.3. Dysfonctionnement n°3 : Documentation API tardive ................................ 20
   4.4. Dysfonctionnement n°4 : Tests insuffisants ....................................... 21

5. [Propositions d'actions correctives](#5-propositions-dactions-correctives) ............................. 22
   5.1. Solution au dysfonctionnement n°1 ................................................ 22
   5.2. Solution au dysfonctionnement n°2 ................................................ 23
   5.3. Solution au dysfonctionnement n°3 ................................................ 24
   5.4. Solution au dysfonctionnement n°4 ................................................ 25

6. [Amélioration et formation de l'équipe](#6-amélioration-et-formation-de-léquipe) ....................... 26
   6.1. Compétences techniques manquantes (Hard Skills) .................................. 26
   6.2. Compétences comportementales manquantes (Soft Skills) ............................ 27
   6.3. Actions de formation proposées ................................................... 28
   6.4. Impact attendu sur les projets futurs ............................................ 29

[Conclusion](#conclusion) ......................................................................... 30

---

<div style="page-break-after: always;"></div>

## 1. Présentation de la gestion de projet

### 1.1. Contexte et objectifs du projet

#### Présentation du projet Huma

Le projet Huma est une application web de suivi du bien-être et de feedback destinée aux organisations (entreprises et établissements scolaires). L'objectif principal est de **favoriser l'expression des collaborateurs et étudiants** tout en permettant aux responsables de **suivre anonymement le ressenti collectif** pour détecter des tendances et prendre des actions préventives.

#### Problématique adressée

Dans le contexte actuel, les organisations font face à plusieurs défis :
- Difficulté à mesurer le bien-être réel des collaborateurs/étudiants
- Manque d'espaces d'expression confidentiels et anonymes
- Détection tardive des problématiques individuelles et collectives
- Absence d'outils de feedback constructif

#### Objectifs du MVP

Le MVP (Minimum Viable Product) devait répondre à trois besoins fondamentaux :

1. **Suivi d'humeur quotidien** : Check-in rapide appelé "météo du jour" permettant aux utilisateurs d'exprimer leur ressenti sur une échelle visuelle (0-100) et d'identifier les facteurs d'influence.

2. **Boîte à feedback constructive** : Espace permettant de soumettre des remarques accompagnées obligatoirement d'une proposition de solution, favorisant ainsi une approche constructive plutôt que la critique stérile.

3. **Dashboard anonymisé** : Visualisation des tendances collectives (jamais individuelles) destinée aux responsables pour identifier les signaux faibles et prendre des décisions éclairées.

#### Contraintes du projet

Le projet s'est déroulé avec plusieurs contraintes :
- **Équipe réduite** : 2 développeurs (1 backend, 1 frontend)
- **Délai serré** : Développement du MVP en 3 semaines
- **Développement parallèle** : Backend et frontend développés simultanément
- **Première collaboration** : Première expérience de travail en binôme sur un projet d'envergure

### 1.2. Méthodologies de gestion utilisées

#### Approche Agile adaptée

Face à la taille réduite de l'équipe et au délai contraint, nous avons opté pour une **approche Agile simplifiée** inspirée de Scrum mais allégée pour correspondre à notre contexte de binôme.

**Principes Agiles appliqués :**
- **Développement itératif** : Découpage du projet en fonctionnalités livrables progressivement
- **Adaptabilité** : Capacité à ajuster les priorités en fonction des retours et contraintes
- **Communication continue** : Points réguliers pour synchroniser les avancées
- **Livraison incrémentale** : Versions fonctionnelles à chaque jalon

**Adaptations pour notre contexte :**
- Pas de Product Owner externe : décisions prises en duo
- Sprints informels de 3-4 jours au lieu de 2 semaines classiques
- Daily stand-ups remplacés par des points bi-quotidiens (matin/fin d'après-midi)
- Backlog simplifié géré via issues GitHub

#### Méthodologie DevOps

En parallèle de l'approche Agile, nous avons intégré des pratiques **DevOps** pour faciliter l'intégration continue et le déploiement :

- **Version control** : Utilisation de Git avec stratégie de branches
- **Déploiement continu** : Backend déployé sur Render.com avec CI/CD automatique
- **Documentation as Code** : Documentation technique versionnée avec le code
- **Infrastructure as Code** : Configuration déploiement via fichiers de config

#### Méthodologie API First

Pour la coordination backend/frontend, nous avons adopté une approche **API First** :

1. **Définition du contrat API** en amont via Postman
2. **Documentation Postman** comme référence partagée
3. **Mock des données** côté frontend pendant le développement backend
4. **Intégration progressive** au fur et à mesure de la disponibilité des endpoints

Cette approche a permis un **développement parallèle efficace** malgré les dépendances entre les deux parties.

<div style="page-break-after: always;"></div>

### 1.3. Outils de gestion et de collaboration

#### Gestion de code et versioning

**Git + GitHub**
- **Usage** : Gestion du code source, versioning, revue de code
- **Avantages** :
  - Historique complet des modifications
  - Système de branches pour isoler les développements
  - Pull Requests pour validation croisée
  - Issues pour tracker les bugs et tâches
- **Limites** :
  - Courbe d'apprentissage sur les conflits de merge
  - Gestion des branches parfois complexe pour débutants

**Stratégie de branches adoptée :**
- `main` : branche de production stable
- `develop` : branche de développement active
- Branches feature pour développements isolés (utilisées ponctuellement)

#### Communication et collaboration

**Discord**
- **Usage** : Communication quotidienne, partage d'écran, pair programming
- **Avantages** :
  - Communication en temps réel (vocal + écrit)
  - Partage d'écran pour debugging collaboratif
  - Historique des conversations
  - Canaux thématiques (technique, organisation)
- **Limites** :
  - Pas de gestion de tâches intégrée
  - Historique difficile à retrouver sur longue période

**WhatsApp**
- **Usage** : Communication rapide et notifications urgentes
- **Avantages** :
  - Notifications push fiables
  - Rapidité de réponse
  - Disponibilité mobile
- **Limites** :
  - Mélange vie pro/perso
  - Pas adapté aux discussions techniques longues

#### Documentation technique

**Postman**
- **Usage** : Documentation de l'API, tests des endpoints
- **Avantages** :
  - Documentation interactive et testable
  - Collection partageable entre développeurs
  - Exemples de requêtes/réponses
  - Variables d'environnement (dev, prod)
- **Limites** :
  - Nécessite synchronisation manuelle
  - Version gratuite limitée pour collaboration

**Markdown + Git**
- **Usage** : Documentation du code, README, guides
- **Avantages** :
  - Versionné avec le code
  - Format universel et lisible
  - Facilement éditable
- **Limites** :
  - Nécessite discipline pour maintenir à jour

#### Outils de développement

**Visual Studio Code**
- **Usage** : Éditeur de code principal
- **Extensions utilisées** :
  - ESLint : Qualité du code JavaScript
  - Prettier : Formatage automatique
  - GitLens : Visualisation Git
  - Thunder Client : Tests API alternatif à Postman
- **Avantages** : Écosystème riche, gratuit, performant

**Chrome DevTools**
- **Usage** : Debugging frontend, inspection réseau
- **Avantages** : Intégré au navigateur, complet, logs réseau détaillés

#### Déploiement et hosting

**Render.com**
- **Usage** : Hébergement du backend et base de données PostgreSQL
- **Avantages** :
  - Déploiement automatique depuis Git
  - HTTPS gratuit
  - Logs accessibles
  - Base de données PostgreSQL incluse
- **Limites** :
  - Version gratuite avec cold start (temps de réveil)
  - Ressources limitées

**Vite Dev Server**
- **Usage** : Serveur de développement frontend local
- **Avantages** : Hot reload ultra-rapide, build optimisé

<div style="page-break-after: always;"></div>

### 1.4. Justification des choix méthodologiques

#### Pourquoi l'Agile simplifié ?

**Avantages dans notre contexte :**

1. **Flexibilité nécessaire** : Le projet étant exploratoire (premier projet d'envergure), nous ne pouvions pas figer toutes les spécifications en amont. L'Agile nous a permis d'ajuster au fur et à mesure.

2. **Feedback rapide** : Les itérations courtes (3-4 jours) nous ont permis de valider rapidement que nous étions sur la bonne voie et d'éviter de perdre du temps sur des fonctionnalités non pertinentes.

3. **Adaptabilité technique** : Des découvertes techniques (ex: format de données de l'API) ont nécessité des ajustements. L'Agile a facilité ces pivots.

4. **Motivation de l'équipe** : Des jalons courts avec des victoires régulières ont maintenu la motivation et le sentiment de progression.

**Limites identifiées :**

1. **Manque de Product Owner** : Sans client ou PO externe, difficile d'avoir un arbitrage clair sur les priorités. Nous avons dû jouer ce rôle nous-mêmes, ce qui a parfois ralenti les décisions.

2. **Documentation insuffisante** : La focalisation sur le code au détriment de la documentation technique initiale a généré de la dette technique.

3. **Pas de rétrospectives formelles** : Nous aurions dû formaliser des rétrospectives à chaque jalon pour capitaliser sur les apprentissages.

#### Pourquoi l'approche API First ?

**Avantages constatés :**

1. **Développement parallèle efficace** : Grâce à la documentation Postman définie en amont, j'ai pu développer le frontend avec des données mockées pendant que le backend était développé. Cela a évité les temps d'attente.

2. **Contrat clair** : La définition des endpoints, formats de requête/réponse et codes d'erreur en amont a évité de nombreux malentendus et allers-retours.

3. **Tests facilités** : La collection Postman a servi d'outil de test pour valider que le backend respectait le contrat défini.

**Limites rencontrées :**

1. **Documentation pas toujours synchrone** : Certains changements dans l'API n'ont pas été immédiatement documentés dans Postman, créant des écarts entre documentation et réalité.

2. **Évolution du contrat** : Quelques ajustements du contrat API en cours de route ont nécessité des modifications côté frontend (ex: noms de champs, formats de dates).

#### Pourquoi Git + GitHub ?

**Avantages :**

1. **Standard du marché** : Compétence transférable et attendue dans le monde professionnel.

2. **Historique complet** : Possibilité de revenir en arrière en cas de problème (nous avons utilisé `git reset` lors d'une erreur de branche).

3. **Collaboration asynchrone** : Chacun peut travailler sur sa partie et synchroniser via pull/push.

**Limites :**

1. **Complexité Git** : Plusieurs erreurs de manipulation (commit sur mauvaise branche, conflits de merge) ont ralenti le développement et nécessité un apprentissage.

2. **Pas de code review systématique** : Par manque de temps, nous n'avons pas fait de revues de code systématiques, ce qui aurait pu améliorer la qualité.

#### Choix des outils : synthèse comparative

| Critère | Git/GitHub | Discord | Postman | Render.com |
|---------|------------|---------|---------|------------|
| **Facilité d'usage** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Coût** | Gratuit | Gratuit | Gratuit (limité) | Gratuit (limité) |
| **Collaboration** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Pérennité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Adéquation projet** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Conclusion méthodologique :**

L'ensemble des choix méthodologiques et outillage a globalement été **pertinent pour le contexte du projet** (binôme, 3 semaines, MVP). Les limites identifiées sont principalement dues au **manque d'expérience** et à la **contrainte de temps**, et non aux choix eux-mêmes. Sur un projet futur, nous conserverions cette base en ajoutant des pratiques plus rigoureuses (code review, tests automatisés, rétrospectives formelles).

<div style="page-break-after: always;"></div>

## 2. Analyse du fonctionnement de l'équipe

### 2.1. Composition et répartition des rôles

#### Structure de l'équipe

L'équipe projet était composée de **2 développeurs** avec une répartition des responsabilités selon les spécialités :

**Développeur Backend** : [Nom du binôme]
- **Responsabilités** :
  - Architecture et développement de l'API REST (Node.js, Express.js)
  - Gestion de la base de données PostgreSQL
  - Implémentation de l'authentification JWT
  - Sécurisation des endpoints et gestion des erreurs
  - Déploiement sur Render.com
  - Documentation Postman de l'API

**Développeur Frontend** : Loris Jacob (moi-même)
- **Responsabilités** :
  - Architecture de l'application React
  - Développement de l'interface utilisateur (5 pages, 10 composants)
  - Intégration de l'API backend (5 services, 20+ endpoints)
  - Gestion de l'authentification côté client
  - Optimisation de l'expérience utilisateur
  - Documentation technique frontend

#### Partage des responsabilités transversales

Certaines responsabilités ont été **partagées** :

1. **Définition du contrat API** : Collaboration étroite pour définir les endpoints, formats de données, codes d'erreur. Discussions via Discord avec partage d'écran Postman.

2. **Documentation technique** : Chacun documente sa partie mais relecture croisée pour cohérence globale.

3. **Tests et recettage** : Tests unitaires chacun de son côté, tests d'intégration en binôme pour valider les flux complets.

4. **Gestion Git** : Chacun gère ses branches, mais synchronisation régulière et aide mutuelle en cas de problème.

#### Répartition temporelle

**Phase 1 (Semaine 1) : Mise en place**
- Backend : Architecture + base de données + authentification (60% du temps)
- Frontend : Maquettage + composants réutilisables + pages statiques (60% du temps)
- Temps partagé : Définition API, setup Git/Render (40% du temps)

**Phase 2 (Semaine 2) : Développement cœur**
- Backend : Endpoints check-ins + feedbacks + users (80% du temps)
- Frontend : Intégration API + pages dynamiques (80% du temps)
- Temps partagé : Tests d'intégration, debugging (20% du temps)

**Phase 3 (Semaine 3) : Finalisation**
- Backend : Optimisations + sécurité + déploiement (70% du temps)
- Frontend : Polish UI + gestion d'erreurs + documentation (70% du temps)
- Temps partagé : Recettage final, documentation collective (30% du temps)

#### Autonomie et interdépendances

**Points d'autonomie** :
- Chacun était libre de ses choix d'implémentation dans sa partie (librairies, architecture interne, patterns)
- Gestion du temps et organisation personnelle

**Points d'interdépendance** :
- Format des données échangées (obligation de synchronisation)
- Timing de disponibilité des endpoints (frontend dépendant du backend)
- Tests d'intégration (nécessitent les 2 parties fonctionnelles)

**Gestion des interdépendances** :
- Communication proactive sur l'avancement
- Priorisation des endpoints critiques par le backend
- Mock des données côté frontend pour ne pas bloquer

### 2.2. Modes de communication et outils

#### Communication synchrone

**Discord - Calls quotidiens**
- **Fréquence** : 2 fois par jour (matin 10h, soir 18h)
- **Durée moyenne** : 15-20 minutes
- **Format** : Stand-up simplifié
  - Ce qui a été fait depuis le dernier point
  - Ce qui sera fait d'ici le prochain point
  - Blocages éventuels nécessitant aide
- **Avantages** : Synchronisation rapide, résolution immédiate des blocages
- **Limites** : Parfois interrompu par urgences personnelles

**Sessions de pair programming**
- **Fréquence** : 2-3 fois par semaine
- **Durée** : 1-2 heures
- **Utilisation** :
  - Résolution de bugs complexes nécessitant les 2 compétences
  - Intégration de nouvelles fonctionnalités critiques
  - Tests d'intégration frontend/backend
- **Outil** : Discord avec partage d'écran
- **Efficacité** : Très élevée pour débloquer rapidement des situations complexes

#### Communication asynchrone

**Discord - Chat textuel**
- **Usage** : Questions rapides, partage de liens, screenshots d'erreurs
- **Avantages** : Pas d'interruption du flux de travail, historique consultable
- **Limites** : Parfois manque de contexte, malentendus sur le ton

**WhatsApp**
- **Usage** : Notifications urgentes, changements de planning
- **Avantages** : Notifications push fiables, rapidité
- **Limites** : Mélange vie perso/pro, pas adapté aux discussions techniques

**GitHub Issues + Comments**
- **Usage** : Documentation des bugs, propositions de fonctionnalités, discussions techniques
- **Avantages** : Lié au code, historique complet, traçabilité
- **Limites** : Peu utilisé par manque de temps et d'habitude

#### Efficacité de la communication

**Points positifs** :
- ✅ Communication fluide et réactive (réponse moyenne < 30 min)
- ✅ Pas de conflits ou tensions dans les échanges
- ✅ Entraide spontanée en cas de blocage
- ✅ Transparence sur les difficultés rencontrées

**Points d'amélioration** :
- ❌ Manque de traçabilité écrite des décisions importantes
- ❌ Pas de compte-rendus formels des points quotidiens
- ❌ GitHub Issues sous-utilisé au profit de Discord

<div style="page-break-after: always;"></div>

### 2.3. Processus de décision et validation

#### Décisions architecturales

**Méthode de décision** :
1. **Proposition initiale** : Un des deux développeurs propose une solution technique
2. **Discussion argumentée** : Échange sur Discord avec explication des avantages/inconvénients
3. **Validation consensuelle** : Accord mutuel après discussion
4. **Documentation** : Note dans le README ou commentaire de code

**Exemples de décisions prises** :
- Choix de React pour le frontend (plutôt que Vue.js) → Ma proposition, validée par binôme
- Structure de l'API REST en services/controllers/repositories → Proposition binôme, validée
- Système de mapping FR/EN dans les services → Ma proposition suite à problématique rencontrée

**Temps moyen de décision** : 15-30 minutes de discussion

#### Décisions fonctionnelles

**Méthode** :
- Référence au cahier des charges initial (pitch projet)
- Arbitrage par rapport aux contraintes de temps
- Principe : MVP d'abord, améliorations ensuite

**Exemples** :
- Anonymat total des check-ins → Décision consensuelle prioritaire
- Commentaire optionnel sur les check-ins → Décision de simplification pour MVP
- Dashboard manager en version simplifiée → Arbitrage temps/valeur

#### Gestion des désaccords

**Rares désaccords rencontrés** :
1. **Format de dates dans l'API** (ISO 8601 vs timestamp)
   - **Résolution** : Recherche documentation best practices, choix ISO 8601 (standard)
   - **Apprentissage** : Importance de se référer aux standards du marché

2. **Nommage des endpoints** (camelCase vs snake_case)
   - **Résolution** : Consensus sur snake_case (convention REST)
   - **Apprentissage** : Importance de la cohérence avec conventions

**Principe appliqué** : En cas de désaccord, **recherche de référence externe** (documentation officielle, best practices) pour arbitrer objectivement.

#### Validation du code

**Absence de processus formel** :
- Pas de Pull Requests systématiques avec code review
- Validation "sur confiance" du code de l'autre
- Tests d'intégration en fin de sprint comme validation

**Conséquences** :
- ✅ Gain de temps à court terme
- ❌ Quelques bugs détectés tardivement
- ❌ Manque d'opportunités d'apprentissage mutuel

**Amélioration nécessaire** : Mise en place de PR avec revue de code même en binôme.

### 2.4. Rythmes de travail et jalons

#### Rythmes individuels

**Développeur Backend** :
- Travail principalement en soirée (18h-23h) + week-ends
- Disponibilité variables en journée selon emploi du temps
- Sprint long avec beaucoup de code d'un coup

**Développeur Frontend (moi-même)** :
- Travail régulier 10h-18h en semaine
- Disponibilité limitée le week-end
- Progression itérative régulière

**Impact de cette différence** :
- ✅ Couverture large des horaires (quasi 7j/7)
- ❌ Parfois attente pour synchronisation (ex: tester un endpoint le soir)
- ❌ Décalage de rythme nécessitant adaptation

#### Jalons du projet

**Jalon 1 (Fin Semaine 1)** : Socle technique
- ✅ Backend : Base de données + authentification fonctionnelle
- ✅ Frontend : Architecture React + composants de base + pages statiques
- ✅ Livrable : Connexion fonctionnelle avec token JWT

**Jalon 2 (Fin Semaine 2)** : MVP fonctionnel
- ✅ Backend : Endpoints check-ins + feedbacks + users
- ✅ Frontend : Intégration API + flux complets (onboarding, check-in, feedback)
- ✅ Livrable : Application utilisable bout-en-bout

**Jalon 3 (Fin Semaine 3)** : Finalisation
- ✅ Backend : Sécurisation + optimisations + déploiement stable
- ✅ Frontend : Polish UI + gestion erreurs + documentation
- ✅ Livrable : Application production-ready avec documentation

**Respect des jalons** : Globalement respectés avec quelques glissements mineurs (1-2 jours) compensés par flexibilité de l'équipe.

#### Gestion des urgences et imprévus

**Imprévus rencontrés** :
1. **Bug critique authentification** (Jalon 1)
   - Impact : Blocage complet du frontend
   - Résolution : Session pair programming de 2h, correction immédiate
   - Apprentissage : Prioriser les blocages critiques

2. **Déploiement backend instable** (Jalon 2)
   - Impact : Tests d'intégration impossibles pendant 24h
   - Résolution : Investigation logs Render.com, correction config
   - Apprentissage : Tester déploiement plus tôt

3. **Erreur Git - code sur mauvaise branche** (Jalon 3)
   - Impact : Perte temporaire de fichiers non commités
   - Résolution : Utilisation git stash/reset, récupération manuelle
   - Apprentissage : Vérifier branche avant commit

**Temps perdu total** : Environ 1 jour cumulé sur les 3 semaines (5% du temps)

### 2.5. Interactions et collaboration

#### Qualité de la collaboration

**Points forts identifiés** :

1. **Entraide spontanée** : En cas de blocage, l'autre développeur se rendait disponible rapidement pour aider (sessions de debugging à 2 très productives).

2. **Transparence** : Communication honnête sur les difficultés rencontrées sans crainte de jugement, ce qui a facilité la résolution rapide des problèmes.

3. **Complémentarité** : Les compétences backend/frontend se complétaient bien. Chacun apprenait de la partie de l'autre lors des sessions communes.

4. **Flexibilité** : Adaptation mutuelle aux contraintes personnelles (emploi du temps, imprévus).

**Points d'amélioration** :

1. **Manque de documentation partagée** : Certaines décisions techniques n'ont été documentées qu'oralement, créant un risque de perte d'information.

2. **Pas de feedback constructif formel** : Nous n'avons pas pris le temps de nous faire des retours sur notre façon de travailler (rétrospectives).

3. **Coordination Git perfectible** : Plusieurs erreurs de manipulation auraient pu être évitées avec plus de rigueur et de communication sur les branches.

#### Gestion des conflits

**Absence de conflits majeurs** :
- Pas de désaccords personnels ou professionnels bloquants
- Ambiance de travail saine et respectueuse

**Prévention des conflits** :
- Communication proactive sur les attentes
- Clarification immédiate des malentendus techniques
- Reconnaissance mutuelle du travail fourni

**Facteurs favorables** :
- Objectif commun clair (livrer le MVP)
- Complémentarité des rôles (pas de chevauchement)
- Maturité des deux développeurs

#### Exemples de collaboration réussie

**Exemple 1 : Résolution du bug de mapping des causes**
- **Contexte** : Les check-ins envoyés par le frontend étaient rejetés par le backend (format incompatible)
- **Collaboration** :
  1. Detection du bug lors des tests d'intégration
  2. Session Discord avec partage d'écran des deux côtés (frontend + backend logs)
  3. Identification rapide du problème : mapping FR/EN manquant côté frontend
  4. Solution implémentée en 30 minutes
- **Résultat** : Check-ins fonctionnels, système de mapping généralisé pour éviter récurrence

**Exemple 2 : Optimisation de la structure API**
- **Contexte** : Format initial de réponse API trop verbeux (données inutiles)
- **Collaboration** :
  1. Proposition d'optimisation côté frontend (besoin identifié à l'usage)
  2. Discussion sur Discord avec exemples concrets
  3. Refactoring coordonné : backend modifie l'API, frontend adapte les services
  4. Tests de non-régression ensemble
- **Résultat** : API plus propre, performances améliorées

**Exemple 3 : Documentation Postman collaborative**
- **Contexte** : Frontend avait besoin d'exemples clairs pour chaque endpoint
- **Collaboration** :
  1. Backend crée la structure Postman initiale
  2. Frontend teste et remonte questions/ambiguïtés
  3. Enrichissement itératif de la documentation avec exemples
  4. Collection finale exhaustive servant de contrat
- **Résultat** : Documentation API de qualité professionnelle

#### Bilan de la dynamique d'équipe

**Satisfaction générale** : 8/10
- Collaboration fluide et efficace dans l'ensemble
- Objectifs atteints malgré contraintes
- Bonne ambiance de travail

**Marges de progression** :
- Formaliser davantage les processus (PR, rétrospectives)
- Améliorer la documentation partagée
- Anticiper davantage les dépendances critiques

<div style="page-break-after: always;"></div>

## 3. Critique et recul sur la gestion

### 3.1. Points forts de la gestion

#### 1. Adaptabilité et réactivité

**Constat** : Face aux imprévus techniques ou aux changements de priorité, l'équipe a su s'adapter rapidement sans remettre en cause les objectifs globaux.

**Exemples concrets** :
- Lors de l'instabilité du déploiement backend (Jalon 2), j'ai pu continuer le développement frontend en utilisant des données mockées, évitant ainsi un blocage total.
- Quand le format de l'API a évolué (ajout de champs), les services frontend ont été ajustés en moins d'une heure grâce à l'architecture en couches.

**Facteurs de succès** :
- Architecture découplée (frontend/backend indépendants)
- Communication proactive sur les changements
- Approche Agile permettant les ajustements

#### 2. Communication efficace

**Constat** : La communication fréquente (2 points quotidiens) a permis une synchronisation continue et une résolution rapide des blocages.

**Métriques** :
- Temps moyen de réponse : < 30 minutes
- Taux de blocages résolus dans la journée : 90%
- Satisfaction de communication : 8/10

**Impact positif** :
- Évitement de développements incompatibles
- Détection précoce des problèmes d'intégration
- Maintien de la motivation par visibilité sur l'avancée globale

#### 3. Livraison incrémentale réussie

**Constat** : La stratégie de jalons avec livrables fonctionnels à chaque étape a permis de valider progressivement que nous étions sur la bonne voie.

**Jalons atteints** :
- ✅ Semaine 1 : Authentification bout-en-bout fonctionnelle
- ✅ Semaine 2 : MVP utilisable avec 3 flux principaux
- ✅ Semaine 3 : Application production-ready

**Avantages constatés** :
- Sentiment de progression constant (pas de "tunnel" de développement)
- Possibilité de démonstration intermédiaire si besoin
- Détection précoce des problèmes d'architecture

#### 4. Complémentarité des compétences

**Constat** : La spécialisation backend/frontend a été un atout majeur, chacun étant expert dans son domaine.

**Bénéfices** :
- Qualité technique élevée de chaque partie
- Autonomie de développement avec peu de dépendances bloquantes
- Apprentissage mutuel lors des sessions communes (pair programming)

### 3.2. Axes d'amélioration identifiés

#### 1. Documentation technique insuffisante

**Problème constaté** :
- La documentation a été produite majoritairement en fin de projet
- Certaines décisions techniques n'ont jamais été documentées (orales uniquement)
- La collection Postman n'a pas toujours été synchrone avec l'API réelle

**Conséquences** :
- Perte de temps à redécouvrir certains choix techniques
- Risque de perte d'information si l'un des développeurs quitte le projet
- Difficultés potentielles pour un nouveau développeur rejoignant le projet

**Cause profonde** :
- Priorisation du code au détriment de la documentation (pression du délai)
- Manque de discipline pour documenter au fil de l'eau
- Absence de template ou processus formel de documentation

#### 2. Gestion Git perfectible

**Problème constaté** :
- Plusieurs erreurs de manipulation (commits sur mauvaise branche, conflits de merge)
- Stratégie de branches pas toujours respectée
- Pas de Pull Requests systématiques avec code review

**Conséquences** :
- Perte de temps sur incident Git (récupération de code, résolution conflits)
- Perte ponctuelle de fichiers non commités (heureusement récupérés)
- Opportunités manquées d'amélioration par revue de code

**Cause profonde** :
- Manque d'expérience sur Git en contexte collaboratif
- Absence de checklist ou processus formalisé
- Pression du délai conduisant à des raccourcis

#### 3. Tests insuffisants

**Problème constaté** :
- Pas de tests unitaires automatisés (ni frontend ni backend)
- Tests d'intégration uniquement manuels en fin de développement
- Absence de tests de non-régression après modifications

**Conséquences** :
- Bugs détectés tardivement (parfois en production)
- Risque de régression lors de modifications
- Temps de debugging manuel important

**Cause profonde** :
- Manque de compétences en testing (Jest, Mocha, etc.)
- Perception du testing comme "perte de temps" face au délai
- Absence de culture testing dans l'équipe

#### 4. Absence de rétrospectives formelles

**Problème constaté** :
- Pas de moment dédié pour analyser ce qui a bien/mal fonctionné
- Apprentissages individuels pas toujours partagés
- Erreurs parfois répétées faute de capitalisation

**Conséquences** :
- Amélioration continue limitée
- Répétition de certaines erreurs (ex: plusieurs erreurs Git similaires)
- Manque de recul sur notre façon de travailler

**Cause profonde** :
- Méconnaissance de l'importance des rétrospectives
- Absence de temps formel alloué à cette activité
- Focus uniquement sur la production de code

### 3.3. Évaluation des résultats face aux objectifs

#### Objectifs initiaux vs résultats

| Objectif | Résultat | Écart | Analyse |
|----------|----------|-------|---------|
| **MVP fonctionnel en 3 semaines** | ✅ Livré | 0 | Objectif atteint dans les délais |
| **3 flux principaux (onboarding, check-in, feedback)** | ✅ Fonctionnels | 0 | Les 3 flux sont opérationnels bout-en-bout |
| **Authentification sécurisée JWT** | ✅ Implémentée | 0 | Token JWT avec expiration fonctionnel |
| **Anonymat garanti** | ✅ Garanti | 0 | Aucune donnée individuelle exposée dans l'API |
| **Dashboard manager** | ⚠️ Simplifié | -20% | Version basique livrée, fonctionnalités avancées reportées |
| **Documentation complète** | ⚠️ Partielle | -30% | Documentation API ok, documentation code insuffisante |
| **Tests automatisés** | ❌ Absents | -100% | Pas de tests unitaires, uniquement tests manuels |

**Taux de réalisation global** : 80%

**Analyse des écarts** :

**Objectifs non atteints** :
- **Tests automatisés** : Arbitrage conscient de prioriser les fonctionnalités. À refaire sur projet plus long.
- **Dashboard manager complet** : Fonctionnalités avancées (graphiques complexes, filtres) reportées par manque de temps. Version MVP livrée suffisante pour démonstration.

**Objectifs sur-atteints** :
- **Qualité UI** : Interface plus travaillée que prévu initialement (animations, glassmorphism, expérience utilisateur soignée)
- **Robustesse** : Gestion des erreurs et fallback localStorage ajoutés spontanément

#### Critères de succès

**Critères techniques** :
- ✅ Application fonctionnelle sans erreurs bloquantes
- ✅ Responsive design (utilisable sur mobile/tablette/desktop)
- ✅ Temps de chargement acceptables (< 2s)
- ✅ Sécurité : Pas de failles évidentes (injection SQL, XSS prévenues)

**Critères fonctionnels** :
- ✅ Utilisateur peut se connecter et compléter onboarding
- ✅ Utilisateur peut faire un check-in quotidien
- ✅ Utilisateur peut soumettre un feedback
- ✅ Responsable peut voir tendances anonymisées

**Critères qualité** :
- ⚠️ Code maintenable (architecture ok, mais manque de tests)
- ⚠️ Documentation (partielle mais existante)
- ❌ Couverture de tests (0%)

**Satisfaction globale** : 7.5/10
- Fonctionnellement complet pour un MVP
- Techniquement solide malgré limites sur tests
- Visuellement au-delà des attentes

### 3.4. Justification des décisions stratégiques

#### Décision 1 : Prioriser les fonctionnalités plutôt que les tests

**Contexte** :
En semaine 2, face à un retard de 2 jours sur le planning initial, nous avons dû arbitrer entre :
- A) Implémenter tous les tests unitaires prévus (2 jours)
- B) Finaliser les fonctionnalités manquantes et faire tests manuels

**Décision prise** : Option B

**Justification** :
- **Contrainte de délai** : 3 semaines fixes non négociables
- **Priorité MVP** : Un produit sans tests mais fonctionnel est démontrable, l'inverse ne l'est pas
- **Mitigation du risque** : Tests manuels exhaustifs + gestion d'erreurs robuste dans le code
- **Plan de rattrapage** : Tests automatisés identifiés comme priorité post-MVP

**Résultat** :
- ✅ MVP livré à temps avec toutes les fonctionnalités
- ✅ Qualité acceptable grâce aux tests manuels rigoureux
- ❌ Dette technique sur les tests (à rembourser sur V2)

**Recul critique** :
Décision justifiée dans le contexte, mais **non souhaitable sur un projet professionnel** ou de plus longue durée. Les tests automatisés auraient dû être intégrés dès le début, quitte à réduire le périmètre fonctionnel.

#### Décision 2 : API First vs Frontend First

**Contexte** :
En phase de conception, deux approches étaient possibles :
- A) Définir l'API backend d'abord, puis adapter le frontend
- B) Concevoir l'UI frontend d'abord, puis créer l'API selon les besoins

**Décision prise** : Option A (API First)

**Justification** :
- **Expertise backend** : Le développeur backend avait plus d'expérience en architecture API
- **Contrat clair** : Permet développement parallèle sans dépendances
- **Best practice** : Approche standard dans l'industrie pour projets web modernes
- **Documentation Postman** : Facilite communication et tests

**Résultat** :
- ✅ Développement parallèle efficace (pas de blocages frontend)
- ✅ Contrat API clair et documenté
- ⚠️ Quelques ajustements nécessaires après tests d'intégration

**Recul critique** :
Excellente décision validée par l'expérience. À reproduire systématiquement sur projets similaires.

#### Décision 3 : Architecture en services côté frontend

**Contexte** :
Pour l'intégration API, j'ai dû choisir entre :
- A) Appels API directs dans les composants React
- B) Couche de services dédiée (apiClient + services métier)

**Décision prise** : Option B

**Justification** :
- **Séparation des responsabilités** : Composants React focalisés sur l'UI, services sur la logique métier
- **Maintenabilité** : Changements API centralisés dans les services
- **Testabilité** : Services testables indépendamment des composants
- **Réutilisabilité** : Services réutilisables entre plusieurs composants

**Résultat** :
- ✅ Code frontend propre et maintenable
- ✅ Modifications API faciles à propager (ex: changement d'URL, format)
- ✅ Mapping des données centralisé (FR/EN)

**Recul critique** :
Excellente décision qui a largement payé lors des ajustements API. Investissement initial (création des services) rentabilisé dès la première modification.

#### Décision 4 : Déploiement backend précoce (Semaine 1)

**Contexte** :
Le backend pouvait être :
- A) Développé en local et déployé à la fin
- B) Déployé dès la Semaine 1 sur Render.com

**Décision prise** : Option B

**Justification** :
- **Tests réalistes** : Frontend testé contre backend en conditions réelles (réseau, latence)
- **Détection précoce** : Problèmes de déploiement identifiés tôt
- **Démos intermédiaires** : Possibilité de montrer l'application fonctionnelle à tout moment

**Résultat** :
- ✅ Plusieurs bugs de configuration détectés et corrigés tôt (CORS, variables d'env)
- ✅ Pas de surprise en phase finale de déploiement
- ⚠️ Un incident d'instabilité en Semaine 2 (cold start Render.com)

**Recul critique** :
Très bonne décision malgré l'incident ponctuel. Le déploiement précoce est une best practice à généraliser.

<div style="page-break-after: always;"></div>

### 3.5. Analyse de la coordination globale

#### Efficacité de la coordination

**Indicateurs quantitatifs** :

| Métrique | Valeur | Cible | Écart |
|----------|--------|-------|-------|
| Nombre de points quotidiens | 38/42 | 100% | -10% |
| Temps moyen de réponse aux questions | 25 min | < 1h | ✅ |
| Sessions pair programming | 8 | 6 | +33% |
| Commits Git | 187 | N/A | N/A |
| Merge conflicts | 3 | < 5 | ✅ |
| Blocages > 4h | 2 | < 5 | ✅ |

**Analyse** :
- ✅ Coordination globalement excellente (peu de blocages, réactivité élevée)
- ⚠️ 4 points quotidiens manqués (imprévus personnels, justifiés)
- ✅ Pair programming plus fréquent que prévu (signe d'entraide)

#### Points de friction identifiés

**Friction 1 : Décalage des horaires de travail**
- **Impact** : Attente de plusieurs heures pour validation/test de certaines fonctionnalités
- **Fréquence** : Quotidienne en début de projet, réduite ensuite
- **Résolution** : Anticipation via communication le soir pour le lendemain

**Friction 2 : Dépendance critique endpoint authentification**
- **Impact** : Frontend bloqué pendant 24h en attendant endpoint login fonctionnel
- **Fréquence** : Une fois (Semaine 1)
- **Résolution** : Priorisation explicite des endpoints critiques pour futures itérations

**Friction 3 : Documentation Postman pas à jour**
- **Impact** : Temps perdu à debugger des appels API qui ne correspondaient plus à la doc
- **Fréquence** : 2-3 fois durant le projet
- **Résolution** : Notification systématique des changements API + mise à jour doc en temps réel

#### Synergies créées

**Synergie 1 : Pair debugging**
- Les sessions de debugging à 2 (partage d'écran Discord) ont été 3x plus rapides que le debugging solo
- Exemple : Bug mapping des causes résolu en 30 min à 2 vs estimation 2h solo

**Synergie 2 : Apprentissage mutuel**
- J'ai appris des concepts backend (architecture en couches, sécurité JWT)
- Mon binôme a appris des concepts frontend (hooks React, gestion d'état)
- Impact : Vision globale du projet pour chacun, meilleure compréhension des contraintes de l'autre

**Synergie 3 : Amélioration de l'API grâce aux retours frontend**
- Mes retours d'expérience d'intégration ont permis d'optimiser l'API (réduction de la verbosité, ajout de champs manquants)
- Approche itérative : API non figée mais s'améliorant grâce au feedback

#### Comparaison avec travail en solo

**Avantages du binôme constatés** :
- ✅ Motivation soutenue (engagement mutuel)
- ✅ Résolution de problèmes plus rapide (deux cerveaux valent mieux qu'un)
- ✅ Qualité supérieure grâce aux discussions techniques
- ✅ Charge de travail répartie (moins de stress)

**Inconvénients du binôme constatés** :
- ❌ Nécessité de coordonner les horaires
- ❌ Temps passé en communication (environ 15% du temps total)
- ❌ Dépendances créant parfois des attentes

**Bilan** : Le travail en binôme a été largement positif. La qualité et la richesse du projet auraient été moindres en solo.

#### Recommandations pour futurs projets

**À conserver** :
- ✅ Points quotidiens courts mais réguliers
- ✅ Pair programming sur problèmes complexes
- ✅ API First avec documentation Postman
- ✅ Déploiement backend précoce

**À améliorer** :
- ❌ Mettre en place revues de code systématiques (PR)
- ❌ Formaliser les rétrospectives (hebdomadaires)
- ❌ Documenter au fil de l'eau et non en fin de projet
- ❌ Intégrer les tests dès le début

**À éviter** :
- ❌ Prendre des raccourcis sur Git (toujours vérifier la branche)
- ❌ Reporter la documentation technique à la fin
- ❌ Négliger les tests automatisés

**Conclusion sur la coordination** :
La coordination a été l'un des points forts majeurs du projet. Malgré une équipe réduite et des contraintes de temps, nous avons su collaborer efficacement grâce à une communication dense, une répartition claire des rôles, et une entraide spontanée. Les quelques frictions rencontrées ont été rapidement résolues et ont servi d'apprentissage.

<div style="page-break-after: always;"></div>

## 4. Détection des dysfonctionnements

### 4.1. Dysfonctionnement n°1 : Synchronisation backend/frontend retardée

#### Description du problème

Durant la phase d'intégration API (Semaine 2), j'ai constaté un **décalage systématique entre la disponibilité des endpoints backend et le besoin du frontend**. Concrètement, je devais attendre 12 à 24 heures après avoir terminé une interface frontend pour pouvoir l'intégrer avec l'API correspondante.

**Manifestations concrètes** :
- Page onboarding terminée le lundi soir, endpoint `/users/me/info` disponible le mercredi matin
- Formulaire de feedback prêt le jeudi, endpoint `/feedbacks` livré le vendredi
- Tests d'intégration repoussés de 2 jours faute d'endpoints fonctionnels

**Conséquences mesurées** :
- **Temps perdu** : Environ 1,5 jour cumulé passé à attendre ou à développer des workarounds temporaires
- **Démotivation ponctuelle** : Frustration de ne pas pouvoir finaliser les fonctionnalités en cours
- **Risque de divergence** : Développement frontend basé sur des suppositions plutôt que sur l'API réelle

#### Causes profondes

**Causes techniques** :
1. **Architecture backend complexe** : Implémentation d'une architecture en couches (controllers/services/repositories) plus longue que prévu
2. **Debugging database** : Problèmes de configuration PostgreSQL sur Render.com ayant ralenti le développement

**Causes organisationnelles** :
1. **Priorisation non alignée** : Le backend a développé les endpoints dans un ordre différent de celui attendu par le frontend (ex: endpoints d'admin avant endpoints utilisateur)
2. **Absence de timeline partagée** : Pas de planning détaillé commun indiquant quand chaque endpoint serait disponible
3. **Communication asynchrone** : Les points quotidiens ne suffisaient pas à anticiper les délais de livraison des endpoints critiques

**Causes humaines** :
1. **Manque d'expérience** : Première fois que chacun travaillait dans une architecture frontend/backend séparée
2. **Sous-estimation** : Le développeur backend a sous-estimé le temps nécessaire pour certains endpoints
3. **Timidité** : Je n'ai pas osé demander de priorisation différente, pensant que l'ordre choisi était optimal

#### Conséquences sur le projet

**Impact planning** :
- Glissement du Jalon 2 de 1 jour
- Compression de la phase de tests d'intégration (2 jours au lieu de 3)

**Impact qualité** :
- Moins de temps pour itérer sur l'intégration API
- Quelques bugs d'intégration détectés tardivement

**Impact équipe** :
- Frustration temporaire mais pas de conflit
- Apprentissage sur l'importance de la synchronisation

**Impact positif inattendu** :
- Développement d'une stratégie de mock data performante côté frontend (réutilisable sur futurs projets)
- Meilleure compréhension des interdépendances backend/frontend

### 4.2. Dysfonctionnement n°2 : Gestion des branches Git chaotique

#### Description du problème

À plusieurs reprises durant le projet, nous avons rencontré des **problèmes de gestion des branches Git** qui ont causé pertes de temps et stress. Le problème le plus grave s'est produit en Semaine 3 lorsque j'ai réalisé que j'avais développé plusieurs fonctionnalités directement sur `main` au lieu de `develop`.

**Manifestations concrètes** :
- **Incident majeur** : Développement de 5 services API (authService, userService, etc.) directement sur `main` alors que la convention était de travailler sur `develop`
- **Perte de code** : Utilisation de `git clean -fd` ayant supprimé tous les fichiers non trackés (services créés mais non commités)
- **Récupération manuelle** : Obligation de recréer manuellement 5 fichiers (400+ lignes de code) déjà développés
- **Incidents mineurs** : 2 autres situations de commits sur mauvaise branche (sans perte de code)

**Conséquences mesurées** :
- **Temps perdu** : 3 heures pour recréer les fichiers perdus
- **Stress** : Panique temporaire de croire avoir perdu tout le travail
- **Retard** : Demi-journée de retard sur le planning de la Semaine 3

#### Causes profondes

**Causes techniques** :
1. **Commandes Git avancées mal maîtrisées** : Utilisation de `git clean` sans comprendre pleinement ses conséquences
2. **Pas de protection des branches** : La branche `main` n'était pas protégée sur GitHub, permettant push direct
3. **Pas de hooks Git** : Absence de hooks pré-commit pour vérifier la branche active

**Causes organisationnelles** :
1. **Stratégie de branches floue** : Convention "main = prod, develop = dev" énoncée oralement mais pas documentée ni systématiquement appliquée
2. **Pas de checklist** : Absence de checklist "avant commit" (vérifier branche, tester, relire diff)
3. **Formation Git insuffisante** : Ni moi ni mon binôme n'avions d'expérience solide en collaboration Git

**Causes humaines** :
1. **Inattention** : Focus sur le code au détriment de la vérification de la branche (`git branch` non vérifié avant commit)
2. **Pression du délai** : Précipitation dans les commits sans prendre le temps de vérifier
3. **Confiance excessive** : Pensais maîtriser Git alors que des zones d'ombre subsistaient

#### Conséquences sur le projet

**Impact immédiat** :
- Perte de 3 heures de productivité
- Stress et démotivation temporaire
- Risque de perte définitive du code (heureusement évité grâce à `git reflog` et récupération manuelle)

**Impact qualité** :
- Code recréé légèrement différent de l'original (possibles variations)
- Pas de relecture du code perdu (opportunité manquée de détecter bugs)

**Impact apprentissage** :
- ✅ Compréhension approfondie de `git stash`, `git reset`, `git clean`, `git reflog`
- ✅ Prise de conscience de l'importance de la rigueur Git
- ✅ Mise en place de nouvelles habitudes (toujours vérifier `git status` et `git branch` avant commit)

**Enseignement clé** :
Cet incident, bien que stressant, a été très formateur. Il m'a appris que **Git est un outil puissant mais dangereux** et qu'une **rigueur absolue** est nécessaire en contexte collaboratif.

<div style="page-break-after: always;"></div>

### 4.3. Dysfonctionnement n°3 : Documentation API tardive et incomplète

#### Description du problème

Bien que nous ayons adopté une approche API First avec documentation Postman, cette documentation s'est révélée **incomplète et désynchronisée** de l'API réelle à plusieurs reprises. Les exemples de requêtes/réponses n'étaient pas toujours à jour, certains champs étaient mal documentés (type, obligatoire/optionnel), et les codes d'erreur n'étaient pas exhaustivement listés.

**Manifestations concrètes** :
- **Endpoint `/users/me/info`** : Documentation indiquait format `firstName/lastName` (camelCase) alors que l'API attendait `first_name/last_name` (snake_case)
- **Endpoint `/checkins`** : Liste des causes non documentée, obligeant à inspecter le code backend pour connaître les valeurs acceptées
- **Codes d'erreur** : Erreur `Missing X-User-Id header` rencontrée en production mais non documentée dans Postman
- **Exemples manquants** : Certains endpoints documentés sans exemple de réponse, rendant l'intégration difficile

**Conséquences mesurées** :
- **Temps perdu en debugging** : Environ 2-3 heures cumulées à investiguer des erreurs dues à des écarts doc/réalité
- **Allers-retours** : 4-5 échanges Discord pour clarifier des ambiguïtés documentaires
- **Frustration** : Sentiment de devoir "deviner" le comportement de l'API

#### Causes profondes

**Causes techniques** :
1. **Évolution de l'API** : L'API a évolué durant le développement (ajout de champs, changement de formats) mais la doc Postman n'a pas toujours suivi
2. **Outils de doc non automatisés** : Documentation Postman manuelle, donc nécessitant effort conscient de mise à jour

**Causes organisationnelles** :
1. **Pas de propriétaire de la doc** : Responsabilité floue sur qui met à jour la documentation (backend ou les deux?)
2. **Pas de processus de validation** : Aucune revue systématique de la cohérence doc/code
3. **Documentation en fin de tâche** : Tendance à documenter après avoir codé plutôt qu'avant, augmentant risque d'oublis

**Causes humaines** :
1. **Perception de la doc comme contrainte** : Vue comme une tâche "en plus" plutôt que partie intégrante du développement
2. **Pression du délai** : Face au timing serré, la mise à jour de la doc était sacrifiée au profit du code
3. **Sous-estimation de l'impact** : Pas de conscience de l'impact négatif d'une mauvaise doc sur la productivité du binôme

#### Conséquences sur le projet

**Impact productivité** :
- Frontend ralenti par nécessité de valider chaque endpoint par test plutôt que par lecture de doc
- Debugging par essai-erreur plutôt que par compréhension claire du comportement attendu

**Impact qualité** :
- Risque de bugs dus à des suppositions erronées sur le fonctionnement de l'API
- Code frontend potentiellement fragile car basé sur des tests empiriques plutôt que sur une spécification claire

**Impact relation d'équipe** :
- Légère frustration côté frontend envers backend (non exprimée directement mais ressentie)
- Pas de conflit mais sentiment que la communication pourrait être améliorée

**Enseignement clé** :
La documentation est un **investissement**, pas une contrainte. Le temps "perdu" à documenter est largement compensé par le temps gagné en debugging et allers-retours. **Une bonne doc est un multiplicateur de productivité**.

### 4.4. Dysfonctionnement n°4 : Tests insuffisants et tardifs

#### Description du problème

Le projet a été livré **sans aucun test automatisé** (ni tests unitaires, ni tests d'intégration, ni tests end-to-end). Seuls des **tests manuels** ont été réalisés, principalement en fin de projet (Semaine 3). Cette situation a créé plusieurs problèmes de qualité et de confiance dans le code.

**Manifestations concrètes** :
- **Bugs en cascade** : Correction d'un bug sur l'authentification ayant cassé le flow d'onboarding (détecté 2 jours plus tard)
- **Régression** : Refactoring du service `checkinService` ayant introduit un bug de mapping (détecté par test manuel)
- **Tests manuels répétitifs** : Obligation de retester manuellement tous les flux après chaque modification significative
- **Incertitude** : Impossible de savoir rapidement si une modification a cassé quelque chose ailleurs

**Conséquences mesurées** :
- **Temps de testing manuel** : Environ 6 heures cumulées passées à tester manuellement les mêmes flux
- **Bugs détectés tardivement** : 3 bugs découverts en Semaine 3 alors qu'ils existaient depuis Semaine 2
- **Stress avant livraison** : Incertitude sur la robustesse globale du code

#### Causes profondes

**Causes techniques** :
1. **Manque de compétences** : Ni moi ni mon binôme n'avions d'expérience en testing automatisé (Jest, Mocha, React Testing Library, etc.)
2. **Setup complexe** : Mettre en place un environnement de test semblait complexe et chronophage
3. **Pas de boilerplate** : Projet démarré sans structure de test préétablie

**Causes organisationnelles** :
1. **Pas de culture testing** : Tests non intégrés dans le processus de développement dès le début
2. **Arbitrage temps** : Face au délai, tests sacrifiés au profit des fonctionnalités (cf. décision stratégique)
3. **Pas de définition of done incluant tests** : Critère d'acceptation d'une fonctionnalité = "ça marche manuellement" et non "ça marche + tests passent"

**Causes humaines** :
1. **Perception des tests comme optionnels** : Tests vus comme un "bonus" plutôt qu'une nécessité
2. **Préférence pour le développement** : Plus gratifiant de coder de nouvelles features que d'écrire des tests
3. **Sous-estimation du risque** : "Ça marchera, on fait attention" plutôt que "Prouvons que ça marche"

#### Conséquences sur le projet

**Impact qualité** :
- Code moins robuste qu'il ne pourrait l'être
- Confiance limitée dans la stabilité après modifications
- Risque de régression élevé si le projet continue d'évoluer

**Impact maintenabilité** :
- Difficile pour un futur développeur de savoir si ses modifications cassent quelque chose
- Pas de documentation "vivante" du comportement attendu (rôle des tests)

**Impact apprentissage** :
- Opportunité manquée d'apprendre les bonnes pratiques de testing
- Mauvaise habitude prise (développer sans tests)

**Impact positif paradoxal** :
- Conscience accrue de l'importance des tests (apprentissage par la douleur)
- Compréhension que tests = assurance qualité et non contrainte

**Enseignement clé** :
L'absence de tests a été le **dysfonctionnement le plus grave du projet**. Sur un projet professionnel ou de plus longue durée, cela aurait été catastrophique. **Les tests ne sont pas optionnels**, ils sont une composante essentielle du code de production.

#### Synthèse des dysfonctionnements

| Dysfonctionnement | Gravité | Fréquence | Temps perdu | Cause principale |
|-------------------|---------|-----------|-------------|------------------|
| **Synchro backend/frontend** | Moyenne | Continue | 1,5 jour | Organisationnelle |
| **Gestion Git** | Élevée | Ponctuelle | 0,5 jour | Humaine + Technique |
| **Doc API** | Moyenne | Récurrente | 0,3 jour | Organisationnelle |
| **Tests insuffisants** | Critique | Continue | 0,8 jour | Culturelle + Compétences |
| **TOTAL** | - | - | **3,1 jours** | **~15% du temps** |

**Constat global** :
Les dysfonctionnements identifiés ont coûté environ **15% du temps total du projet** (3 jours sur 21). La majorité de ces problèmes étaient **évitables** avec plus d'expérience, de rigueur et de formation. Cependant, ils constituent des **apprentissages précieux** pour les projets futurs.

<div style="page-break-after: always;"></div>

## 5. Propositions d'actions correctives

### 5.1. Solution au dysfonctionnement n°1 : Synchronisation backend/frontend

#### Analyse de la cause racine

Le décalage backend/frontend était principalement dû à un **manque de visibilité mutuelle sur les priorités et délais**. Bien que nous communiquions quotidiennement, nous n'avions pas de **planning partagé détaillé** indiquant clairement "endpoint X sera livré jour Y".

#### Action corrective proposée

**Mise en place d'un Kanban partagé avec dépendances**

**Description** :
- Utiliser un outil Kanban simple (Trello, GitHub Projects, ou Notion)
- Créer des cartes pour chaque endpoint backend ET chaque interface frontend
- Marquer explicitement les dépendances (ex: "Onboarding UI bloqué par endpoint POST /users/me/info")
- Afficher les deadlines souhaitées pour chaque carte
- Synchroniser quotidiennement lors des points

**Méthodologie appliquée** : Kanban + visualisation des dépendances

**Mise en œuvre concrète** :

1. **Colonnes du board** :
   - Backlog
   - À faire (semaine en cours)
   - En cours
   - En attente de dépendance
   - En test
   - Terminé

2. **Codage couleur** :
   - 🟦 Backend
   - 🟩 Frontend
   - 🟨 Commun (doc, tests d'intégration)

3. **Champs sur chaque carte** :
   - Responsable (backend/frontend)
   - Dépendances (liens vers autres cartes)
   - Deadline souhaitée
   - Statut (nouveau/en cours/bloqué/terminé)

4. **Rituels** :
   - Review du board en début de point quotidien (5 min)
   - Mise à jour immédiate quand carte change de statut
   - Planning hebdomadaire le lundi (répartition des cartes sur la semaine)

**Bénéfices attendus** :
- ✅ Visibilité claire des priorités pour chacun
- ✅ Anticipation des blocages (carte "En attente de dépendance" visible)
- ✅ Possibilité de réprioriser si une dépendance critique tarde
- ✅ Historique de la vélocité (combien de cartes terminées par semaine)

**Évaluation de l'impact potentiel** :

**Réduction du temps perdu** :
- Dysfonctionnement initial : 1,5 jour perdu
- Avec Kanban : Estimation 0,3 jour (80% de réduction)
- Temps gagné : **1,2 jour** réinvestis dans fonctionnalités/qualité

**Mécanisme de gain** :
1. Frontend anticipe délais backend → commence par interfaces indépendantes
2. Backend priorise endpoints critiques → débloque frontend plus tôt
3. Blocages détectés en avance → solutions de contournement possibles (mocks)

**Risques et limites** :
- ⚠️ Nécessite discipline pour maintenir le board à jour (15 min/jour)
- ⚠️ Peut créer fausse impression de rigidité (à contrebalancer par flexibilité)
- ⚠️ Outil supplémentaire à prendre en main

**Indicateurs de succès** :
- Nombre de situations "j'attends l'API" : < 2 par semaine (vs 6 actuellement)
- Taux de respect des deadlines : > 80%
- Satisfaction de la coordination : > 8/10

**Conclusion sur cette action** :
Solution réaliste et peu coûteuse (quelques heures de setup + 15 min/jour) pour un gain significatif. À mettre en place **dès le début** du prochain projet. S'attaque directement à la cause profonde (manque de visibilité) plutôt qu'aux symptômes.

<div style="page-break-after: always;"></div>

### 5.2. Solution au dysfonctionnement n°2 : Gestion Git

#### Analyse de la cause racine

Les problèmes Git provenaient d'un **manque de rigueur et de compétences** sur un outil pourtant critique. La cause profonde est l'absence de **processus formalisé et de garde-fous techniques**.

#### Action corrective proposée

**Triple action : Formation + Checklist + Protections techniques**

#### Action 2.1 : Formation Git approfondie

**Description** :
- Formation de 2 jours (ou auto-formation) sur Git en contexte collaboratif
- Focus sur : branches, merge/rebase, résolution de conflits, commandes avancées (`stash`, `reset`, `reflog`, `cherry-pick`)
- Pratique sur un projet sandbox avant le vrai projet

**Méthodologie** : Learning by doing + pair learning

**Contenu de formation** :
1. **Jour 1 : Fondamentaux**
   - Comprendre le modèle de données Git (commits, tree, blobs)
   - Maîtriser les branches (création, switch, merge, delete)
   - Résoudre les conflits de merge
   - Comprendre `git status`, `git diff`, `git log`

2. **Jour 2 : Avancé**
   - `git stash` : quand et comment l'utiliser
   - `git reset` : soft vs mixed vs hard
   - `git rebase` : quand préférer au merge
   - `git reflog` : récupération d'urgence
   - `git cherry-pick` : appliquer un commit spécifique

**Ressources** :
- Pro Git Book (gratuit en ligne)
- Tutorials interactifs (Learn Git Branching)
- Coaching par développeur expérimenté (mentoring)

#### Action 2.2 : Checklist "Avant commit"

**Description** :
Créer et afficher physiquement (post-it sur écran ou fond d'écran) une checklist à valider avant chaque commit.

**Checklist proposée** :

```
☐ 1. Vérifier branche active : git branch (doit être develop ou feature/*)
☐ 2. Voir les fichiers modifiés : git status
☐ 3. Revoir les changements : git diff
☐ 4. Tester le code modifié (au moins manuellement)
☐ 5. Ajouter avec précision : git add (éviter git add .)
☐ 6. Message de commit clair : [type] description (ex: [feat] Ajout authService)
☐ 7. Pull avant push : git pull origin develop
☐ 8. Résoudre conflits si nécessaire
☐ 9. Push : git push origin <branche>
```

**Format** : PDF imprimable + version digitale (Notion, Markdown)

**Adoption** :
- Suivre rigoureusement pendant 2 semaines jusqu'à automatisation
- Pair review : l'autre développeur demande "as-tu suivi la checklist ?"

#### Action 2.3 : Protections techniques

**Description** :
Mettre en place des garde-fous techniques pour prévenir les erreurs.

**Protections proposées** :

1. **Protection de branche `main` sur GitHub** :
   - Interdiction de push direct (force Pull Request)
   - Nécessité d'approbation d'un reviewer
   - CI/CD : tests automatisés doivent passer avant merge

2. **Git hooks locaux** :
   - Hook pré-commit : vérifie qu'on n'est pas sur `main`
   - Hook pré-push : demande confirmation si push sur `main`

**Exemple de hook pré-commit** :
```bash
#!/bin/sh
# .git/hooks/pre-commit

branch=$(git symbolic-ref --short HEAD)
if [ "$branch" = "main" ]; then
  echo "❌ ERREUR : Commit direct sur main interdit !"
  echo "→ Basculer sur develop : git checkout develop"
  exit 1
fi
```

3. **Alias Git pratiques** :
```bash
git config --global alias.s 'status'
git config --global alias.b 'branch'
git config --global alias.co 'checkout'
git config --global alias.amend 'commit --amend --no-edit'
```

#### Évaluation de l'impact potentiel

**Réduction des erreurs Git** :
- Dysfonctionnement initial : 3 erreurs majeures, 0,5 jour perdu
- Avec actions correctives : Estimation 0 erreur majeure
- Temps gagné : **0,5 jour + stress évité**

**Bénéfices indirects** :
- ✅ Confiance accrue dans l'utilisation de Git
- ✅ Utilisation de fonctionnalités avancées (branches feature, rebase, etc.)
- ✅ Compétence transférable sur projets futurs et en entreprise

**Coût de mise en œuvre** :
- Formation : 2 jours (investissement initial, rentabilisé dès 1er projet)
- Checklist : 1 heure de création + 2 semaines d'application rigoureuse
- Protections techniques : 2 heures de setup
- **Total : 2,5 jours** (rentabilisés sur plusieurs projets)

**Indicateurs de succès** :
- Zéro erreur Git majeure (perte de code, commit sur mauvaise branche)
- 100% des commits respectent la checklist (mesurable via messages de commit)
- Utilisation de fonctionnalités avancées (rebase, cherry-pick) sur projet suivant

**Conclusion sur cette action** :
Triple action complémentaire indispensable. **La formation est l'investissement le plus important** (compétence durable), complétée par checklist (habitude) et protections techniques (filet de sécurité). Attaque les 3 niveaux de cause (compétence, rigueur, outils).

<div style="page-break-after: always;"></div>

### 5.3. Solution au dysfonctionnement n°3 : Documentation API

#### Analyse de la cause racine

La documentation API incomplète/désynchronisée était due à un **manque de processus et de responsabilisation**. La doc était une "tâche en plus" plutôt qu'une partie intégrante du développement.

#### Action corrective proposée

**Documentation-as-Code avec processus de validation**

#### Action 3.1 : Adoption de Swagger/OpenAPI

**Description** :
Remplacer (ou compléter) la documentation Postman manuelle par une **documentation Swagger auto-générée** depuis le code backend.

**Avantages de Swagger** :
- ✅ Documentation **toujours synchrone** avec le code (générée automatiquement)
- ✅ Interface interactive pour tester les endpoints
- ✅ Génération automatique de clients API (SDK)
- ✅ Format standard de l'industrie (OpenAPI 3.0)

**Mise en œuvre avec Express.js** :

```javascript
// Installation
npm install swagger-jsdoc swagger-ui-express

// Configuration (swagger.js)
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Huma API',
      version: '1.0.0',
      description: 'API de suivi du bien-être'
    },
    servers: [{url: 'https://huma-backend.onrender.com'}]
  },
  apis: ['./src/routes/*.js'] // Fichiers avec annotations
};

module.exports = swaggerJsdoc(options);

// Intégration (server.js)
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

**Documentation dans le code** :
```javascript
/**
 * @swagger
 * /users/me/info:
 *   put:
 *     summary: Mise à jour du profil utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Jean"
 *               last_name:
 *                 type: string
 *                 example: "Dupont"
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       401:
 *         description: Token JWT manquant ou invalide
 */
router.put('/users/me/info', authenticate, userController.updateUserInfo);
```

**Bénéfices** :
- Doc toujours à jour automatiquement
- Exemples de requêtes/réponses dans le code (proche du contexte)
- UI interactive accessible via `/api-docs`

#### Action 3.2 : Processus "Definition of Done" incluant doc

**Description** :
Formaliser qu'une fonctionnalité n'est "terminée" que si elle est documentée.

**Critères de Definition of Done** :

```
Une fonctionnalité est considérée DONE si :
☐ Code fonctionnel (feature/bug fix implémenté)
☐ Testé (au minimum manuellement, idéalement tests auto)
☐ Documenté dans Swagger (annotations complètes)
☐ Exemple de requête/réponse dans Swagger
☐ Codes d'erreur documentés
☐ Validé par le binôme (si possible)
☐ Committée sur la bonne branche
```

**Application** :
- Checklist imprimée affichée sur le bureau
- Revue en fin de journée : toutes les fonctionnalités terminées aujourd'hui respectent-elles la DoD ?
- Pair review : l'autre développeur valide la DoD avant considérer la tâche close

#### Action 3.3 : Revue de documentation hebdomadaire

**Description** :
Rituel hebdomadaire de 30 minutes pour vérifier la cohérence de la documentation.

**Déroulement** :

1. **Parcourir Swagger UI** (15 min)
   - Tester 2-3 endpoints au hasard
   - Vérifier que la réponse correspond à la doc
   - Noter les écarts éventuels

2. **Améliorer la doc** (15 min)
   - Ajouter exemples manquants
   - Clarifier descriptions ambiguës
   - Compléter codes d'erreur

3. **Partager les learnings** (5 min)
   - Quelles améliorations ont été faites ?
   - Quels patterns de doc émergent ?

**Responsable** : Alternance backend/frontend chaque semaine

#### Évaluation de l'impact potentiel

**Réduction du temps perdu** :
- Dysfonctionnement initial : 0,3 jour perdu en debugging doc
- Avec Swagger + processus : 0,05 jour (83% de réduction)
- Temps gagné : **0,25 jour par projet**

**Bénéfices indirects** :
- ✅ Meilleure qualité globale (doc force à réfléchir aux cas limites)
- ✅ Onboarding facilité (nouveau dev peut comprendre l'API via Swagger)
- ✅ Compétence professionnelle (Swagger = standard industrie)

**Coût de mise en œuvre** :
- Setup Swagger : 3 heures (one-time)
- Annotation des endpoints existants : 4 heures (one-time)
- Maintenance : 5 min/endpoint + 30 min/semaine
- **Total initial : 7 heures**, rentabilisé dès le 1er projet

**Indicateurs de succès** :
- 100% des endpoints documentés dans Swagger
- Zéro écart doc/réalité détecté lors des revues hebdo
- Temps de debugging lié à la doc : < 30 min/projet

**Conclusion sur cette action** :
Swagger est un **game-changer** pour la documentation API. L'investissement initial (7h) est rapidement rentabilisé. Le processus DoD + revue hebdo garantit que la doc reste de qualité. **Solution professionnelle et pérenne**.

<div style="page-break-after: always;"></div>

### 5.4. Solution au dysfonctionnement n°4 : Tests insuffisants

#### Analyse de la cause racine

L'absence de tests provenait d'un **manque de compétences, de culture testing, et de temps**. C'est le dysfonctionnement le plus grave et celui nécessitant l'action corrective la plus profonde.

#### Action corrective proposée

**Programme de formation Testing + TDD + Intégration CI/CD**

#### Action 4.1 : Formation Testing (3 jours)

**Description** :
Formation complète sur les différents types de tests et leur mise en œuvre en JavaScript.

**Programme détaillé** :

**Jour 1 : Tests unitaires (Jest)**
- Qu'est-ce qu'un test unitaire ?
- Installation et configuration de Jest
- Écriture de tests simples (`test`, `expect`, matchers)
- Mocking des dépendances (`jest.mock`, `jest.fn`)
- Coverage de code (`jest --coverage`)
- **Pratique** : Tester les services frontend (authService, userService)

**Jour 2 : Tests d'intégration (Supertest + React Testing Library)**
- Tests API backend avec Supertest
- Tests de composants React avec React Testing Library
- Tests de hooks React
- **Pratique** : Tester endpoints backend + composants frontend

**Jour 3 : Tests E2E + TDD**
- Introduction aux tests E2E (Cypress/Playwright)
- Test-Driven Development (TDD) : Red-Green-Refactor
- Stratégie de testing (pyramide des tests)
- **Pratique** : Écrire un flux complet en TDD

**Ressources** :
- Documentation officielle Jest/React Testing Library
- Cours en ligne (Udemy, Frontend Masters)
- Mentorat par développeur expérimenté

#### Action 4.2 : Adoption du TDD (Test-Driven Development)

**Description** :
Intégrer le TDD comme méthode de développement par défaut sur les projets futurs.

**Cycle TDD** :
```
1. 🔴 RED : Écrire un test qui échoue
   ↓
2. 🟢 GREEN : Écrire le code minimum pour faire passer le test
   ↓
3. 🔵 REFACTOR : Améliorer le code sans casser le test
   ↓
4. Répéter pour la fonctionnalité suivante
```

**Exemple concret sur authService** :

```javascript
// 1. RED : Test écrit en premier
describe('authService.login', () => {
  it('should save token after successful login', async () => {
    // Mock de l'API
    jest.spyOn(api, 'post').mockResolvedValue({ token: 'abc123' });
    
    await login('user@example.com');
    
    expect(getAuthToken()).toBe('abc123');
  });
});

// 2. GREEN : Code minimum pour passer
export async function login(email) {
  const response = await api.post('/auth/login', { email });
  if (response.token) {
    setAuthToken(response.token);
  }
  return response;
}

// 3. REFACTOR : Amélioration (gestion d'erreurs, etc.)
```

**Bénéfices du TDD** :
- ✅ Garantit 100% de couverture de tests (par construction)
- ✅ Conception du code guidée par les tests (meilleur design)
- ✅ Confiance totale dans le code (tests écrits avant)
- ✅ Documentation vivante (les tests montrent comment utiliser le code)

**Application progressive** :
- Semaine 1-2 : TDD sur nouveaux services/composants uniquement
- Semaine 3-4 : TDD systématique sur tout nouveau code
- Mois 2+ : TDD devenu habitude naturelle

#### Action 4.3 : Intégration CI/CD avec tests automatisés

**Description** :
Mettre en place une pipeline CI/CD qui exécute automatiquement les tests à chaque push/PR.

**Architecture proposée** :

```yaml
# .github/workflows/ci.yml (GitHub Actions)
name: CI Pipeline

on: [push, pull_request]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: cd huma-backend && npm install
      - name: Run tests
        run: cd huma-backend && npm test
      - name: Check coverage
        run: cd huma-backend && npm run test:coverage

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: cd HUMA-FRONTEND && npm install
      - name: Run tests
        run: cd HUMA-FRONTEND && npm test
      - name: Build
        run: cd HUMA-FRONTEND && npm run build

  deploy:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy backend + frontend"
```

**Protection de branche** :
- Sur GitHub : Settings → Branches → Branch protection rules
- Règle sur `main` : "Require status checks to pass before merging"
- Status check requis : `test-backend` et `test-frontend`
- **Résultat** : Impossible de merger du code qui fait échouer les tests

**Bénéfices CI/CD** :
- ✅ Tests exécutés automatiquement (pas d'oubli possible)
- ✅ Feedback immédiat sur chaque commit (badge vert/rouge)
- ✅ Protection contre les régressions
- ✅ Déploiement automatique uniquement si tests passent

#### Action 4.4 : Objectifs de couverture de code

**Description** :
Fixer des objectifs chiffrés de couverture de code pour maintenir la discipline.

**Objectifs proposés** :

| Phase | Couverture minimale | Délai |
|-------|---------------------|-------|
| Phase 1 : Setup | 0% → 30% | 2 semaines |
| Phase 2 : Critical path | 30% → 60% | 4 semaines |
| Phase 3 : Complet | 60% → 80% | 8 semaines |

**Priorités de testing** :
1. **Services API** (authService, userService, checkinService) : 80%+
2. **Composants critiques** (Navbar, Modal, Forms) : 70%+
3. **Pages** (tests d'intégration) : 50%+
4. **Composants simples** (Card, Button) : Optionnel

**Outils de mesure** :
- Jest built-in coverage : `jest --coverage`
- Report HTML : `coverage/lcov-report/index.html`
- Intégration CI : Codecov ou Coveralls pour suivi dans le temps

**Règle stricte** :
> Toute Pull Request qui **diminue** la couverture globale est refusée (sauf justification)

#### Évaluation de l'impact potentiel

**Réduction du temps de debugging** :
- Dysfonctionnement initial : 0,8 jour perdu + 6h tests manuels répétitifs
- Avec tests automatisés : 0,1 jour (87% de réduction)
- Temps gagné : **0,7 jour par projet + qualité+++**

**Bénéfices indirects** :
- ✅ Confiance pour refactorer (tests = filet de sécurité)
- ✅ Détection précoce des bugs (avant merge)
- ✅ Meilleur design du code (TDD force à penser interfaces)
- ✅ Compétence clé pour l'industrie (tests = standard professionnel)

**Coût de mise en œuvre** :
- Formation testing : 3 jours (investissement majeur mais rentabilisé)
- Setup CI/CD : 1 jour
- Écriture des premiers tests : 2 jours (30% de couverture initiale)
- Maintenance : +20% de temps dev (rentabilisé par -80% temps debugging)
- **Total initial : 6 jours**, rentabilisé sur 2-3 projets

**ROI (Return On Investment)** :
- Court terme (1 projet) : Neutre (temps investi = temps gagné)
- Moyen terme (3 projets) : Positif (+30% de temps gagné)
- Long terme (carrière) : Énorme (compétence critique + vitesse dev x2)

**Indicateurs de succès** :
- Couverture de code : > 80% sur services, > 60% sur composants
- Nombre de bugs en production : < 1 par mois
- Temps de debugging manuel : < 1h par semaine
- CI : 100% des builds verts sur `main`

**Conclusion sur cette action** :
C'est l'action corrective **la plus importante et la plus impactante** du dossier. Les tests ne sont pas une option mais une **nécessité professionnelle**. L'investissement initial (6 jours) est significatif mais absolument rentable. Sur un projet de 3 semaines, cela aurait représenté 30% du temps, mais aurait évité 80% des bugs et stress.

**Engagement personnel** : Sur tous mes projets futurs, j'intégrerai le testing dès le jour 1, avec objectif 80% de couverture.

<div style="page-break-after: always;"></div>

## 6. Amélioration et formation de l'équipe

### 6.1. Compétences techniques manquantes (Hard Skills)

#### 6.1.1. Testing automatisé (Critique - Priorité 1)

**Constat** :
Aucun des deux développeurs ne maîtrisait les frameworks de testing modernes (Jest, React Testing Library, Mocha, Cypress).

**Compétences précises manquantes** :
- Écriture de tests unitaires avec Jest
- Mocking de dépendances et d'API
- Tests de composants React (React Testing Library)
- Tests d'intégration backend (Supertest)
- Tests end-to-end (Cypress ou Playwright)
- Mesure et analyse de la couverture de code
- Test-Driven Development (TDD)

**Impact sur le projet** :
- Aucun test automatisé livré
- Bugs détectés tardivement
- Manque de confiance dans le code
- Temps perdu en tests manuels répétitifs (6h)

**Niveau actuel** : 1/10 (débutant)  
**Niveau cible** : 7/10 (intermédiaire avancé)

#### 6.1.2. Git avancé (Important - Priorité 2)

**Constat** :
Maîtrise basique de Git (add, commit, push) mais lacunes sur fonctionnalités avancées et résolution de problèmes.

**Compétences précises manquantes** :
- Stratégies de branching (Git Flow, GitHub Flow)
- Résolution de conflits de merge complexes
- Rebase interactif et squash de commits
- Utilisation de `git reflog` pour récupération d'urgence
- Cherry-pick de commits spécifiques
- Bisect pour trouver l'origine d'un bug
- Hooks Git pour automatisation

**Impact sur le projet** :
- 3 erreurs Git majeures
- 0,5 jour perdu en récupération
- Stress et panique temporaire
- Opportunités manquées (rebase, cherry-pick)

**Niveau actuel** : 4/10 (débutant avancé)  
**Niveau cible** : 7/10 (intermédiaire avancé)

#### 6.1.3. CI/CD et DevOps (Souhaitable - Priorité 3)

**Constat** :
Déploiement manuel et pas d'automatisation de la pipeline de livraison.

**Compétences précises manquantes** :
- Configuration de GitHub Actions / GitLab CI
- Docker et conteneurisation
- Scripts de déploiement automatisés
- Monitoring et logging en production
- Gestion des variables d'environnement sécurisées
- Rollback automatique en cas d'erreur

**Impact sur le projet** :
- Déploiement manuel chronophage
- Pas de validation automatique avant production
- Risque d'erreur humaine lors du déploiement

**Niveau actuel** : 2/10 (débutant)  
**Niveau cible** : 6/10 (intermédiaire)

#### 6.1.4. Documentation technique (Important - Priorité 2)

**Constat** :
Documentation produite principalement en fin de projet et parfois incomplète.

**Compétences précises manquantes** :
- Swagger/OpenAPI pour documentation API
- JSDoc pour documentation du code JavaScript
- Markdown avancé (diagrammes Mermaid, tables complexes)
- Documentation as Code (versionnée avec le code)
- Diagrammes d'architecture (UML, C4 model)

**Impact sur le projet** :
- Documentation Postman désynchronisée
- 0,3 jour perdu en debugging doc
- Difficultés d'onboarding potentielles

**Niveau actuel** : 4/10 (débutant avancé)  
**Niveau cible** : 7/10 (intermédiaire avancé)

### 6.2. Compétences comportementales manquantes (Soft Skills)

#### 6.2.1. Rigueur et discipline (Critique - Priorité 1)

**Constat** :
Tendance à prendre des raccourcis sous pression du délai (skip tests, commit sans vérifier branche, doc reportée).

**Comportements à développer** :
- Suivre systématiquement les checklists avant actions critiques
- Résister à la tentation des raccourcis même sous pression
- Appliquer le principe "fait bien vaut mieux que fait vite"
- Maintenir les standards de qualité même en fin de projet

**Impact sur le projet** :
- Erreurs évitables (Git, API)
- Dette technique accumulée
- Stress accru en fin de projet

**Niveau actuel** : 5/10 (moyen)  
**Niveau cible** : 8/10 (bon)

**Méthode de développement** :
- Habit stacking : associer action critique (commit) à vérification (checklist)
- Peer accountability : l'autre développeur rappelle les bonnes pratiques
- Rétrospectives : analyser les moments où rigueur a manqué

#### 6.2.2. Communication proactive (Important - Priorité 2)

**Constat** :
Communication réactive (réponse aux questions) plutôt que proactive (anticipation des besoins d'information).

**Comportements à développer** :
- Communiquer les blocages **avant** qu'ils ne deviennent critiques
- Partager les décisions techniques importantes sans attendre qu'on demande
- Over-communicate plutôt que sous-communiquer
- Documenter les décisions importantes par écrit (pas juste oral)

**Impact sur le projet** :
- Décalages backend/frontend par manque d'anticipation
- Décisions techniques non tracées

**Niveau actuel** : 6/10 (correct)  
**Niveau cible** : 8/10 (bon)

**Méthode de développement** :
- Rituel : partager fin de journée les décisions prises et blocages potentiels
- Template de message : "Décision X prise pour raison Y, impact Z"

#### 6.2.3. Gestion du temps et priorisation (Important - Priorité 2)

**Constat** :
Difficulté à arbitrer entre qualité et délai, tendance à privilégier les fonctionnalités au détriment de la qualité.

**Comportements à développer** :
- Évaluer réalistement le temps nécessaire (pas d'optimisme excessif)
- Prioriser selon la valeur et le risque (pas selon la préférence)
- Accepter de réduire le scope plutôt que la qualité
- Communiquer tôt si délai irréaliste

**Impact sur le projet** :
- Tests sacrifiés pour tenir les délais
- Stress en fin de projet
- Qualité inférieure aux attentes personnelles

**Niveau actuel** : 5/10 (moyen)  
**Niveau cible** : 7/10 (bon)

**Méthode de développement** :
- Matrice Eisenhower : classer tâches par urgent/important
- MoSCoW : Must have / Should have / Could have / Won't have
- Buffer de 30% : si j'estime 2h, allouer 3h

#### 6.2.4. Apprentissage continu (Souhaitable - Priorité 3)

**Constat** :
Apprentissage principalement "sur le tas" plutôt que structuré et anticipé.

**Comportements à développer** :
- Consacrer temps dédié à la formation (10% du temps = 0,5j/semaine)
- Apprendre avant d'en avoir besoin (testing avant projet suivant)
- Partager les apprentissages avec l'équipe
- Capitaliser sur les erreurs (documentation des lessons learned)

**Impact sur le projet** :
- Compétences manquantes découvertes en cours de projet
- Temps d'apprentissage empiétant sur temps de production

**Niveau actuel** : 6/10 (correct)  
**Niveau cible** : 8/10 (bon)

**Méthode de développement** :
- Vendredi après-midi = learning time (2h de formation)
- Learning log : documenter ce qui a été appris chaque semaine

<div style="page-break-after: always;"></div>

### 6.3. Actions de formation proposées

#### Formation 1 : Testing & TDD (3 jours - Priorité 1)

**Objectif** :
Maîtriser les tests automatisés (unitaires, intégration, E2E) et la méthodologie TDD.

**Programme** :
- Jour 1 : Tests unitaires avec Jest
- Jour 2 : Tests d'intégration (Supertest + React Testing Library)
- Jour 3 : TDD + Tests E2E (Cypress)

**Format** :
- Formation en ligne (Udemy, Frontend Masters) : 20h
- Pratique sur projet sandbox : 8h
- **Total : 28h (3,5 jours)**

**Coût** : 50€ (cours en ligne) + temps investi

**ROI attendu** :
- Compétence critique pour carrière professionnelle
- Gain de temps sur tous les projets futurs (-80% debugging)
- Confiance accrue dans le code produit

**Échéance** : Avant prochain projet (impératif)

#### Formation 2 : Git avancé (1 jour - Priorité 2)

**Objectif** :
Maîtriser Git en contexte collaboratif et savoir résoudre tous types de situations.

**Programme** :
- Matin : Branches, merge, rebase, résolution de conflits
- Après-midi : Reflog, cherry-pick, bisect, hooks

**Format** :
- Tutoriel interactif : Learn Git Branching (4h)
- Documentation Pro Git Book : chapitres avancés (3h)
- Pratique sur projet sandbox : 2h
- **Total : 9h (1 jour)**

**Coût** : Gratuit (ressources en ligne)

**ROI attendu** :
- Zéro erreur Git sur projets futurs
- Utilisation efficace de fonctionnalités avancées
- Confiance dans manipulation de l'historique

**Échéance** : Avant prochain projet

#### Formation 3 : CI/CD avec GitHub Actions (2 jours - Priorité 3)

**Objectif** :
Mettre en place une pipeline CI/CD complète avec tests et déploiement automatisés.

**Programme** :
- Jour 1 : GitHub Actions (workflows, jobs, steps, secrets)
- Jour 2 : Pipeline complète (tests → build → deploy)

**Format** :
- Documentation GitHub Actions officielle : 4h
- Tutoriels vidéo YouTube : 3h
- Mise en place sur projet réel : 8h
- **Total : 15h (2 jours)**

**Coût** : Gratuit

**ROI attendu** :
- Déploiements automatisés sans erreur
- Détection précoce des bugs (tests avant merge)
- Gain de temps sur déploiements (x10 plus rapide)

**Échéance** : Sur prochain projet (lors du setup initial)

#### Formation 4 : Documentation technique (Swagger, JSDoc) (1 jour - Priorité 2)

**Objectif** :
Produire une documentation technique professionnelle et maintenue à jour.

**Programme** :
- Matin : Swagger/OpenAPI (annotations, UI, auto-génération)
- Après-midi : JSDoc, Markdown avancé, diagrammes

**Format** :
- Documentation officielle Swagger : 3h
- Tutoriels JSDoc : 2h
- Mise en place sur projet : 4h
- **Total : 9h (1 jour)**

**Coût** : Gratuit

**ROI attendu** :
- Documentation toujours synchrone avec code
- Gain de temps pour binôme/futurs développeurs
- Standard professionnel respecté

**Échéance** : Sur prochain projet (lors du setup initial)

#### Formation 5 : Soft Skills - Organisation et rigueur (2 jours - Priorité 1)

**Objectif** :
Développer les habitudes et discipline nécessaires à un développement de qualité.

**Programme** :
- Jour 1 : Gestion du temps, priorisation (Eisenhower, MoSCoW)
- Jour 2 : Création de checklists, habitudes, discipline

**Format** :
- Livres : "Atomic Habits" (James Clear), "Deep Work" (Cal Newport) : 10h
- Mise en pratique : checklists, rituals, time-boxing : 6h
- **Total : 16h (2 jours)**

**Coût** : 40€ (livres)

**ROI attendu** :
- Meilleure qualité de travail (moins d'erreurs)
- Moins de stress (organisation claire)
- Productivité accrue (focus sur l'essentiel)

**Échéance** : Immédiat (applicable dès maintenant)

### 6.4. Impact attendu sur les projets futurs

#### Court terme (0-3 mois)

**Compétences acquises** :
- ✅ Testing automatisé (niveau intermédiaire)
- ✅ Git avancé (niveau intermédiaire)
- ✅ Rigueur et discipline (habitudes installées)

**Impact mesurable** :
- 80% des nouveaux projets avec tests automatisés
- Zéro erreur Git majeure
- Respect systématique des checklists

**Gain de productivité** : +20%

#### Moyen terme (3-12 mois)

**Compétences acquises** :
- ✅ CI/CD maîtrisée
- ✅ Documentation professionnelle systématique
- ✅ TDD devenu habitude naturelle

**Impact mesurable** :
- 100% des projets avec CI/CD
- Couverture de code > 80%
- Temps de debugging réduit de 60%

**Gain de productivité** : +40%

#### Long terme (12+ mois / Carrière)

**Profil développeur** :
- Développeur Full Stack Senior
- Expert en qualité logicielle (tests, CI/CD, doc)
- Mentor pour juniors sur bonnes pratiques

**Impact carrière** :
- Augmentation de salaire (profil senior)
- Opportunités professionnelles accrues
- Crédibilité technique reconnue

**Valeur globale** : Compétences clés différenciantes sur le marché

#### Synthèse du plan de formation

| Formation | Durée | Priorité | Échéance | Impact attendu |
|-----------|-------|----------|----------|----------------|
| Testing & TDD | 3,5j | 1 | Avant projet suivant | Critique |
| Git avancé | 1j | 2 | Avant projet suivant | Important |
| Soft Skills | 2j | 1 | Immédiat | Important |
| Documentation | 1j | 2 | Début projet suivant | Moyen |
| CI/CD | 2j | 3 | Début projet suivant | Moyen |
| **TOTAL** | **9,5 jours** | - | **1-2 mois** | **Transformateur** |

**Investissement total** : 9,5 jours + 90€  
**ROI** : Gain de productivité +40% à 1 an + compétences carrière

**Engagement** :
Je m'engage à réaliser les formations Priorité 1 et 2 (6,5 jours) **avant le prochain projet**, et à appliquer rigoureusement les apprentissages dès le début de celui-ci. L'objectif est de livrer un projet avec 80% de couverture de tests, zéro erreur Git, et une documentation professionnelle.

<div style="page-break-after: always;"></div>

## Conclusion

### Synthèse du projet Huma

Le projet Huma, application de suivi du bien-être et de feedback, a été un **projet formateur et ambitieux** mené en binôme sur 3 semaines. Malgré des contraintes importantes (équipe réduite, délai serré, première collaboration backend/frontend), nous avons réussi à livrer un **MVP fonctionnel et utilisable** comprenant 3 flux principaux (onboarding, check-in, feedbacks) et une interface soignée.

**Résultats quantitatifs** :
- ✅ 5 pages complètes et 10 composants réutilisables
- ✅ 5 services API intégrant 20+ endpoints
- ✅ Architecture propre et maintenable
- ✅ 80% des objectifs fonctionnels atteints
- ⚠️ 0% de couverture de tests (point faible majeur)

### Analyse de la gestion de projet

La gestion du projet a été **globalement efficace** grâce à une collaboration fluide, une communication régulière (2 points quotidiens), et une approche Agile adaptée à notre contexte. La coordination backend/frontend via documentation Postman et développement parallèle a été un **point fort** ayant permis une productivité élevée.

Cependant, **4 dysfonctionnements majeurs** ont été identifiés, coûtant environ 15% du temps total :
1. Synchronisation backend/frontend retardée (1,5j perdu)
2. Gestion Git chaotique (0,5j perdu)
3. Documentation API tardive et incomplète (0,3j perdu)
4. **Tests insuffisants (dysfonctionnement le plus grave)**

Ces dysfonctionnements, bien qu'ayant impacté le projet, constituent des **apprentissages précieux** pour ma progression professionnelle.

### Actions correctives et formation

Pour chaque dysfonctionnement, j'ai proposé des **actions correctives réalistes et justifiées** :
- **Kanban partagé** pour améliorer la synchronisation (-80% de blocages attendus)
- **Formation Git + checklists + protections** pour éliminer les erreurs
- **Swagger/OpenAPI + processus DoD** pour documentation de qualité
- **Formation Testing + TDD + CI/CD** pour résoudre le problème le plus critique

Le **plan de formation** de 9,5 jours sur 6 thématiques (testing, Git, soft skills, documentation, CI/CD) vise à transformer mes compétences et garantir la qualité de mes futurs projets. L'investissement est significatif mais le **ROI est indiscutable** : gain de productivité +40% à 1 an, compétences professionnelles essentielles, et crédibilité technique renforcée.

### Compétences développées

Ce projet m'a permis de développer des compétences techniques et transversales essentielles :

**Hard Skills** :
- Architecture frontend React avec couche de services
- Intégration API REST complète avec JWT
- Gestion d'état et persistance (localStorage)
- Design UI/UX avec CSS avancé (glassmorphism, animations)
- Versioning Git en contexte collaboratif
- Documentation technique (README, Markdown)

**Soft Skills** :
- Travail en équipe (coordination, communication, entraide)
- Adaptabilité face aux imprévus techniques
- Rigueur (malgré limites identifiées, prise de conscience)
- Autonomie et prise d'initiative
- Analyse critique de ma propre pratique

### Recul critique personnel

Avec le recul, je suis **satisfait du résultat fonctionnel** (MVP complet et interface soignée) mais **insatisfait de la qualité du code** (absence de tests). Cette expérience m'a fait prendre conscience que **qualité et rapidité ne sont pas antinomiques** mais complémentaires : des tests automatisés auraient certes pris du temps initial, mais auraient évité des heures de debugging manuel et augmenté la confiance dans le code.

Le principal **enseignement** de ce projet est que les bonnes pratiques professionnelles (tests, documentation, rigueur Git) ne sont **pas des options** mais des **nécessités**. Sur mes projets futurs, je n'accepterai plus les compromis sur la qualité, quitte à réduire le périmètre fonctionnel.

### Engagement pour l'avenir

Je m'engage à :
1. **Réaliser les formations Priorité 1 et 2** (testing, Git, soft skills) avant le prochain projet
2. **Appliquer rigoureusement** les apprentissages dès le premier jour du prochain projet
3. **Viser 80% de couverture de tests** sur tous mes projets futurs
4. **Maintenir un standard de qualité professionnelle** même sous pression

Ce dossier écrit, au-delà de l'exercice académique, a été un **outil d'introspection profonde** sur ma pratique de développeur. L'analyse critique des dysfonctionnements et la formalisation des actions correctives constituent une **feuille de route concrète** pour ma progression. Je suis confiant que la mise en œuvre de ces actions transformera significativement la qualité de mon travail et ma valeur professionnelle.

Le projet Huma, malgré ses imperfections, est une **fondation solide** sur laquelle je peux construire. Avec les apprentissages tirés et les formations prévues, je suis prêt à livrer des projets de **qualité professionnelle** alliant fonctionnalités, robustesse technique, et maintenabilité.

---

**Fin du dossier écrit individuel**

**Loris Jacob**  
MBA Développeur Full Stack  
25 février 2026

---

*Document de 30 pages (incluant sommaire et page de garde) respectant les contraintes de format : Times New Roman 12, format A4 portrait, avec sommaire et pagination.*
