import type { Metadata } from 'next'

import { CharacterProvider } from '@/features/characters/context/CharacterContext'

import Header from '@/common/components/Header/Header'
import Main from '@/common/components/Main/Main'

import '../common/styles/globals/styles.scss'

export const metadata: Metadata = {
  title: 'Juan Antonio Ledesma | Marvel Challenge',
  description: 'Marvel Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CharacterProvider>
          <Header />
          <Main>{children}</Main>
        </CharacterProvider>
      </body>
    </html>
  )
}
