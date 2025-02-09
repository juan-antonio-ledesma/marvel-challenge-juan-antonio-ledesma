import { render, screen } from '@testing-library/react'
import CharacterList from '@/features/characters/components/CharacterList/CharacterList'

describe('CharacterList Component', () => {
  it('renders the component', () => {
    render(<CharacterList characters={[]} />)

    expect(screen.getByTestId('character-list')).toBeInTheDocument()
  })
})
