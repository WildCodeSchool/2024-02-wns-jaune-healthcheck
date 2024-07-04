# Health-checker

Health-checker permet de vérifier si un service web est en ligne.

## Languages & Tools

![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Type-graphql](https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Installation

Le projet tourne sous Docker.
Une seule commande est nécessaire pour installer le projet.

> Renseigner les variables d'environnements
```env
VITE_API_URL=

BACKEND_PORT=4000

POSTGRES_HOST=db
POSTGRES_USER=test
POSTGRES_DB=healthchecker
POSTGRES_PASSWORD=test
```

> Environnement de développement
```bash
docker-compose -f docker-compose.dev.yaml up --build
```
ou utiliser les commandes dans le fichier `Makefile`
```bash
make build-dev
```

Par la suite, utiliser :

```bash
docker-compose -f docker-compose.dev.yaml up
```
ou 
```bash
make run-dev
```