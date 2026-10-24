import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth, portalPath } from '../lib/auth.jsx'

// UI guard only. Asli security backend me hai (har API call par role check hota hai).
export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="container py-5 text-center">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={portalPath(user.role)} replace />
  return children
}
