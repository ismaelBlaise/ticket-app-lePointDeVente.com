import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from './app'

describe('GET /api/tickets', () => {
  it('renvoie la liste des tickets', async () => {
    const response = await request(app).get('/api/tickets')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(6)
  })

  it('renvoie le titre, le statut et la date de chaque ticket', async () => {
    const response = await request(app).get('/api/tickets')

    expect(response.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      status: expect.stringMatching(/^(open|closed)$/),
      createdAt: expect.any(String),
    })
  })

  it("n'expose pas le serveur utilisé", async () => {
    const response = await request(app).get('/api/tickets')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('renvoie 404 sur une route inconnue', async () => {
    const response = await request(app).get('/api/inconnu')

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Route introuvable')
  })
})
