import { randomUUID } from 'node:crypto'
import { tickets } from '../data/tickets'
import type { NewTicket, Ticket, TicketPage } from '../models/ticket.model'

// Le service contient les données et les règles métier.
// Les tickets sont gardés en mémoire : ils repartent de zéro au redémarrage.

export const DEFAULT_PAGE_SIZE = 5

export function findAll(): TicketPage {
  return {
    items: [...tickets],
    total: tickets.length,
    page: 1,
    pageSize: tickets.length,
  }
}

export function findPage(page: number, pageSize: number): TicketPage {
  const start = (page - 1) * pageSize

  return {
    items: tickets.slice(start, start + pageSize),
    total: tickets.length,
    page,
    pageSize,
  }
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
