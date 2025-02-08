import { useState } from 'react'

import styles from '../styles/CharacterSearch.module.scss'

import IconMagnifier from '@/shared/icons/IconMagnifier'

interface CharacterSearchProps {
  readonly onSearch: (query: string) => void
}

export default function CharacterSearch({
  onSearch,
}: Readonly<CharacterSearchProps>) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className={styles.root}>
      <IconMagnifier />
      <input
        type="text"
        placeholder="Search a character..."
        value={searchTerm}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  )
}
