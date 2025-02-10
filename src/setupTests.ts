import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY = 'test-public-key'
process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY = 'test-private-key'

afterEach(() => {
  cleanup()
})
