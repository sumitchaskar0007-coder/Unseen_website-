import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { adminAPI } from '../../api'
import './admin-cms.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('info@unseen.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (localStorage.getItem('adminToken')) return <Navigate to="/admin" replace />

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await adminAPI.login(email.trim(), password)
      if (!response.data?.token) throw new Error('The server did not create a session.')
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminEmail', response.data.email || email.trim())
      navigate('/admin', { replace: true })
    } catch (requestError: unknown) {
      const error = requestError as { response?: { status?: number; data?: { message?: string } }; code?: string }
      if (!error.response) {
        setError('Cannot reach the dashboard server. Start the app with “npm run dev” and try again.')
      } else if (error.response.status === 401) {
        setError('The email or password is incorrect.')
      } else if (error.response.status === 503) {
        setError('The dashboard database is temporarily unavailable.')
      } else {
        setError(error.response.data?.message || 'Unable to open the dashboard. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="cms-login">
      <div className="cms-login-art" aria-hidden="true"><span>UNSEEN</span><small>Content studio</small></div>
      <section className="cms-login-card" aria-labelledby="admin-login-title">
        <div className="cms-login-mark"><strong>UNSEEN</strong><span>STUDIOS</span></div>
        <p className="cms-kicker">Private workspace</p>
        <h1 id="admin-login-title">Content<br />management.</h1>
        <p className="cms-login-copy">Sign in with the authorised admin email and password to manage website content.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>
          <div className="cms-password-field">
            <Mail aria-hidden="true" />
            <input id="admin-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} autoComplete="username" required />
          </div>
          <label htmlFor="admin-password">Password</label>
          <div className="cms-password-field">
            <LockKeyhole aria-hidden="true" />
            <input id="admin-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} autoComplete="current-password" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff /> : <Eye />}</button>
          </div>
          {error && <p className="cms-form-error" role="alert">{error}</p>}
          <button className="cms-primary-button" type="submit" disabled={loading}>{loading?'Signing in…':'Open dashboard'} <span>↗</span></button>
        </form>
        <small>Authorised administrators only</small>
      </section>
    </main>
  )
}
