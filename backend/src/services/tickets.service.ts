import { tickets } from '../data/tickets'
import type { Ticket } from '../models/ticket.model'

// Le service contient les données et les règles métier.
// Les tickets sont gardés en mémoire : ils repartent de zéro au redémarrage.

export function findAll(): Ticket[] {
  return [...tickets]
}
