import type { TicketSort } from '@ticket-app/shared'
import { Input } from './Input'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

interface TicketFiltersProps {
  search: string
  sort: TicketSort
  pageSize: number
  onSearchChange: (search: string) => void
  onSortChange: (sort: TicketSort) => void
  onPageSizeChange: (pageSize: number) => void
}

const SELECT_CLASSES = 'rounded-box border border-line bg-surface px-3 py-2'

export function TicketFilters({
  search,
  sort,
  pageSize,
  onSearchChange,
  onSortChange,
  onPageSizeChange,
}: TicketFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
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
          className={SELECT_CLASSES}
          value={sort}
          onChange={(event) => onSortChange(event.target.value === 'asc' ? 'asc' : 'desc')}
        >
          <option value="desc">Plus récents d'abord</option>
          <option value="asc">Plus anciens d'abord</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="pageSize">
          Tickets par page
        </label>

        <select
          id="pageSize"
          className={SELECT_CLASSES}
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
