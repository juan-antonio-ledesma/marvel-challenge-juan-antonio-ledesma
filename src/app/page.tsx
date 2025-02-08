'use client'

import { useEffect, useState } from 'react'
import CharacterList from '@/features/characters/components/CharacterList'
import { fetchCharacters } from '@/services/marvelApi'
import { Character } from '@/features/characters/types/characterTypes'

const LOCAL_STORAGE_KEY = 'favoriteCharacters'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true)
      try {
        const data = await fetchCharacters()

        // Retrieve stored favorite characters
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY)
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : []

        // Sync favorite status with stored data
        const updatedCharacters = data.map((character: Character) => ({
          ...character,
          isFavorite: favoriteIds.includes(character.id),
        }))

        setCharacters(updatedCharacters)
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error loading characters: ${err.message}`)
        } else {
          setError('Unknown error while loading characters.')
        }
      }
      setLoading(false)
    }

    loadCharacters()
  }, [])

  function toggleFavorite(id: string) {
    setCharacters(prev => {
      const updatedCharacters = prev.map(char =>
        char.id === id ? { ...char, isFavorite: !char.isFavorite } : char,
      )

      // Persist favorites in localStorage
      const favoriteIds = updatedCharacters
        .filter(char => char.isFavorite)
        .map(char => char.id)

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteIds))

      return updatedCharacters
    })
  }

  return (
    <main>
      <h1>Marvel Characters</h1>
      {loading && <p>Loading characters...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <CharacterList
          characters={characters}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  )
}
