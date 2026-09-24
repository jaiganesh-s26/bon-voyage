import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Chip from '../components/common/Chip.jsx'
import SegmentedControl from '../components/common/SegmentedControl.jsx'
import ToggleSwitch from '../components/common/ToggleSwitch.jsx'
import PrimaryButton from '../components/common/PrimaryButton.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const allTravelStyles = ['Scenic & Nature', 'Cultural Heritage', 'Luxury Wellness', 'Culinary Tours', 'Offbeat Adventure', 'Beaches & Coastal']
const paceOptions = ['Relaxed', 'Moderate', 'Fast-paced']
const dietOptions = ['Vegetarian', 'Vegan', 'Seafood', 'Any']
const currencyOptions = [
  { value: 'INR', label: 'INR (₹)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' }
]

function Settings() {
  const navigate = useNavigate()
  const { user, preferences, updatePreferences, showToast } = useApp()
  const { logout } = useAuth()


  function toggleTravelStyle(style) {
    const current = preferences.travelStyles
    const next = current.includes(style) ? current.filter((s) => s !== style) : [...current, style]
    updatePreferences({ travelStyles: next })
  }

  function handleToggleNotification(key, label) {
    const nextValue = !preferences.notifications[key]
    updatePreferences({ notifications: { ...preferences.notifications, [key]: nextValue } })
    showToast(`${label} ${nextValue ? 'enabled' : 'disabled'}`, nextValue ? '🔔' : '🔕')
  }

  function handleSavePreferences() {
    showToast('Preferences updated successfully!', '✓')
    setTimeout(() => navigate(-1), 900)
  }

  async function handleSignOut() {
    showToast(`Signed out of ${user.name} account`, '👋')
    await logout()
    navigate('/login')
  }

  return (
    <section className="screen">
      <div className="settings-nav-header">
        <button aria-label="Go Back" className="back-circle-btn" onClick={() => navigate(-1)}>‹</button>
        <h2 className="settings-title">Account &amp; Preferences</h2>
        <div style={{ width: '36px' }}></div>
      </div>

      <div className="profile-block">
        <div className="profile-avatar-wrap">
          <div className="user-avatar" style={{ width: '72px', height: '72px', fontSize: '22px', margin: '0 auto', cursor: 'default' }}>
            JG
          </div>
        </div>
        <h3 className="profile-name">{user.name}</h3>
        <div className="profile-badge-row">
          <span>{user.email}</span>
          <span>•</span>
          <span className="gold-badge">★ {user.tier}</span>
        </div>
        <button className="edit-profile-pill" onClick={() => showToast('Profile editing coming soon', '✏️')}>
          Edit Profile
        </button>
      </div>

      <div className="card" style={{ marginTop: '4px' }}>
        <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Account Details</h4>
        <div className="info-list-group">
          <div className="info-list-row">
            <span className="info-label">Full Name</span>
            <span className="info-val">{user.name}</span>
          </div>
          <div className="info-list-row">
            <span className="info-label">Email Address</span>
            <span className="info-val">{user.email}</span>
          </div>
          <div className="info-list-row">
            <span className="info-label">Phone Number</span>
            <span className="info-val">{user.phone}</span>
          </div>
          <div className="info-list-row">
            <span className="info-label">Currency</span>
            <select
              className="currency-select"
              value={preferences.currency}
              onChange={(e) => {
                updatePreferences({ currency: e.target.value })
                showToast('Currency set to ' + e.target.value, '💱')
              }}
            >
              {currencyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Travel Preferences</h4>
        <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--muted)' }}>
          Customise what kinds of trips Bon Voyage recommends.
        </p>

        <label className="field-label" style={{ marginTop: '6px' }}>TRAVEL STYLES</label>
        <div className="chips-scroll" style={{ marginBottom: '14px' }}>
          {allTravelStyles.map((style) => (
            <Chip
              key={style}
              label={style}
              active={preferences.travelStyles.includes(style)}
              onClick={() => toggleTravelStyle(style)}
            />
          ))}
        </div>

        <label className="field-label">PREFERRED PACE</label>
        <div style={{ marginBottom: '14px' }}>
          <SegmentedControl options={paceOptions} selected={preferences.pace} onSelect={(pace) => updatePreferences({ pace })} />
        </div>

        <label className="field-label">DIETARY / DINING PREFERENCE</label>
        <SegmentedControl options={dietOptions} selected={preferences.diet} onSelect={(diet) => updatePreferences({ diet })} />
      </div>

      <Link to="/saved" className="card" style={{ cursor: 'pointer', display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="saved-preview-row">
          <div>
            <h4 style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Saved Destinations</h4>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>View your saved list</span>
          </div>
          <span style={{ fontSize: '16px', color: 'var(--accent)', fontWeight: 700 }}>›</span>
        </div>
      </Link>

      <div className="card">
        <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Notifications &amp; Privacy</h4>
        <ToggleSwitch
          label="Trip Recommendations & Deals"
          sublabel="Personalized deals based on travel taste"
          checked={preferences.notifications.tripRecommendations}
          onChange={() => handleToggleNotification('tripRecommendations', 'Trip recommendations')}
        />
        <ToggleSwitch
          label="Price Drop Alerts"
          sublabel="Live alerts for hotels and curated tours"
          checked={preferences.notifications.priceDropAlerts}
          onChange={() => handleToggleNotification('priceDropAlerts', 'Price drop alerts')}
        />
        <ToggleSwitch
          label="Offline Itinerary Sync"
          sublabel="Cache trip guides when travelling"
          checked={preferences.notifications.offlineSync}
          onChange={() => handleToggleNotification('offlineSync', 'Offline itinerary sync')}
        />
      </div>

      <div style={{ padding: '0 20px' }}>
        <PrimaryButton onClick={handleSavePreferences}>
          <span>Save Preferences</span>
          <span>✓</span>
        </PrimaryButton>
        <button className="sign-out-btn" onClick={handleSignOut}>Sign out of account</button>
      </div>
    </section>
  )
}

export default Settings