import { describe, expect, it } from 'vitest'
import { create, findAll, findPage } from './tickets.service'

describe('service tickets', () => {
  it('renvoie tous les tickets de départ', () => {
    const page = findAll()

    expect(page.items).toHaveLength(6)
    expect(page.total).toBe(6)
    expect(page.items[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      createdAt: expect.any(String),
    })
  })

  it('renvoie une page et le nombre total de tickets', () => {
    const page = findPage(1, 5)

    expect(page.items).toHaveLength(5)
    expect(page.total).toBe(6)
    expect(page.page).toBe(1)
    expect(page.pageSize).toBe(5)
  })

  it('renvoie le reste des tickets sur la page suivante', () => {
    expect(findPage(2, 5).items).toHaveLength(1)
  })

  it('renvoie une page vide au-delà du dernier ticket', () => {
    expect(findPage(10, 5).items).toEqual([])
  })

  it('crée un ticket ouvert et le place en tête de liste', () => {
    const before = findAll()
    const ticket = create({ title: 'Écran cassé' })
    const after = findAll()

    expect(ticket).toMatchObject({ title: 'Écran cassé', status: 'open' })
    expect(ticket.id).toBeTruthy()
    expect(ticket.createdAt).toBeTruthy()
    expect(after.items).toHaveLength(before.total + 1)
    expect(after.items[0].title).toBe('Écran cassé')
  })
})
