# Application de gestion de tickets

Consulter, créer et suivre des tickets de support. Le projet est un monorepo npm
qui réunit un front React, une API Express et un paquet de types partagés entre
les deux.

Documentation détaillée par projet :
[`backend/README.md`](backend/README.md) ·
[`frontend/README.md`](frontend/README.md)

## Fonctionnalités

- Consulter la liste des tickets : titre, statut et date de création.
- Créer un ticket à partir d'un titre ; la liste se met à jour sans recharger la
  page.
- Rechercher un ticket par son titre.
- Trier par date de création, du plus récent ou du plus ancien.
- Choisir le nombre de tickets affichés par page (5, 10 ou 20) et naviguer entre
  les pages.
- Fermer ou rouvrir un ticket.

Les données sont gardées **en mémoire** : elles repartent des six tickets de
départ à chaque redémarrage de l'API.

## Stack technique

| Partie    | Technologies                                                              |
| --------- | ------------------------------------------------------------------------- |
| Front     | React 19, TypeScript, Vite, TanStack Query, Tailwind CSS v4               |
| API       | Node.js, Express 5, TypeScript, zod, helmet, express-rate-limit           |
| Partagé   | Un paquet npm de types TypeScript, sans code à compiler                   |
| Tests     | Vitest partout, Supertest pour l'API, Testing Library pour les composants |
| Outillage | npm workspaces, ESLint, tsx, TypeScript en mode strict                    |

## Prérequis

- Node.js 20 ou plus récent

## Installation et démarrage

Une seule installation à la racine suffit pour les trois paquets.

```bash
npm install
npm run dev
```

- front : http://localhost:5173
- API : http://localhost:3001

## Scripts (à lancer depuis la racine)

| Script              | Rôle                               |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Démarre l'API et le front ensemble |
| `npm run dev:api`   | Démarre l'API seule                |
| `npm run dev:web`   | Démarre le front seul              |
| `npm run build`     | Compile l'API puis le front        |
| `npm test`          | Lance les tests des deux projets   |
| `npm run test:api`  | Lance les tests de l'API           |
| `npm run test:web`  | Lance les tests du front           |
| `npm run typecheck` | Vérifie les types des deux projets |
| `npm run lint`      | Lance ESLint sur le front          |

Chaque paquet garde ses propres scripts : `npm run <script> -w backend` ou
`-w frontend` permet de lancer n'importe lequel depuis la racine.

## Organisation du dépôt

```
shared/     types TypeScript communs (le contrat de l'API)
backend/    API Express + TypeScript, données en mémoire
frontend/   application React + TypeScript (Vite)
```

`shared` est un paquet npm déclaré dans les `workspaces` de la racine. npm crée
un lien vers lui dans `node_modules`, ce qui permet aux deux projets d'écrire :

```ts
import type { Ticket } from '@ticket-app/shared'
```

Il ne contient **que des types**, donc rien à compiler : un seul fichier de
déclaration, `shared/index.d.ts`. Si un champ du ticket change, les deux projets
voient l'erreur de type immédiatement.

## Architecture

Le chemin d'une action est toujours le même, du clic jusqu'aux données :

```
App.tsx                        page, nombre par page, recherche, tri
  |
  +- TicketForm / TicketFilters / TicketList          composants
       |
       +- useTickets / useCreateTicket / useUpdateTicketStatus    hooks
            |
            +- api/tickets.ts -> api/http.ts          un seul appel fetch
                        |
                        |  HTTP /api/...  (proxy Vite en développement)
                        v
              routes/tickets.routes.ts                quelle URL
                |
                +- controllers/tickets.controller.ts  validation zod, code HTTP
                     |
                     +- services/tickets.service.ts   règles métier
                          |
                          +- data/tickets.ts          tableau en mémoire
```

Deux règles tiennent l'ensemble :

- **Un composant n'appelle jamais `fetch` directement.** Il passe par un hook,
  qui passe par la couche `api`.
- **Le service ne connaît ni `req` ni `res`.** Le contrôleur traduit le résultat
  du service en réponse HTTP, ce qui rend les règles métier testables sans
  serveur.

## API en bref

| Méthode | URL                | Rôle                                                             |
| ------- | ------------------ | ---------------------------------------------------------------- |
| `GET`   | `/api/tickets`     | liste des tickets, avec recherche, tri et pagination facultatifs |
| `POST`  | `/api/tickets`     | créer un ticket                                                  |
| `PATCH` | `/api/tickets/:id` | changer le statut d'un ticket                                    |

Paramètres, formats de réponse et codes d'erreur :
[`backend/README.md`](backend/README.md).

## Choix techniques

- **Monorepo npm workspaces** plutôt que deux dépôts : une seule installation,
  un seul `package-lock.json`, et surtout un paquet de types partagé sans
  publication ni copier-coller. Aucun outil supplémentaire (pas de Nx, pas de
  Turborepo) pour un projet de cette taille.
- **Types partagés en `.d.ts`** : le contrat de l'API est écrit une fois et
  utilisé des deux côtés. Comme il n'y a que des types, aucun build n'est
  nécessaire avant de lancer le front ou l'API.
- **TanStack Query côté front** : la liste des tickets est une donnée du
  serveur, pas un état local. La librairie fournit directement les états
  demandés (chargement, erreur, création en cours, échec), et l'invalidation du
  cache recharge la liste après une création ou un changement de statut.
- **Appel `fetch` centralisé** plutôt qu'une librairie HTTP : une seule fonction
  gère l'adresse de l'API, le JSON et les messages d'erreur, en une trentaine de
  lignes.
- **zod côté API** : les données reçues sont validées avant d'atteindre le
  service, et le message d'erreur renvoyé au client vient du schéma.
- **Sécurité** : `helmet`, corps de requête limité à 10 ko, 100 requêtes par
  minute et par adresse IP, listes fermées pour le statut et le tri. Détail dans
  [`backend/README.md`](backend/README.md).
- **Proxy Vite** : en développement, le front appelle `/api` et Vite relaie vers
  Express, donc aucune configuration CORS.
- **Tailwind CSS v4 avec un mini design system** : couleurs et arrondi définis
  une seule fois dans `frontend/src/index.css`, réutilisés partout. Détail dans
  [`frontend/README.md`](frontend/README.md).
- **Pas de routeur ni de state manager** : l'application n'a qu'un écran, et
  React Query gère déjà l'état serveur.
- **Vitest des deux côtés** : la même façon d'écrire les tests pour l'API et
  pour le front. Supertest appelle l'API sans démarrer de vrai serveur.

## Conventions de code

- **TypeScript strict** partout, et le build échoue si les types ne passent pas
  (`tsc` est lancé avant la compilation du front).
- **Noms en anglais simple** pour le code (`getTickets`, `findTickets`,
  `useTickets`), **commentaires et messages d'erreur en français**.
- **Peu de commentaires, et seulement pour expliquer un choix** que le code ne
  montre pas ; le reste est documenté dans les README.
- **Petites fonctions à un seul rôle**, conditions explicites plutôt que
  raccourcis de syntaxe : le code doit se lire sans effort.
- **Un dossier par couche** côté API, **un composant par fichier** côté front.
- **Tests au bon niveau** : les règles métier sans Express, les routes à travers
  Express, les composants à travers ce que voit l'utilisateur.
