import type { Metadata } from 'next'

import { CharacterProvider } from '@/features/characters/context/CharacterContext'

import Header from '@/features/common/components/Header'

import '../styles/styles.scss'

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
          <main>{children}</main>
        </CharacterProvider>
      </body>
    </html>
  )
}
