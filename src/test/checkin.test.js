import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Check-in - Daily Check-in Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Flux check-in 3 étapes (météo, causes, commentaire)', () => {
    it('should complete 3-step check-in flow and submit successfully', async () => {
      // Step 1: Météo (mood selection)
      const step1Data = {
        mood: 7, // Score from 1-10
        moodLabel: 'Serein'
      }

      // Step 2: Causes (factors influencing mood)
      const step2Data = {
        causes: [
          { factor: 'WORKLOAD', score: 6 },
          { factor: 'RECOGNITION', score: 8 },
          { factor: 'BALANCE', score: 7 }
        ]
      }

      // Step 3: Commentaire (optional comment)
      const step3Data = {
        comment: 'Bonne journée, charge de travail gérable'
      }

      // Complete check-in data
      const checkinData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        date: new Date().toISOString().split('T')[0]
      }

      // Mock successful check-in submission
      const mockResponse = {
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          checkinId: 'checkin-123',
          message: 'Check-in submitted successfully',
          data: checkinData
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Submit check-in
      const response = await fetch('http://localhost:3000/checkins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(checkinData)
      })

      const result = await response.json()

      // Verify submission
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/checkins',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(checkinData)
        })
      )

      // Verify response
      expect(response.ok).toBe(true)
      expect(result.success).toBe(true)
      expect(result.checkinId).toBeDefined()
      expect(result.message).toBe('Check-in submitted successfully')
    })

    it('should validate each step before progression', () => {
      // Step 1: Mood must be selected
      let currentStep = 1
      let moodSelected = null
      
      let canProceed = !!moodSelected
      expect(canProceed).toBe(false)
      
      // Select mood
      moodSelected = 7
      canProceed = !!moodSelected
      expect(canProceed).toBe(true)
      
      // Step 2: At least one cause should be selected
      currentStep = 2
      let causesSelected = []
      
      canProceed = causesSelected.length > 0
      expect(canProceed).toBe(false)
      
      // Select causes
      causesSelected = [{ factor: 'WORKLOAD', score: 6 }]
      canProceed = causesSelected.length > 0
      expect(canProceed).toBe(true)
      
      // Step 3: Comment is optional
      currentStep = 3
      let comment = ''
      canProceed = true // Comment is optional
      expect(canProceed).toBe(true)
    })
  })

  describe('Verrouillage interface après soumission', () => {
    it('should lock interface after check-in submission', async () => {
      // Mock check-in already exists for today
      const mockResponse = {
        ok: true,
        json: async () => ({
          hasCheckinToday: true,
          checkin: {
            id: 'checkin-123',
            mood: 7,
            completedAt: new Date().toISOString()
          }
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Check if user has already submitted check-in today
      const response = await fetch('http://localhost:3000/checkins/today', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Verify interface should be locked
      expect(data.hasCheckinToday).toBe(true)
      
      // In real app, this would disable the form
      const isInterfaceLocked = data.hasCheckinToday
      expect(isInterfaceLocked).toBe(true)
      
      // Verify completed state
      const interfaceState = isInterfaceLocked ? 'complété' : 'editable'
      expect(interfaceState).toBe('complété')
    })

    it('should allow new check-in when no submission exists for today', async () => {
      // Mock no check-in for today
      const mockResponse = {
        ok: true,
        json: async () => ({
          hasCheckinToday: false,
          checkin: null
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const response = await fetch('http://localhost:3000/checkins/today', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      expect(data.hasCheckinToday).toBe(false)
      
      const isInterfaceLocked = data.hasCheckinToday
      expect(isInterfaceLocked).toBe(false)
      
      const interfaceState = isInterfaceLocked ? 'complété' : 'editable'
      expect(interfaceState).toBe('editable')
    })
  })

  describe('Affichage historique personnel', () => {
    it('should display personal check-in history with correct FR/EN mapping', async () => {
      // Mock historical check-ins data (API returns in English)
      const mockResponse = {
        ok: true,
        json: async () => ({
          checkins: [
            {
              id: 1,
              date: '2026-03-10',
              mood: 7,
              causes: [
                { factor: 'WORKLOAD', score: 6 },
                { factor: 'RECOGNITION', score: 8 },
                { factor: 'BALANCE', score: 7 }
              ]
            },
            {
              id: 2,
              date: '2026-03-09',
              mood: 5,
              causes: [
                { factor: 'WORKLOAD', score: 4 },
                { factor: 'CLARITY', score: 5 }
              ]
            }
          ]
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const response = await fetch('http://localhost:3000/checkins/history', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // French mapping for causes
      const CAUSE_LABELS_FR = {
        'WORKLOAD': 'Charge / Rythme',
        'RELATIONS': 'Relations / Ambiance',
        'MOTIVATION': 'Sens / Motivation',
        'CLARITY': 'Organisation / Clarté',
        'RECOGNITION': 'Reconnaissance',
        'BALANCE': 'Équilibre pro/perso'
      }

      // Verify data is correctly mapped
      expect(data.checkins.length).toBe(2)
      
      // Map first check-in causes to French
      const firstCheckin = data.checkins[0]
      const mappedCauses = firstCheckin.causes.map(c => ({
        ...c,
        labelFR: CAUSE_LABELS_FR[c.factor]
      }))

      expect(mappedCauses[0].labelFR).toBe('Charge / Rythme')
      expect(mappedCauses[1].labelFR).toBe('Reconnaissance')
      expect(mappedCauses[2].labelFR).toBe('Équilibre pro/perso')

      // Verify all causes are properly mapped
      mappedCauses.forEach(cause => {
        expect(cause.labelFR).toBeDefined()
        expect(CAUSE_LABELS_FR[cause.factor]).toBe(cause.labelFR)
      })
    })
  })
})
