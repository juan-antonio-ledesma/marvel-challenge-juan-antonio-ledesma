import { notFound } from 'next/navigation'

export default function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = params

  // If no ID is provided, show 404
  if (!id) return notFound()

  return (
    <main>
      <h1>Character Detail</h1>
      <p>Character ID: {id}</p>
    </main>
  )
}
