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
