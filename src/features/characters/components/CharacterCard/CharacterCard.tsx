import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import styles from './CharacterCard.module.scss'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

import { Character } from '../../types/characterTypes'

export default function CharacterCard({
  id,
  name,
  image,
}: Readonly<Character>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={styles.root} data-id={id}>
      <Link
        href={`/character/${id}`}
        passHref
        className={styles.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            className={styles.image}
            fill
            sizes="
    (max-width: 30rem) 9.75rem,
    (max-width: 48rem) 10.75rem,
    11.75rem"
          />
        </span>
      </Link>

      <div className={styles.footer}>
        <h2 className={styles.name}>{name}</h2>
        <FavoriteButton characterId={id} isHovered={isHovered} />
      </div>
    </div>
  )
}
