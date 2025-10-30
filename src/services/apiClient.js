const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const url = `${BASE_URL}${path}`
  const init = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
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
    throw error
  }

  return parseJson ? res.json() : res.text()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
