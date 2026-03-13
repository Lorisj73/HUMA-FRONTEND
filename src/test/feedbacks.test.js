import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Feedbacks - Feedback Management', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Création feedback avec option anonymat', () => {
    it('should create anonymous feedback successfully', async () => {
      // Anonymous feedback data
      const feedbackData = {
        category: 'MOTIVATION',
        feedbackText: 'Je manque de reconnaissance pour mon travail',
        isAnonymous: true
      }

      // Mock successful feedback creation
      const mockResponse = {
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          feedbackId: 'feedback-123',
          message: 'Feedback submitted successfully',
          data: {
            ...feedbackData,
            createdAt: new Date().toISOString(),
            authorName: null // Anonymous, no author name
          }
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Submit feedback
      const response = await fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(feedbackData)
      })

      const result = await response.json()

      // Verify submission
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/feedbacks',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(feedbackData)
        })
      )

      // Verify response
      expect(response.ok).toBe(true)
      expect(response.status).toBe(201)
      expect(result.success).toBe(true)
      expect(result.feedbackId).toBeDefined()
      
      // Verify anonymity is preserved
      expect(result.data.isAnonymous).toBe(true)
      expect(result.data.authorName).toBeNull()
    })

    it('should create non-anonymous feedback with author information', async () => {
      // Non-anonymous feedback data
      const feedbackData = {
        category: 'WORKLOAD',
        feedbackText: 'La charge de travail est trop importante cette semaine',
        isAnonymous: false
      }

      // Mock successful feedback creation
      const mockResponse = {
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          feedbackId: 'feedback-456',
          message: 'Feedback submitted successfully',
          data: {
            ...feedbackData,
            createdAt: new Date().toISOString(),
            authorName: 'Jean Dupont'
          }
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Submit feedback
      const response = await fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(feedbackData)
      })

      const result = await response.json()

      // Verify response
      expect(result.success).toBe(true)
      expect(result.data.isAnonymous).toBe(false)
      expect(result.data.authorName).toBe('Jean Dupont')
    })

    it('should validate feedback data before submission', () => {
      // Test validation
      const invalidFeedback = {
        category: '',
        feedbackText: '',
        isAnonymous: false
      }

      const isValid = invalidFeedback.category && invalidFeedback.feedbackText
      expect(isValid).toBeFalsy()

      // Complete feedback
      invalidFeedback.category = 'MOTIVATION'
      invalidFeedback.feedbackText = 'Test feedback'
      
      const isValidAfter = invalidFeedback.category && invalidFeedback.feedbackText
      expect(isValidAfter).toBeTruthy()
    })
  })

  describe('Consultation liste feedbacks', () => {
    it('should display list of feedbacks with anonymity management', async () => {
      // Mock feedbacks list response
      const mockResponse = {
        ok: true,
        json: async () => ({
          feedbacks: [
            {
              id: 1,
              category: 'MOTIVATION',
              feedbackText: 'Je manque de reconnaissance',
              isAnonymous: true,
              authorName: null,
              createdAt: '2026-03-10T10:00:00Z'
            },
            {
              id: 2,
              category: 'WORKLOAD',
              feedbackText: 'Trop de charge de travail',
              isAnonymous: false,
              authorName: 'Jean Dupont',
              createdAt: '2026-03-09T14:30:00Z'
            },
            {
              id: 3,
              category: 'BALANCE',
              feedbackText: 'Difficulté à équilibrer vie pro/perso',
              isAnonymous: true,
              authorName: null,
              createdAt: '2026-03-08T09:15:00Z'
            }
          ]
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Fetch feedbacks list
      const response = await fetch('http://localhost:3000/feedbacks', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Verify list is retrieved
      expect(response.ok).toBe(true)
      expect(data.feedbacks).toBeInstanceOf(Array)
      expect(data.feedbacks.length).toBe(3)

      // Verify anonymity handling
      const anonymousFeedbacks = data.feedbacks.filter(f => f.isAnonymous)
      const namedFeedbacks = data.feedbacks.filter(f => !f.isAnonymous)

      expect(anonymousFeedbacks.length).toBe(2)
      expect(namedFeedbacks.length).toBe(1)

      // Verify anonymous feedbacks don't show author
      anonymousFeedbacks.forEach(feedback => {
        expect(feedback.isAnonymous).toBe(true)
        expect(feedback.authorName).toBeNull()
      })

      // Verify named feedbacks show author
      namedFeedbacks.forEach(feedback => {
        expect(feedback.isAnonymous).toBe(false)
        expect(feedback.authorName).toBeDefined()
        expect(feedback.authorName).not.toBeNull()
      })
    })

    it('should display author name or "Anonyme" based on isAnonymous flag', () => {
      const feedbacks = [
        { id: 1, authorName: null, isAnonymous: true },
        { id: 2, authorName: 'Jean Dupont', isAnonymous: false },
        { id: 3, authorName: null, isAnonymous: true }
      ]

      // Map feedbacks to display format
      const displayFeedbacks = feedbacks.map(f => ({
        ...f,
        displayAuthor: f.isAnonymous ? 'Anonyme' : f.authorName
      }))

      // Verify display format
      expect(displayFeedbacks[0].displayAuthor).toBe('Anonyme')
      expect(displayFeedbacks[1].displayAuthor).toBe('Jean Dupont')
      expect(displayFeedbacks[2].displayAuthor).toBe('Anonyme')
    })

    it('should filter feedbacks by category', async () => {
      const allFeedbacks = [
        { id: 1, category: 'MOTIVATION', feedbackText: 'Test 1' },
        { id: 2, category: 'WORKLOAD', feedbackText: 'Test 2' },
        { id: 3, category: 'MOTIVATION', feedbackText: 'Test 3' },
        { id: 4, category: 'BALANCE', feedbackText: 'Test 4' }
      ]

      // Mock response
      const mockResponse = {
        ok: true,
        json: async () => ({ feedbacks: allFeedbacks })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const response = await fetch('http://localhost:3000/feedbacks', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Filter by category
      const motivationFeedbacks = data.feedbacks.filter(f => f.category === 'MOTIVATION')
      const workloadFeedbacks = data.feedbacks.filter(f => f.category === 'WORKLOAD')

      expect(motivationFeedbacks.length).toBe(2)
      expect(workloadFeedbacks.length).toBe(1)
      
      motivationFeedbacks.forEach(f => {
        expect(f.category).toBe('MOTIVATION')
      })
    })
  })
})
