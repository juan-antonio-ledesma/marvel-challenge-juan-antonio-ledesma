'use client'

import { useState } from 'react'

import { useCharacters } from '@/features/characters/context/CharacterContext'

import CharacterSearch from '@/features/characters/components/CharacterSearch'
import CharacterList from '@/features/characters/components/CharacterList'

export default function Home() {
  const { characters, toggleFavorite } = useCharacters()
  const [searchTerm, setSearchTerm] = useState<string>('')

  function handleSearch(query: string) {
    setSearchTerm(query.trim().toLowerCase())
  }

  const filteredCharacters = searchTerm
    ? characters.filter(char => char.name.toLowerCase().includes(searchTerm))
    : characters

  return (
    <main>
      <CharacterSearch onSearch={handleSearch} />
      <p>
        {filteredCharacters.length}{' '}
        {filteredCharacters.length === 1 ? 'result' : 'results'}
      </p>
      <CharacterList
        characters={filteredCharacters}
        onToggleFavorite={toggleFavorite}
      />
    </main>
  )
}
