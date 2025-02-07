'use client'

import { useEffect, useState } from 'react'
import CharacterList from '@/features/characters/components/CharacterList'
import { fetchCharacters } from '@/services/marvelApi'
import { Character } from '@/features/characters/types/characterTypes'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true)
      try {
        const data = await fetchCharacters()
        setCharacters(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error al cargar los personajes: ${err.message}`)
        } else {
          setError('Error desconocido al cargar los personajes.')
        }
      }
      setLoading(false)
    }

    loadCharacters()
  }, [])

  function toggleFavorite(id: string) {
    setCharacters(prev =>
      prev.map(char =>
        char.id === id ? { ...char, isFavorite: !char.isFavorite } : char,
      ),
    )
  }

  return (
    <main>
      <h1>Marvel Characters</h1>
      {loading && <p>Cargando personajes...</p>}
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
