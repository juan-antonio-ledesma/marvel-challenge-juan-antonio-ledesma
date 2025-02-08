export interface MarvelCharacterAPI {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface Character {
  id: string
  name: string
  image: string
  description: string
  isFavorite: boolean
}
