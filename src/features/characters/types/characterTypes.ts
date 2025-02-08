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
  isFavorite: boolean
  description?: string
}

export interface MarvelComicAPI {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: {
    type: string
    date: string
  }[]
}

export interface Comic {
  id: number
  title: string
  thumbnail: string
  releaseDate: string
}
