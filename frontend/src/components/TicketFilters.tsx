import type { TicketSort } from '@ticket-app/shared'
import { Input } from './Input'

interface TicketFiltersProps {
  search: string
  sort: TicketSort
  onSearchChange: (search: string) => void
  onSortChange: (sort: TicketSort) => void
}

export function TicketFilters({
  search,
  sort,
  onSearchChange,
  onSortChange,
}: TicketFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input
        label="Rechercher"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Un mot du titre"
        maxLength={120}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="sort">
          Trier par date
        </label>

        <select
          id="sort"
          className="rounded-box border border-line bg-surface px-3 py-2"
          value={sort}
          onChange={(event) => onSortChange(event.target.value === 'asc' ? 'asc' : 'desc')}
        >
          <option value="desc">Plus récents d'abord</option>
          <option value="asc">Plus anciens d'abord</option>
        </select>
      </div>
    </div>
  )
}
