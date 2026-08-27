# Backend — Gestion de tickets

API REST Node.js + Express + TypeScript. Les données sont gardées en mémoire :
elles repartent de zéro à chaque redémarrage du serveur.

## Installation et démarrage

L'installation se fait à la racine du dépôt (monorepo npm) :

```bash
npm install            # à la racine
npm run dev:api        # http://localhost:3001
```

Les scripts ci-dessous se lancent dans `backend/`, ou depuis la racine avec
`npm run <script> -w backend`.

| Script              | Rôle                                  |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Serveur en développement (rechargement automatique) |
| `npm run build`     | Compile TypeScript vers `dist`        |
| `npm start`         | Lance le serveur compilé              |
| `npm test`          | Lance les tests (Vitest + Supertest)  |
| `npm run typecheck` | Vérifie les types sans compiler       |

Le port se change avec la variable `PORT` (voir `.env.example`). Le proxy du
front pointe sur `3001`.

## Organisation du code

```
src/
  server.ts                          démarre le serveur
  app.ts                             assemble Express : sécurité, JSON, routes
  app.test.ts                        tests des routes (Supertest)
  config/env.ts                      port d'écoute
  data/tickets.ts                    les tickets gardés en mémoire
  routes/tickets.routes.ts           les URLs
  controllers/tickets.controller.ts  lit la requête, renvoie la réponse
  services/tickets.service.ts        règles métier, lit les données
  services/tickets.service.test.ts   tests du service
  models/ticket.model.ts             forme d'un ticket (types de @ticket-app/shared)
  schemas/ticket.schema.ts           validation des données reçues (zod)
  middlewares/errors.ts              route inconnue et erreurs
  middlewares/security.ts            limite du nombre de requêtes
```

Une requête traverse toujours les couches dans le même ordre :

**route** (quelle URL) → **controller** (HTTP : lire la requête, choisir le code
de réponse) → **service** (les règles) → **data** (les tickets en mémoire).

Le contrôleur ne contient pas de logique métier, et le service ne connaît ni
`req` ni `res` : c'est ce qui rend le service testable seul.

## Routes

| Méthode | URL                                | Corps attendu        | Réponse                   |
| ------- | ---------------------------------- | -------------------- | ------------------------- |
| `GET`   | `/api/tickets`                     | —                    | `200` tous les tickets    |
| `GET`   | `/api/tickets?page=2&pageSize=5`   | —                    | `200` une page de tickets |
| `GET`   | `/api/tickets?search=imprimante`   | —                    | `200` les tickets trouvés |
| `GET`   | `/api/tickets?sort=asc`            | —                    | `200` les plus anciens d'abord |
| `POST`  | `/api/tickets`                     | `{ "title": "..." }` | `201` le ticket créé      |
| `PATCH` | `/api/tickets/:id`                 | `{ "status": "closed" }` | `200` le ticket modifié |

La lecture renvoie toujours la même forme, paginée ou non :

```json
{
  "items": [{ "id": "...", "title": "...", "status": "open", "createdAt": "..." }],
  "total": 6,
  "page": 1,
  "pageSize": 5
}
```

Tous les paramètres sont facultatifs et se combinent :

- `search` cherche dans le titre, sans tenir compte des majuscules, 120
  caractères au maximum ;
- `sort` vaut `desc` (par défaut, les plus récents d'abord) ou `asc` ;
- `page` et `pageSize` paginent le résultat. Sans eux, la réponse contient
  tous les tickets trouvés. Dès que l'un des deux est présent, `page` vaut 1
  et `pageSize` vaut 5 par défaut, sans dépasser 50.

`total` compte les tickets trouvés, pas la totalité de la base : c'est ce qui
permet au front de calculer le nombre de pages d'une recherche.

À la création, le serveur génère l'identifiant, met le statut à `open` et
enregistre la date. Le titre est obligatoire et limité à 120 caractères.

Le `PATCH` change uniquement le statut, qui vaut `open` ou `closed`. Un
identifiant inconnu renvoie `404`.

En cas d'erreur, la réponse est toujours `{ "message": "..." }`, avec le code
`400`, `404` (route inconnue) ou `500`.

## Sécurité

- `helmet` ajoute les en-têtes HTTP de sécurité et masque le serveur utilisé.
- Le corps des requêtes est limité à 10 ko.
- `express-rate-limit` limite chaque adresse IP à 100 appels par minute
  sur `/api`.
- Les données reçues passent par zod avant d'atteindre le service.
- La recherche compare du texte avec `includes` : aucune expression régulière
  n'est construite à partir de la saisie de l'utilisateur.

## Choix techniques

- **Express 5 + TypeScript strict** : `tsx` en développement pour le
  rechargement automatique, `tsc` pour le build.
- **zod** : la validation des données reçues est déclarée une fois dans
  `schemas/`, et le message d'erreur renvoyé au client vient de là.
- **Vitest + Supertest** : le service est testé seul (test unitaire) et les
  routes sont testées à travers Express. Supertest appelle l'API sans démarrer
  de vrai serveur, donc les tests sont rapides et n'occupent pas de port.
- **Pas de CORS** : en développement, le front passe par le proxy Vite, qui
  appelle l'API depuis la même origine.
