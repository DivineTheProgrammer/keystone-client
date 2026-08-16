'use client'

import { useState } from 'react'

const KEYSTONE_URL = 'https://keystone-phi-eosin.vercel.app'

export default function Home() {
  const [email, setEmail] = useState('testuser2@example.com')
  const [password, setPassword] = useState('TestPassword123!')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(KEYSTONE_URL + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setResult({ error: err.message || String(err) })
    } finally {
      setLoading(false)
    }
  }

  const pageStyle = { minHeight: '100vh', background: '#fafafa', padding: '3rem 1.5rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
  const containerStyle = { maxWidth: '480px', margin: '0 auto' }
  const cardStyle = { background: 'white', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }
  const bannerStyle = { background: '#eef4ff', border: '1px solid #cfe0ff', borderRadius: '8px', padding: '0.9rem 1.1rem', fontSize: '0.85rem', color: '#2452a8', marginBottom: '1.5rem', lineHeight: 1.5 }
  const labelStyle = { display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#444', fontWeight: 600 }
  const inputStyle = { width: '100%', padding: '0.6rem 0.75rem', color: '#111', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem' }
  const buttonStyle = { width: '100%', marginTop: '1.25rem', padding: '0.7rem', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }
  const resultStyle = { marginTop: '1.5rem', background: '#f5f5f5', border: '1px solid #e5e5e5', padding: '1rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#333', whiteSpace: 'pre-wrap' as const, overflow: 'auto' }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111' }}>Acme Dashboard</h1>
        <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.3rem' }}>A sample product with no auth code of its own</p>

        <div style={{ ...bannerStyle, marginTop: '1.5rem' }}>
          This app authenticates entirely by calling Keystone, a separate identity service hosted at {KEYSTONE_URL}. No password logic, no session handling, and no user table exist in this codebase.
        </div>

        <div style={cardStyle}>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={email} onChange={function (e) { setEmail(e.target.value) }} style={inputStyle} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Password</label>
            <input type="password" value={password} onChange={function (e) { setPassword(e.target.value) }} style={inputStyle} />
          </div>

          <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        {result && <pre style={resultStyle}>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  )
}
