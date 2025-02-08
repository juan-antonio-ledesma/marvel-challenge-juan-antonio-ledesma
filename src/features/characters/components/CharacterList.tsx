import styles from '../styles/CharacterList.module.scss'

import CharacterCard from './CharacterCard'

import { Character } from '../types/characterTypes'

interface CharacterListProps {
  characters: Character[]
  onToggleFavorite: (id: string) => void
}

export default function CharacterList({
  characters,
  onToggleFavorite,
}: Readonly<CharacterListProps>) {
  return (
    <div className={styles.root}>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          description={character.description}
          isFavorite={character.isFavorite}
          onToggleFavorite={() => onToggleFavorite(character.id)}
        />
      ))}
    </div>
  )
}
