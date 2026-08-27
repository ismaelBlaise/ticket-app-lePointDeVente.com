import type { NewTicket, Ticket, TicketPage, TicketSort } from '@ticket-app/shared'
import { get, post } from './http'

export interface TicketsQuery {
  page: number
  pageSize: number
  search: string
  sort: TicketSort
}

export function getTickets(query: TicketsQuery): Promise<TicketPage> {
  // URLSearchParams encode proprement les espaces et les accents.
  const params = new URLSearchParams({
    page: String(query.page),
    pageSize: String(query.pageSize),
    sort: query.sort,
  })

  if (query.search !== '') {
    params.set('search', query.search)
  }

  return get<TicketPage>(`/tickets?${params.toString()}`)
}

export function createTicket(ticket: NewTicket): Promise<Ticket> {
  return post<Ticket>('/tickets', ticket)
}
