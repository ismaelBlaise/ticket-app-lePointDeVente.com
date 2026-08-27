# Backend — Gestion de tickets

API REST Node.js + Express + TypeScript. Les données sont gardées en mémoire :
elles repartent de zéro à chaque redémarrage du serveur.

## Installation et démarrage

```bash
npm install
npm run dev            # http://localhost:3001
```

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
  app.ts                             assemble Express : JSON, routes, erreurs
  config/env.ts                      port d'écoute
  routes/tickets.routes.ts           les URLs
  controllers/tickets.controller.ts  lit la requête, renvoie la réponse
  services/tickets.service.ts        données en mémoire et règles métier
  models/ticket.model.ts             forme d'un ticket
  schemas/ticket.schema.ts           validation des données reçues (zod)
  middlewares/errors.ts              route inconnue et erreurs
```

Une requête traverse toujours les couches dans le même ordre :

**route** (quelle URL) → **controller** (HTTP : lire la requête, choisir le code
de réponse) → **service** (les données et les règles) → **model** (les types).

Le contrôleur ne contient pas de logique métier, et le service ne connaît ni
`req` ni `res` : c'est ce qui rend le service testable seul.

## Choix techniques

- **Express 5 + TypeScript strict** : `tsx` en développement pour le
  rechargement automatique, `tsc` pour le build.
- **zod** : la validation des données reçues est déclarée une fois dans
  `schemas/`, et le message d'erreur renvoyé au client vient de là.
- **Vitest + Supertest** : Supertest appelle l'API sans démarrer de vrai
  serveur, donc les tests sont rapides et n'occupent pas de port.
- **Pas de CORS** : en développement, le front passe par le proxy Vite, qui
  appelle l'API depuis la même origine.
