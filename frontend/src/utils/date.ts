// "2026-08-27T14:32:00.000Z"  ->  "27 août 2026, 10:32"
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString('fr-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
