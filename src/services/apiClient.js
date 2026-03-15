const BASE_URL = import.meta.env.VITE_API_URL || ''

// Token JWT storage key
const TOKEN_KEY = 'huma_auth_token'

// Get the authentication token from localStorage
export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

// Set the authentication token in localStorage
export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

// Clear the authentication token from localStorage
export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', headers = {}, body, requiresAuth = true } = {}) {
  const url = `${BASE_URL}${path}`
  
  // Build headers
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  // Add Authorization header if token exists and auth is required
  if (requiresAuth) {
    const token = getAuthToken()
    console.log('Token pour la requête:', token ? 'PRÉSENT' : 'ABSENT')
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('Requête nécessitant une authentification mais pas de token!')
    }
  }

  console.log(`${method} ${url}`, { requiresAuth, hasToken: !!getAuthToken() })

  const init = {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  }

  const res = await fetch(url, init)
  const contentType = res.headers.get('content-type') || ''
  const parseJson = contentType.includes('application/json')

  if (!res.ok) {
    const errPayload = parseJson ? await res.json().catch(() => ({})) : await res.text()
    const error = new Error(`HTTP ${res.status}`)
    error.status = res.status
    error.payload = errPayload

    // Redirect to login on expired/invalid token
    if (
      res.status === 401 &&
      typeof errPayload === 'object' &&
      (errPayload.code === 'UNAUTHORIZED' &&
        typeof errPayload.message === 'string' &&
        errPayload.message.toLowerCase().includes('token expired'))
    ) {
      clearAuthToken()
      window.location.href = '/login'
      return
    }

    throw error
  }

  return parseJson ? res.json() : res.text()
}

export const api = {
  get: (path, options = {}) => request(path, { method: 'GET', ...options }),
  post: (path, body, options = {}) => request(path, { method: 'POST', body, ...options }),
  put: (path, body, options = {}) => request(path, { method: 'PUT', body, ...options }),
  patch: (path, body, options = {}) => request(path, { method: 'PATCH', body, ...options }),
  delete: (path, options = {}) => request(path, { method: 'DELETE', ...options }),
}
