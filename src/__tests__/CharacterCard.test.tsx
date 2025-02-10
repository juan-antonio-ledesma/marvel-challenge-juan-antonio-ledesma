import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterCard from '@/features/characters/components/CharacterCard/CharacterCard'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? 'Character image'} />
  },
}))

// FavoriteButton mock to avoid unnecessary test dependencies
vi.mock(
  '@/features/characters/components/FavoriteButton/FavoriteButton',
  () => ({
    __esModule: true,
    default: ({
      characterId,
      isHovered,
    }: {
      characterId: string
      isHovered: boolean
    }) => (
      <button
        data-testid="favorite-button"
        data-character-id={characterId}
        data-hovered={isHovered}
      >
        Favorite
      </button>
    ),
  }),
)

const mockCharacter = {
  id: '1',
  name: 'Spider-Man',
  image: 'https://example.com/spidey.jpg',
  isFavorite: false,
}

describe('CharacterCard Component', () => {
  test('Displays character information correctly', () => {
    render(<CharacterCard {...mockCharacter} />)

    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument()

    expect(screen.getByRole('img', { name: /Spider-Man/i })).toHaveAttribute(
      'src',
      'https://example.com/spidey.jpg',
    )

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument()
  })

  test('Handles hover state correctly', () => {
    render(<CharacterCard {...mockCharacter} />)

    const link = screen.getByRole('link', { name: /Spider-Man/i })

    fireEvent.mouseEnter(link)
    expect(screen.getByTestId('favorite-button')).toHaveAttribute(
      'data-hovered',
      'true',
    )

    fireEvent.mouseLeave(link)
    expect(screen.getByTestId('favorite-button')).toHaveAttribute(
      'data-hovered',
      'false',
    )
  })
})
