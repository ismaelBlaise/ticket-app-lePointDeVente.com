import { useEffect, useState } from 'react'

// Attend que l'utilisateur arrête de taper avant de renvoyer la valeur :
// évite un appel à l'API à chaque lettre.
export function useDebounce(value: string, delay = 300): string {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
