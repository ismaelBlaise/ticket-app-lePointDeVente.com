import { Button } from './Button'

// Les trois messages affichés quand la liste n'a rien à montrer :
// chargement en cours, erreur, ou aucun ticket.

const BOX = 'rounded-box border border-dashed border-line p-6 text-center text-muted'

interface LoadingProps {
  text?: string
}

export function Loading({ text = 'Chargement…' }: LoadingProps) {
  return (
    <p className={BOX} role="status">
      {text}
    </p>
  )
}

interface EmptyProps {
  text: string
}

export function Empty({ text }: EmptyProps) {
  return <p className={BOX}>{text}</p>
}

interface ErrorMessageProps {
  text: string
  onRetry?: () => void
}

export function ErrorMessage({ text, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-box border border-danger bg-danger-light p-6 text-center text-danger"
    >
      <p>{text}</p>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  )
}
