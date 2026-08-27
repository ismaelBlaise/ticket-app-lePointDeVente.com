import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TicketFilters } from './TicketFilters'

function renderFilters() {
  const handlers = {
    onSearchChange: vi.fn(),
    onSortChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  }

  render(<TicketFilters search="" sort="desc" pageSize={5} {...handlers} />)
  return handlers
}

describe('TicketFilters', () => {
  it('remonte le texte cherché', () => {
    const handlers = renderFilters()

    fireEvent.change(screen.getByLabelText('Rechercher'), { target: { value: 'imprimante' } })

    expect(handlers.onSearchChange).toHaveBeenCalledWith('imprimante')
  })

  it('remonte le tri choisi', () => {
    const handlers = renderFilters()

    fireEvent.change(screen.getByLabelText('Trier par date'), { target: { value: 'asc' } })

    expect(handlers.onSortChange).toHaveBeenCalledWith('asc')
  })

  it('remonte le nombre de tickets par page choisi', () => {
    const handlers = renderFilters()

    fireEvent.change(screen.getByLabelText('Tickets par page'), { target: { value: '20' } })

    expect(handlers.onPageSizeChange).toHaveBeenCalledWith(20)
  })
})
