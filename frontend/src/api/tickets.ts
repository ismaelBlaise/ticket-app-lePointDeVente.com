import type { NewTicket, Ticket } from '@/types/ticket'
import { get, post } from './http'

export function getTickets(): Promise<Ticket[]> {
  return get<Ticket[]>('/tickets')
}

export function createTicket(ticket: NewTicket): Promise<Ticket> {
  return post<Ticket>('/tickets', ticket)
}
