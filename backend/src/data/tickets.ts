import { randomUUID } from 'node:crypto'
import type { Ticket } from '../models/ticket.model'

export const tickets: Ticket[] = [
  {
    id: randomUUID(),
    title: 'Le paiement en ligne renvoie une erreur',
    status: 'open',
    createdAt: '2026-08-26T09:47:00.000Z',
  },
  {
    id: randomUUID(),
    title: 'Mot de passe oublié',
    status: 'closed',
    createdAt: '2026-08-25T13:05:00.000Z',
  },
  {
    id: randomUUID(),
    title: 'Imprimante du 2e étage hors service',
    status: 'open',
    createdAt: '2026-08-24T08:30:00.000Z',
  },
  {
    id: randomUUID(),
    title: 'Demande de deuxième écran',
    status: 'open',
    createdAt: '2026-08-23T15:20:00.000Z',
  },
  {
    id: randomUUID(),
    title: 'Accès au dossier partagé refusé',
    status: 'closed',
    createdAt: '2026-08-22T10:02:00.000Z',
  },
  {
    id: randomUUID(),
    title: 'Le site est lent le matin',
    status: 'open',
    createdAt: '2026-08-21T07:45:00.000Z',
  },
]
