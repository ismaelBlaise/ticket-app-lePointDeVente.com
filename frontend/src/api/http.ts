// Adresse de l'API. En développement, "/api" est redirigé vers Express
// par le proxy défini dans vite.config.ts.
const API_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(API_URL + path, options)
  } catch {
    throw new Error("Le serveur ne répond pas. Vérifiez que l'API est démarrée.")
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    // L'API renvoie { message: "..." } quand elle refuse la requête.
    const message = data && data.message ? data.message : `Erreur ${response.status}`
    throw new Error(message)
  }

  return data as T
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
