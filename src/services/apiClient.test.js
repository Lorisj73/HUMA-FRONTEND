import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getAuthToken, setAuthToken, clearAuthToken } from './apiClient'

describe('apiClient', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Token Management', () => {
    it('should store auth token in localStorage', () => {
      const token = 'test-token-123'
      setAuthToken(token)
      
      expect(localStorage.setItem).toHaveBeenCalledWith('huma_auth_token', token)
    })

    it('should retrieve auth token from localStorage', () => {
      const token = 'test-token-456'
      localStorage.getItem.mockReturnValue(token)
      
      const result = getAuthToken()
      
      expect(localStorage.getItem).toHaveBeenCalledWith('huma_auth_token')
      expect(result).toBe(token)
    })

    it('should clear auth token from localStorage', () => {
      clearAuthToken()
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('huma_auth_token')
    })

    it('should return null when no token exists', () => {
      localStorage.getItem.mockReturnValue(null)
      
      const result = getAuthToken()
      
      expect(result).toBeNull()
    })
  })
})
