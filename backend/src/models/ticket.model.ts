// Le modèle décrit la forme d'un ticket. Le front utilise les mêmes champs.

export type TicketStatus = 'open' | 'closed'

export interface Ticket {
  id: string
  title: string
  status: TicketStatus
  createdAt: string
}

// Ce que le client envoie pour créer un ticket.
export interface NewTicket {
  title: string
}
