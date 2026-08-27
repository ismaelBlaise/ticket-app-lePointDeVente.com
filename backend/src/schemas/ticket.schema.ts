import { z } from 'zod'

// Zod vérifie le corps des requêtes avant que le contrôleur ne l'utilise.

const TITLE_MESSAGE = 'Le titre est obligatoire'

export const newTicketSchema = z.object({
  title: z
    .string(TITLE_MESSAGE)
    .trim()
    .min(1, TITLE_MESSAGE)
    .max(120, 'Le titre ne doit pas dépasser 120 caractères'),
})
