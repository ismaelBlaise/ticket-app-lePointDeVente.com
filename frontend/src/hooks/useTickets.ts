import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TicketSort, TicketStatus } from '@ticket-app/shared'
import { createTicket, getTickets, updateTicketStatus } from '@/api/tickets'

// Nom du cache de la liste. Sert à la lire et à la recharger après un ajout.
const TICKETS_KEY = ['tickets']

export const DEFAULT_PAGE_SIZE = 5

interface UseTicketsOptions {
  page: number
  pageSize: number
  search: string
  sort: TicketSort
}

export function useTickets({ page, pageSize, search, sort }: UseTicketsOptions) {
  return useQuery({
    // Chaque combinaison a sa propre entrée en cache.
    queryKey: [...TICKETS_KEY, page, pageSize, search, sort],
    queryFn: () => getTickets({ page, pageSize, search, sort }),
  })
}

export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTicket,
    // Après un ajout réussi, la liste se recharge toute seule.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TICKETS_KEY }),
  })
}

interface StatusChange {
  id: string
  status: TicketStatus
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (change: StatusChange) => updateTicketStatus(change.id, change.status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TICKETS_KEY }),
  })
}
