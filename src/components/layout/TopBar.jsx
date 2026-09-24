import { Link, useNavigate } from 'react-router-dom'

function TopBar() {
  const navigate = useNavigate()

  return (
    <div className="top-bar">
      <Link to="/" className="logo-wrap">
        <div className="brand-logo">Bon Voyage</div>
        <span className="brand-tag">TRIP PLANNER</span>
      </Link>

      <div
        className="user-avatar"
        onClick={() => navigate('/settings')}
        title="Account & Preferences"
      >
        JG
      </div>
    </div>
  )
}

export default TopBar