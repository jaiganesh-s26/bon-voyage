// A centered placeholder shown when a list has no items
// (used by My Trips' Past/Drafts tabs, and Explore's "no results" state).
function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <b style={{ fontSize: '15px', color: 'var(--ink)' }}>{title}</b>
      <p style={{ fontSize: '12px', marginTop: '6px' }}>{message}</p>
    </div>
  )
}

export default EmptyState