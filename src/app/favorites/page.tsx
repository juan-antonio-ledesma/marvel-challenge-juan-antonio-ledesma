'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import { useCharacterSearch } from '@/features/characters/hooks/useCharacterSearch'

import CharacterSearch from '@/features/characters/components/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList'

export default function FavoritesPage() {
  const { characters, toggleFavorite } = useCharacters()

  const favoriteCharacters = characters.filter(char => char.isFavorite)

  const { setSearchTerm, filteredCharacters } =
    useCharacterSearch(favoriteCharacters)

  const totalResults = filteredCharacters.length
  const resultLabel = totalResults === 1 ? 'result' : 'results'
  const resultsText =
    totalResults === 0 ? 'No results' : `${totalResults} ${resultLabel}`

  return (
    <main>
      <h1>Favorite Characters</h1>
      <CharacterSearch onSearch={setSearchTerm} />

      {favoriteCharacters.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <>
          <p style={{ textTransform: 'uppercase' }}>{resultsText}</p>
          <CharacterList
            characters={filteredCharacters}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}
    </main>
  )
}
