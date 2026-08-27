import { z } from 'zod'

// Zod vérifie le corps des requêtes avant que le contrôleur ne l'utilise.

const TITLE_MESSAGE = 'Le titre est obligatoire'
const PAGE_MESSAGE = 'Le numéro de page doit être un nombre entier supérieur à 0'
const PAGE_SIZE_MESSAGE = 'La taille de page doit être un nombre entier entre 1 et 50'
const STATUS_MESSAGE = 'Le statut doit valoir "open" ou "closed"'
const SEARCH_MESSAGE = 'La recherche ne doit pas dépasser 120 caractères'
const SORT_MESSAGE = 'Le tri doit valoir "asc" ou "desc"'

export const newTicketSchema = z.object({
  title: z
    .string(TITLE_MESSAGE)
    .trim()
    .min(1, TITLE_MESSAGE)
    .max(120, 'Le titre ne doit pas dépasser 120 caractères'),
})

export const ticketStatusSchema = z.object({
  status: z.enum(['open', 'closed'], STATUS_MESSAGE),
})

export const ticketsQuerySchema = z.object({
  search: z.string(SEARCH_MESSAGE).trim().max(120, SEARCH_MESSAGE).optional(),
  sort: z.enum(['asc', 'desc'], SORT_MESSAGE).optional(),
  page: z.coerce.number(PAGE_MESSAGE).int(PAGE_MESSAGE).min(1, PAGE_MESSAGE).optional(),
  pageSize: z.coerce
    .number(PAGE_SIZE_MESSAGE)
    .int(PAGE_SIZE_MESSAGE)
    .min(1, PAGE_SIZE_MESSAGE)
    .max(50, PAGE_SIZE_MESSAGE)
    .optional(),
})
