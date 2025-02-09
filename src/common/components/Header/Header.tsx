'use client'

import Link from 'next/link'

import { useCharacters } from '@/features/characters/context/CharacterContext'

import Logo from '@/assets/images/Logo'

import styles from './Header.module.scss'

export default function Header() {
  const { favoritesCount } = useCharacters()

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/favorites" className={styles.link}>
          Favorites ({favoritesCount})
        </Link>
      </nav>
    </header>
  )
}
