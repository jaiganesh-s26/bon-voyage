import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChipGroup from '../components/common/ChipGroup.jsx'
import TripCard from '../components/trips/TripCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useApp } from '../context/AppContext.jsx'

const tabs = ['Upcoming', 'Past', 'Drafts']
const tabToStatus = { Upcoming: 'upcoming', Past: 'past', Drafts: 'draft' }

function MyTrips() {
  const { trips } = useApp()
  const [activeTab, setActiveTab] = useState('Upcoming')

  const status = tabToStatus[activeTab]
  const filteredTrips = trips.filter((trip) => trip.status === status)

  return (
    <section className="screen">
      <h1 className="page-title">My Trips</h1>
      <p className="page-sub">Your adventures, all in one place.</p>

      <ChipGroup options={tabs} selected={activeTab} onSelect={setActiveTab} className="category-tabs" />

      {filteredTrips.length > 0 ? (
        <>
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}

          {activeTab === 'Upcoming' && (
            <div className="add-trip-card">
              <b>＋ Plan a New Trip</b>
              <p style={{ margin: '4px 0 12px', fontSize: '12px', color: 'var(--muted)' }}>
                Turn your next destination into a memorable story
              </p>
              <Link to="/" className="btn-secondary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Start Planning
              </Link>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={activeTab === 'Past' ? '🗺️' : '📝'}
          title={activeTab === 'Past' ? 'No past journeys yet' : 'No saved drafts'}
          message={
            activeTab === 'Past'
              ? 'Completed itineraries will appear here after your trips conclude.'
              : 'Drafts and work-in-progress trip itineraries will be archived here.'
          }
        />
      )}
    </section>
  )
}

export default MyTrips