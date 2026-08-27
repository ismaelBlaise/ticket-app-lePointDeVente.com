export type TicketStatus = 'open' | 'closed'

export interface Ticket {
  id: string
  title: string
  status: TicketStatus
  createdAt: string
}

// Ce que le formulaire envoie. Le serveur ajoute l'id, le statut et la date.
export interface NewTicket {
  title: string
}

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Ouvert',
  closed: 'Fermé',
}
