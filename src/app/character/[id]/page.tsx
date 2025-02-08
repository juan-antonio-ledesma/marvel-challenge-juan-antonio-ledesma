import { notFound } from 'next/navigation'
import { fetchCharacterById } from '@/features/characters/services/marvelApi'
import Image from 'next/image'

export default async function CharacterPage({
  params,
}: {
  readonly params: { id: string }
}) {
  const { id } = params
  const character = await fetchCharacterById(id)

  if (!character) return notFound()

  return (
    <main style={{ textAlign: 'center', padding: '20px' }}>
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
      <p>{character.description}</p>
    </main>
  )
}
