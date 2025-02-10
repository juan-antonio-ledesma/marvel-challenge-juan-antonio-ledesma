import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import CharacterInfo from '@/features/characters/components/CharacterInfo/CharacterInfo'

// Mock `Image` to avoid image loading problems
vi.mock('next/image', () => ({
  __esModule: true,

  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? 'image'} />
  ),
}))

// Mock of `FavoriteButton` to avoid dependency on other components
vi.mock(
  '@/features/characters/components/FavoriteButton/FavoriteButton',
  () => ({
    __esModule: true,
    default: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>Favorite Button</button>
    ),
  }),
)

describe('CharacterInfo Component', () => {
  test('renders character image, name, description, and favorite button', () => {
    const character = {
      id: '1',
      name: 'Spider-Man',
      description: 'A superhero from Marvel.',
      image: 'https://example.com/spider-man.jpg',
    }

    render(<CharacterInfo {...character} />)

    // Verify that the image is rendering with the correct URL
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', character.image)
    expect(image).toHaveAttribute('alt', character.name)

    // We verify that the character name is being rendered.
    expect(screen.getByText(character.name)).toBeInTheDocument()

    // We verify that the description is being rendered
    expect(screen.getByText(character.description)).toBeInTheDocument()

    // We verify that the favorites button is rendered correctly.
    const favoriteButton = screen.getByText('Favorite Button')
    expect(favoriteButton).toBeInTheDocument()
  })
})
