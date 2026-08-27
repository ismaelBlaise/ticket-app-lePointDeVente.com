import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTicket, getTickets } from '@/api/tickets'

// Nom du cache de la liste. Sert à la lire et à la recharger après un ajout.
const TICKETS_KEY = ['tickets']

export function useTickets() {
  return useQuery({
    queryKey: TICKETS_KEY,
    queryFn: getTickets,
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
