'use client'

import { useEffect, useState } from 'react'

import { fetchCharacters } from '@/features/characters/services/marvelApi'

import CharacterSearch from '@/features/characters/components/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList'

import { Character } from '@/features/characters/types/characterTypes'

const LOCAL_STORAGE_KEY = 'favoriteCharacters'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
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
        setFilteredCharacters(updatedCharacters) // Initialize filteredCharacters with all characters
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
    setSearchTerm(query.trim().toLowerCase()) // Store only the query
  }

  // Update filtered characters whenever characters or searchTerm changes
  useEffect(() => {
    const filtered = searchTerm
      ? characters.filter(char => char.name.toLowerCase().includes(searchTerm))
      : characters

    setFilteredCharacters(filtered)
  }, [searchTerm, characters])

  const resultsText = `${filteredCharacters.length} ${filteredCharacters.length === 1 ? 'result' : 'results'}`

  return (
    <main>
      <h1>Marvel Characters</h1>
      <CharacterSearch onSearch={handleSearch} />

      {loading && <p>Loading characters...</p>}
      {!loading && !error && characters.length > 0 && <p>{resultsText}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <CharacterList
          characters={filteredCharacters}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  )
}
