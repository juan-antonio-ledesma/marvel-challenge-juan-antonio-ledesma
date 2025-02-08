'use client'
import { useState } from 'react'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import CharacterSearch from '@/features/characters/components/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList'

export default function Home() {
  const { characters, toggleFavorite, loading } = useCharacters()
  const [searchTerm, setSearchTerm] = useState<string>('')

  function handleSearch(query: string) {
    setSearchTerm(query.trim().toLowerCase())
  }

  const filteredCharacters = searchTerm
    ? characters.filter(char => char.name.toLowerCase().includes(searchTerm))
    : characters

  const totalResults = filteredCharacters.length
  const resultLabel = totalResults === 1 ? 'result' : 'results'
  const resultsText =
    totalResults === 0 ? 'No results' : `${totalResults} ${resultLabel}`

  return (
    <main>
      <h1>Marvel Characters</h1>
      <CharacterSearch onSearch={handleSearch} />

      {loading ? (
        <p>Loading characters...</p> // ✅ Now loading is correctly managed from context
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
