import type { Request, Response } from 'express'
import { findAll } from '../services/tickets.service'

// Le contrôleur fait le lien entre la requête HTTP et le service :
// il lit la requête, appelle le service et choisit le code de réponse.

export function getTickets(_req: Request, res: Response): void {
  res.status(200).json(findAll())
}
