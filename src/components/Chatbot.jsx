import React, { useState } from 'react'
import { apiRequest } from '../lib/api.js'

export default function Chatbot(){
  const [open,setOpen]=useState(false)
  const [input,setInput]=useState('')
  const [busy,setBusy]=useState(false)
  const [messages,setMessages]=useState([{role:'assistant',text:'Hey there! 👋 I’m CodeBuddy. Ask me anything about Human Health Management.'}])
  async function send(e){
    e?.preventDefault()
    const value=input.trim()
    if(!value||busy)return
    setMessages(m=>[...m,{role:'user',text:value}]);setInput('');setBusy(true)
    try{
      const data = await apiRequest('/api/chat', {method:'POST', body:{message:value}})
      setMessages(m=>[...m,{role:'assistant',text:data.reply}])
    }catch{
      setMessages(m=>[...m,{role:'assistant',text:'I couldn’t connect right now. Please try again.'}])
    }finally{setBusy(false)}
  }
  return <>
    {open&&<section className="chat-window" aria-label="CodeBuddy chat">
      <header className="chat-head"><div className="chat-avatar"><i className="bi bi-stars"/></div><div><strong>CodeBuddy AI</strong><small><span className="live-dot"/> Here to help</small></div><button className="chat-close" onClick={()=>setOpen(false)} aria-label="Close chatbot"><i className="bi bi-x-lg"/></button></header>
      <div className="chat-messages">{messages.map((m,i)=><div key={i} className={`chat-line ${m.role}`}><div className="chat-bubble">{m.text}</div></div>)}{busy&&<div className="chat-line assistant"><div className="chat-bubble typing"><span></span><span></span><span></span></div></div>}</div>
      <div className="chat-suggestions"><button onClick={()=>setInput('Give me a project idea')}>Project ideas</button><button onClick={()=>setInput('How do I get started?')}>Get started</button></div>
      <form className="chat-input-row" onSubmit={send}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask CodeBuddy..." aria-label="Message" /><button disabled={!input.trim()||busy} aria-label="Send message"><i className="bi bi-arrow-up"/></button></form>
      <div className="chat-disclaimer">AI assistant · answers may be imperfect</div>
    </section>}
    <button className={`chat-launcher ${open?'is-open':''}`} onClick={()=>setOpen(!open)} aria-label={open?'Close AI assistant':'Open AI assistant'}><i className={`bi ${open?'bi-x-lg':'bi-chat-dots-fill'}`}/>{!open&&<span className="chat-launcher-label">Ask AI</span>}</button>
  </>
}
