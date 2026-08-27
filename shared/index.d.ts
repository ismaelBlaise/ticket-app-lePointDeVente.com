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

// Réponse de la liste des tickets : une page et de quoi la situer.
export interface TicketPage {
  items: Ticket[]
  total: number
  page: number
  pageSize: number
}
