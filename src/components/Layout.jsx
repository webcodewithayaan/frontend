import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Chatbot from './Chatbot.jsx'
import { useAuth, portalPath } from '../lib/auth.jsx'

const nav = [
  ['Home','/'],['About','/about'],['Schedule','/schedule'],['Challenges','/challenges'],
  ['Projects','/projects'],['Resources','/resources'],['Mentors','/mentors'],['FAQ','/faq']
]
export default function Layout({children}) {
  const [open,setOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  React.useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[location.pathname])
  return <>
    <div className="announcement"><span className="live-dot"></span> CARE FOR PEOPLE. MANAGE WITH CONFIDENCE.</div>
    <nav className="navbar navbar-expand-lg site-nav">
      <div className="container">
        <Link to="/" className="navbar-brand brand-mark"><span className="brand-icon"><i className="bi bi-heart-pulse-fill"/></span><span>Human<span className="accent">Health</span><small> MANAGEMENT PORTAL</small></span></Link>
        <button className="navbar-toggler custom-toggler" onClick={()=>setOpen(!open)} aria-label="Toggle navigation"><i className={`bi ${open?'bi-x-lg':'bi-list'}`}></i></button>
        <div className={`collapse navbar-collapse ${open?'show':''}`}>
          <div className="navbar-nav mx-auto nav-links">{nav.map(([label,path])=><NavLink key={path} to={path} end={path==='/'} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{label}</NavLink>)}{user?<NavLink to={portalPath(user.role)} className="nav-link">My Portal</NavLink>:<NavLink to="/login" className="nav-link">Login</NavLink>}</div>
          <Link to="/register" className="btn btn-neon nav-cta">Get started <i className="bi bi-arrow-up-right ms-1"/></Link>
        </div>
      </div>
    </nav>
    <main>{children}</main>
    <footer className="site-footer"><div className="container"><div className="row gy-4 align-items-start"><div className="col-lg-5"><Link to="/" className="navbar-brand brand-mark"><span className="brand-icon"><i className="bi bi-heart-pulse-fill"/></span><span>Human<span className="accent">Health</span><small> MANAGEMENT PORTAL</small></span></Link><p className="footer-copy mt-3">A smarter workspace for people, teams, and healthcare operations.</p></div><div className="col-6 col-lg-2"><h6>Explore</h6><Link to="/about">About</Link><Link to="/schedule">Schedule</Link><Link to="/projects">Projects</Link></div><div className="col-6 col-lg-2"><h6>Get involved</h6><Link to="/challenges">Challenges</Link><Link to="/resources">Resources</Link><Link to="/register">Register</Link></div><div className="col-lg-3"><h6>Keep building.</h6><p className="footer-copy">People-first tools for organized, connected teams.</p><div className="socials"><a href="https://www.saylaniwelfare.com/" target="_blank" rel="noreferrer" aria-label="Saylani website"><i className="bi bi-globe2"/></a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="bi bi-github"/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin"/></a></div></div></div><div className="footer-bottom"><span>© 2026 Human Health Management. All rights reserved.</span><span>Made by Ayaan Muhammad <i className="bi bi-heart-fill accent"/></span></div></div></footer>
    <Chatbot/>
  </>
}