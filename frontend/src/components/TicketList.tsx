import type { Ticket } from '@ticket-app/shared'
import { useTickets } from '@/hooks/useTickets'
import { formatDate } from '@/utils/date'
import { STATUS_LABELS } from '@/utils/status'
import { Badge } from './Badge'
import { Button } from './Button'
import { Empty, ErrorMessage, Loading } from './Message'

interface TicketListProps {
  page: number
  onPageChange: (page: number) => void
}

export function TicketList({ page, onPageChange }: TicketListProps) {
  const { data, isPending, isError, error, refetch } = useTickets(page)

  if (isPending) {
    return <Loading text="Chargement des tickets…" />
  }

  if (isError) {
    return <ErrorMessage text={error.message} onRetry={() => refetch()} />
  }

  if (data.items.length === 0) {
    return <Empty text="Aucun ticket pour le moment." />
  }

  const totalPages = Math.ceil(data.total / data.pageSize)

  return (
    <div className="grid gap-4">
      <ul className="grid gap-2">
        {data.items.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button variant="secondary" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
            Précédent
          </Button>

          <span className="text-sm text-muted">
            Page {page} sur {totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
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
