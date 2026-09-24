import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationGrid from '../components/destinations/DestinationGrid.jsx'
import ChipGroup from '../components/common/ChipGroup.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import exploreDestinations from '../data/mockExploreDestinations.js'
import { useApp } from '../context/AppContext.jsx'

const categories = ['All', 'Beaches', 'Mountains', 'Heritage']

function Explore() {
  const navigate = useNavigate()
  const { setPendingDestination, showToast } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = exploreDestinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === 'All' || dest.category === selectedCategory.toLowerCase()
    const searchableText = (dest.name + ' ' + dest.keywords.join(' ')).toLowerCase()
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = query === '' || searchableText.includes(query)
    return matchesCategory && matchesSearch
  })

  function handleSelect(destination) {
    setPendingDestination(destination.name)
    showToast(destination.name + ' selected! Ready to plan.', '✨')
    setTimeout(() => navigate('/'), 450)
  }

  return (
    <section className="screen">
      <h1 className="page-title">Explore India</h1>
      <p className="page-sub">Discover breathtaking destinations across incredible India.</p>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search destinations, experiences..."
        />
        {searchQuery.length > 0 && (
          <button className="clear-search-btn show" onClick={() => setSearchQuery('')} title="Clear">✕</button>
        )}
      </div>

      <ChipGroup options={categories} selected={selectedCategory} onSelect={setSelectedCategory} className="category-tabs" />

      <div className="section-header">
        <h3 className="section-title">Popular Destinations</h3>
        <span className="section-action">
          {filtered.length} {filtered.length === 1 ? 'place' : 'places'}
        </span>
      </div>

      {filtered.length > 0 ? (
        <DestinationGrid destinations={filtered} onSelect={handleSelect} />
      ) : (
        <EmptyState icon="🔍" title="No destinations found" message='Try searching for "Goa", "Rajasthan", or "Himalayas"' />
      )}
    </section>
  )
}

export default Explore