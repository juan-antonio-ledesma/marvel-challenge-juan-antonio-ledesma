'use client'

import { useCharacters } from '@/features/characters/context/CharacterContext'
import IconHeartEmpty from '@/shared/icons/IconHeartEmpty'
import IconHeartFilled from '@/shared/icons/IconHeartFilled'

import styles from '../styles/FavoriteButton.module.scss'

interface FavoriteButtonProps {
  characterId: string
}

export default function FavoriteButton({
  characterId,
}: Readonly<FavoriteButtonProps>) {
  const { characters, toggleFavorite } = useCharacters()
  const isFavorite = characters.some(fav => fav.id === characterId)

  return (
    <button
      onClick={() => toggleFavorite(characterId)}
      className={`${styles.favoriteButton} ${isFavorite ? styles.isActive : ''}`}
      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      {isFavorite ? <IconHeartFilled /> : <IconHeartEmpty />}
    </button>
  )
}
