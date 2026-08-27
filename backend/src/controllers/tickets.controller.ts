import type { Request, Response } from 'express'
import { newTicketSchema, ticketsQuerySchema } from '../schemas/ticket.schema'
import { create, findTickets } from '../services/tickets.service'

// Le contrôleur fait le lien entre la requête HTTP et le service :
// il lit la requête, appelle le service et choisit le code de réponse.

export function getTickets(req: Request, res: Response): void {
  const result = ticketsQuerySchema.safeParse(req.query)

  if (!result.success) {
    res.status(400).json({ message: result.error.issues[0].message })
    return
  }

  res.status(200).json(findTickets(result.data))
}

export function postTicket(req: Request, res: Response): void {
  const result = newTicketSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({ message: result.error.issues[0].message })
    return
  }

  const ticket = create(result.data)
  res.status(201).json(ticket)
}
