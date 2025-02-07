export interface MarvelCharacterAPI {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface Character {
  id: string
  name: string
  image: string
  isFavorite: boolean
}
