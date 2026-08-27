import { randomUUID } from 'node:crypto'
import { tickets } from '../data/tickets'
import type { NewTicket, Ticket, TicketPage, TicketSort } from '../models/ticket.model'

// Le service contient les données et les règles métier.
// Les tickets sont gardés en mémoire : ils repartent de zéro au redémarrage.

export const DEFAULT_PAGE_SIZE = 5

export interface FindOptions {
  search?: string
  sort?: TicketSort
  page?: number
  pageSize?: number
}

function filterByTitle(list: Ticket[], search: string | undefined): Ticket[] {
  if (search === undefined || search === '') {
    return list
  }

  const text = search.toLowerCase()
  return list.filter((ticket) => ticket.title.toLowerCase().includes(text))
}

function sortByDate(list: Ticket[], sort: TicketSort | undefined): Ticket[] {
  const sorted = [...list].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  // Par défaut, les tickets les plus récents en premier.
  if (sort !== 'asc') {
    sorted.reverse()
  }

  return sorted
}

export function findTickets(options: FindOptions): TicketPage {
  const found = filterByTitle(tickets, options.search)
  const sorted = sortByDate(found, options.sort)

  if (options.page === undefined && options.pageSize === undefined) {
    return {
      items: sorted,
      total: sorted.length,
      page: 1,
      pageSize: sorted.length,
    }
  }

  const page = options.page === undefined ? 1 : options.page
  const pageSize = options.pageSize === undefined ? DEFAULT_PAGE_SIZE : options.pageSize
  const start = (page - 1) * pageSize

  return {
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
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
