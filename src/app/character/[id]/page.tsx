import { notFound } from 'next/navigation'
import {
  fetchCharacterById,
  fetchComicsByCharacterId,
} from '@/features/characters/services/marvelApi'
import Image from 'next/image'

import CharacterInfo from '@/features/characters/components/CharacterInfo/CharacterInfo'

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
    <>
      <CharacterInfo
        image={character.image}
        name={character.name}
        description={character.description}
        id={character.id}
      />

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
    </>
  )
}
