// Shows 3 general stay categories (not specific hotels — we don't have
// a real hotel-booking data source), each linking out to a real,
// live Booking.com search for that destination and tier.
function StaysSection({ stays, destination }) {
  function buildSearchUrl(tier) {
    const query = encodeURIComponent(`${destination} ${tier}`)
    return `https://www.booking.com/searchresults.html?ss=${query}`
  }

  return (
    <div className="stays-grid">
      {stays.map((stay) => (
        <div className="stay-card" key={stay.tier}>
          <span className="stay-tier">{stay.tier}</span>
          <p className="stay-description">{stay.description}</p>
        <a  
            className="stay-search-link"
            href={buildSearchUrl(stay.tier)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search stays →
          </a>
        </div>
      ))}
    </div>
  )
}

export default StaysSection