import { NavLink, useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const linkClass = ({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')

  return (
    <aside className="sidebar-nav">
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <div className="sidebar-logo">Bon Voyage</div>
        <span className="sidebar-tag">TRIP PLANNER</span>
      </NavLink>

      <nav className="sidebar-links">
        <NavLink to="/" end className={linkClass}>
          <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" /></svg>
          <span>Home</span>
        </NavLink>
        <NavLink to="/trips" className={linkClass}>
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <span>Trips</span>
        </NavLink>
        <NavLink to="/explore" className={linkClass}>
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <span>Explore</span>
        </NavLink>
        <NavLink to="/saved" className={linkClass}>
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          <span>Saved</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer" onClick={() => navigate('/settings')}>
        <div className="user-avatar">JG</div>
        <span>Settings</span>
      </div>
    </aside>
  )
}

export default Sidebar