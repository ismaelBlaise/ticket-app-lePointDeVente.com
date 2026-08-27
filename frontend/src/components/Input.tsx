import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...props }: Props) {
  // useId donne un identifiant unique pour relier le label et le champ.
  const id = useId()

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        className={`rounded-box border bg-surface px-3 py-2 ${error ? 'border-danger' : 'border-line'}`}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
