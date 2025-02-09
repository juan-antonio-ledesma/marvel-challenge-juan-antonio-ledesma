'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import { useCharacterSearch } from '@/features/characters/hooks/useCharacterSearch'

import CharacterSearch from '@/features/characters/components/CharacterSearch/CharacterSearch'
import MessageParagraph from '@/common/components/MessageParagraph/MessageParagraph'
import CharacterList from '@/features/characters/components/CharacterList/CharacterList'

export default function FavoritesPage() {
  const { characters } = useCharacters()

  const favoriteCharacters = characters.filter(char => char.isFavorite)

  const { setSearchTerm, filteredCharacters } =
    useCharacterSearch(favoriteCharacters)

  const totalResults = filteredCharacters.length
  const resultLabel = totalResults === 1 ? 'result' : 'results'
  const resultsText =
    totalResults === 0 ? 'No results' : `${totalResults} ${resultLabel}`

  return (
    <main>
      <h1 className="sr-only">Marvel Favorite Characters</h1>

      <CharacterSearch onSearch={setSearchTerm} />

      {favoriteCharacters.length === 0 ? (
        <MessageParagraph message="No favorites yet" />
      ) : (
        <>
          <MessageParagraph message={resultsText} />
          <CharacterList characters={filteredCharacters} />
        </>
      )}
    </main>
  )
}
