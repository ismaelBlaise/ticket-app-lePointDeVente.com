import type { Ticket } from '@ticket-app/shared'
import { useTickets } from '@/hooks/useTickets'
import { formatDate } from '@/utils/date'
import { STATUS_LABELS } from '@/utils/status'
import { Badge } from './Badge'
import { Empty, ErrorMessage, Loading } from './Message'

export function TicketList() {
  const { data, isPending, isError, error, refetch } = useTickets()

  if (isPending) {
    return <Loading text="Chargement des tickets…" />
  }

  if (isError) {
    return <ErrorMessage text={error.message} onRetry={() => refetch()} />
  }

  if (data.length === 0) {
    return <Empty text="Aucun ticket pour le moment." />
  }

  return (
    <ul className="grid gap-2">
      {data.map((ticket) => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  )
}

interface TicketRowProps {
  ticket: Ticket
}

function TicketRow({ ticket }: TicketRowProps) {
  const variant = ticket.status === 'open' ? 'success' : 'neutral'

  return (
    <li className="flex items-center justify-between gap-4 rounded-box border border-line bg-surface p-4">
      <div>
        <p className="font-medium">{ticket.title}</p>
        <p className="text-sm text-muted">{formatDate(ticket.createdAt)}</p>
      </div>

      <Badge variant={variant}>{STATUS_LABELS[ticket.status]}</Badge>
    </li>
  )
}
