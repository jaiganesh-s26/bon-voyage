import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import FormField from '../components/common/FormField.jsx'
import PrimaryButton from '../components/common/PrimaryButton.jsx'

function Signup() {
  const { signup, currentUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsSubmitting(true)
    try {
      await signup(email, password)
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.')
      } else {
        setError('Something went wrong creating your account. Please try again.')
      }
    }
    setIsSubmitting(false)
  }

  return (
    <section className="screen">
      <h1 className="page-title" style={{ marginTop: '40px' }}>Create your account</h1>
      <p className="page-sub">Start planning trips with Bon Voyage.</p>

      <form className="card" onSubmit={handleSubmit} style={{ marginTop: '6px' }}>
        <FormField
          label="EMAIL"
          id="signupEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <FormField
          label="PASSWORD"
          id="signupPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
        <FormField
          label="CONFIRM PASSWORD"
          id="signupConfirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && (
          <p style={{ color: '#C0424F', fontSize: '12px', margin: '0 0 10px' }}>{error}</p>
        )}

        <PrimaryButton type="submit">
          <span>{isSubmitting ? 'Creating account…' : 'Sign Up'}</span>
        </PrimaryButton>
      </form>

      <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '16px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
          Log in
        </Link>
      </p>
    </section>
  )
}

export default Signup