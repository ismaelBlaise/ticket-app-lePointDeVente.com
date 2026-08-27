import { z } from 'zod'

// Zod vérifie le corps des requêtes avant que le contrôleur ne l'utilise.
export const newTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est obligatoire')
    .max(120, 'Le titre ne doit pas dépasser 120 caractères'),
})
