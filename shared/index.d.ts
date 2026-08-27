// Types partagés par le front et le back : c'est le contrat de l'API.
// Le fichier ne contient que des types, il n'y a donc rien à compiler.

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

// Ce que le client envoie pour changer le statut d'un ticket.
export interface TicketStatusUpdate {
  status: TicketStatus
}

// Ordre de tri par date de création : du plus ancien ou du plus récent.
export type TicketSort = 'asc' | 'desc'

// Réponse de la liste des tickets : une page et de quoi la situer.
export interface TicketPage {
  items: Ticket[]
  total: number
  page: number
  pageSize: number
}
