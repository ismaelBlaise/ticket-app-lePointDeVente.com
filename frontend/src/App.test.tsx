import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'

function mockApi() {
  const tickets = [
    {
      id: '1',
      title: 'Imprimante hors service',
      status: 'open',
      createdAt: '2026-08-24T08:30:00.000Z',
    },
  ]

  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url: string, options?: RequestInit) => {
      if (options && options.method === 'POST') {
        const sent = JSON.parse(String(options.body))
        const created = {
          id: '2',
          title: sent.title,
          status: 'open',
          createdAt: '2026-08-27T10:00:00.000Z',
        }

        tickets.unshift(created)
        return { ok: true, status: 201, json: async () => created }
      }

      return {
        ok: true,
        status: 200,
        json: async () => ({
          items: [...tickets],
          total: tickets.length,
          page: 1,
          pageSize: 5,
        }),
      }
    }),
  )
}

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
}

describe('App', () => {
  it('affiche le nouveau ticket dans la liste après la création', async () => {
    mockApi()
    renderApp()

    expect(await screen.findByText('Imprimante hors service')).toBeDefined()

    fireEvent.change(screen.getByLabelText('Titre'), { target: { value: 'Écran cassé' } })
    fireEvent.click(screen.getByText('Créer le ticket'))

    expect(await screen.findByText('Écran cassé')).toBeDefined()
  })
})
