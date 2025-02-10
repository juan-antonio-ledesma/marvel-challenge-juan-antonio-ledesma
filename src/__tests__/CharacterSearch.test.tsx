import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CharacterSearch from '@/features/characters/components/CharacterSearch/CharacterSearch'

vi.mock('@/assets/icons/IconMagnifier', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-magnifier" />,
}))

describe('CharacterSearch Component', () => {
  test('renders input field and icon', () => {
    render(<CharacterSearch onSearch={() => {}} />)

    expect(
      screen.getByPlaceholderText(/Search a character/i),
    ).toBeInTheDocument()

    // Verify that the search icon is present with the testID
    expect(screen.getByTestId('icon-magnifier')).toBeInTheDocument()
  })

  test('updates input value when typing', () => {
    render(<CharacterSearch onSearch={() => {}} />)

    const input = screen.getByPlaceholderText(/Search a character/i)
    fireEvent.change(input, { target: { value: 'Spider-Man' } })

    expect(input).toHaveValue('Spider-Man')
  })

  test('calls onSearch with debounce after typing', async () => {
    const onSearchMock = vi.fn()
    render(<CharacterSearch onSearch={onSearchMock} />)

    const input = screen.getByPlaceholderText(/Search a character/i)

    // Simulates text change
    fireEvent.change(input, { target: { value: 'Iron Man' } })

    // Expect onSearch to be called after 300ms
    await waitFor(
      () => {
        expect(onSearchMock).toHaveBeenCalledWith('Iron Man')
      },
      { timeout: 500 },
    )
  })
})
