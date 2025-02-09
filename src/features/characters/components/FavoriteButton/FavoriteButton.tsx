'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import IconHeartEmpty from '@/assets/icons/IconHeartEmpty'
import IconHeartFilled from '@/assets/icons/IconHeartFilled'

import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  characterId: string
}

export default function FavoriteButton({
  characterId,
}: Readonly<FavoriteButtonProps>) {
  const { characters, toggleFavorite } = useCharacters()
  const character = characters.find(fav => fav.id === characterId)
  const isFavorite = character ? character.isFavorite : false

  return (
    <button
      onClick={() => toggleFavorite(characterId)}
      className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : ''}`}
      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      {isFavorite ? (
        <IconHeartFilled className={styles.favoriteButtonIcon} />
      ) : (
        <IconHeartEmpty className={styles.favoriteButtonIcon} />
      )}
    </button>
  )
}
