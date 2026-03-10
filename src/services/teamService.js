import { api } from './apiClient'

/**
 * Service de gestion des équipes
 */

// Créer une équipe
export async function createTeam(name) {
  try {
    const response = await api.post('/team', { name })
    return response
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error)
    throw error
  }
}

// Ajouter un membre à l'équipe
export async function addTeamMember(teamId, userId) {
  try {
    const response = await api.post('/team/members', {
      teamId,
      userId
    })
    return response
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un membre:', error)
    throw error
  }
}

// Récupérer les statistiques de l'équipe
export async function getTeamStats(teamId = null) {
  try {
    const params = teamId ? `?teamId=${teamId}` : ''
    const response = await api.get(`/team/stats${params}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération des stats de l\'équipe:', error)
    throw error
  }
}

// Récupérer le résumé hebdomadaire/mensuel/annuel de l'équipe
export async function getWeeklySummary(teamId = null, period = 'week', date = null) {
  try {
    const params = new URLSearchParams()
    if (teamId) params.append('teamId', teamId)
    params.append('period', period.toLowerCase())
    if (date) params.append('date', date)
    
    const response = await api.get(`/team/weekly-summary?${params.toString()}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération du résumé hebdomadaire:', error)
    throw error
  }
}

// Récupérer les facteurs d'influence hebdomadaires/mensuels/annuels
export async function getWeeklyFactors(teamId = null, period = 'week', date = null) {
  try {
    const params = new URLSearchParams()
    if (teamId) params.append('teamId', teamId)
    params.append('period', period.toLowerCase())
    if (date) params.append('date', date)
    
    const response = await api.get(`/team/weekly-factors?${params.toString()}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération des facteurs:', error)
    throw error
  }
}

// Générer un rapport d'analyse hebdomadaire IA pour les managers
export async function generateWeeklyAnalysisReport(teamId = null, weekStart = null) {
  try {
    const params = new URLSearchParams()
    if (teamId) params.append('teamId', teamId)
    if (weekStart) params.append('weekStart', weekStart)
    
    const response = await api.get(`/team/weekly-analysis-report?${params.toString()}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la génération du rapport d\'analyse:', error)
    throw error
  }
}
