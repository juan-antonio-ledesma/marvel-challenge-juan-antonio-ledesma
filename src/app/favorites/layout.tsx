import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites | Marvel Challenge',
  description: 'Your favorite Marvel characters collected in one place.',
}

export default function FavoritesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
