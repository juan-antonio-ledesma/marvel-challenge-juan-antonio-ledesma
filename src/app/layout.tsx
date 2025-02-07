import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
