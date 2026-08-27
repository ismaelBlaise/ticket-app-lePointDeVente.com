import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from './app'

describe('GET /api/tickets', () => {
  it('renvoie tous les tickets quand aucun paramètre n\'est donné', async () => {
    const response = await request(app).get('/api/tickets')

    expect(response.status).toBe(200)
    expect(response.body.total).toBe(6)
    expect(response.body.items).toHaveLength(6)
  })

  it('renvoie le titre, le statut et la date de chaque ticket', async () => {
    const response = await request(app).get('/api/tickets')

    expect(response.body.items[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      status: expect.stringMatching(/^(open|closed)$/),
      createdAt: expect.any(String),
    })
  })

  it('renvoie une page quand on demande un numéro de page', async () => {
    const response = await request(app).get('/api/tickets?page=2')

    expect(response.body.page).toBe(2)
    expect(response.body.pageSize).toBe(5)
    expect(response.body.items).toHaveLength(1)
  })

  it('accepte une taille de page seule', async () => {
    const response = await request(app).get('/api/tickets?pageSize=2')

    expect(response.body.page).toBe(1)
    expect(response.body.items).toHaveLength(2)
  })

  it('refuse un numéro de page invalide', async () => {
    const response = await request(app).get('/api/tickets?page=0')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Le numéro de page doit être un nombre entier supérieur à 0')
  })

  it('refuse une taille de page trop grande', async () => {
    const response = await request(app).get('/api/tickets?pageSize=500')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('La taille de page doit être un nombre entier entre 1 et 50')
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

describe('POST /api/tickets', () => {
  it('crée un ticket et le renvoie', async () => {
    const response = await request(app).post('/api/tickets').send({ title: 'Écran cassé' })

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({ title: 'Écran cassé', status: 'open' })
    expect(response.body.id).toBeTruthy()
  })

  it('ajoute le ticket créé à la liste', async () => {
    const before = await request(app).get('/api/tickets')
    await request(app).post('/api/tickets').send({ title: 'Souris défectueuse' })
    const after = await request(app).get('/api/tickets')

    expect(after.body.items).toHaveLength(before.body.total + 1)
    expect(after.body.items[0].title).toBe('Souris défectueuse')
  })

  it('refuse un titre vide', async () => {
    const response = await request(app).post('/api/tickets').send({ title: '   ' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Le titre est obligatoire')
  })

  it('refuse un titre trop long', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .send({ title: 'a'.repeat(121) })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Le titre ne doit pas dépasser 120 caractères')
  })
})
