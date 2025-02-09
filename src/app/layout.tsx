'use client'

import { usePathname } from 'next/navigation'

import { CharacterProvider } from '@/features/characters/context/CharacterContext'

import Header from '@/common/components/Header/Header'
import Main from '@/common/components/Main/Main'

import '../common/styles/globals/styles.scss'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const pathname = usePathname()

  const isCharacterPage = pathname.startsWith('/character/')

  return (
    <html lang="en">
      <head>
        <title>Marvel Challenge</title>
        <meta
          name="description"
          content="Explore all Marvel characters and their stories!"
        />
      </head>
      <body>
        <CharacterProvider>
          <Header />
          {isCharacterPage ? <main>{children}</main> : <Main>{children}</Main>}
        </CharacterProvider>
      </body>
    </html>
  )
}
