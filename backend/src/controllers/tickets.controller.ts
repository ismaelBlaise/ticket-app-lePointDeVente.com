import type { Request, Response } from 'express'
import { newTicketSchema } from '../schemas/ticket.schema'
import { create, findAll } from '../services/tickets.service'

// Le contrôleur fait le lien entre la requête HTTP et le service :
// il lit la requête, appelle le service et choisit le code de réponse.

export function getTickets(_req: Request, res: Response): void {
  res.status(200).json(findAll())
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
