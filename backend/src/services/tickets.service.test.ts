import { describe, expect, it } from 'vitest'
import { create, findTickets } from './tickets.service'

describe('service tickets', () => {
  it('renvoie tous les tickets quand aucune option n\'est donnée', () => {
    const page = findTickets({})

    expect(page.items).toHaveLength(6)
    expect(page.total).toBe(6)
  })

  it('trie du plus récent au plus ancien par défaut', () => {
    const page = findTickets({})

    expect(page.items[0].title).toBe('Le paiement en ligne renvoie une erreur')
  })

  it('trie du plus ancien au plus récent avec sort asc', () => {
    const page = findTickets({ sort: 'asc' })

    expect(page.items[0].title).toBe('Le site est lent le matin')
  })

  it('cherche dans le titre sans tenir compte des majuscules', () => {
    const page = findTickets({ search: 'IMPRIMANTE' })

    expect(page.items).toHaveLength(1)
    expect(page.total).toBe(1)
    expect(page.items[0].title).toBe('Imprimante du 2e étage hors service')
  })

  it('renvoie une page vide quand la recherche ne trouve rien', () => {
    const page = findTickets({ search: 'zzz' })

    expect(page.items).toEqual([])
    expect(page.total).toBe(0)
  })

  it('pagine les tickets trouvés', () => {
    const page = findTickets({ page: 2, pageSize: 5 })

    expect(page.items).toHaveLength(1)
    expect(page.total).toBe(6)
  })

  it('crée un ticket ouvert et le place en tête de liste', () => {
    const ticket = create({ title: 'Écran cassé' })
    const page = findTickets({})

    expect(ticket).toMatchObject({ title: 'Écran cassé', status: 'open' })
    expect(ticket.id).toBeTruthy()
    expect(page.items[0].title).toBe('Écran cassé')
    expect(page.total).toBe(7)
  })
})
