'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import { useCharacterSearch } from '@/features/characters/hooks/useCharacterSearch'

import CharacterSearch from '@/features/characters/components/CharacterSearch/CharacterSearch'
import MessageParagraph from '@/common/components/MessageParagraph/MessageParagraph'
import CharacterList from '@/features/characters/components/CharacterList/CharacterList'

export default function Home() {
  const { characters, loading } = useCharacters()

  const { setSearchTerm, filteredCharacters } = useCharacterSearch(characters)

  const totalResults = filteredCharacters.length
  const resultLabel = totalResults === 1 ? 'result' : 'results'
  const resultsText =
    totalResults === 0 ? 'No results' : `${totalResults} ${resultLabel}`

  return (
    <>
      <h1 className="sr-only">Marvel Characters</h1>

      <CharacterSearch onSearch={setSearchTerm} />

      {loading ? (
        <MessageParagraph message="Loading characters..." />
      ) : (
        <>
          {characters.length > 0 && <MessageParagraph message={resultsText} />}
          <CharacterList characters={filteredCharacters} />
        </>
      )}
    </>
  )
}
