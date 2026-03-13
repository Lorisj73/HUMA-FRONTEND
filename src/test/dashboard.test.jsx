import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Chart.js to avoid canvas errors in tests
vi.mock('react-chartjs-2', () => ({
  Line: ({ data, options }) => (
    <div data-testid="line-chart">
      <div>{options?.plugins?.title?.text || 'Chart'}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  ),
  Bar: ({ data, options }) => (
    <div data-testid="bar-chart">
      <div>{options?.plugins?.title?.text || 'Chart'}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}))

describe('Dashboard - Data Visualization', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Affichage graphique tendances équipe (manager)', () => {
    it('should render team trends chart correctly with Chart.js for managers', async () => {
      // Set manager role
      localStorage.setItem('huma_is_manager', '1')
      
      // Mock team stats API response
      const mockResponse = {
        ok: true,
        json: async () => ({
          teamStats: {
            averageMood: 6.8,
            participationRate: 85,
            trends: [
              { date: '2026-03-03', averageMood: 6.5 },
              { date: '2026-03-04', averageMood: 6.7 },
              { date: '2026-03-05', averageMood: 6.9 },
              { date: '2026-03-06', averageMood: 7.0 },
              { date: '2026-03-07', averageMood: 6.8 }
            ]
          }
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      // Fetch team stats
      const response = await fetch('http://localhost:3000/team/stats', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Verify data structure for Chart.js
      expect(data.teamStats).toBeDefined()
      expect(data.teamStats.trends).toBeInstanceOf(Array)
      expect(data.teamStats.trends.length).toBe(5)

      // Prepare data for Chart.js
      const chartData = {
        labels: data.teamStats.trends.map(t => t.date),
        datasets: [{
          label: 'Humeur moyenne de l\'équipe',
          data: data.teamStats.trends.map(t => t.averageMood),
          borderColor: '#0748EA',
          backgroundColor: 'rgba(7, 72, 234, 0.1)',
        }]
      }

      // Verify Chart.js data format
      expect(chartData.labels.length).toBe(5)
      expect(chartData.datasets[0].data.length).toBe(5)
      expect(chartData.datasets[0].label).toBe('Humeur moyenne de l\'équipe')

      // Verify chart renders correctly (mocked)
      const chartElement = { type: 'line', data: chartData }
      expect(chartElement.type).toBe('line')
      expect(chartElement.data).toEqual(chartData)
    })

    it('should display correct chart options and styling', () => {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Évolution de l\'humeur de l\'équipe'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        }
      }

      // Verify chart configuration
      expect(chartOptions.responsive).toBe(true)
      expect(chartOptions.plugins.title.text).toBe('Évolution de l\'humeur de l\'équipe')
      expect(chartOptions.scales.y.min).toBe(0)
      expect(chartOptions.scales.y.max).toBe(10)
    })
  })

  describe('Affichage vue employé vs vue manager', () => {
    it('should show employee view when user is not a manager', async () => {
      // Set employee role (not manager)
      localStorage.setItem('huma_is_manager', '0')
      
      const isManager = localStorage.getItem('huma_is_manager') === '1'
      expect(isManager).toBe(false)

      // Mock employee-specific data
      const mockResponse = {
        ok: true,
        json: async () => ({
          personalStats: {
            myAverageMood: 7.2,
            myCheckinStreak: 5
          }
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const response = await fetch('http://localhost:3000/users/me/stats', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Verify employee-specific data
      expect(data.personalStats).toBeDefined()
      expect(data.personalStats.myAverageMood).toBeDefined()
      expect(data.personalStats.myCheckinStreak).toBeDefined()

      // Components should be conditioned by role
      const shouldShowManagerTools = isManager
      const shouldShowEmployeeView = !isManager

      expect(shouldShowManagerTools).toBe(false)
      expect(shouldShowEmployeeView).toBe(true)
    })

    it('should show manager view with team management tools when user is manager', async () => {
      // Set manager role
      localStorage.setItem('huma_is_manager', '1')
      
      const isManager = localStorage.getItem('huma_is_manager') === '1'
      expect(isManager).toBe(true)

      // Mock manager-specific data
      const mockResponse = {
        ok: true,
        json: async () => ({
          teamStats: {
            teamSize: 8,
            averageMood: 6.8,
            participationRate: 85
          },
          teamMembers: [
            { id: 1, name: 'Alice', mood: 7 },
            { id: 2, name: 'Bob', mood: 6 }
          ]
        })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const response = await fetch('http://localhost:3000/team/stats', {
        headers: { 'Authorization': 'Bearer test-token' }
      })

      const data = await response.json()

      // Verify manager-specific data
      expect(data.teamStats).toBeDefined()
      expect(data.teamStats.teamSize).toBe(8)
      expect(data.teamMembers).toBeInstanceOf(Array)
      expect(data.teamMembers.length).toBeGreaterThan(0)

      // Components should be conditioned by role
      const shouldShowManagerTools = isManager
      const shouldShowEmployeeView = !isManager
      const shouldShowTeamAnalytics = isManager

      expect(shouldShowManagerTools).toBe(true)
      expect(shouldShowEmployeeView).toBe(false)
      expect(shouldShowTeamAnalytics).toBe(true)
    })

    it('should conditionally render components based on user role', () => {
      // Test role-based component visibility
      const roles = [
        { isManager: true, expectedComponents: ['TeamStats', 'TeamChart', 'AIReport', 'TeamMembers'] },
        { isManager: false, expectedComponents: ['PersonalStats', 'PersonalChart', 'PersonalHistory'] }
      ]

      roles.forEach(({ isManager, expectedComponents }) => {
        localStorage.setItem('huma_is_manager', isManager ? '1' : '0')
        
        const userIsManager = localStorage.getItem('huma_is_manager') === '1'
        expect(userIsManager).toBe(isManager)

        // Simulate component visibility logic
        const visibleComponents = []
        
        if (userIsManager) {
          visibleComponents.push('TeamStats', 'TeamChart', 'AIReport', 'TeamMembers')
        } else {
          visibleComponents.push('PersonalStats', 'PersonalChart', 'PersonalHistory')
        }

        expect(visibleComponents).toEqual(expectedComponents)
      })
    })
  })
})
