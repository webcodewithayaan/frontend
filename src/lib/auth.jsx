import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { apiRequest, getToken, setToken } from './api.js'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)
export const portalPath = (role) => (role === 'Admin' ? '/admin' : role === 'HR Manager' ? '/hr-manager' : '/employee')

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(getToken()))

  useEffect(() => {
    if (!getToken()) return
    apiRequest('/api/auth/me').then((d) => setUser(d.user)).catch(() => setToken(null)).finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (payload) => {
    const d = await apiRequest('/api/auth/login', { method: 'POST', body: payload })
    setToken(d.token); setUser(d.user); return d.user
  }, [])
  const signup = useCallback(async (payload) => {
    const d = await apiRequest('/api/auth/signup', { method: 'POST', body: payload })
    setToken(d.token); setUser(d.user); return d.user
  }, [])
  const logout = useCallback(() => { setToken(null); setUser(null) }, [])

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}
