import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ComicsInfo from '@/features/characters/components/ComicsInfo/ComicsInfo'

// Mock `Image` to avoid image loading problems
vi.mock('next/image', () => ({
  __esModule: true,

  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? 'image'} />
  ),
}))

describe('ComicsInfo Component', () => {
  test('renders the title and the empty message when no comics are available', () => {
    render(<ComicsInfo comics={[]} />)

    // We verify that the title “COMICS” is present.
    expect(screen.getByText('COMICS')).toBeInTheDocument()

    // We verify that the message “No comics available” is displayed.
    expect(screen.getByText('No comics available.')).toBeInTheDocument()
  })

  test('renders the comics list when comics are available', () => {
    const comics = [
      {
        id: 1,
        title: 'Spider-Man: The Animated Series',
        thumbnail: 'https://example.com/spiderman.jpg',
        releaseDate: '1994',
      },
      {
        id: 2,
        title: 'X-Men: The Animated Series',
        thumbnail: 'https://example.com/xmen.jpg',
        releaseDate: '1992',
      },
    ]

    render(<ComicsInfo comics={comics} />)

    // We verify that the title “COMICS” is present.
    expect(screen.getByText('COMICS')).toBeInTheDocument()

    // We verify that the list of comics is present
    comics.forEach(comic => {
      // Verify that each comic has an image with the correct URL
      const comicImage = screen.getByAltText(comic.title)
      expect(comicImage).toHaveAttribute('src', comic.thumbnail)

      // We verify that the title of each comic book is present
      expect(screen.getByText(comic.title)).toBeInTheDocument()

      // We verify that the date of publication is present.
      expect(screen.getByText(comic.releaseDate)).toBeInTheDocument()
    })
  })
})
