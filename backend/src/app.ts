import express from 'express'
import helmet from 'helmet'
import { errorHandler, notFound } from './middlewares/errors'
import { apiRateLimit } from './middlewares/security'
import { ticketsRouter } from './routes/tickets.routes'

export const app = express()

app.use(helmet())
app.use(express.json({ limit: '10kb' }))
app.use('/api', apiRateLimit)
app.use('/api/tickets', ticketsRouter)
app.use(notFound)
app.use(errorHandler)
