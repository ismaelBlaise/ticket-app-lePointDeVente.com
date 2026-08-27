import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TicketList } from './TicketList'

function mockFetch(body: unknown, ok = true) {
  const response = { ok, status: ok ? 200 : 500, json: async () => body }

  vi.stubGlobal('fetch', vi.fn(async () => response))
}

function renderList(page = 1, onPageChange = vi.fn()) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <TicketList page={page} onPageChange={onPageChange} />
    </QueryClientProvider>,
  )

  return onPageChange
}

const ticket = {
  id: '1',
  title: 'Imprimante hors service',
  status: 'open',
  createdAt: '2026-08-24T08:30:00.000Z',
}

describe('TicketList', () => {
  it('affiche le titre, le statut et la date de chaque ticket', async () => {
    mockFetch({ items: [ticket], total: 1, page: 1, pageSize: 5 })
    renderList()

    expect(await screen.findByText('Imprimante hors service')).toBeDefined()
    expect(screen.getByText('Ouvert')).toBeDefined()
    expect(screen.getByText(/2026/)).toBeDefined()
  })

  it('affiche un message pendant le chargement', () => {
    mockFetch({ items: [], total: 0, page: 1, pageSize: 5 })
    renderList()

    expect(screen.getByRole('status')).toBeDefined()
  })

  it("affiche un message quand il n'y a aucun ticket", async () => {
    mockFetch({ items: [], total: 0, page: 1, pageSize: 5 })
    renderList()

    expect(await screen.findByText('Aucun ticket pour le moment.')).toBeDefined()
  })

  it("affiche l'erreur renvoyée par l'API", async () => {
    mockFetch({ message: 'Erreur du serveur' }, false)
    renderList()

    expect(await screen.findByRole('alert')).toBeDefined()
    expect(screen.getByText('Erreur du serveur')).toBeDefined()
  })

  it('cache la pagination quand il n\'y a qu\'une page', async () => {
    mockFetch({ items: [ticket], total: 1, page: 1, pageSize: 5 })
    renderList()

    await screen.findByText('Imprimante hors service')
    expect(screen.queryByText('Suivant')).toBeNull()
  })

  it('demande la page suivante au clic sur Suivant', async () => {
    mockFetch({ items: [ticket], total: 6, page: 1, pageSize: 5 })
    const onPageChange = renderList()

    fireEvent.click(await screen.findByText('Suivant'))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
