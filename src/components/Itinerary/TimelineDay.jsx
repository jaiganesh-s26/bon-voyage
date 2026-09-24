function TimelineDay({ day, title, description }) {
  return (
    <div className="timeline-day">
      <div className="timeline-dot"></div>
      <b>Day {day} · {title}</b>
      <p>{description}</p>
    </div>
  )
}

export default TimelineDay