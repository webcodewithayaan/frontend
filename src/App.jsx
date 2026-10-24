import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import { Login, Signup } from './pages/Auth.jsx'
import { AdminPortal, HRPortal, EmployeePortal } from './pages/Portals.jsx'
import {About,Schedule,Challenges,Projects,Resources,Mentors,FAQ,Gallery,Register,Contact,NotFound} from './pages/Pages.jsx'
export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/admin" element={<ProtectedRoute role="Admin"><AdminPortal/></ProtectedRoute>}/><Route path="/hr-manager" element={<ProtectedRoute role="HR Manager"><HRPortal/></ProtectedRoute>}/><Route path="/employee" element={<ProtectedRoute role="Employee"><EmployeePortal/></ProtectedRoute>}/><Route path="/about" element={<About/>}/><Route path="/schedule" element={<Schedule/>}/><Route path="/challenges" element={<Challenges/>}/><Route path="/projects" element={<Projects/>}/><Route path="/resources" element={<Resources/>}/><Route path="/mentors" element={<Mentors/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/register" element={<Register/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout>}