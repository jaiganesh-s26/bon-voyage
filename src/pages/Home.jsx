import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormField from '../components/common/FormField.jsx'
import ChipGroup from '../components/common/ChipGroup.jsx'
import PrimaryButton from '../components/common/PrimaryButton.jsx'
import DestinationGrid from '../components/destinations/DestinationGrid.jsx'
import featuredDestinations from '../data/mockDestinations.js'
import { useApp } from '../context/AppContext.jsx'

const vacationTypes = ['Relaxation', 'Adventure', 'Family', 'Culture', 'Honeymoon']

function getStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail silently
  }
}

function Home() {
  const navigate = useNavigate()
  const { pendingDestination, setPendingDestination, generateItinerary, showToast } = useApp()

  const [destination, setDestination] = useState(() => pendingDestination || getStored('lastDestination', 'Udaipur'))
  const [days, setDays] = useState(() => getStored('lastDays', 4))
  const [guests, setGuests] = useState(() => getStored('lastGuests', 2))
  const [vacationType, setVacationType] = useState(() => getStored('lastVacationType', 'Relaxation'))
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (pendingDestination) {
      setPendingDestination(null)
    }
  }, [pendingDestination, setPendingDestination])

  // Remember the last values entered, so returning to this page keeps them
  useEffect(() => { setStored('lastDestination', destination) }, [destination])
  useEffect(() => { setStored('lastDays', days) }, [days])
  useEffect(() => { setStored('lastGuests', guests) }, [guests])
  useEffect(() => { setStored('lastVacationType', vacationType) }, [vacationType])

  function handleQuickSelect(dest) {
    setDestination(dest.name)
    showToast('Destination set to ' + dest.name, '📍')
  }

  async function handleGenerateClick() {
    if (isGenerating) return

    if (!destination.trim()) {
      showToast('Please enter a destination', '⚠️')
      return
    }
    if (!days || Number(days) < 1) {
      showToast('Please enter valid number of days', '⚠️')
      return
    }
    if (!guests || Number(guests) < 1) {
      showToast('Please enter valid number of guests', '⚠️')
      return
    }

    setIsGenerating(true)
    showToast('Creating your itinerary…', '⏳')
    const newId = await generateItinerary({ destination, days, guests, vacationType })
    navigate(`/itinerary/${newId}`)
  }

  return (
    <section className="screen">
      <h1 className="page-title">Where to next?</h1>
      <p className="page-sub">Tell us your travel vibes, we'll do the rest.</p>

      <div className="home-layout">
        <div className="home-form-col">
          <div className="card" style={{ marginTop: '6px' }}>
            <FormField
              label="DESTINATION"
              id="inputDestination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Manali, Goa, Udaipur"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <FormField
                label="NUMBER OF DAYS"
                id="inputDays"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                min={1}
                max={30}
              />
              <FormField
                label="NUMBER OF GUESTS"
                id="inputGuests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min={1}
                max={20}
              />
            </div>

            <div className="form-field" style={{ paddingBottom: '12px' }}>
              <label className="field-label">VACATION TYPE</label>
              <ChipGroup options={vacationTypes} selected={vacationType} onSelect={setVacationType} />
            </div>

            <PrimaryButton onClick={handleGenerateClick}>
              <span>{isGenerating ? 'Creating your itinerary…' : 'Generate My Itinerary'}</span>
              {!isGenerating && <span>→</span>}
            </PrimaryButton>
          </div>
        </div>

        <div className="home-explore-col">
          <div className="section-header" style={{ marginTop: '14px' }}>
            <h3 className="section-title">Explore India</h3>
            <Link to="/explore" className="section-action">See All</Link>
          </div>

          <DestinationGrid destinations={featuredDestinations} onSelect={handleQuickSelect} />
        </div>
      </div>
    </section>
  )
}

export default Home