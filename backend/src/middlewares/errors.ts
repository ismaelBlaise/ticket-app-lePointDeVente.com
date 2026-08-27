import type { NextFunction, Request, Response } from 'express'

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ message: 'Route introuvable' })
}

// Dernier filet : toute erreur répond avec le même format { message }.
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Le corps de la requête doit être un JSON valide' })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Erreur du serveur' })
}
