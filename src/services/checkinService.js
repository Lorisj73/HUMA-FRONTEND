import { api } from './apiClient'

// Mapping des causes (front  API)
// IMPORTANT: Ces valeurs doivent correspondre à VALID_CAUSES dans checkinSchemas.js du backend
const CAUSE_MAPPING = {
  'Charge / Rythme': 'WORKLOAD',
  'Relations / Ambiance': 'RELATIONS',
  'Sens / Motivation': 'MOTIVATION',
  'Organisation / Clarté': 'CLARITY',
  'Reconnaissance': 'RECOGNITION',
  'Équilibre pro/perso': 'BALANCE'
}

const CAUSE_REVERSE_MAPPING = {
  'WORKLOAD': 'Charge / Rythme',
  'RELATIONS': 'Relations / Ambiance',
  'MOTIVATION': 'Sens / Motivation',
  'CLARITY': 'Organisation / Clarté',
  'RECOGNITION': 'Reconnaissance',
  'BALANCE': 'Équilibre pro/perso'
}

// Créer un check-in
export async function createCheckin(moodValue, selectedOptions, comment = '') {
  try {
    // Convertir les IDs d'options en causes API
    const optionLabels = [
      'Charge / Rythme',
      'Relations / Ambiance',
      'Sens / Motivation',
      'Organisation / Clarté',
      'Reconnaissance',
      'Équilibre pro/perso'
    ]
    
    const causes = selectedOptions
      .map(id => CAUSE_MAPPING[optionLabels[id - 1]])
      .filter(Boolean)

    console.log(' Envoi du check-in:', { moodValue, causes, comment })

    const response = await api.post('/checkins', {
      moodValue,
      causes,
      comment,
      timestamp: new Date().toISOString()
    })
    
    console.log(' Check-in créé avec succès:', response)
    return response
  } catch (error) {
    console.error(' Erreur lors de la création du check-in:', error)
    throw error
  }
}

// Vérifier si un check-in a été fait aujourd'hui
export async function checkTodayStatus() {
  try {
    console.log('📡 checkinService.checkTodayStatus - Appel API /checkins/today')
    const response = await api.get('/checkins/today')
    console.log('✅ checkinService.checkTodayStatus - Réponse:', response)
    return response
  } catch (error) {
    console.error('❌ checkinService.checkTodayStatus - Erreur:', error)
    throw error
  }
}

// Récupérer l'historique des check-ins
export async function getCheckinHistory(days = 30) {
  try {
    console.log(`📡 checkinService.getCheckinHistory - Appel API /checkins/history?days=${days}`)
    const response = await api.get(`/checkins/history?days=${days}`)
    console.log('✅ checkinService.getCheckinHistory - Réponse:', response)
    return response
  } catch (error) {
    console.error('❌ checkinService.getCheckinHistory - Erreur:', error)
    throw error
  }
}

// Récupérer le résumé (week/month/year)
export async function getWeeklySummary(weekStart = null, period = 'week', date = null) {
  try {
    const params = new URLSearchParams()
    if (weekStart) params.append('weekStart', weekStart)
    params.append('period', period.toLowerCase())
    if (date) params.append('date', date)

    const response = await api.get(`/checkins/weekly-summary?${params.toString()}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération du résumé:', error)
    throw error
  }
}

// Récupérer le résumé mensuel
export async function getMonthlySummary(date = null) {
  try {
    const dateParam = date || new Date().toISOString().slice(0, 7)
    return getWeeklySummary(null, 'month', dateParam)
  } catch (error) {
    console.error('Erreur lors de la récupération du résumé mensuel:', error)
    throw error
  }
}

// Récupérer le résumé annuel
export async function getYearlySummary(year = null) {
  try {
    const yearParam = String(year || new Date().getFullYear())
    return getWeeklySummary(null, 'year', yearParam)
  } catch (error) {
    console.error('Erreur lors de la récupération du résumé annuel:', error)
    throw error
  }
}

// Récupérer les facteurs (week/month/year)
export async function getWeeklyFactors(weekStart = null, period = 'week', date = null) {
  try {
    const params = new URLSearchParams()
    if (weekStart) params.append('weekStart', weekStart)
    params.append('period', period.toLowerCase())
    if (date) params.append('date', date)

    const response = await api.get(`/checkins/weekly-factors?${params.toString()}`)
    return response
  } catch (error) {
    console.error('Erreur lors de la récupération des facteurs:', error)
    throw error
  }
}

// Récupérer les facteurs mensuels
export async function getMonthlyFactors(date = null) {
  try {
    const dateParam = date || new Date().toISOString().slice(0, 7)
    return getWeeklyFactors(null, 'month', dateParam)
  } catch (error) {
    console.error('Erreur lors de la récupération des facteurs mensuels:', error)
    throw error
  }
}

// Récupérer les facteurs annuels
export async function getYearlyFactors(year = null) {
  try {
    const yearParam = String(year || new Date().getFullYear())
    return getWeeklyFactors(null, 'year', yearParam)
  } catch (error) {
    console.error('Erreur lors de la récupération des facteurs annuels:', error)
    throw error
  }
}

// Fonction utilitaire pour convertir les causes API en labels frontend
export function convertCausesToLabels(causes) {
  return causes.map(cause => CAUSE_REVERSE_MAPPING[cause] || cause)
}
