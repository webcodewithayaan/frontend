// Central API helper. VITE_API_BASE_URL = deployed backend URL (e.g. https://hhm-api.vercel.app)
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'hhm_token'

export const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } }
export const setToken = (t) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch {} }

export async function apiRequest(path, { body, headers, ...options } = {}) {
  const token = getToken()
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(headers || {}) },
      body: body === undefined ? undefined : JSON.stringify(body)
    })
  } catch {
    throw new Error('Cannot reach the server. Please try again.')
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const err = new Error(data.message || `Request failed (${response.status})`)
    err.status = response.status
    throw err
  }
  return data
}
