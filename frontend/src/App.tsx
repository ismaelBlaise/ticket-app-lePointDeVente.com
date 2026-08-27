import { Empty } from '@/components/Message'

export function App() {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-3xl px-5 py-5">
          <h1 className="text-xl font-semibold">Gestion de tickets</h1>
          <p className="mt-1 text-sm text-muted">Consulter et créer des tickets</p>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-3xl gap-8 px-5 py-8">
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Nouveau ticket</h2>
          <Empty text="Formulaire de création à venir (US2)." />
        </section>

        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Tickets</h2>
          <Empty text="Liste des tickets à venir (US1)." />
        </section>
      </main>
    </>
  )
}
