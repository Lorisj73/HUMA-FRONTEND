import { api, setAuthToken, clearAuthToken } from './apiClient'

/**
 * Service d'authentification
 */

// Connexion avec email
export async function login(email) {
  try {
    const response = await api.post('/auth/login', { email }, { requiresAuth: false })
    console.log('Login response:', response)
    if (response.token) {
      setAuthToken(response.token)
      console.log('Token sauvegardé:', response.token)
    } else {
      console.error('Pas de token dans la réponse!', response)
    }
    
    // Retourner toute la réponse pour accéder aux données utilisateur
    return response
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    throw error
  }
}

// Inscription avec email
export async function register(email) {
  try {
    const response = await api.post('/auth/register', { email }, { requiresAuth: false })
    if (response.token) {
      setAuthToken(response.token)
    }
    return response
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    throw error
  }
}

// Déconnexion
export function logout() {
  clearAuthToken()
  localStorage.clear()
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated() {
  const token = localStorage.getItem('huma_auth_token')
  return !!token
}
