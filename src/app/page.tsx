'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import { useCharacterSearch } from '@/features/characters/hooks/useCharacterSearch'

import CharacterSearch from '@/features/characters/components/CharacterSearch/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList/CharacterList'

export default function Home() {
  const { characters, toggleFavorite, loading } = useCharacters()

  const { setSearchTerm, filteredCharacters } = useCharacterSearch(characters)

  const totalResults = filteredCharacters.length
  const resultLabel = totalResults === 1 ? 'result' : 'results'
  const resultsText =
    totalResults === 0 ? 'No results' : `${totalResults} ${resultLabel}`

  return (
    <main>
      <h1>Marvel Characters</h1>
      <CharacterSearch onSearch={setSearchTerm} />

      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <>
          {characters.length > 0 && (
            <p style={{ textTransform: 'uppercase' }}>{resultsText}</p>
          )}
          <CharacterList
            characters={filteredCharacters}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}
    </main>
  )
}
