import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import TimelineDay from '../components/itinerary/TimelineDay.jsx'
import StaysSection from '../components/itinerary/StaysSection.jsx'
import AnimatedBackground from '../components/common/AnimatedBackground.jsx'
import { fetchDestinationImages } from '../services/pexelsService.js'

function Itinerary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { itineraries, toggleSavedTrip, showToast } = useApp()

  const itinerary = itineraries[id]
  const [bgImages, setBgImages] = useState([])

  useEffect(() => {
    if (!itinerary) return

    let cancelled = false

    fetchDestinationImages(itinerary.destination, 6)
      .then((urls) => {
        if (!cancelled) setBgImages(urls)
      })
      .catch((err) => {
        console.error('Failed to fetch itinerary background images:', err)
        if (!cancelled) setBgImages([itinerary.heroImageUrl])
      })

    return () => { cancelled = true }
  }, [itinerary])

  if (!itinerary) {
    return (
      <section className="screen">
        <button className="itinerary-back-btn" onClick={() => navigate(-1)} title="Go back">‹</button>
        <h1 className="page-title" style={{ marginTop: '60px' }}>Itinerary not found</h1>
        <p className="page-sub">We couldn't find a trip with that id.</p>
      </section>
    )
  }

  const { destination, vibe, days, guests, subtitle, heroImageUrl, summary, plan, stays } = itinerary

  function handleSave() {
    toggleSavedTrip(itinerary)
    showToast('Trip saved to your account ♥', '♥')
  }

  return (
    <section className="screen" style={{ paddingBottom: '30px' }}>
      <AnimatedBackground images={bgImages} light />

      <div className="itinerary-hero-container">
        <button className="itinerary-back-btn" onClick={() => navigate(-1)} title="Back to My Trips">‹</button>
        <img className="itinerary-hero-img" src={heroImageUrl} alt={destination} />
        <div className="itinerary-hero-gradient"></div>
        <div className="itinerary-hero-content">
          <div className="itinerary-content-wrap itinerary-content-wrap--light">
            <h1 className="itinerary-hero-title">{destination}</h1>
            <p className="itinerary-hero-sub">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="itinerary-content-wrap itinerary-content-wrap--light">
        <div className="card" style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b style={{ fontSize: '15px', color: 'var(--ink)' }}>
              {vibe} · {days} Days · {guests} Guests
            </b>
            <span style={{ fontSize: '11px', background: 'var(--gold-soft)', color: '#9A6708', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
              Curated
            </span>
          </div>
          <p className="page-sub" style={{ margin: '8px 0 0', fontSize: '13px' }}>{summary}</p>
        </div>

        <div style={{ padding: '4px 20px' }}>
          <h3 className="section-title" style={{ marginBottom: '12px' }}>Your itinerary</h3>
          <div className="timeline-container">
            {plan.map((entry) => (
              <TimelineDay
                key={entry.day}
                day={entry.day}
                title={entry.title}
                description={entry.description}
                foodHighlight={entry.foodHighlight}
              />
            ))}
          </div>
        </div>

        {stays && stays.length > 0 && (
          <div style={{ padding: '4px 0 0' }}>
            <h3 className="section-title" style={{ margin: '0 0 12px', padding: '0 20px' }}>Where to stay</h3>
            <StaysSection stays={stays} destination={destination} />
          </div>
        )}

        <div style={{ padding: '20px 20px 4px' }}>
          <button className="btn-primary" onClick={handleSave}>
            <span>Save Trip</span>
            <span>♥</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Itinerary