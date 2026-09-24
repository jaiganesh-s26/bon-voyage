import { Link } from 'react-router-dom'

// One row in the My Trips list. Tapping it navigates to that
// trip's itinerary (the Itinerary page is still a placeholder
// until Phase 6 makes it data-driven).
function TripCard({ trip }) {
  const { destination, route, days, guests, thumbnailUrl, itineraryId } = trip

  return (
    <Link to={`/itinerary/${itineraryId}`} className="trip-card">
      <div className="trip-thumb">
        <img src={thumbnailUrl} alt={destination} loading="lazy" />
      </div>
      <div className="trip-details">
        <h4>{destination}</h4>
        <p>{route}</p>
        <div className="trip-meta">
          <span>📅 {days} Days</span>
          <span>👥 {guests} Guests</span>
        </div>
      </div>
    </Link>
  )
}

export default TripCard