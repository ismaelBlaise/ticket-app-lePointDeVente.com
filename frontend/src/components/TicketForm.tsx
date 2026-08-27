import { useState } from 'react'
import type { FormEvent } from 'react'
import { useCreateTicket } from '@/hooks/useTickets'
import { Button } from './Button'
import { Input } from './Input'

export function TicketForm() {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const createTicket = useCreateTicket()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (title.trim() === '') {
      setError('Le titre est obligatoire')
      return
    }

    setError('')
    createTicket.mutate({ title: title.trim() }, { onSuccess: () => setTitle('') })
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <Input
        label="Titre"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Décrivez le problème en une phrase"
        maxLength={120}
        disabled={createTicket.isPending}
        error={error}
      />

      {createTicket.isError && (
        <p role="alert" className="text-sm text-danger">
          {createTicket.error.message}
        </p>
      )}

      <div>
        <Button type="submit" disabled={createTicket.isPending}>
          {createTicket.isPending ? 'Création…' : 'Créer le ticket'}
        </Button>
      </div>
    </form>
  )
}
