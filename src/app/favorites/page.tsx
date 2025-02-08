'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import CharacterList from '@/features/characters/components/CharacterList'

export default function FavoritesPage() {
  const { characters, toggleFavorite } = useCharacters()

  // Filter only favorite characters
  const favoriteCharacters = characters.filter(char => char.isFavorite)

  return (
    <main>
      <h1>Favorite Characters</h1>

      {favoriteCharacters.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <CharacterList
          characters={favoriteCharacters}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  )
}
