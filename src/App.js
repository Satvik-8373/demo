import './App.css'
import React, { useState } from 'react'
import Hello from './Hello'
import About from './About'
import Contact from './Contact'

function App() {
  const [route, setRoute] = useState('home')

  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setRoute('home')}>Home</button>
          <button onClick={() => setRoute('about')}>About</button>
          <button onClick={() => setRoute('contact')}>Contact</button>
        </nav>
      </header>

      <main>
        {route === 'home' && (
          <div>
            <Hello />
          </div>
        )}

        {route === 'about' && <About />}

        {route === 'contact' && <Contact />}
      </main>
    </div>
  )
}

export default App
