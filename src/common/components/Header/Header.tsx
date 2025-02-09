'use client'

import Link from 'next/link'

import { useCharacters } from '@/features/characters/context/CharacterContext'

import Logo from '@/assets/images/Logo'

import IconHeartFilled from '@/assets/icons/IconHeartFilled'

import styles from './Header.module.scss'

export default function Header() {
  const { favoritesCount } = useCharacters()

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>
        <Link href="/favorites" className={styles.favoritesLink}>
          <IconHeartFilled className={styles.favoritesLinkIcon} />
          {favoritesCount}
        </Link>
      </nav>
    </header>
  )
}
