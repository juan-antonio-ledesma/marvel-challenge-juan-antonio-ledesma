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

// Simulamos el hook `useCharacters` para controlar el estado
vi.mock('@/features/characters/context/CharacterContext', () => ({
  useCharacters: () => ({
    favoritesCount: 5, // Simulamos que hay 5 favoritos
  }),
}))

describe('Header Component', () => {
  test('renders the logo and the favorites link with correct count', () => {
    render(<Header />)

    // Verificamos que el logo se está renderizando
    expect(screen.getByTestId('logo')).toBeInTheDocument()

    // Verificamos que el icono de favoritos se está renderizando
    expect(screen.getByTestId('icon-heart-filled')).toBeInTheDocument()

    // Verificamos que el contador de favoritos esté correcto usando el contenido del enlace
    const favoritesLink = screen.getByRole('link', { name: /0/i })
    expect(favoritesLink).toHaveTextContent('5') // Comprobamos que el número 5 esté dentro del link
  })

  test('renders favorites count as 0 when there are no favorites', () => {
    // Simulamos que no hay favoritos
    vi.mock('@/features/characters/context/CharacterContext', () => ({
      useCharacters: () => ({
        favoritesCount: 0, // Simulamos que no hay favoritos
      }),
    }))

    render(<Header />)

    // Verificamos que el contador de favoritos sea 0
    const favoritesLink = screen.getByRole('link', { name: /0/i })
    expect(favoritesLink).toHaveTextContent('0') // Verificamos que el número 0 esté dentro del link
  })
})
