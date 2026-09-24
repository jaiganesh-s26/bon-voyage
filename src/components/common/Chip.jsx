// One selectable pill. On its own it doesn't track selection —
// ChipGroup (below) decides which Chip is "active".
function Chip({ label, active, onClick }) {
  return (
    <span
      className={'chip' + (active ? ' active' : '')}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default Chip