import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Header from '@/common/components/Header/Header'

// Mock de `Logo` y `IconHeartFilled` para evitar dependencias innecesarias
vi.mock('@/assets/images/Logo', () => ({
  __esModule: true,
  default: () => <svg data-testid="logo" />,
}))

vi.mock('@/assets/icons/IconHeartFilled', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-heart-filled" />,
}))

describe('Header Component', () => {
  test('renders the logo ', () => {
    render(<Header />)

    // Verify that the logo is rendering
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  test('renders favorites count as 0 when there are no favorites', () => {
    vi.mock('@/features/characters/context/CharacterContext', () => ({
      useCharacters: () => ({
        favoritesCount: 0, // We pretend that there are no favorites
      }),
    }))

    render(<Header />)

    // We verify that the favorites counter is 0.
    const favoritesLink = screen.getByRole('link', { name: /0/i })
    expect(favoritesLink).toHaveTextContent('0') // Verify that the number 0 is inside the link
  })
})
