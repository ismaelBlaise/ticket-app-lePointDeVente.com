import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TicketFilters } from './TicketFilters'

describe('TicketFilters', () => {
  it('remonte le texte cherché', () => {
    const onSearchChange = vi.fn()

    render(
      <TicketFilters
        search=""
        sort="desc"
        onSearchChange={onSearchChange}
        onSortChange={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText('Rechercher'), { target: { value: 'imprimante' } })

    expect(onSearchChange).toHaveBeenCalledWith('imprimante')
  })

  it('remonte le tri choisi', () => {
    const onSortChange = vi.fn()

    render(
      <TicketFilters
        search=""
        sort="desc"
        onSearchChange={vi.fn()}
        onSortChange={onSortChange}
      />,
    )

    fireEvent.change(screen.getByLabelText('Trier par date'), { target: { value: 'asc' } })

    expect(onSortChange).toHaveBeenCalledWith('asc')
  })
})
