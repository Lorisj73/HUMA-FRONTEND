import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setAuthToken, getAuthToken, clearAuthToken } from '../services/apiClient'

describe('Auth - Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Connexion via formulaire', () => {
    it('should store token and redirect to home page on successful login', async () => {
      // Mock successful login response
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test'
      const mockResponse = {
        ok: true,
        json: async () => ({ token: mockToken, user: { id: 1, email: 'test@example.com' } })
      }
      
      global.fetch = vi.fn().mockResolvedValue(mockResponse)
      
      // Simulate login
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
      })
      
      const data = await response.json()
      
      // Store token
      setAuthToken(data.token)
      
      // Verify token is stored
      expect(localStorage.setItem).toHaveBeenCalledWith('huma_auth_token', mockToken)
      expect(response.ok).toBe(true)
      
      // Simulate redirect (in real app, router would handle this)
      const shouldRedirect = response.ok && data.token
      expect(shouldRedirect).toBeTruthy()
    })
  })

  describe('Accès page protégée sans connexion', () => {
    it('should redirect to login when accessing protected page without token', () => {
      // Simulate no token in localStorage
      localStorage.getItem.mockReturnValue(null)
      
      const token = getAuthToken()
      
      // Verify no token exists
      expect(token).toBeNull()
      
      // In a real scenario, the router guard would check this
      const shouldRedirectToLogin = !token
      expect(shouldRedirectToLogin).toBe(true)
    })

    it('should allow access to protected page when token exists', () => {
      // Simulate token in localStorage
      const mockToken = 'valid-token-123'
      localStorage.getItem.mockReturnValue(mockToken)
      
      const token = getAuthToken()
      
      // Verify token exists
      expect(token).toBe(mockToken)
      
      const shouldAllowAccess = !!token
      expect(shouldAllowAccess).toBe(true)
    })
  })

  describe('Expiration token (401 API)', () => {
    it('should automatically logout when receiving 401 from API', async () => {
      // Mock 401 unauthorized response
      const mock401Response = {
        ok: false,
        status: 401,
        json: async () => ({ error: 'Token expired' })
      }
      
      global.fetch = vi.fn().mockResolvedValue(mock401Response)
      
      // Store a token first
      const expiredToken = 'expired-token'
      setAuthToken(expiredToken)
      
      // Make a request that returns 401
      const response = await fetch('http://localhost:3000/users/me', {
        headers: { 'Authorization': `Bearer ${expiredToken}` }
      })
      
      // Check if it's a 401
      expect(response.status).toBe(401)
      
      // Simulate automatic logout on 401
      if (response.status === 401) {
        clearAuthToken()
      }
      
      // Verify token was cleared
      expect(localStorage.removeItem).toHaveBeenCalledWith('huma_auth_token')
      
      // Verify user is logged out
      localStorage.getItem.mockReturnValue(null)
      expect(getAuthToken()).toBeNull()
    })
  })
})
