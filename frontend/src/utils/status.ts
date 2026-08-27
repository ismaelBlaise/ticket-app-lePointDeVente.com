import type { TicketStatus } from '@ticket-app/shared'

// Libellés affichés à l'écran. Le code manipule toujours 'open' / 'closed'.
export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Ouvert',
  closed: 'Fermé',
}
