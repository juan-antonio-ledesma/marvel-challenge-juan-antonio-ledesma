import { useState, useMemo } from 'react'
import { Character } from '../types/characterTypes'

export function useCharacterSearch(characters: Character[]) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredCharacters = useMemo(() => {
    return searchTerm
      ? characters.filter(char =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : characters
  }, [searchTerm, characters])

  return { searchTerm, setSearchTerm, filteredCharacters }
}
