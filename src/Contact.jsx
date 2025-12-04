import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks, ${form.name || 'friend'}! We'll contact you at ${form.email || 'your email'}.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Your email" value={form.email} onChange={handleChange} />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} rows={4} />
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}
