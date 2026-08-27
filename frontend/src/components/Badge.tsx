import type { ReactNode } from 'react'

const STYLES = {
  success: 'bg-success-light text-success',
  neutral: 'bg-page text-muted',
}

interface BadgeProps {
  variant?: 'success' | 'neutral'
  children: ReactNode
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span className={`rounded-box px-2 py-0.5 text-sm font-medium ${STYLES[variant]}`}>
      {children}
    </span>
  )
}
