function TimelineDay({ day, title, description, foodHighlight }) {
  return (
    <div className="timeline-day">
      <div className="timeline-dot"></div>
      <b>Day {day} · {title}</b>
      <p>{description}</p>
      {foodHighlight && <div className="timeline-food">🍽️ {foodHighlight}</div>}
    </div>
  )
}

export default TimelineDay