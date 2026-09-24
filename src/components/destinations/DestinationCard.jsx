// One image card in a destination grid (used on Home and, later, Explore).
function DestinationCard({ destination, onClick }) {
  const { name, badge, subtitle, imageUrl } = destination

  return (
    <div className="dest-card" onClick={() => onClick(destination)}>
      <div className="dest-img-wrap">
        <img src={imageUrl} alt={name} loading="lazy" />
        <span className="dest-badge">{badge}</span>
      </div>
      <div className="dest-body">
        <b>{name}</b>
        <small>{subtitle}</small>
      </div>
    </div>
  )
}

export default DestinationCard