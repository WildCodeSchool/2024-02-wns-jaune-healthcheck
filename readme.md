![Cover](https://github.com/WildCodeSchool/2024-02-wns-jaune-healthcheck/blob/develop/branding-readme.png?raw=true)
<br>

## A propos du projet

Health-checker est une application web permettant de surveiller l'état de santé de services web.

### Réalisé avec

![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

![Type-graphql](https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Démarrer
Suivez les instructions suivantes pour l'exécuter dans votre environnement local.

### Prérequis

* <a href="https://git-scm.com/downloads">Git</a>
* <a href="https://www.docker.com">Docker Desktop</a>

### Installation

Le projet est exécuté dans un environnement Docker

> 1. Cloner le répertoire de travail

 ```bash
 git clone https://github.com/WildCodeSchool/2024-02-wns-jaune-healthcheck.git
 ```

> 2. Aller dans le repertoire source du projet
```
cd 2024-02-wns-jaune-healthcheck
```

> 3. Créer le fichier pour les variables d'environnement
```
touch .env
```

> 4. Renseigner les variables d'environnement

```env
# Environement
APP_ENV=

# Frontend
VITE_API_URL=
VITE_WS_URL=
BACKEND_PORT=

# Database
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=

# Authentification
JWT_SECRET_KEY=
COOKIE_TTL=

# Stripe
VITE_STRIPE_PUBLIC_KEY="pk_test_xxx"
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_TIER_PRICE_ID=
STRIPE_PREMIUM_PRICE_ID=
```

> 5. Démarrer l'application en environnement de développement

```bash
docker compose -f docker-compose.dev.yaml up --build --detach
```

ou utiliser les commandes dans le fichier `Makefile`

```bash
make build-dev
```

Par la suite, utiliser :

```bash
docker compose -f docker-compose.dev.yaml up --detach
```

ou

```bash
make run-dev
```

### Jeu de données

Deux types de jeu de données sont présents sur le projet.

> 1. Ajouter automatiquement 39 URLs à la base de donnée

Le script _populateUrls_ permet d'insérer des URLs via la commande _npm run populate-db_

> 2. Tester l'ajout d'URL, User et History

Le script _generateFixtures_ permet des données test via la commande _npm run seed_

> 3. Environnement de test

Ensuite, exécutez :

```bash
docker compose -f docker-compose.test.yaml up --build
```

ou utiliser les commandes dans le fichier `Makefile`

```bash
make build-test
```

Par la suite, utiliser :

```bash
docker compose -f docker-compose.test.yaml up
```

ou

```bash
make run-test
```

Cet environnement de test, exécute automatiquement les deux scripts ci-dessus ainsi que tous les tests de l'application (front-end et back-end)

### Client

L'application Web **Health-checker** est exposée en local sur le port _8000_.

Après avoir crée un compte, il est possible de tester le système d'abonnement.
L'API Stripe fournit deux numéro de cartes à cet effet :

```
4242 4242 4242 4242 : Paiement réussi
4000 0000 0000 9995 : Paiement refusé
```
