'use client'

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { Character } from '../types/characterTypes'
import { fetchCharacters } from '../services/marvelApi'

const LOCAL_STORAGE_KEY = 'favoriteCharacters'

interface CharacterContextType {
  characters: Character[]
  toggleFavorite: (id: string) => void
  favoritesCount: number
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
)

export function CharacterProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await fetchCharacters()

        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY)
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : []

        const updatedCharacters = data.map((character: Character) => ({
          ...character,
          isFavorite: favoriteIds.includes(character.id),
        }))

        setCharacters(updatedCharacters)
      } catch (error) {
        console.error('Error loading characters:', error)
      }
    }

    loadCharacters()
  }, [])

  function toggleFavorite(id: string) {
    setCharacters(prev => {
      const updatedCharacters = prev.map(char =>
        char.id === id ? { ...char, isFavorite: !char.isFavorite } : char,
      )

      const favoriteIds = updatedCharacters
        .filter(char => char.isFavorite)
        .map(char => char.id)

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteIds))

      return updatedCharacters
    })
  }

  const favoritesCount = characters.filter(char => char.isFavorite).length

  const value = useMemo(
    () => ({ characters, toggleFavorite, favoritesCount }),
    [characters, favoritesCount],
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacters() {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacters must be used within a CharacterProvider')
  }
  return context
}
