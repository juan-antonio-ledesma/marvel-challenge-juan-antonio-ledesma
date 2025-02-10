import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FavoriteButton from '@/features/characters/components/FavoriteButton/FavoriteButton'

// Mock `IconHeartEmpty` and `IconHeartFilled` to avoid unnecessary dependencies
vi.mock('@/assets/icons/IconHeartEmpty', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-heart-empty" />,
}))

vi.mock('@/assets/icons/IconHeartFilled', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-heart-filled" />,
}))

// Simulate the `useCharacters` hook to control the state
const mockToggleFavorite = vi.fn()

vi.mock('@/features/characters/context/CharacterContext', () => ({
  useCharacters: () => ({
    characters: [{ id: '1', name: 'Spider-Man', isFavorite: false }],
    toggleFavorite: mockToggleFavorite,
    favoritesCount: 0,
    loading: false,
  }),
}))

describe('FavoriteButton Component', () => {
  test('renders as not favorite initially', () => {
    render(<FavoriteButton characterId="1" />)

    expect(screen.getByTestId('icon-heart-empty')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-heart-filled')).not.toBeInTheDocument()
  })

  test('calls toggleFavorite when clicked', () => {
    render(<FavoriteButton characterId="1" />)

    const button = screen.getByRole('button', { name: /Add to Favorites/i })
    fireEvent.click(button)

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1)
    expect(mockToggleFavorite).toHaveBeenCalledWith('1')
  })
})
