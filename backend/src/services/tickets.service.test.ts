import { describe, expect, it } from 'vitest'
import { create, findAll } from './tickets.service'

describe('service tickets', () => {
  it('renvoie les tickets de départ', () => {
    const tickets = findAll()

    expect(tickets).toHaveLength(6)
    expect(tickets[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      createdAt: expect.any(String),
    })
  })

  it('renvoie une copie : modifier le résultat ne change pas les données', () => {
    const tickets = findAll()
    tickets.pop()

    expect(findAll()).toHaveLength(6)
  })

  it('crée un ticket ouvert et le place en tête de liste', () => {
    const before = findAll()
    const ticket = create({ title: 'Écran cassé' })
    const after = findAll()

    expect(ticket).toMatchObject({ title: 'Écran cassé', status: 'open' })
    expect(ticket.id).toBeTruthy()
    expect(ticket.createdAt).toBeTruthy()
    expect(after).toHaveLength(before.length + 1)
    expect(after[0].title).toBe('Écran cassé')
  })
})
