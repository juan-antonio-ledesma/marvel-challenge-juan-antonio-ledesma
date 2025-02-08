'use client'

import { useEffect, useState } from 'react'

import { fetchCharacters } from '@/features/characters/services/marvelApi'

import CharacterSearch from '@/features/characters/components/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList'

import { Character } from '@/features/characters/types/characterTypes'

const LOCAL_STORAGE_KEY = 'favoriteCharacters'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<
    Character[] | null
  >(null)
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
        setError(
          err instanceof Error
            ? `Error loading characters: ${err.message}`
            : 'Unknown error while loading characters.',
        )
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

  function handleSearch(query: string) {
    setFilteredCharacters(
      query.trim()
        ? characters.filter(char =>
            char.name.toLowerCase().includes(query.toLowerCase()),
          )
        : null,
    )
  }

  const resultsText = () => {
    const totalCount = filteredCharacters
      ? filteredCharacters.length
      : characters.length
    return `${totalCount} ${totalCount === 1 ? 'result' : 'results'}`
  }

  return (
    <main>
      <h1>Marvel Characters</h1>
      <CharacterSearch onSearch={handleSearch} />

      {loading && <p>Loading characters...</p>}
      {!loading && !error && characters.length > 0 && <p>{resultsText()}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <CharacterList
          characters={filteredCharacters ?? characters}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  )
}
