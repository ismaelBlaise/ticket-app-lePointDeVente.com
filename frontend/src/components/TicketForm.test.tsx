import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TicketForm } from './TicketForm'

function mockFetch(body: unknown, ok = true) {
  const response = { ok, status: ok ? 201 : 400, json: async () => body }
  const fetchMock = vi.fn(async () => response)

  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <TicketForm />
    </QueryClientProvider>,
  )
}

function getInput(): HTMLInputElement {
  return screen.getByLabelText('Titre') as HTMLInputElement
}

const createdTicket = {
  id: '1',
  title: 'Écran cassé',
  status: 'open',
  createdAt: '2026-08-27T10:00:00.000Z',
}

describe('TicketForm', () => {
  it("n'envoie rien quand le titre est vide", () => {
    const fetchMock = mockFetch(createdTicket)
    renderForm()

    fireEvent.click(screen.getByText('Créer le ticket'))

    expect(screen.getByText('Le titre est obligatoire')).toBeDefined()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("envoie le titre à l'API puis vide le champ", async () => {
    const fetchMock = mockFetch(createdTicket)
    renderForm()

    fireEvent.change(getInput(), { target: { value: 'Écran cassé' } })
    fireEvent.click(screen.getByText('Créer le ticket'))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/tickets',
        expect.objectContaining({ method: 'POST' }),
      )
    })

    await waitFor(() => {
      expect(getInput().value).toBe('')
    })
  })

  it("affiche l'erreur renvoyée par l'API", async () => {
    mockFetch({ message: 'Le titre est obligatoire' }, false)
    renderForm()

    fireEvent.change(getInput(), { target: { value: 'Écran cassé' } })
    fireEvent.click(screen.getByText('Créer le ticket'))

    expect(await screen.findByRole('alert')).toBeDefined()
  })
})
