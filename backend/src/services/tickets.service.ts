import { randomUUID } from 'node:crypto'
import { tickets } from '../data/tickets'
import type { NewTicket, Ticket } from '../models/ticket.model'

// Le service contient les données et les règles métier.
// Les tickets sont gardés en mémoire : ils repartent de zéro au redémarrage.

export function findAll(): Ticket[] {
  return [...tickets]
}

export function create(newTicket: NewTicket): Ticket {
  const ticket: Ticket = {
    id: randomUUID(),
    title: newTicket.title,
    status: 'open',
    createdAt: new Date().toISOString(),
  }

  tickets.unshift(ticket)
  return ticket
}
