import rateLimit from 'express-rate-limit'

export const apiRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de requêtes, réessayez dans une minute' },
})
