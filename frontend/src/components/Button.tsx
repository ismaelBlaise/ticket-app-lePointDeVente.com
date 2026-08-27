import type { ButtonHTMLAttributes } from 'react'

const STYLES = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border border-line bg-surface hover:border-brand',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', type = 'button', ...props }: Props) {
  return (
    <button
      {...props}
      type={type}
      className={`rounded-box px-4 py-2 font-semibold disabled:opacity-60 ${STYLES[variant]}`}
    />
  )
}
