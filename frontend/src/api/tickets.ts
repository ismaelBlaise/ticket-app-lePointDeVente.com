import type { NewTicket, Ticket } from '@ticket-app/shared'
import { get, post } from './http'

export function getTickets(): Promise<Ticket[]> {
  return get<Ticket[]>('/tickets')
}

export function createTicket(ticket: NewTicket): Promise<Ticket> {
  return post<Ticket>('/tickets', ticket)
}
