import Image from 'next/image'

import type { Comic } from '@/features/characters/types/characterTypes'

import styles from './ComicsInfo.module.scss'

interface ComicsInfoProps {
  comics: Comic[]
}

export default function ComicsInfo({ comics }: Readonly<ComicsInfoProps>) {
  const isEmpty = comics.length === 0

  return (
    <section className={styles.root}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>COMICS</h2>
        {isEmpty ? (
          <p className={styles.emptyInfo}>No comics available.</p>
        ) : (
          <ul className={styles.list}>
            {comics.map(comic => (
              <li key={comic.id} className={styles.comicItem}>
                <Image
                  src={comic.thumbnail}
                  alt={comic.title}
                  width={180}
                  height={268}
                />
                <p className={styles.comicTitle}>{comic.title}</p>
                <small className={styles.comicPublicationAge}>
                  {comic.releaseDate}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
