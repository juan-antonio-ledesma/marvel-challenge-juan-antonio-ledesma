import React from 'react'
import { describe, test, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import CharacterList from '@/features/characters/components/CharacterList/CharacterList'
import { CharacterProvider } from '@/features/characters/context/CharacterContext'

beforeAll(() => {
  process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY = 'test-public-key'
  process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY = 'test-private-key'
})

const mockCharacters = [
  {
    id: '1',
    name: 'Spider-Man',
    thumbnail: { path: 'https://example.com/spidey', extension: 'jpg' },
    image: 'https://example.com/spidey.jpg',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Iron Man',
    thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' },
    image: 'https://example.com/ironman.jpg',
    isFavorite: false,
  },
]

describe('CharacterList Component', () => {
  test('Displays the characters correctly', async () => {
    render(
      <CharacterProvider>
        <CharacterList characters={mockCharacters} />
      </CharacterProvider>,
    )

    expect(await screen.findByText(/Spider-Man/i)).toBeInTheDocument()
    expect(await screen.findByText(/Iron Man/i)).toBeInTheDocument()
  })
})
