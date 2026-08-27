import express from 'express'
import { errorHandler, notFound } from './middlewares/errors'
import { ticketsRouter } from './routes/tickets.routes'

export const app = express()

app.use(express.json())
app.use('/api/tickets', ticketsRouter)
app.use(notFound)
app.use(errorHandler)
