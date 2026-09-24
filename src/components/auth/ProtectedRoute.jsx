import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

// Wrap any page with this to require login. If nobody's logged in,
// it redirects to /login instead of showing the page.
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute