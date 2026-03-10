// Setup file for Vitest
import { afterEach, vi } from 'vitest'

// Mock localStorage with stateful implementation
let store = {}
const localStorageMock = {
  getItem: vi.fn((key) => store[key] || null),
  setItem: vi.fn((key, value) => { store[key] = value }),
  removeItem: vi.fn((key) => { delete store[key] }),
  clear: vi.fn(() => { store = {} }),
}
global.localStorage = localStorageMock

// Reset localStorage before each test
afterEach(() => {
  store = {}
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})

// Mock fetch globally
global.fetch = vi.fn()
