import DestinationCard from './DestinationCard.jsx'

// A 2-column grid of DestinationCards.
function DestinationGrid({ destinations, onSelect }) {
  return (
    <div className="dest-grid">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} onClick={onSelect} />
      ))}
    </div>
  )
}

export default DestinationGrid