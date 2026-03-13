import { api } from './apiClient'

/**
 * Service de gestion des utilisateurs
 */

// Mappings FR (minuscules frontend) → FR (majuscules API backend)
const WORK_STYLE_MAP = {
  'autonomie': 'Autonome',
  'collaboration': 'Collaboratif',
  'flexibilite': 'Flexible',
  'stabilite': 'Structuré'
}

const MOTIVATION_TYPE_MAP = {
  'impact': 'Impact',
  'reconnaissance': 'Reconnaissance',
  'apprentissage': 'Apprentissage',
  'equilibre': 'Équilibre'
}

const STRESS_SOURCE_MAP = {
  'charge-travail': 'Charge de travail',
  'relations': 'Relations',
  'incertitude': 'Incertitude',
  'delais': 'Délais'
}

// Récupérer les informations de l'utilisateur connecté
export async function getUserInfo() {
  try {
    const response = await api.get('/users/me')
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération des infos utilisateur:', error)
    throw error
  }
}

// Mettre à jour les informations de l'utilisateur (nom, prénom)
export async function updateUserInfo(firstName, lastName) {
  try {
    const response = await api.put('/users/me/info', {
      first_name: firstName,
      last_name: lastName
    })
    return response
  } catch (error) {
    console.error('Erreur lors de la mise à jour des infos utilisateur:', error)
    throw error
  }
}

// Mettre à jour les réponses d'onboarding
export async function updateOnboarding(data) {
  try {
    // Convertir les valeurs françaises minuscules en français avec majuscules pour l'API
    const payload = {
      work_style: WORK_STYLE_MAP[data.workStyle] || data.workStyle,
      motivation_type: MOTIVATION_TYPE_MAP[data.motivationType] || data.motivationType,
      stress_source: STRESS_SOURCE_MAP[data.stressSource] || data.stressSource
    }
    
    console.log('Données onboarding (frontend minuscules):', data)
    console.log('Données onboarding (API majuscules):', payload)
    
    const response = await api.put('/users/me/onboarding', payload)
    return response
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'onboarding:', error)
    throw error
  }
}
