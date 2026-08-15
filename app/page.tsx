'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('testuser2@example.com')
  const [password, setPassword] = useState('TestPassword123!')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setResult('Calling Keystone at http://localhost:3000/api/login...')

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })
      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setResult('Error: ' + (err.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '0.5rem', marginTop: '0.25rem', color: 'black', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }
  const buttonStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#0a0a0a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '1rem' }
  const labelStyle = { color: 'black', fontWeight: 600 }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: 'black', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'black' }}>Keystone Client Demo</h1>
      <p style={{ color: '#333', marginTop: '0.5rem' }}>
        This is a separate application, running on its own port, with no auth code of its own.
        It authenticates entirely by calling Keystone directly, proving Keystone works as real,
        external infrastructure rather than logic tied to one app.
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <label style={labelStyle}>Email</label>
        <input value={email} onChange={function (e) { setEmail(e.target.value) }} style={inputStyle} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label style={labelStyle}>Password</label>
        <input type="password" value={password} onChange={function (e) { setPassword(e.target.value) }} style={inputStyle} />
      </div>

      <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
        {loading ? 'Logging in...' : 'Log in via Keystone'}
      </button>

      <pre style={{ marginTop: '1.5rem', background: '#f0f0f0', color: 'black', padding: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.85rem', borderRadius: '4px' }}>{result}</pre>
    </main>
  )
}
