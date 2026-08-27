import { describe, expect, it } from 'vitest'
import { findAll } from './tickets.service'

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
})
