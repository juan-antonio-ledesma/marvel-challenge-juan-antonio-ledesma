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
  return (
    <div className={styles.root} data-id={id}>
      <Link href={`/character/${id}`} passHref className={styles.link}>
        <span className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            className={styles.image}
            layout="fill"
            objectFit="cover"
          />
        </span>
      </Link>

      <div className={styles.footer}>
        <h2 className={styles.name}>{name}</h2>
        <FavoriteButton characterId={id} />
      </div>
    </div>
  )
}
