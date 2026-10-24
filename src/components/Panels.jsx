import React, { useEffect, useState, useCallback } from 'react'
import { apiRequest } from '../lib/api.js'

const fmt = (d) => new Date(d).toLocaleDateString()
const Badge = ({ s }) => <span className="demo-badge">{String(s).toUpperCase()}</span>

// Employee: leave request form + apni requests
export function EmployeeLeavePanel() {
  const [leaves, setLeaves] = useState([])
  const [form, setForm] = useState({ type: 'Annual', startDate: '', endDate: '', reason: '' })
  const [msg, setMsg] = useState('')
  const load = useCallback(() => apiRequest('/api/leaves/mine').then((d) => setLeaves(d.leaves)).catch((e) => setMsg(e.message)), [])
  useEffect(() => { load() }, [load])
  const upd = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault(); setMsg('')
    try { await apiRequest('/api/leaves', { method: 'POST', body: form }); setForm({ ...form, startDate: '', endDate: '', reason: '' }); setMsg('Leave request submitted.'); load() }
    catch (err) { setMsg(err.message) }
  }
  return <div className="row g-3 mt-2">
    <div className="col-lg-5"><form className="registration-form" onSubmit={submit}>
      <h3>Request leave</h3>
      <label>Type</label><select name="type" value={form.type} onChange={upd}><option>Annual</option><option>Sick</option><option>Casual</option><option>Unpaid</option></select>
      <label>From</label><input type="date" name="startDate" required value={form.startDate} onChange={upd}/>
      <label>To</label><input type="date" name="endDate" required value={form.endDate} onChange={upd}/>
      <label>Reason</label><input name="reason" value={form.reason} onChange={upd} placeholder="Optional"/>
      <button className="btn btn-neon w-100 mt-3">Submit request</button>
      {msg && <p className="auth-message">{msg}</p>}
    </form></div>
    <div className="col-lg-7"><h3>My requests</h3>
      {leaves.length === 0 ? <p className="body-muted">No requests yet.</p> : leaves.map((l) => <article key={l._id} className="portal-tool"><h3>{l.type} · {l.days} day(s) <Badge s={l.status}/></h3><p>{fmt(l.startDate)} → {fmt(l.endDate)}{l.reason ? ` · ${l.reason}` : ''}</p></article>)}
    </div>
  </div>
}

// HR/Admin: pending leave approve/reject
export function LeaveReviewPanel() {
  const [leaves, setLeaves] = useState([])
  const [msg, setMsg] = useState('')
  const load = useCallback(() => apiRequest('/api/leaves?status=pending').then((d) => setLeaves(d.leaves)).catch((e) => setMsg(e.message)), [])
  useEffect(() => { load() }, [load])
  async function review(id, status) {
    try { await apiRequest(`/api/leaves/${id}`, { method: 'PATCH', body: { status } }); load() } catch (e) { setMsg(e.message) }
  }
  return <div className="mt-2"><h3>Pending leave requests</h3>{msg && <p className="auth-message">{msg}</p>}
    {leaves.length === 0 ? <p className="body-muted">Nothing pending.</p> : leaves.map((l) => <article key={l._id} className="portal-tool">
      <h3>{l.user?.name || 'Unknown'} · {l.type} · {l.days} day(s)</h3>
      <p>{fmt(l.startDate)} → {fmt(l.endDate)}{l.reason ? ` · ${l.reason}` : ''}</p>
      <button className="portal-tool-link" onClick={() => review(l._id, 'approved')}>Approve</button>{' '}
      <button className="portal-tool-link" onClick={() => review(l._id, 'rejected')}>Reject</button>
    </article>)}
  </div>
}

// Admin: users, role change, suspend
export function UserAdminPanel() {
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState('')
  const load = useCallback(() => apiRequest('/api/users').then((d) => setUsers(d.users)).catch((e) => setMsg(e.message)), [])
  useEffect(() => { load() }, [load])
  async function patch(id, body) { try { await apiRequest(`/api/users/${id}`, { method: 'PATCH', body }); load() } catch (e) { setMsg(e.message) } }
  return <div className="mt-2"><h3>Users & roles</h3>{msg && <p className="auth-message">{msg}</p>}
    {users.map((u) => <article key={u._id} className="portal-tool">
      <h3>{u.name} <Badge s={u.status}/></h3>
      <p>{u.email}{u.requestedRole !== u.role ? ` · requested: ${u.requestedRole}` : ''}</p>
      <select value={u.role} onChange={(e) => patch(u._id, { role: e.target.value })}><option>Employee</option><option>HR Manager</option><option>Admin</option></select>{' '}
      <button className="portal-tool-link" onClick={() => patch(u._id, { status: u.status === 'active' ? 'suspended' : 'active' })}>{u.status === 'active' ? 'Suspend' : 'Activate'}</button>
    </article>)}
  </div>
}
