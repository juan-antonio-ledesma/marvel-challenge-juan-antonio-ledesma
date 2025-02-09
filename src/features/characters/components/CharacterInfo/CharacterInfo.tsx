import Image from 'next/image'

import styles from './CharacterInfo.module.scss'

import FavoriteButton from '@/features/characters/components/FavoriteButton/FavoriteButton'

interface CharacterInfoProps {
  image: string
  name: string
  description: string | undefined
  id: string
}

export default function CharacterInfo({
  image,
  name,
  description,
  id,
}: Readonly<CharacterInfoProps>) {
  return (
    <section className={styles.root}>
      <div className={styles.innerWrapper}>
        <Image src={image} alt={name} width={320} height={320} />
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>{name}</h1>
            <FavoriteButton characterId={id} />
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  )
}
