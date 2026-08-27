import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TicketSort } from '@ticket-app/shared'
import { createTicket, getTickets } from '@/api/tickets'

// Nom du cache de la liste. Sert à la lire et à la recharger après un ajout.
const TICKETS_KEY = ['tickets']

export const PAGE_SIZE = 5

interface UseTicketsOptions {
  page: number
  search: string
  sort: TicketSort
}

export function useTickets({ page, search, sort }: UseTicketsOptions) {
  return useQuery({
    // Chaque combinaison page + recherche + tri a sa propre entrée en cache.
    queryKey: [...TICKETS_KEY, page, search, sort],
    queryFn: () => getTickets({ page, pageSize: PAGE_SIZE, search, sort }),
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
