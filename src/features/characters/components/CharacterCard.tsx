import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/CharacterCard.module.scss'

import IconHeartEmpty from '@/shared/icons/IconHeartEmpty'
import IconHeartFilled from '@/shared/icons/IconHeartFilled'

import { Character } from '../types/characterTypes'

interface CharacterCardProps extends Character {
  onToggleFavorite: () => void
}

export default function CharacterCard({
  id,
  name,
  image,
  isFavorite,
  onToggleFavorite,
}: Readonly<CharacterCardProps>) {
  return (
    <div className={styles.root} data-id={id}>
      <Link href="/" passHref className={styles.link}>
        <Image
          src={image}
          alt={name}
          className={styles.image}
          layout="responsive"
          width={500}
          height={500}
        />
      </Link>

      <div className={styles.footer}>
        <h2 className={styles.name}>{name}</h2>
        <button
          onClick={onToggleFavorite}
          className={`${styles.favoriteButton} ${isFavorite ? styles.isActive : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeartEmpty />}
        </button>
      </div>
    </div>
  )
}
