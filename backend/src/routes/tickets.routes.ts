import { Router } from 'express'
import { getTickets } from '../controllers/tickets.controller'

// Les routes associent une URL à une fonction du contrôleur.

export const ticketsRouter = Router()

ticketsRouter.get('/', getTickets)
