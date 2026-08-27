# Frontend — Gestion de tickets

Application React + TypeScript (Vite) permettant de consulter et de créer des tickets.

## Prérequis

- Node.js 20+
- L'API Express du dossier `backend` démarrée sur le port `3001`

## Installation et démarrage

L'installation se fait à la racine du dépôt (monorepo npm) :

```bash
npm install            # à la racine
npm run dev:web        # http://localhost:5173
```

Les scripts ci-dessous se lancent dans `frontend/`, ou depuis la racine avec
`npm run <script> -w frontend`.

| Script              | Rôle                                        |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Serveur de développement Vite               |
| `npm run build`     | Vérification des types puis build de `dist` |
| `npm run preview`   | Sert le build de production                 |
| `npm test`          | Tests des composants (Vitest + jsdom)       |
| `npm run lint`      | ESLint sur tout le projet                   |
| `npm run typecheck` | Vérification TypeScript seule               |

En développement, les appels vers `/api` sont redirigés vers `http://localhost:3001`
par le proxy déclaré dans `vite.config.ts` : il n'y a pas de CORS à configurer.
En production, la variable `VITE_API_URL` (voir `.env.example`) doit contenir
l'adresse du backend.

## Organisation du code

```
src/
  main.tsx             Point d'entrée : QueryClient + affichage de <App />
  App.tsx              L'écran de l'application
  index.css            Tailwind + design system (couleurs, arrondi)
  api/http.ts          Appel fetch commun (adresse, JSON, erreurs)
  api/tickets.ts       getTickets / createTicket
  hooks/useTickets.ts  useTickets / useCreateTicket
  components/          TicketList et les composants réutilisables
                       (Button, Input, Badge, Message)
  utils/date.ts        Affichage des dates
  utils/status.ts      Libellés des statuts
```

Les dépendances vont toujours dans le même sens :
`components` → `hooks` → `api`. Un composant n'appelle jamais `fetch`
directement.

Les types du ticket viennent du paquet `@ticket-app/shared`, partagé avec l'API
(voir le README à la racine).

## Design system

Les valeurs communes (couleurs, arrondi) sont déclarées une seule fois dans le
bloc `@theme` de `src/index.css`. Tailwind fabrique automatiquement les classes
correspondantes, utilisables partout dans l'application :

| Variable                       | Classes disponibles                    | Usage                       |
| ------------------------------ | -------------------------------------- | --------------------------- |
| `--color-brand` / `-dark`      | `bg-brand`, `text-brand`, `hover:bg-brand-dark` | Boutons, liens     |
| `--color-page` / `--color-surface` | `bg-page`, `bg-surface`            | Fond de page, blocs blancs  |
| `--color-line`                 | `border-line`                          | Bordures                    |
| `--color-text` / `--color-muted` | `text-muted`                         | Texte principal, secondaire |
| `--color-danger` / `-light`    | `text-danger`, `bg-danger-light`       | Erreurs                     |
| `--color-success` / `-light`   | `text-success`, `bg-success-light`     | Ticket ouvert               |
| `--radius-box`                 | `rounded-box`                          | Arrondi de tous les blocs   |

Changer une couleur de l'application se fait donc à un seul endroit. Les
composants de `src/components` n'utilisent que ces classes, jamais une couleur
Tailwind brute comme `bg-blue-600`.

## Choix techniques

- **Vite + React + TypeScript strict** : démarrage rapide et types vérifiés au
  build (`tsc -b` est lancé avant `vite build`).
- **TanStack Query** : la liste des tickets est une donnée du serveur, pas un
  état local. La librairie fournit directement les états demandés par l'énoncé
  (chargement, erreur, création en cours, échec de la création) et
  `invalidateQueries` recharge la liste après un ajout, sans recharger la page.
- **Appel `fetch` centralisé** (`api/http.ts`) : une seule fonction gère
  l'adresse de l'API, le JSON et les messages d'erreur. Pas de librairie HTTP
  supplémentaire.
- **Tailwind CSS v4** : styles écrits dans le JSX via le plugin
  `@tailwindcss/vite`, aucun fichier de configuration. Les couleurs passent par
  le design system ci-dessus. L'énoncé ne demande pas de travail visuel.
- **Alias `@/`** : imports absolus, déclaré dans `vite.config.ts` et
  `tsconfig.app.json`.
- **Vitest + Testing Library** : les tests rendent `TicketList` avec un `fetch`
  remplacé par une fausse fonction, et vérifient les quatre états de la liste :
  chargement, erreur, liste vide et tickets affichés.
- **Pas de routeur ni de state manager** : l'application n'a qu'un écran.
