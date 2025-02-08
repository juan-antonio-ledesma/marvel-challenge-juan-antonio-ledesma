import { notFound } from 'next/navigation'
import {
  fetchCharacterById,
  fetchComicsByCharacterId,
} from '@/features/characters/services/marvelApi'
import Image from 'next/image'

import FavoriteButton from '@/features/characters/components/FavoriteButton/FavoriteButton'

export default async function CharacterPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>
}) {
  const { id } = await params

  const character = await fetchCharacterById(id)
  const comics = await fetchComicsByCharacterId(id)

  if (!character) return notFound()

  return (
    <main style={{ textAlign: 'center', padding: '20px' }}>
      <FavoriteButton characterId={character.id} />

      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
      <h1>{character.name}</h1>
      <p>{character.description}</p>

      <h2>Comics</h2>
      {comics.length === 0 ? (
        <p>No comics available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {comics.map(comic => (
            <li key={comic.id} style={{ marginBottom: '15px' }}>
              <Image
                src={comic.thumbnail}
                alt={comic.title}
                width={180}
                height={268}
              />
              <p>{comic.title}</p>
              <small>{comic.releaseDate}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
