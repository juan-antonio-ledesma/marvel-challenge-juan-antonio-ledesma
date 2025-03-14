import styles from './CharacterList.module.scss'

import CharacterCard from '../CharacterCard/CharacterCard'

import { Character } from '../../types/characterTypes'

interface CharacterListProps {
  characters: Character[]
}

export default function CharacterList({
  characters,
}: Readonly<CharacterListProps>) {
  return (
    <div className={styles.root} data-testid="character-list">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          isFavorite={character.isFavorite}
        />
      ))}
    </div>
  )
}
