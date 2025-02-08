import md5 from 'md5'

import {
  MarvelCharacterAPI,
  Character,
} from '@/features/characters/types/characterTypes'

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters'

if (!PUBLIC_KEY || !PRIVATE_KEY) {
  throw new Error('🚨 Marvel API keys are not defined in .env.local')
}

const getHash = () => {
  const timestamp = new Date().getTime().toString()
  return {
    ts: timestamp,
    hash: md5(timestamp + PRIVATE_KEY + PUBLIC_KEY),
  }
}

export async function fetchCharacters(): Promise<Character[]> {
  const { ts, hash } = getHash()
  const url = `${BASE_URL}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=50`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data?.data?.results) {
      throw new Error('Marvel API did not return valid results')
    }

    return data.data.results.map((character: MarvelCharacterAPI) => ({
      id: character.id.toString(),
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      isFavorite: false,
    }))
  } catch (error) {
    console.error('🚨 Error fetching characters:', error)
    return []
  }
}

export async function fetchCharacterById(
  id: string,
): Promise<Character | null> {
  const { ts, hash } = getHash()
  const url = `${BASE_URL}/${id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

  try {
    const response = await fetch(url)

    if (response.status === 404) {
      console.warn(`⚠️ Character with ID ${id} not found.`)
      return null
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data?.data?.results?.length) {
      return null // Si la API no devuelve resultados, retornamos null
    }

    const character: MarvelCharacterAPI = data.data.results[0]

    return {
      id: character.id.toString(),
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      description: character.description || 'No description available',
      isFavorite: false,
    }
  } catch (error) {
    console.error(`🚨 Error fetching character ${id}:`, error)
    return null
  }
}
