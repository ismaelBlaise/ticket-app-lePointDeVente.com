import type { Ticket } from '../models/ticket.model'

// Le service contient les données et les règles métier.
// Les tickets sont gardés en mémoire : ils repartent de zéro au redémarrage.
// Lecture et création : user stories 1 et 2.
export const tickets: Ticket[] = []
