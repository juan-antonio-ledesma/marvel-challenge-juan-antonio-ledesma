import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  fetchCharacterById,
  fetchComicsByCharacterId,
} from '@/features/characters/services/marvelApi'

import CharacterInfo from '@/features/characters/components/CharacterInfo/CharacterInfo'
import ComicsInfo from '@/features/characters/components/ComicsInfo/ComicsInfo'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const params = await props.params
  const character = await fetchCharacterById(params.id)

  if (!character) {
    return {
      title: 'Character Not Found | Marvel Challenge',
      description: 'This character could not be found in the Marvel universe.',
    }
  }

  return {
    title: `${character.name} | Marvel Challenge`,
    description:
      character.description ?? 'Explore details about this Marvel character!',
  }
}

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

      <ComicsInfo comics={comics} />
    </>
  )
}
