import type { NewTicket, Ticket, TicketPage } from '@ticket-app/shared'
import { get, post } from './http'

export function getTickets(page: number, pageSize: number): Promise<TicketPage> {
  return get<TicketPage>(`/tickets?page=${page}&pageSize=${pageSize}`)
}

export function createTicket(ticket: NewTicket): Promise<Ticket> {
  return post<Ticket>('/tickets', ticket)
}
