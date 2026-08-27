# Application de gestion de tickets

Consulter et créer des tickets. Le projet est un monorepo npm : un front React,
une API Express et un paquet de types partagés entre les deux.

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

| Script              | Rôle                                     |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Démarre l'API et le front ensemble       |
| `npm run dev:api`   | Démarre l'API seule                      |
| `npm run dev:web`   | Démarre le front seul                    |
| `npm run build`     | Compile l'API puis le front              |
| `npm test`          | Lance les tests de l'API                 |
| `npm run typecheck` | Vérifie les types des deux projets       |
| `npm run lint`      | Lance ESLint sur le front                |

Chaque paquet garde ses propres scripts : `npm run <script> -w backend` ou
`-w frontend` permet de lancer n'importe lequel depuis la racine.

## Organisation du dépôt

```
shared/     types TypeScript communs (le contrat de l'API)
backend/    API Express + TypeScript, données en mémoire
frontend/   application React + TypeScript (Vite)
```

Le dossier `shared` est un paquet npm déclaré dans les `workspaces` de la
racine. npm crée un lien vers lui dans `node_modules`, ce qui permet aux deux
projets d'écrire :

```ts
import type { Ticket } from '@ticket-app/shared'
```

Il ne contient **que des types**, donc rien à compiler : un seul fichier de
déclaration, `shared/index.d.ts`. Si un champ du ticket change, les deux
projets voient l'erreur de type immédiatement.

Le détail de chaque projet est documenté dans `backend/README.md` et
`frontend/README.md`.
