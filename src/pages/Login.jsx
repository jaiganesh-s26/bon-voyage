import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import FormField from '../components/common/FormField.jsx'
import PrimaryButton from '../components/common/PrimaryButton.jsx'

function Login() {
  const { login, currentUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If someone's already logged in and lands on /login, send them home.
  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Incorrect email or password. Please try again.')
    }
    setIsSubmitting(false)
  }

  return (
    <section className="screen">
      <h1 className="page-title" style={{ marginTop: '40px' }}>Welcome back</h1>
      <p className="page-sub">Log in to plan and manage your trips.</p>

      <form className="card" onSubmit={handleSubmit} style={{ marginTop: '6px' }}>
        <FormField
          label="EMAIL"
          id="loginEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <FormField
          label="PASSWORD"
          id="loginPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && (
          <p style={{ color: '#C0424F', fontSize: '12px', margin: '0 0 10px' }}>{error}</p>
        )}

        <PrimaryButton type="submit">
          <span>{isSubmitting ? 'Logging in…' : 'Log In'}</span>
        </PrimaryButton>
      </form>

      <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
          Sign up
        </Link>
      </p>
    </section>
  )
}

export default Login