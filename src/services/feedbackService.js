import { api } from './apiClient'

/**
 * Service de gestion des feedbacks
 */

// Mapping des catégories entre le frontend et le backend
const CATEGORY_MAPPING = {
  'Charge / Rythme': 'WORKLOAD',
  'Relations / Ambiance': 'RELATIONS',
  'Sens / Motivation': 'MOTIVATION',
  'Organisation / Clarté': 'ORGANIZATION',
  'Reconnaissance': 'RECOGNITION',
  'Équilibre vie pro / perso': 'WORK_LIFE_BALANCE',
  'Locaux / Matériel': 'FACILITIES'
}

const CATEGORY_REVERSE_MAPPING = {
  'WORKLOAD': 'Charge / Rythme',
  'RELATIONS': 'Relations / Ambiance',
  'MOTIVATION': 'Sens / Motivation',
  'ORGANIZATION': 'Organisation / Clarté',
  'RECOGNITION': 'Reconnaissance',
  'WORK_LIFE_BALANCE': 'Équilibre vie pro / perso',
  'FACILITIES': 'Locaux / Matériel'
}

// Créer un feedback
export async function createFeedback(category, feedbackText, solutionText = '', isAnonymous = true) {
  try {
    const apiCategory = CATEGORY_MAPPING[category] || category
    
    const response = await api.post('/feedbacks', {
      category: apiCategory,
      feedbackText,
      solutionText,
      isAnonymous
    })
    return response
  } catch (error) {
    console.error('Erreur lors de la création du feedback:', error)
    throw error
  }
}

// Récupérer l'historique des feedbacks
export async function getFeedbacks() {
  try {
    const response = await api.get('/feedbacks')
    // Convertir les catégories API en labels frontend et retourner directement le tableau
    if (Array.isArray(response)) {
      return response.map(feedback => ({
        ...feedback,
        categoryLabel: CATEGORY_REVERSE_MAPPING[feedback.category] || feedback.category
      }))
    }
    return []
  } catch (error) {
    console.error('Erreur lors de la récupération des feedbacks:', error)
    throw error
  }
}

// Fonction utilitaire pour obtenir toutes les catégories
export function getCategories() {
  return [
    'Charge / Rythme',
    'Relations / Ambiance',
    'Sens / Motivation',
    'Organisation / Clarté',
    'Reconnaissance',
    'Équilibre vie pro / perso',
    'Locaux / Matériel'
  ]
}
