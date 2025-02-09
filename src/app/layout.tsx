'use client'

import type { Metadata } from 'next'
import { usePathname } from 'next/navigation'

import { CharacterProvider } from '@/features/characters/context/CharacterContext'

import Header from '@/common/components/Header/Header'
import Main from '@/common/components/Main/Main'

import '../common/styles/globals/styles.scss'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  const isCharacterPage = pathname.startsWith('/character/')

  return (
    <html lang="en">
      <body>
        <CharacterProvider>
          <Header />
          {isCharacterPage ? <main>{children}</main> : <Main>{children}</Main>}
        </CharacterProvider>
      </body>
    </html>
  )
}
